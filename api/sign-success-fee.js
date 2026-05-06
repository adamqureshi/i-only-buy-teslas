const AGREEMENT_ID = 'MZ-ADAM-SF-2026-001';
const AGREEMENT_VERSION = '2026-05-06';

const AGREEMENT_TERMS = `
SUCCESS FEE AGREEMENT

Deal: 2026 Tesla Model S Signature Edition buyer / co-owner introduction and coordination.
Date: May ___, 2026.

Parties:
Order Holder: MZ, current Tesla order holder / primary invitee.
Coordinator: Qureshi Media LLC and Adam Qureshi, d/b/a I Only Buy Teslas. Qureshi Media LLC, Adam Qureshi, and I Only Buy Teslas are referred to as Adam or QML.
Website: https://ionlybuyteslas.com

1. Deal covered by this agreement
MZ has a confirmed Tesla Signature vehicle order and is working with a buyer / co-owner candidate introduced or coordinated by Adam.
Vehicle: 2026 Tesla Model S Signature Edition.
Reservation / Order Number: RN127783085.
Buyer / co-owner candidate: MJ.
Expected premium to MZ: $40,000.
Adam / QML success fee: 40% of the gross premium actually received by MZ.
Expected Adam / QML fee if premium is $40,000: $16,000.
This agreement also applies if the deal is modified, delayed, renamed, handled through a different Tesla step, or completed with MJ or any related buyer introduced or coordinated by Adam.

2. Adam's role
Adam introduced or helped coordinate the buyer opportunity for MZ. Adam's role may include introducing MZ to MJ or another buyer, helping both sides understand timing and process, helping organize communication, and helping keep the deal moving.
Adam is not Tesla. Adam does not control Tesla. Adam does not guarantee Tesla will approve, process, deliver, title, register, or transfer anything. Adam is not acting as an attorney, DMV/title agent, tax advisor, escrow agent, or Tesla representative.

3. Success fee owed to Adam
MZ agrees to pay Adam 40% of the gross premium actually received by MZ in connection with this deal.
The current expected premium is $40,000.
$40,000 x 40% = $16,000.
If MZ receives $20,000, Adam receives $8,000.
If MZ receives $40,000 total, Adam receives $16,000 total.
For any other premium amount, Adam receives 40% of what MZ actually receives.
The Tesla vehicle price, taxes, title fees, registration fees, delivery fees, DMV/OMV fees, insurance, and official government or Tesla charges are not part of the premium unless they are paid to MZ as extra seller consideration.

4. When Adam gets paid
Adam gets paid after MZ gets paid.
MZ must pay Adam within 24 hours after MZ receives any premium payment or seller consideration connected to this deal.
If MZ receives the full $40,000 at once, MZ must pay Adam $16,000 within 24 hours.
If MJ pays MZ in two parts, Adam is paid in two parts: $8,000 after the first $20,000 received by MZ, and $8,000 after the second $20,000 received by MZ.

5. Payment method
MZ must pay Adam by wire transfer to Qureshi Media LLC. Adam will provide wire instructions privately. MZ is responsible for any sending bank fees so that Adam receives the full amount owed. No deduction, holdback, offset, expense, travel cost, order fee, tax issue, registration issue, title issue, personal cost, or delay reduces Adam's 40% fee unless Adam agrees in writing.

6. No fee if MZ receives nothing
If MZ receives no premium or seller consideration, then no success fee is due at that time. If MZ receives premium money and later must refund that money because Tesla refuses the transaction, cancels the order, blocks delivery, or does not allow the parties to proceed, then if MZ actually refunds money to MJ, Adam will return the same 40% portion of Adam's fee tied to the refunded amount. Adam only has to return money Adam actually received. MZ must show proof of the refund before Adam is required to return any portion.

7. No backdoor deal / no circumvention
MZ agrees not to go around Adam to avoid paying the success fee. The 40% fee is owed if MZ receives money, value, premium, seller fee, spot fee, consideration, reimbursement marked as premium, or any similar payment from MJ, anyone acting for MJ, any related party of MJ, any replacement buyer introduced or coordinated by Adam, or any buyer found through Adam's work on this deal.
This applies whether the money is paid before delivery, at delivery, after delivery, through wire, cash, check, Zelle, ACH, Venmo, business account, personal account, or any other method. This no-circumvention section lasts for 12 months from the date of this agreement.

8. MZ's separate deal with MJ
MZ's deal with MJ is separate from this agreement. MZ is responsible for his own agreement with MJ, including the $40,000 premium, any refund terms, who pays Tesla, delivery-day logistics, title and registration handling, taxes, DMV/OMV fees, state fees, insurance, documents, and what happens if Tesla says no. Adam is not responsible for any dispute between MZ and MJ.

9. Tesla and delivery risk
MZ understands and agrees that Tesla may say no, delay the process, cancel the order, change the paperwork, refuse delivery, require different registration information, or require both parties to take steps Adam cannot control. Tesla, not Adam, controls the Tesla order, Tesla app process, delivery timing, registration requirements, final payment instructions, title and delivery paperwork, whether any co-owner or co-registrant can be added, and whether the vehicle can be delivered under the structure MZ and MJ want. Adam does not guarantee any Tesla result.

10. No false statements
MZ agrees not to ask Adam to lie, hide facts, make false statements, or misrepresent anything to Tesla, any DMV/OMV, any bank, any insurer, MJ, or any other party. MZ is responsible for confirming that anything he signs, submits, or tells Tesla or any government agency is accurate.

11. Release and indemnity
MZ releases Adam, Qureshi Media LLC, I Only Buy Teslas, and their owners, members, contractors, and agents from any claim, loss, damage, fee, title problem, registration problem, tax issue, Tesla issue, delivery issue, payment issue, cancellation, delay, or dispute connected to the MZ / MJ transaction, except for Adam's intentional wrongdoing.
MZ agrees to protect and indemnify Adam and Qureshi Media LLC from claims caused by MZ's breach of this agreement, MZ failing to pay Adam, MZ's dispute with MJ, MZ's statements or documents to Tesla, MZ's title, registration, tax, insurance, or delivery issue, MZ trying to avoid Adam's fee, or any claim by MJ or a third party arising from MZ's conduct.

12. Confidentiality
MZ agrees to keep the fee split, buyer identity, seller identity, payment timing, and deal terms private unless disclosure is required by law, Tesla, a bank, a tax advisor, an attorney, or a government agency. MZ may not post Adam's fee, the private deal structure, or private messages publicly without Adam's written permission.

13. Attorney review
MZ understands this is a business agreement and has the right to have an attorney review it before signing. MZ is not relying on Adam for legal, tax, title, registration, insurance, or DMV/OMV advice.

14. Governing law
This agreement is governed by the law of the State of New York, unless both parties agree in writing to use another state.

15. Entire agreement
This is the full agreement between MZ and Adam / QML for Adam's success fee on this deal. Any change must be in writing and signed or clearly confirmed by both sides in writing, including by email or text message. Electronic signatures, checkbox confirmations, typed names, scanned signatures, DocuSign, Notion confirmation, email confirmation, and text confirmation may be used as proof of agreement.
`;

