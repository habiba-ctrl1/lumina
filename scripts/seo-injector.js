const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/blog-data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Helper to inject a phrase if it's not present
function injectIfMissing(text, phrase) {
  if (text && !text.toLowerCase().includes(phrase.toLowerCase())) {
    return text + ` | ${phrase}`;
  }
  return text;
}

// Simple regex replacements for headers/descriptions to inject terms organically
content = content.replace(/metaTitle:\s*"([^"]+)"/g, (match, p1) => {
  // Try to inject "Event Management Company" or "Event Planner" into meta titles
  if (p1.includes("Wedding")) {
    return `metaTitle: "${p1} | Wedding Planning KSA"`;
  }
  if (p1.includes("Corporate") || p1.includes("Event")) {
    if (!p1.includes("Event Management")) {
      return `metaTitle: "${p1} | Event Management Company Saudi Arabia"`;
    }
  }
  return match;
});

content = content.replace(/metaDescription:\s*"([^"]+)"/g, (match, p1) => {
  if (!p1.includes("event planner") && !p1.includes("event management") && !p1.includes("event organizer")) {
    return `metaDescription: "${p1} Contact our expert event planners and event management company in Saudi Arabia to organize your next event."`;
  }
  return match;
});

content = content.replace(/category:\s*"Corporate",\s*image/g, `category: "Corporate",\n    image`);

// Add specific terms to random paragraphs for natural keyword density
// Replace "corporate events" with "corporate events and conference management" in the first few matches
let replacedConf = false;
content = content.replace(/corporate events/g, (match) => {
  if (!replacedConf) {
    replacedConf = true;
    return "corporate events, exhibition management, and conference management";
  }
  return match;
});

let replacedPlanner = false;
content = content.replace(/event planners/g, (match) => {
  if (!replacedPlanner) {
    replacedPlanner = true;
    return "event planners and event organizers";
  }
  return match;
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully injected SEO keywords!');
