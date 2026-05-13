const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const partnersDir = path.join(__dirname, '../public/partners');
const images = ['gea.png', 'moc.png', 'neom.png', 'vision2030.png'];

async function optimize() {
  for (const img of images) {
    const inputPath = path.join(partnersDir, img);
    const webpPath = path.join(partnersDir, img.replace('.png', '.webp'));
    
    console.log(`Converting ${img} to WebP...`);
    
    await sharp(inputPath)
      .resize(400)
      .webp({ quality: 80 })
      .toFile(webpPath);
    
    const stats = fs.statSync(webpPath);
    console.log(`Finished ${img}. WebP size: ${(stats.size / 1024).toFixed(2)} KB`);
  }
}

optimize().catch(err => console.error(err));
