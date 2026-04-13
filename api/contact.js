const SERVICE_LABELS = {
  consult: 'Signature Series spot seller (invite only)',
  search: 'Signature Series buyer (missed invite)',
  sell: 'Signature Series spot seller (confirmed order)',
  dealer: 'Dealer inventory sourcing',
  notsure: 'Signature Series process question',
};

const REJECTED_LINE_TYPES = new Set([
  'landline',
  'fixedVoip',
  'tollFree',
  'premium',
  'sharedCost',
  'uan',
  'voicemail',
  'pager',
]);

function cleanText(input = '', maxLength = 500) {
  return String(input)
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function normalizePhone(input = '') {
  const digits = String(input).replace(/\D/g, '');

  if (digits.length === 11 && digits.startsWith('1')) {
    return digits.slice(1);
  }

  return digits;
}

function formatPhone(input = '') {
  const digits = normalizePhone(input);

  if (digits.length !== 10) {
    return digits;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function getTwilioLookupAuth() {
  const username = process.env.TWILIO_API_KEY || process.env.TWILIO_ACCOUNT_SID || '';
  const password = process.env.TWILIO_API_SECRET || process.env.TWILIO_AUTH_TOKEN || '';

  if (!username || !password) {
    return null;
  }

  return Buffer.from(`${username}:${password}`).toString('base64');
}

function getLookupMode() {
  return String(process.env.TWILIO_LOOKUP_MODE || 'line_type').trim().toLowerCase();
}

async function lookupPhone(phoneDigits) {
  const auth = getTwilioLookupAuth();

  if (!auth) {
    return {
      enabled: false,
      checked: false,
      valid: true,
      nationalFormat: formatPhone(phoneDigits),
      e164: `+1${phoneDigits}`,
      lineType: null,
      carrierName: null,
      validationErrors: [],
    };
  }

  const lookupMode = getLookupMode();
  const fields = lookupMode === 'basic' ? '' : 'line_type_intelligence';
  const url = new URL(`https://lookups.twilio.com/v2/PhoneNumbers/${encodeURIComponent(`+1${phoneDigits}`)}`);

  if (fields) {
    url.searchParams.set('Fields', fields);
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${auth}`,
      'User-Agent': 'i-only-buy-teslas/1.0',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Twilio Lookup request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const lineType = data.line_type_intelligence?.type || null;
  const rejected = lineType ? REJECTED_LINE_TYPES.has(lineType) : false;

  return {
    enabled: true,
    checked: true,
    valid: Boolean(data.valid) && !rejected,
    nationalFormat: data.national_format || formatPhone(phoneDigits),
    e164: data.phone_number || `+1${phoneDigits}`,
    countryCode: data.country_code || 'US',
    lineType,
    carrierName: data.line_type_intelligence?.carrier_name || null,
    validationErrors: Array.isArray(data.validation_errors) ? data.validation_errors : [],
    rejected,
    lookupMode,
  };
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const fullName = cleanText(body.fullName, 100);
    const phoneDigits = normalizePhone(body.phone);
    const notes = cleanText(body.notes, 1000);
    const serviceKey = cleanText(body.service, 40);
    const serviceLabel = SERVICE_LABELS[serviceKey] || 'Not sure yet';
    const honeypot = cleanText(body.website, 100);
    const startedAt = Number(body.formStartedAt);
    const elapsed = Number.isFinite(startedAt) ? Date.now() - startedAt : 0;

    if (honeypot) {
      return res.status(400).json({ ok: false, error: 'Spam check failed.' });
    }

    if (!startedAt || elapsed < 1000) {
      return res
        .status(400)
        .json({ ok: false, error: 'Please try again and take a moment to fill out the form.' });
    }

    if (fullName.length < 2) {
      return res.status(400).json({ ok: false, error: 'Please include your full name.' });
    }

    if (phoneDigits.length !== 10) {
      return res.status(400).json({ ok: false, error: 'Please include a valid US mobile number.' });
    }

    if (!serviceKey) {
      return res.status(400).json({ ok: false, error: 'Please choose a service.' });
    }

    let phoneCheck = {
      enabled: false,
      checked: false,
      valid: true,
      nationalFormat: formatPhone(phoneDigits),
      e164: `+1${phoneDigits}`,
      lineType: null,
      carrierName: null,
      validationErrors: [],
      rejected: false,
      lookupMode: 'off',
    };

    try {
      phoneCheck = await lookupPhone(phoneDigits);
    } catch (lookupError) {
      console.error('Twilio lookup error:', lookupError);
    }

    if (!phoneCheck.valid) {
      if (phoneCheck.rejected && phoneCheck.lineType) {
        return res.status(400).json({
          ok: false,
          error: 'Please enter a textable mobile number, not a landline or office line.',
        });
      }

      return res.status(400).json({
        ok: false,
        error: 'Please enter a valid mobile number.',
      });
    }

    const submittedAt = new Date().toISOString();
    const safeNotes = notes || 'None provided.';
    const lookupSummary = phoneCheck.checked
      ? [
          `Lookup mode: ${phoneCheck.lookupMode === 'basic' ? 'Basic Lookup' : 'Line Type Intelligence'}`,
          `Validated phone: ${phoneCheck.nationalFormat}`,
          phoneCheck.e164 ? `E.164: ${phoneCheck.e164}` : null,
          phoneCheck.lineType ? `Line type: ${phoneCheck.lineType}` : null,
          phoneCheck.carrierName ? `Carrier: ${phoneCheck.carrierName}` : null,
        ]
          .filter(Boolean)
          .join('\n')
      : 'Lookup not configured or temporarily unavailable. Local validation only.';

    const plainText = [
      'New I Only Buy Teslas inquiry',
      `Name: ${fullName}`,
      `Phone: ${phoneCheck.nationalFormat}`,
      `Service: ${serviceLabel}`,
      `Submitted: ${submittedAt}`,
      '',
      'Phone check:',
      lookupSummary,
      '',
      'Notes:',
      safeNotes,
    ].join('\n');

    const escapeHtml = (value) =>
      String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const html = `
      <div style="font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h1 style="font-size: 20px; margin-bottom: 16px;">New I Only Buy Teslas inquiry</h1>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phoneCheck.nationalFormat)}</p>
        <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
        <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
        <p><strong>Phone check:</strong><br />${escapeHtml(lookupSummary).replace(/\n/g, '<br />')}</p>
        <p><strong>Notes:</strong><br />${escapeHtml(safeNotes).replace(/\n/g, '<br />')}</p>
      </div>
    `;

    const resendApiKey = process.env.RESEND_API_KEY;
    const destinationEmail = process.env.LEAD_DESTINATION_EMAIL;
    const fromEmail = process.env.FROM_EMAIL;

    if (!resendApiKey || !destinationEmail || !fromEmail) {
      return res.status(202).json({
        ok: true,
        mode: 'demo',
        message:
          'Form submission accepted in demo mode. Add RESEND_API_KEY, LEAD_DESTINATION_EMAIL, and FROM_EMAIL to send real emails.',
      });
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'i-only-buy-teslas/1.0',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [destinationEmail],
        subject: `${serviceLabel} — ${fullName}`,
        text: plainText,
        html,
        reply_to: `${phoneCheck.e164}@sms.invalid`,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error('Resend send failed:', resendError);
      return res.status(502).json({ ok: false, error: 'Email send failed. Please try again.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ ok: false, error: 'Server error. Please try again.' });
  }
};
