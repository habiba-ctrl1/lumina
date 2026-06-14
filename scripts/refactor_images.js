const fs = require('fs');
const path = require('path');

const replacements = [
  // 1. Static Pages
  {
    file: 'src/app/[locale]/about/page.tsx',
    find: '"/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/about/page.tsx',
    find: '"/riyadh_summit_people.webp"',
    replace: '"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/about/page.tsx',
    find: '"/gallery_2.webp"',
    replace: '"https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/contact/page.tsx',
    find: '"/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/contact/page.tsx',
    find: '"https://saudieventmanagement.com/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/glossary/page.tsx',
    find: '"/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/partners/page.tsx',
    find: '"/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/testimonials/page.tsx',
    find: '"/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=2000"'
  },
  
  // 2. Portfolio Files
  {
    file: 'src/app/[locale]/portfolio/dammam-corporate-seminar/page.tsx',
    find: '"/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/portfolio/executive-summit-jeddah/page.tsx',
    find: '"/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/portfolio/global-tech-summit/page.tsx',
    find: '"/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/portfolio/neom-future-summit/page.tsx',
    find: '"/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/portfolio/page.tsx',
    find: '"/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/portfolio/riyadh-elite-majlis/page.tsx',
    find: '"/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1561501878-aabd62634533?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/portfolio/riyadh-luxury-soiree/page.tsx',
    find: '"/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000"'
  },

  // Services Pages using hero_bg
  {
    file: 'src/app/[locale]/services/destination-events/layout.tsx',
    find: '"/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/services/destination-events/page.tsx',
    find: '"/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/services/page.tsx',
    find: '"/hero_bg.webp"',
    replace: '"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2000"'
  },

  // 3. Riyadh Offenders
  {
    file: 'src/app/[locale]/portfolio/corporate-events/page.tsx',
    find: '"/riyadh_summit_people.webp"',
    replace: '"https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/portfolio/riyadh-government-summit/page.tsx',
    find: '"/riyadh_summit_people.webp"',
    replace: '"https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/services/conferences/page.tsx',
    find: '"/riyadh_summit_people.webp"',
    replace: '"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/services/event-production/page.tsx',
    find: '"/riyadh_summit_people.webp"',
    replace: '"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000"'
  },
  
  // 4. AlKhobar Offenders
  {
    file: 'src/app/[locale]/locations/dammam/page.tsx',
    find: '"/alkhobar_corporate_people.webp"',
    replace: '"https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/locations/page.tsx',
    find: '"/alkhobar_corporate_people.webp"',
    replace: '"https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/portfolio/alkhobar-corporate-retreat/page.tsx',
    find: '"/alkhobar_corporate_people.webp"',
    replace: '"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/services/corporate-events/page.tsx',
    find: '"/alkhobar_corporate_people.webp"',
    replace: '"https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=2000"'
  },
  {
    file: 'src/app/[locale]/vendors/page.tsx',
    find: '"/alkhobar_corporate_people.webp"',
    replace: '"https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000"'
  }
];

let changed = 0;
for (const req of replacements) {
  const fullPath = path.join(__dirname, '..', req.file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes(req.find)) {
      content = content.replace(new RegExp(req.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), req.replace);
      fs.writeFileSync(fullPath, content);
      changed++;
      console.log(`Updated ${req.file}`);
    }
  }
}
console.log(`Applied ${changed} static string replacements.`);
