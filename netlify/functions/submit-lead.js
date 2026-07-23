// Server-side lead handler for every form on the site.
//
// Flow: validate -> ALWAYS email the lead to the owner -> OPTIONALLY forward to
// a webhook (Make/Zapier/CRM) when one is configured.
//
// Why this shape:
//   * The email is the guaranteed path. It needs no workflow tool to stay alive,
//     and the owner controls the inbox. If it fails we return 502 so the visitor
//     sees an error and can retry, instead of the lead disappearing silently.
//   * The webhook is a pass-through. Set the env var and leads also flow into
//     Make/Zapier/a CRM. Leave it empty and this step is skipped. No code change
//     is ever needed to add or remove it.
//
// Everything sensitive (API key, webhook URLs) lives in server-only env vars and
// never reaches the client bundle. Do not move these calls into the browser.
//
// Env vars:
//   RESEND_API_KEY     Resend API key (required for the email path)
//   LEAD_EMAIL_TO      inbox that receives the leads
//   LEAD_EMAIL_FROM    verified sender, e.g. "Meer Impact <leads@example.nl>"
//   MAKE_ANALYSE_WEBHOOK   optional
//   MAKE_GUIDE_WEBHOOK     optional

const FORMS = {
  analyse: {
    label: 'Marketing-analyse',
    require: ['voornaam', 'email', 'bedrijf'],
    webhook: () => process.env.MAKE_ANALYSE_WEBHOOK,
  },
  visitekaartje: {
    label: 'Visitekaartje',
    require: ['voornaam', 'email'],
    webhook: () => process.env.MAKE_ANALYSE_WEBHOOK,
  },
  guide: {
    label: 'Gratis guide',
    require: ['voornaam', 'email'],
    webhook: () => process.env.MAKE_GUIDE_WEBHOOK,
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FILL_MS = 2500; // humans take longer than this to fill a form

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

// A dropped bot submission looks like success to the client, so bots get no
// signal to adapt while real validation errors still surface as 400.
const DROP = json(200, { ok: true, dropped: true });

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Render the submitted fields as a readable email body. */
function buildEmail(label, data) {
  const rows = Object.entries(data).filter(([, v]) => String(v ?? '').trim() !== '');
  const text = [`Nieuwe aanvraag via de website (${label})`, '', ...rows.map(([k, v]) => `${k}: ${v}`)].join('\n');
  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#0b1f3a;line-height:1.6">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#5b6b82">Nieuwe aanvraag</p>
      <h2 style="margin:0 0 16px;font-size:20px">${escapeHtml(label)}</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                 <td style="padding:6px 16px 6px 0;color:#5b6b82;vertical-align:top">${escapeHtml(k)}</td>
                 <td style="padding:6px 0;font-weight:600">${escapeHtml(v)}</td>
               </tr>`
          )
          .join('')}
      </table>
      <p style="margin:20px 0 0;font-size:13px;color:#5b6b82">Antwoorden gaat rechtstreeks naar de aanvrager.</p>
    </div>`;
  return { text, html };
}

/** Send the lead by email. Returns true on success. */
async function sendEmail(label, data) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;
  if (!key || !to || !from) return null; // email path not configured

  const { text, html } = buildEmail(label, data);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: String(data.email || '').trim() || undefined,
      subject: `Nieuwe lead: ${label}${data.voornaam ? ` (${data.voornaam})` : ''}`,
      text,
      html,
    }),
  });
  if (!res.ok) {
    console.error('resend failed', res.status, await res.text().catch(() => ''));
    return false;
  }
  return true;
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { ok: false, error: 'method' });

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { ok: false, error: 'invalid_json' });
  }

  const { _hp, _ts, _form, ...data } = payload;

  // 1. Honeypot — hidden field only a bot fills in.
  if (typeof _hp === 'string' && _hp.trim() !== '') return DROP;

  // 2. Timing — reject submissions faster than a human could type.
  const ts = Number(_ts);
  if (Number.isFinite(ts) && Date.now() - ts < MIN_FILL_MS) return DROP;

  // 3. Known form?
  const form = FORMS[_form];
  if (!form) return json(400, { ok: false, error: 'unknown_form' });

  // 4. Required-field + email validation (the empty-submission guard).
  for (const field of form.require) {
    if (!String(data[field] || '').trim()) return json(400, { ok: false, error: 'validation' });
  }
  if (!EMAIL_RE.test(String(data.email).trim())) return json(400, { ok: false, error: 'validation' });

  // 5. Deliver. Email is the guaranteed path; the webhook is optional.
  const webhookUrl = form.webhook();
  const mailed = await sendEmail(form.label, data).catch((e) => {
    console.error('resend threw', e);
    return false;
  });

  if (mailed === null && !webhookUrl) {
    // Nothing is configured — fail loudly rather than swallow a real lead.
    console.error('submit-lead: no delivery configured (set RESEND_* or a webhook)');
    return json(500, { ok: false, error: 'not_configured' });
  }
  if (mailed === false && !webhookUrl) return json(502, { ok: false, error: 'delivery' });

  // 6. Optional pass-through to Make/Zapier/CRM. A webhook failure must not cost
  //    us the lead when the email already landed.
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.error('webhook failed', res.status);
        if (!mailed) return json(502, { ok: false, error: 'upstream' });
      }
    } catch (e) {
      console.error('webhook threw', e);
      if (!mailed) return json(502, { ok: false, error: 'upstream' });
    }
  }

  return json(200, { ok: true });
};
