const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
    try {
        console.log('Launching browser...');
        const executablePaths = [
            'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
            'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        ];
        
        let browser;
        for (const exePath of executablePaths) {
            try {
                browser = await puppeteer.launch({
                    executablePath: exePath,
                    headless: 'new'
                });
                console.log(`Successfully launched: ${exePath}`);
                break;
            } catch (err) {
                console.log(`Failed to launch ${exePath}`);
            }
        }
        
        if (!browser) {
            throw new Error('No suitable browser found');
        }

        const page = await browser.newPage();
        
        const filePath = 'file:///' + path.join(__dirname, 'company_profile.html').replace(/\\/g, '/');
        console.log('Loading page:', filePath);
        
        await page.goto(filePath, { waitUntil: 'networkidle0' });
        
        console.log('Generating PDF...');
        await page.pdf({
            path: 'Saudi_Event_Management_Company_Profile.pdf',
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0',
                right: '0',
                bottom: '0',
                left: '0'
            }
        });
        
        await browser.close();
        console.log('PDF generated successfully: Saudi_Event_Management_Company_Profile.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
})();
