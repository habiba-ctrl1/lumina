const fs = require('fs');
const path = require('path');
const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Replace section padding
  content = content.replace(/(<section[^>]*className="[^"]*)py-\d+(?=\s|")/g, '$1py-24');
  content = content.replace(/(<section[^>]*className="[^"]*)section-padding(?=\s|")/g, '$1py-24');
  
  // 2. Replace container classes
  content = content.replace(/max-w-7xl mx-auto px-\d+(?:\s+sm:px-\d+)?(?:\s+lg:px-\d+)?/g, 'max-w-7xl mx-auto px-6');
  content = content.replace(/max-w-6xl mx-auto px-\d+(?:\s+sm:px-\d+)?(?:\s+lg:px-\d+)?/g, 'max-w-7xl mx-auto px-6');
  
  // 3. Replace gaps in grids
  content = content.replace(/(className="[^"]*\bgrid\b[^"]*)\bgap-\d+\b/g, '$1gap-12');
  
  // 4. Update space-y in text blocks (paragraphs or divs with space-y)
  // Look for space-y-4 or space-y-6 and change to space-y-8
  content = content.replace(/\bspace-y-\d+\b/g, 'space-y-8');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + f);
  }
});
