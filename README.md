# I Only Buy Teslas

A simple, mobile-first Tesla concierge microsite designed for Vercel.

## Recommended name

Use **I Only Buy Teslas**.

Why:

- **I Buy Teslas** sounds like you directly purchase cars for cash.
- **I Buy Tesla** sounds incomplete.
- **I Only Buy Teslas** is the clearest wedge and stays close to your existing **Only Used Tesla** brand.

For the on-site positioning, keep the subtitle as:

> Tesla buying & selling concierge

That makes it clear you help buyers and sellers, not just one side.

## Pricing recommendation

Keep the pricing defined by **scope**, not open-ended time.

- **Tesla buying consultation — $750**
  - 45-minute call
  - review of one vehicle or shortlist
  - written next steps
  - 7 days of follow-up text questions

- **Find your next Tesla — $1,000 starting**
  - kickoff call
  - up to 14 days of sourcing
  - review of up to 10 listings
  - shortlist and recommendation

- **Sell your Tesla — $1,000 starting**
  - pricing strategy
  - listing/ad copy
  - launch checklist
  - 14 days of seller support

- **Dealer sourcing**
  - quote this separately or keep it custom

This protects your time and makes the offer easier to understand.

## How the contact flow works

Your personal phone number does **not** appear in the HTML.

Visitors use a short form:

- full name
- phone number
- service needed
- optional notes

The site posts to `/api/contact`, which emails you the lead through Resend. Then you text them back manually.

## Why this is better than putting your number on the page

- less bot scraping
- cleaner mobile-first flow
- keeps the first contact organized
- your personal number stays private

## Tech

- plain HTML
- plain CSS
- plain JavaScript
- Vercel serverless function for the contact form
- optional Resend email delivery

No framework, no build step, easy to upload to GitHub and deploy to Vercel.

## Files

```text
i-only-buy-teslas/
├── api/
│   └── contact.js
├── assets/
│   └── adam-qureshi.jpg
├── .env.example
├── .gitignore
├── favicon.svg
├── index.html
├── package.json
├── README.md
├── robots.txt
├── script.js
├── styles.css
└── vercel.json
```

## Local preview

For a quick static preview:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

For the contact form endpoint locally, use Vercel CLI:

```bash
npx vercel dev
```

## Deploy to Vercel

1. Create a new GitHub repo named **`i-only-buy-teslas`**
2. Upload these files
3. Import the repo into Vercel
4. Add environment variables in Vercel:
   - `RESEND_API_KEY`
   - `LEAD_DESTINATION_EMAIL`
   - `FROM_EMAIL`
5. Deploy

### Example env values

```env
RESEND_API_KEY=re_xxxxx
LEAD_DESTINATION_EMAIL=you@yourdomain.com
FROM_EMAIL=leads@yourdomain.com
```

`FROM_EMAIL` must be from a verified domain in Resend.

## Optional upgrade for true text-first intake

If you want people to **text without exposing your personal number**, the best upgrade is:

- buy a dedicated **Twilio** number
- use that number for inbound texting
- keep your real mobile number private
- optionally forward leads or notifications to your personal phone

That gives you a real business texting layer without putting your personal mobile on the public site.

## Copy notes

The homepage intentionally does **not** say you directly buy cars for cash.
It frames the business as:

- Tesla buying consultation
- Tesla concierge / sourcing
- Tesla selling support
- dealer inventory sourcing

That keeps the brand sharp while making the offer accurate.

## Notes

- The site includes a honeypot field and a simple time-based spam check.
- Your personal number is not included in the page source.
- The contact form is the main conversion path.
- The design is mobile-first and scales up with `em`-based breakpoints and root font-size increases.

## Next changes I would make after launch

1. Add testimonials
2. Add a dedicated dealer page if that business grows
3. Add a separate “Sell Your Tesla” landing page
4. Replace the portrait later with a more intentional brand photo if needed
