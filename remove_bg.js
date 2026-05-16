const { Jimp } = require('jimp');

async function processImage() {
  console.log("Loading image...");
  const image = await Jimp.read('public/Logo.png');
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // Estimate alpha from the brightest channel (since background is black)
    // Gold is mostly red/green.
    const maxVal = Math.max(r, g, b);
    let alpha = maxVal;
    
    if (alpha === 0) {
      this.bitmap.data[idx + 3] = 0; // Pure black = transparent
    } else {
      // Un-premultiply alpha to remove black halos
      const factor = 255 / alpha;
      this.bitmap.data[idx + 0] = Math.min(255, r * factor);
      this.bitmap.data[idx + 1] = Math.min(255, g * factor);
      this.bitmap.data[idx + 2] = Math.min(255, b * factor);
      
      // We can use a curve on the alpha to make it look right. 
      // Often, a slightly higher alpha looks better for anti-aliasing.
      this.bitmap.data[idx + 3] = alpha;
    }
  });

  console.log("Saving image...");
  await image.write('public/sem-logo-transparent.png');
  console.log("Done!");
}

processImage().catch(console.error);
