// HubSpot Forms proxy. No private HubSpot credentials or contact details are logged.
const HUB_ID = '149282104';
const FORM_ID = '646cc721-5cbf-45ad-95e8-174ade6b5221';
const origins = new Set(['https://wedocare-global.com', 'https://www.wedocare-global.com']);
const hits = new Map();
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  if (!origins.has(req.headers.origin)) return res.status(403).json({ error: 'origin_not_allowed' });
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) return res.status(415).json({ error: 'json_required' });
  const size = Number(req.headers['content-length'] || 0);
  if (size > 12000) return res.status(413).json({ error: 'too_large' });
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const now = Date.now();
  for (const [key, value] of hits) if (now - value.started > 60000) hits.delete(key);
  const bucket = hits.get(ip) || { started: now, count: 0 };
  bucket.count++;
  hits.set(ip, bucket);
  if (bucket.count > 5) return res.status(429).json({ error: 'rate_limited' });
  const data = req.body || {};
  if (typeof data !== 'object' || Array.isArray(data)) return res.status(400).json({ error: 'invalid_request' });
  // Honeypot: bots populate the visually hidden field.
  if (data.company_website) return res.status(200).json({ ok: true });
  const name = String(data.name || '').trim(), email = String(data.email || '').trim();
  const interest = String(data.interest || '').trim(), message = String(data.message || '').trim();
  if (!data.consent || name.length < 2 || name.length > 120 ||
      !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email) || email.length > 254 ||
      interest.length > 150 || message.length < 5 || message.length > 4000 ||
      /[\\r\\n]/.test(name + email)) return res.status(400).json({ error: 'invalid_fields' });
  const [firstname, ...other] = name.split(/\\s+/);
  const fields = [
    { name: 'firstname', value: firstname },
    { name: 'lastname', value: other.join(' ') || '-' },
    { name: 'email', value: email },
    { name: 'message', value: 'Interest: ' + interest + '\\n\\n' + message }
  ];
  try {
    const upstream = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/' + HUB_ID + '/' + FORM_ID, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields, context: { pageUri: 'https://wedocare-global.com/', pageName: 'We Do Care Global — Contact' },
        legalConsentOptions: { consent: { consentToProcess: true, text: 'I agree that We Do Care Global may process my information to respond to my inquiry.' } } }),
      signal: AbortSignal.timeout(8000)
    });
    if (!upstream.ok) return res.status(502).json({ error: 'crm_unavailable' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'crm_unavailable' });
  }
};
