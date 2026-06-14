const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/blog-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The new mapping of unique, contextually relevant images for each blog slug
const imageMapping = {
  "ultimate-guide-exceptional-event-planning": "/blog_event_planning.webp",
  "trending-colors-2026-event-palette": "/blog_trending_colors.webp",
  "destination-wedding-planning-guide": "/blog_destination_wedding.webp",
  "art-of-tablescaping-guide": "/luxury_wedding_table_setting.webp",
  "exceptional-wedding-cost-saudi-arabia-guide": "/gallery_wedding_reception.webp",
  "state-of-mice-industry-saudi-arabia-2026": "/riyadh_summit_people.webp",
  "vision-2030-redefining-saudi-event-landscape": "/hero_bg.webp",
  "destination-weddings-alula-red-sea": "/jeddah_beach_wedding_setup.webp",
  "elevating-corporate-events-riyadh-jeddah": "/alkhobar_corporate_people.webp",
  "advanced-semantic-seo-event-management-ksa": "/corporate.webp",
  "alula-desert-festivals-cultural-activations": "/alula_gala_people.webp",
  "crafting-unforgettable-royal-weddings-saudi-arabia": "/wedding_hall_grand_entrance.webp",
  "corporate-event-excellence-riyadh-jeddah": "/blog_corporate_events.webp",
  "future-event-production-saudi-arabia-technology-sustainability": "/gallery_vip_party.webp",
  "2026-exceptional-event-decor-trends-saudi-arabia": "/blog_decor_ideas.webp",
  "weaving-exceptional-lifestyle-saudi-arabia-top-tier-events": "/riyadh_luxury_reception_people.webp",
  "best-corporate-event-venues-riyadh-2026": "/gallery_corporate_gala.webp",
  "best-wedding-venues-jeddah-2026": "/gallery_destination_wedding.webp",
  "ramadan-event-planning-guide-saudi-arabia": "/majlis_gathering_people.webp",
  "national-day-event-ideas-saudi-arabia-corporates": "/private_party.webp",
  "gea-event-permit-guide-saudi-arabia": "/gallery_1.webp",
  "mice-tourism-saudi-arabia-complete-guide-2026": "/gallery_2.webp",
  "alula-events-guide-maraya-hegra-desert": "/gallery_3.webp",
  "event-production-cost-guide-saudi-arabia-2026": "/gallery_charity_gala.webp",
  "vip-executive-retreats-neom-2026": "/neom_summit_people.webp",
  "diriyah-gate-event-venues-corporate": "/wedding.webp",
  "plan-mega-exhibition-riyadh-logistics": "/luxury_wedding_couple_guests.webp",
  "eco-friendly-event-management-saudi-arabia": "/gallery_garden_party.webp",
  "entertainment-activations-jeddah-season-corporate": "/jeddah_luxury_people.webp"
};

let replacements = 0;

for (const [slug, imagePath] of Object.entries(imageMapping)) {
  // Regex to match the object with the specific slug and replace its image field
  const regex = new RegExp(`(slug:\\s*"${slug}"[\\s\\S]*?image:\\s*)"([^"]+)"`);
  if (regex.test(content)) {
    content = content.replace(regex, `$1"${imagePath}"`);
    replacements++;
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully replaced ${replacements} images in blog-data.ts`);
