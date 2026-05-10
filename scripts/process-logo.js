const sharp = require('sharp');
const path = require('path');

async function processLogo() {
  const inputPath = path.join(__dirname, '../public/Logo.png');
  const outputPath = path.join(__dirname, '../public/main-logo.webp');

  try {
    // 1. Load image
    // 2. Remove white background (approximate)
    // 3. Convert to webp
    
    await sharp(inputPath)
      .ensureAlpha()
      .trim()
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Calculate distance from white
          const brightness = (r + g + b) / 3;
          if (brightness > 230) {
            // Smoothly transition transparency for pixels close to white
            const alpha = Math.max(0, Math.min(255, (255 - brightness) * 4));
            data[i + 3] = alpha;
          }
        }
        return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
          .webp({ quality: 100, lossless: true })
          .toFile(outputPath);
      });

    console.log('Logo processed: background removed and converted to WebP');
  } catch (err) {
    console.error('Error processing logo:', err);
  }
}

processLogo();
