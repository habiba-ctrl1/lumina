const https = require('https');

const API_KEY = '1ef3ab0f9f2c48618242164a52688cf1';
const SITE_URL = 'https://saudieventmanagement.com';

const pages = [
  "",
  "/about",
  "/blog",
  "/blog/ultimate-guide-luxury-event-planning",
  "/blog/trending-colors-2026-event-palette",
  "/blog/show-stopping-decor-ideas-events",
  "/blog/destination-wedding-planning-guide",
  "/blog/elevating-corporate-events-guide",
  "/blog/art-of-tablescaping-guide",
  "/consultation",
  "/faq",
  "/locations",
  "/locations/alula",
  "/locations/dammam",
  "/locations/jeddah",
  "/locations/riyadh",
  "/partners",
  "/partners/become-one",
  "/portfolio",
  "/portfolio/alula-desert-festival",
  "/portfolio/dammam-corporate-seminar",
  "/portfolio/executive-summit-jeddah",
  "/portfolio/global-tech-summit",
  "/portfolio/madinah-spiritual-event",
  "/portfolio/makkah-vip-retreat",
  "/portfolio/neom-future-summit",
  "/portfolio/riyadh-elite-majlis",
  "/portfolio/riyadh-luxury-soiree",
  "/portfolio/royal-riyadh-wedding",
  "/portfolio-luxury",
  "/privacy",
  "/services",
  "/services/corporate-events",
  "/services/exhibitions",
  "/services/production-venues",
  "/services/seasonal",
  "/services/weddings",
  "/terms",
  "/testimonials",
  "/tracking",
  "/vendor-registration",
  "/vendors"
];

const urlList = pages.map(page => `${SITE_URL}${page}`);

function indexPages() {
  console.log(`Starting indexing for ${urlList.length} pages...`);

  const data = JSON.stringify({
    siteUrl: SITE_URL,
    urlList: urlList
  });

  const options = {
    hostname: 'ssl.bing.com',
    path: `/webmaster/api.svc/json/SubmitUrlbatch?apikey=${API_KEY}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': data.length
    }
  };

  const req = https.request(options, (res) => {
    let body = '';
    console.log('Status Code:', res.statusCode);

    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      console.log('Response Body:', body);
      if (res.statusCode === 200) {
        console.log('Successfully submitted all URLs to Bing Webmaster Tools.');
      } else {
        console.error('Failed to submit URLs. Check the response body for details.');
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error submitting URLs to Bing:', error.message);
  });

  req.write(data);
  req.end();
}

indexPages();
