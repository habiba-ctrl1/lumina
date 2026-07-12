const { chromium } = require('puppeteer');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/786/Documents/WEBSITES/event management/public/company-profile.html');
  await page.pdf({
    path: 'C:/Users/786/Documents/WEBSITES/event management/public/company-profile.pdf',
    format: 'A4',
    margin: { top: '10px', right: '20px', bottom: '10px', left: '20px' }
  });
  console.log('PDF generated successfully at: public/company-profile.pdf');
})();