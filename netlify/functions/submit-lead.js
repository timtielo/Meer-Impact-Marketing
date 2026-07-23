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

// Which site this lead came from. Set LEAD_SITE_NAME when reusing this function
// on another client site, so the same template works everywhere.
// (Not SITE_NAME: that one is reserved by Netlify and cannot be overridden.)
const SITE_NAME = process.env.LEAD_SITE_NAME || 'Meer Impact Marketing';

// Tielo Digital brand tokens (canonical: tielo-brand-kit/package/tokens/tokens.json)
const BRAND = { navy: '#0b2027', orange: '#e96020', cream: '#f6f1d1', offwhite: '#f7f7f7', steel: '#40798c' };

const LABELS = { voornaam: 'Voornaam', achternaam: 'Achternaam', email: 'E-mailadres', bedrijf: 'Bedrijf', telefoon: 'Telefoon', bericht: 'Bericht', dienst: 'Dienst' };
const pretty = (k) => LABELS[k] || k.charAt(0).toUpperCase() + k.slice(1);

/**
 * Lead notification in the Tielo Digital house style. Email-safe: tables,
 * inline styles, no flexbox/grid, 600px max width.
 */
function buildEmail(label, data) {
  const rows = Object.entries(data).filter(([, v]) => String(v ?? '').trim() !== '');
  const text = [
    `Nieuwe aanvraag via ${SITE_NAME} (${label})`,
    '',
    ...rows.map(([k, v]) => `${pretty(k)}: ${v}`),
    '',
    'Antwoorden gaat rechtstreeks naar de aanvrager.',
  ].join('\n');

  const font = "Rubik,'Helvetica Neue',Helvetica,Arial,sans-serif";
  const html = `<!doctype html>
<html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px 12px;background:${BRAND.offwhite};font-family:${font}">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e6e6e6">
    <tr>
      <td style="background:${BRAND.navy};padding:20px 28px">
        <p style="margin:0;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${BRAND.cream};opacity:.75">Nieuwe aanvraag</p>
        <p style="margin:4px 0 0;font-size:20px;font-weight:700;color:#ffffff">${escapeHtml(label)}</p>
        <p style="margin:2px 0 0;font-size:13px;color:${BRAND.cream};opacity:.8">via ${escapeHtml(SITE_NAME)}</p>
      </td>
    </tr>
    <tr><td style="height:4px;background:${BRAND.orange};font-size:0;line-height:0">&nbsp;</td></tr>
    <tr>
      <td style="padding:24px 28px">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          ${rows
            .map(
              ([k, v]) =>
                `<tr>
                   <td style="padding:10px 16px 10px 0;font-size:13px;color:${BRAND.steel};vertical-align:top;white-space:nowrap;border-bottom:1px solid #f0f0f0">${escapeHtml(pretty(k))}</td>
                   <td style="padding:10px 0;font-size:15px;font-weight:600;color:${BRAND.navy};border-bottom:1px solid #f0f0f0">${escapeHtml(v)}</td>
                 </tr>`
            )
            .join('')}
        </table>
        ${
          data.email
            ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px">
                 <tr><td style="background:${BRAND.orange};border-radius:8px">
                   <a href="mailto:${escapeHtml(String(data.email).trim())}" style="display:inline-block;padding:12px 22px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none">Beantwoorden</a>
                 </td></tr>
               </table>`
            : ''
        }
        <p style="margin:20px 0 0;font-size:13px;color:${BRAND.steel}">Je kunt ook gewoon op deze mail antwoorden, dat gaat rechtstreeks naar de aanvrager.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 28px;background:${BRAND.cream};font-size:12px;color:${BRAND.navy}">
        Verstuurd via je website, gebouwd door
        <a href="https://www.tielo-digital.nl" style="color:${BRAND.navy};font-weight:700">Tielo Digital</a>
      </td>
    </tr>
  </table>
</body></html>`;
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