function cleanText(input = '', maxLength = 1000) {
  return String(input)
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function isAllowedRole(role) {
  return role === 'MZ' || role === 'Adam Qureshi / Qureshi Media LLC';
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const honeypot = cleanText(body.website, 200);
    const signerRole = cleanText(body.signerRole, 100);
    const typedName = cleanText(body.typedName, 120);
    const phone = cleanText(body.phone, 40);
    const email = cleanText(body.email, 160);
    const agree = body.agree === 'on' || body.agree === true || body.agree === 'true';
    const agreementId = cleanText(body.agreementId, 80);
    const agreementVersion = cleanText(body.agreementVersion, 40);
    const pageUrl = cleanText(body.pageUrl, 500);

    if (honeypot) {
      return res.status(400).json({ ok: false, error: 'Spam check failed.' });
    }

    if (agreementId !== AGREEMENT_ID || agreementVersion !== AGREEMENT_VERSION) {
      return res.status(400).json({ ok: false, error: 'Agreement version mismatch. Refresh the page and try again.' });
    }

    if (!isAllowedRole(signerRole)) {
      return res.status(400).json({ ok: false, error: 'Choose a signer role.' });
    }

    if (typedName.length < 2) {
      return res.status(400).json({ ok: false, error: 'Type your legal name.' });
    }

    if (!agree) {
      return res.status(400).json({ ok: false, error: 'You must check the agreement box before submitting.' });
    }

    const submittedAt = new Date().toISOString();
    const ipAddress = getIp(req);
    const userAgent = cleanText(req.headers['user-agent'] || 'unknown', 500);

    const plainText = [
      'MZ / Adam Success Fee Agreement - Electronic Acknowledgement',
      '',
      `Agreement ID: ${AGREEMENT_ID}`,
      `Agreement Version: ${AGREEMENT_VERSION}`,
      `Submitted At: ${submittedAt}`,
      `Page URL: ${pageUrl || 'not provided'}`,
      '',
      `Signer Role: ${signerRole}`,
      `Typed Name: ${typedName}`,
      `Phone: ${phone || 'not provided'}`,
      `Email: ${email || 'not provided'}`,
      `IP Address: ${ipAddress}`,
      `User Agent: ${userAgent}`,
      '',
      'Signer Statement:',
      'The signer checked the acknowledgement box confirming they read the Success Fee Agreement, consent to use electronic records and electronic signatures, and intend the selected signer role, typed name, checked box, and submitted form to act as their signature.',
      '',
      'Agreement Terms Accepted:',
      AGREEMENT_TERMS,
    ].join('\n');

    const html = `
      <div style="font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h1 style="font-size: 22px; margin: 0 0 16px;">MZ / Adam Success Fee Agreement - Electronic Acknowledgement</h1>
        <p><strong>Agreement ID:</strong> ${escapeHtml(AGREEMENT_ID)}</p>
        <p><strong>Agreement Version:</strong> ${escapeHtml(AGREEMENT_VERSION)}</p>
        <p><strong>Submitted At:</strong> ${escapeHtml(submittedAt)}</p>
        <p><strong>Page URL:</strong> ${escapeHtml(pageUrl || 'not provided')}</p>
        <hr />
        <p><strong>Signer Role:</strong> ${escapeHtml(signerRole)}</p>
        <p><strong>Typed Name:</strong> ${escapeHtml(typedName)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || 'not provided')}</p>
        <p><strong>Email:</strong> ${escapeHtml(email || 'not provided')}</p>
        <p><strong>IP Address:</strong> ${escapeHtml(ipAddress)}</p>
        <p><strong>User Agent:</strong> ${escapeHtml(userAgent)}</p>
        <hr />
        <p><strong>Signer Statement:</strong><br />The signer checked the acknowledgement box confirming they read the Success Fee Agreement, consent to use electronic records and electronic signatures, and intend the selected signer role, typed name, checked box, and submitted form to act as their signature.</p>
        <hr />
        <h2 style="font-size: 18px;">Agreement Terms Accepted</h2>
        <pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; background: #f3f4f6; padding: 16px; border-radius: 12px;">${escapeHtml(AGREEMENT_TERMS)}</pre>
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
          'Acknowledgement accepted in demo mode. Add RESEND_API_KEY, LEAD_DESTINATION_EMAIL, and FROM_EMAIL in Vercel to send real email records.',
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
        subject: `Signed acknowledgement - ${AGREEMENT_ID} - ${signerRole} - ${typedName}`,
        text: plainText,
        html,
        reply_to: email || undefined,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error('Resend send failed:', resendError);
      return res.status(502).json({ ok: false, error: 'Email send failed. Please try again.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Signature API error:', error);
    return res.status(500).json({ ok: false, error: 'Server error. Please try again.' });
  }
};
