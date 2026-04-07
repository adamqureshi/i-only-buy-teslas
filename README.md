# I Only Buy Teslas

A simple, mobile-first Tesla concierge microsite designed for Vercel.

## Recommended name

Use **I Only Buy Teslas**.

Why:

- **I Buy Teslas** sounds like you directly buy cars for cash.
- **I Buy Tesla** reads incomplete.
- **I Only Buy Teslas** is the clearest wedge and stays closest to **Only Used Tesla**.

For the on-site positioning, keep the subtitle as:

> Tesla buying & selling concierge

## What changed in this version

- Added the provided **icon** to the header brand lockup
- Added the provided **Only Used Tesla logo** to the footer
- Added the footer line: **An Only Used Tesla venture**
- Switched the site typography to **Montserrat**
- Reworked the homepage copy to talk more directly to the end customer
- Added clear trust signals:
  - 11 years in business
  - Independent
  - No VC
  - No corp
  - No selling private data
- Kept the no-public-phone-number contact flow intact

## Positioning used on the site

The homepage now talks more directly to buyers and sellers:

- You found a Tesla and want a second opinion
- You want help narrowing the right model, trim, year, and budget
- You want to sell your Tesla with a stronger listing

Dealer work is still present, but it is framed as **limited custom work** instead of leading the page.

## Pricing recommendation

Keep pricing defined by **scope**, not open-ended time.

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
  - quote separately

## Contact flow

Your personal phone number does **not** appear in the HTML.

Visitors use a short form:

- full name
- phone number
- service needed
- optional notes

The site posts to `/api/contact`, which emails you the lead through Resend. Then you text them back manually.

## Tech

- plain HTML
- plain CSS
- plain JavaScript
- Google Fonts for Montserrat
- Vercel serverless function for the contact form
- optional Resend email delivery

No framework, no build step, easy to upload to GitHub and deploy to Vercel.

## Files

```text
i-only-buy-teslas/
├── api/
│   └── contact.js
├── assets/
│   ├── adam-qureshi.jpg
│   ├── iobt-icon.png
│   ├── iobt-icon-192.png
│   └── only-used-tesla-logo.png
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

1. Push these files to the **`i-only-buy-teslas`** repo
2. Import the repo into Vercel
3. Add environment variables in Vercel:
   - `RESEND_API_KEY`
   - `LEAD_DESTINATION_EMAIL`
   - `FROM_EMAIL`
4. Deploy

### Example env values

```env
RESEND_API_KEY=re_xxxxx
LEAD_DESTINATION_EMAIL=you@yourdomain.com
FROM_EMAIL=leads@yourdomain.com
```

`FROM_EMAIL` must be from a verified domain in Resend.

## Notes

- The site includes a honeypot field and a simple time-based spam check.
- Your personal number is not included in the page source.
- The contact form is the main conversion path.
- The design is mobile-first and scales up with `em`-based breakpoints and root font-size increases.
