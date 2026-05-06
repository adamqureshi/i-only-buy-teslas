FIX: restore homepage and add agreement as a separate page

What happened:
- The agreement index.html was uploaded into the repo root.
- On Vercel/static hosting, the root index.html controls https://ionlybuyteslas.com/
- That is why the whole site became the agreement page.

What this bundle does:
1. Restores the homepage files at repo root:
   /index.html
   /script.js

2. Adds the private agreement page at:
   /mz-adam-success-fee/index.html
   /mz-adam-success-fee/style.css
   /mz-adam-success-fee/script.js

3. Adds the signing email endpoint at:
   /api/sign-success-fee.js

Upload instructions:
1. Unzip this file.
2. Open the folder named fix-homepage-add-agreement-page.
3. Upload the CONTENTS of that folder to the root of your GitHub repo.
   Upload these exact items:
   - index.html
   - script.js
   - mz-adam-success-fee folder
   - api folder
   - README_FIX.txt is optional
4. Commit to main.
5. Wait for Vercel to deploy.

After deploy:
Homepage:
https://ionlybuyteslas.com/

Private agreement page:
https://ionlybuyteslas.com/mz-adam-success-fee/

Important:
- Do not upload mz-adam-success-fee/index.html as root index.html.
- The agreement page must stay inside the /mz-adam-success-fee/ folder.
- If GitHub asks about replacing index.html and script.js at root, say yes. That is the fix.

Optional cleanup:
- If you accidentally created a root file called style.css, you can leave it. Your homepage uses styles.css, not style.css.
- Do not delete styles.css.
