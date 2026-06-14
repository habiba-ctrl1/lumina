const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, 'public');
const blogDataPath = path.join(__dirname, 'src', 'lib', 'blog-data.ts');

// Convert images
fs.readdir(publicDir, (err, files) => {
  if (err) throw err;
  
  const promises = files.map(file => {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
      const ext = path.extname(file);
      const name = path.basename(file, ext);
      const inputPath = path.join(publicDir, file);
      const outputPath = path.join(publicDir, `${name}.webp`);
      
      return sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath)
        .then(() => {
          console.log(`Converted ${file} to ${name}.webp`);
          fs.unlinkSync(inputPath);
        })
        .catch(err => console.error(`Error converting ${file}:`, err));
    }
    return Promise.resolve();
  });

  Promise.all(promises).then(() => {
    console.log("All conversions done.");
    
    // Update blog-data.ts
    let blogData = fs.readFileSync(blogDataPath, 'utf8');
    blogData = blogData.replace(/\.png"/g, '.webp"');
    blogData = blogData.replace(/\.jpg"/g, '.webp"');
    fs.writeFileSync(blogDataPath, blogData);
    console.log("Updated blog-data.ts");
  });
});
