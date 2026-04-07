const SERVICE_LABELS = {
  consult: 'Tesla buying consultation',
  search: 'Find your next Tesla',
  sell: 'Sell your Tesla',
  dealer: 'Dealer inventory sourcing',
  notsure: 'Not sure yet',
};

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

    const submittedAt = new Date().toISOString();
    const safeNotes = notes || 'None provided.';
    const plainText = [
      'New I Only Buy Teslas inquiry',
      `Name: ${fullName}`,
      `Phone: ${formatPhone(phoneDigits)}`,
      `Service: ${serviceLabel}`,
      `Submitted: ${submittedAt}`,
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
        <p><strong>Phone:</strong> ${escapeHtml(formatPhone(phoneDigits))}</p>
        <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
        <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
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
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [destinationEmail],
        subject: `New lead — ${serviceLabel}`,
        text: plainText,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend error:', errorText);
      return res.status(500).json({
        ok: false,
        error: 'The request was received, but the notification could not be delivered. Please try again.',
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Lead delivered successfully.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      ok: false,
      error: 'The form could not send right now. Please try again in a moment.',
    });
  }
};
