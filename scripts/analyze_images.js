const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, '../src/app'),
  path.join(__dirname, '../src/components'),
  path.join(__dirname, '../src/lib')
];

const imageRegex = /["'](\/[a-zA-Z0-9_-]+\.(?:webp|png|jpg|jpeg|svg|avif|mp4))["']/g;
const imageRegex2 = /["'](https?:\/\/[^\s"'<>]+\.(?:webp|png|jpg|jpeg|svg|avif))["']/g;
const imageRegex3 = /url\(['"]?([^'")]+\.(?:webp|png|jpg|jpeg|svg|avif))['"]?\)/g;

const imageMap = {};

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const matches = [...content.matchAll(imageRegex), ...content.matchAll(imageRegex2), ...content.matchAll(imageRegex3)];
      
      const uniqueMatches = [...new Set(matches.map(m => m[1]))];
      
      for (const img of uniqueMatches) {
        if (!imageMap[img]) {
          imageMap[img] = [];
        }
        imageMap[img].push(path.relative(path.join(__dirname, '..'), fullPath));
      }
    }
  }
}

targetDirs.forEach(walk);

let output = '';
for (const [img, files] of Object.entries(imageMap)) {
  if (files.length > 1) {
    output += `Image: ${img}\n`;
    files.forEach(f => {
      output += `  - ${f}\n`;
    });
    output += '\n';
  }
}

if (!output) {
  console.log("No repeated images found.");
} else {
  console.log(output);
}
