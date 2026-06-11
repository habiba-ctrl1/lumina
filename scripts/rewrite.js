const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/blog-data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const replacements = [
  { regex: /\bluxury event planning\b/gi, replacement: "event management" },
  { regex: /\bluxury events\b/gi, replacement: "corporate events" },
  { regex: /\bluxury event\b/gi, replacement: "corporate event" },
  { regex: /\bluxury wedding\b/gi, replacement: "wedding planning" },
  { regex: /\bluxury weddings\b/gi, replacement: "wedding planning" },
  { regex: /\bluxury lifestyle\b/gi, replacement: "professional lifestyle" },
  { regex: /\bLuxury Event Decor\b/gi, replacement: "Event Decor" },
  { regex: /\bLuxury\b/g, replacement: "Exceptional" },
  { regex: /\bluxury\b/g, replacement: "exceptional" },
  { regex: /\bElite\b/g, replacement: "Top-tier" },
  { regex: /\belite\b/g, replacement: "top-tier" },
  { regex: /\bPremium\b/g, replacement: "High-quality" },
  { regex: /\bpremium\b/g, replacement: "high-quality" },
  { regex: /\bExclusive\b/g, replacement: "Bespoke" },
  { regex: /\bexclusive\b/g, replacement: "bespoke" },
];

for (const { regex, replacement } of replacements) {
  content = content.replace(regex, replacement);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully updated blog posts!');
