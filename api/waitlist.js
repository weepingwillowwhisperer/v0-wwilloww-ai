const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeBody(body) {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

function cleanText(value, fallback = '', max = 500) {
  return String(value || fallback)
    .trim()
    .slice(0, max);
}

function buildRow(payload, req) {
  const stage = Array.isArray(payload.stage) && payload.stage.length
    ? payload.stage.map((item) => cleanText(item, '', 80)).filter(Boolean).join(', ')
    : 'not specified';

  return [
    new Date().toISOString(),
    cleanText(payload.email, '', 254).toLowerCase(),
    stage,
    cleanText(payload.product_interest, 'whole library', 200),
    cleanText(payload.source, 'wwilloww.ai waitlist form', 200),
    cleanText(payload.consent, 'yes', 40),
    cleanText(payload.notes, '', 500) || `ip:${req.headers['x-forwarded-for'] || 'unknown'}`,
  ];
}

async function appendViaWebhook(payload, req) {
  const endpoint = process.env.WAITLIST_WEBHOOK_URL;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      email: cleanText(payload.email, '', 254).toLowerCase(),
      stage: Array.isArray(payload.stage) ? payload.stage : [],
      product_interest: cleanText(payload.product_interest, 'whole library', 200),
      source: cleanText(payload.source, 'wwilloww.ai waitlist form', 200),
      consent: cleanText(payload.consent, 'yes', 40),
      notes: cleanText(payload.notes, '', 500),
      visitor: req.headers['x-forwarded-for'] || '',
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook returned ${response.status}`);
  }
}

async function appendViaGoogleServiceAccount(payload, req) {
  const { google } = await import('googleapis');

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_NAME || 'Signups';
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

  if (!spreadsheetId || !clientEmail || !privateKey) {
    throw new Error('Missing Google Sheets environment variables');
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:G`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [buildRow(payload, req)],
    },
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  const payload = normalizeBody(req.body);
  const email = cleanText(payload.email, '', 254).toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({
      ok: false,
      message: 'That does not look like a complete email address.',
    });
  }

  try {
    if (process.env.WAITLIST_WEBHOOK_URL) {
      await appendViaWebhook({ ...payload, email }, req);
    } else {
      await appendViaGoogleServiceAccount({ ...payload, email }, req);
    }

    return res.status(201).json({
      ok: true,
      message: 'Thanks — you are on the waitlist. We will email you when the first PDF is ready.',
    });
  } catch (error) {
    console.error('Waitlist submission failed:', error);
    return res.status(503).json({
      ok: false,
      message: 'We could not save your signup just now. Please try again, or email hello@wwilloww.ai.',
    });
  }
}
