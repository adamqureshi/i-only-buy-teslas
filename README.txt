PLAIDS FOR SALE PAGE — UPLOAD NOTES

Upload the contents of this folder to the root of your GitHub repo.

Add these paths:

/plaids-for-sale/index.html
/plaids-for-sale/plaids.css
/plaids-for-sale/plaids.js
/plaids-for-sale/gray-2026-model-s-plaid/index.html
/assets/plaids/gray-2026-model-s-plaid/rear-angle-1.jpg
/assets/plaids/gray-2026-model-s-plaid/rear-angle-2.jpg
/assets/plaids/gray-2026-model-s-plaid/software-screen.webp
/api/plaid-lead.js

After Vercel deploys, URLs:

https://ionlybuyteslas.com/plaids-for-sale/
https://ionlybuyteslas.com/plaids-for-sale/gray-2026-model-s-plaid/

Dropbox gallery:

On the listing page, find this line:
<a class="button button-secondary" href="#" target="_blank" rel="noopener">View full photo gallery</a>

Replace # with your Dropbox folder/share link.

For best speed, keep 3-6 important photos in /assets/plaids/ for the website preview, then use Dropbox only for the full gallery button.

Email lead form:

The form posts to /api/plaid-lead.js and uses your same Vercel email environment variables:
RESEND_API_KEY
LEAD_DESTINATION_EMAIL
FROM_EMAIL

If those are already set, the new Plaid lead form should send email.

Manual listing edits:

For a new listing:
1. Duplicate /plaids-for-sale/gray-2026-model-s-plaid/
2. Rename the folder slug.
3. Replace the images in /assets/plaids/new-slug/
4. Edit title, price, miles, details, and gallery link.
5. Add a matching card to /plaids-for-sale/index.html
