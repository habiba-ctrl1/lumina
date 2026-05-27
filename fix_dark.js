const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith(".tsx")) results.push(file);
    }
  });
  return results;
}

const baseDir = "c:/Users/786/Documents/WEBSITES/event management/src/app/[locale]";
let filesToProcess = [];

["services", "about", "portfolio", "locations"].forEach(folder => {
  const fullPath = path.join(baseDir, folder);
  if (fs.existsSync(fullPath)) {
    filesToProcess = filesToProcess.concat(walk(fullPath));
  }
});

let updatedCount = 0;

filesToProcess.forEach(file => {
  let content = fs.readFileSync(file, "utf8");
  const originalContent = content;

  content = content.replace(/via-ink-950\/60/g, "via-white/60");
  content = content.replace(/to-ink-950/g, "to-white");
  content = content.replace(/via-ink-[0-9]+\/[0-9]+/g, "via-white/60");
  content = content.replace(/to-ink-[0-9]+/g, "to-white");
  
  content = content.replace(/prose-invert/g, "");
  content = content.replace(/text-ink-950/g, "text-white");
  content = content.replace(/hover:bg-gold-300/g, "hover:bg-[var(--primary-dark)]");

  content = content.replace(/<span className="section-label mb-8 block">/g, "<span className=\"text-[var(--primary)] font-bold uppercase tracking-[0.2em] text-[10px] mb-8 block\">");

  if (content !== originalContent) {
    fs.writeFileSync(file, content, "utf8");
    updatedCount++;
    console.log("Fixed dark artifacts in:", file);
  }
});

console.log("Total artifacts fixed:", updatedCount);
