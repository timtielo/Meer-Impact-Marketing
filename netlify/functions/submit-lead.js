// Server-side lead proxy. Hides the Make.com webhook URLs from the client
// bundle (bots can no longer scrape them and POST empty payloads directly) and
// validates every submission before forwarding. See netlify.toml + .env.example.

// Each form maps to its Make webhook (env var, never shipped to the client) and
// the fields that must be present. `email` is always format-checked on top.
const FORMS = {
  analyse: { url: process.env.MAKE_ANALYSE_WEBHOOK, require: ['voornaam', 'email', 'bedrijf'] },
  visitekaartje: { url: process.env.MAKE_ANALYSE_WEBHOOK, require: ['voornaam', 'email'] },
  guide: { url: process.env.MAKE_GUIDE_WEBHOOK, require: ['voornaam', 'email'] },
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

  // 3. Route to the right Make scenario.
  const form = FORMS[_form];
  if (!form || !form.url) return json(400, { ok: false, error: 'unknown_form' });

  // 4. Required-field + email validation (the empty-submission guard).
  for (const field of form.require) {
    if (!String(data[field] || '').trim()) return json(400, { ok: false, error: 'validation' });
  }
  if (!EMAIL_RE.test(String(data.email).trim())) return json(400, { ok: false, error: 'validation' });

  // 5. Forward the clean payload to Make.
  try {
    const res = await fetch(form.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return json(502, { ok: false, error: 'upstream' });
  } catch {
    return json(502, { ok: false, error: 'upstream' });
  }

  return json(200, { ok: true });
};
