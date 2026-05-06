function cleanText(input = '', maxLength = 1000) {
  return String(input)
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function normalizePhone(input = '') {
  const digits = String(input).replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1);
  return digits;
}

function formatPhone(digits = '') {
  const clean = normalizePhone(digits);
  if (clean.length !== 10) return clean;
  return `(${clean.slice(0, 3)}) ${clean.slice(3, 6)}-${clean.slice(6)}`;
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const INTENT_LABELS = {
  buy_now: 'Buy now / ready to move',
  make_offer: 'Make an offer',
  ask_question: 'Ask a question about listing',
  request_gallery: 'Request full photo gallery',
  list_plaid: 'Has a Plaid to list',
};

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
    const email = cleanText(body.email, 160);
    const leadIntent = cleanText(body.leadIntent, 40);
    const leadIntentLabel = INTENT_LABELS[leadIntent] || 'Plaid listing inquiry';
    const listing = cleanText(body.listing, 180) || 'Not specified';
    const offerAmount = cleanText(body.offerAmount, 80) || 'Not provided';
    const notes = cleanText(body.notes, 1200) || 'None provided.';
    const honeypot = cleanText(body.website, 100);
    const startedAt = Number(body.formStartedAt);
    const elapsed = Number.isFinite(startedAt) ? Date.now() - startedAt : 0;

    if (honeypot) return res.status(400).json({ ok: false, error: 'Spam check failed.' });
    if (!startedAt || elapsed < 900) {
      return res.status(400).json({ ok: false, error: 'Please try again and take a moment to fill out the form.' });
    }
    if (fullName.length < 2) return res.status(400).json({ ok: false, error: 'Please include your full name.' });
    if (phoneDigits.length !== 10) return res.status(400).json({ ok: false, error: 'Please include a valid US mobile number.' });
    if (!leadIntent) return res.status(400).json({ ok: false, error: 'Please choose what you want to do.' });

    const submittedAt = new Date().toISOString();
    const plainText = [
      'New Plaid inventory lead',
      `Name: ${fullName}`,
      `Phone: ${formatPhone(phoneDigits)}`,
      email ? `Email: ${email}` : 'Email: Not provided',
      `Intent: ${leadIntentLabel}`,
      `Listing: ${listing}`,
      `Offer amount: ${offerAmount}`,
      `Submitted: ${submittedAt}`,
      '',
      'Notes:',
      notes,
    ].join('\n');

    const html = `
      <h1>New Plaid inventory lead</h1>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(formatPhone(phoneDigits))}</p>
      <p><strong>Email:</strong> ${escapeHtml(email || 'Not provided')}</p>
      <p><strong>Intent:</strong> ${escapeHtml(leadIntentLabel)}</p>
      <p><strong>Listing:</strong> ${escapeHtml(listing)}</p>
      <p><strong>Offer amount:</strong> ${escapeHtml(offerAmount)}</p>
      <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
      <h2>Notes</h2>
      <p>${escapeHtml(notes).replace(/\n/g, '<br>')}</p>
    `;

    const resendApiKey = process.env.RESEND_API_KEY;
    const destinationEmail = process.env.LEAD_DESTINATION_EMAIL;
    const fromEmail = process.env.FROM_EMAIL;

    if (!resendApiKey || !destinationEmail || !fromEmail) {
      return res.status(202).json({
        ok: true,
        mode: 'demo',
        message: 'Form submission accepted in demo mode. Add RESEND_API_KEY, LEAD_DESTINATION_EMAIL, and FROM_EMAIL to send real emails.',
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
        subject: `${leadIntentLabel} — ${fullName}`,
        text: plainText,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error('Resend send failed:', resendError);
      return res.status(502).json({ ok: false, error: 'Email send failed. Please try again.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Plaid lead API error:', error);
    return res.status(500).json({ ok: false, error: 'Server error. Please try again.' });
  }
};
