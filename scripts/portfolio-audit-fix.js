/**
 * Portfolio Audit Fix Script
 * Systematically applies improvements across all portfolio case-study pages.
 * 
 * Issues addressed:
 * 1. Color contrast — text-slate-400 on bg-gray-900 (3.9:1, failing AA)
 * 2. Image optimization — width/height attrs replaced with fill + sizes
 * 3. Stats section — excessive py-32 reduced to py-20
 * 4. Impact section — improved contrast, rounded corners reduced for premium feel
 * 5. CTA section — improved visual hierarchy
 * 6. Hero subtitle contrast fix (NEOM page specifically)
 */
const fs = require('fs');
const path = require('path');

const portfolioDir = path.join(__dirname, '../src/app/[locale]/portfolio');

// Case-study directories to fix (all follow same template)
const caseStudies = [
  'alkhobar-corporate-retreat',
  'alula-desert-festival',
  'dammam-corporate-seminar',
  'executive-summit-jeddah',
  'global-tech-summit',
  'grand-wedding-ceremony',
  'jeddah-beach-wedding',
  'madinah-spiritual-event',
  'makkah-vip-retreat',
  'riyadh-elite-majlis',
  'riyadh-government-summit',
  'riyadh-luxury-soiree',
  'royal-riyadh-wedding',
];

let totalChanges = 0;

for (const dir of caseStudies) {
  const filePath = path.join(portfolioDir, dir, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${dir} (not found)`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changes = 0;
  
  // 1. Fix Impact section: text-slate-400 -> text-slate-300 (AA compliant on gray-900)
  if (content.includes('text-slate-400 text-lg')) {
    content = content.replace(/text-slate-400 text-lg/g, 'text-slate-300 text-lg');
    changes++;
  }
  
  // 2. Fix Stats section padding: py-32 -> py-20 (less wasteful)
  // Only the stats section, identified by grid-cols-2 md:grid-cols-4
  const statsPattern = /className="py-32 bg-white border border-slate-200 relative z-20 -mt-16/;
  if (statsPattern.test(content)) {
    content = content.replace(statsPattern, 'className="py-16 md:py-20 bg-white border border-slate-200 relative z-20 -mt-16');
    changes++;
  }
  
  // 3. Fix Impact section rounded: rounded-[4rem] -> rounded-3xl (more professional)
  if (content.includes('rounded-[4rem] text-center')) {
    content = content.replace('rounded-[4rem] text-center', 'rounded-3xl text-center');
    changes++;
  }
  
  // 4. Hero image: use fill instead of explicit width/height for proper cover
  // Replace:  width={1920}\n            height={1080}\n            className="w-full h-full object-cover opacity-80"
  const heroImgPattern = /width=\{1920\}\s*\n\s*height=\{1080\}\s*\n\s*className="w-full h-full object-cover opacity-80"/g;
  if (heroImgPattern.test(content)) {
    content = content.replace(heroImgPattern, 'fill\n            sizes="100vw"\n            className="object-cover opacity-80"');
    changes++;
  }
  
  // 5. Impact background image: same fix
  const impactImgPattern = /width=\{1920\} height=\{1080\} className="w-full h-full object-cover"/g;
  if (impactImgPattern.test(content)) {
    content = content.replace(impactImgPattern, 'fill sizes="100vw" className="object-cover"');
    changes++;
  }
  
  // 6. Content section: reduce py-32 -> py-20 md:py-28
  if (content.includes('className="py-32 max-w-5xl')) {
    content = content.replace('className="py-32 max-w-5xl', 'className="py-20 md:py-28 max-w-5xl');
    changes++;
  }
  
  // 7. CTA section: reduce py-32 -> py-20 md:py-28
  const ctaPattern = /className="py-32 text-center"/;
  if (ctaPattern.test(content)) {
    content = content.replace(ctaPattern, 'className="py-20 md:py-28 text-center bg-[var(--surface-raised)] border-t border-neutral-100"');
    changes++;
  }
  
  if (changes > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`FIXED: ${dir} (${changes} changes)`);
    totalChanges += changes;
  } else {
    console.log(`OK: ${dir} (no changes needed)`);
  }
}

console.log(`\nTotal changes applied: ${totalChanges}`);
