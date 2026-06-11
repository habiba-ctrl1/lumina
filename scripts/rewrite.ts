import fs from 'fs';
import path from 'path';
import { blogPosts, blogCategories } from '../src/lib/blog-data';

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

function applyReplacements(text: any) {
  if (!text) return text;
  let newText = text;
  for (const { regex, replacement } of replacements) {
    newText = newText.replace(regex, replacement);
  }
  return newText;
}

function processPost(post: any) {
  // Update Meta Title
  if (post.metaTitle) {
    post.metaTitle = applyReplacements(post.metaTitle);
    if (!post.metaTitle.includes("Event Management")) {
      post.metaTitle += " | Event Management Company KSA";
    }
  }

  // Update Meta Description
  if (post.metaDescription) {
    post.metaDescription = applyReplacements(post.metaDescription);
    if (!post.metaDescription.toLowerCase().includes("event planner") && !post.metaDescription.toLowerCase().includes("event management")) {
      post.metaDescription += " Discover how our expert event planners and event management company in Saudi Arabia can help.";
    }
  }

  // Update Title
  post.title = applyReplacements(post.title);

  // Update Excerpt
  post.excerpt = applyReplacements(post.excerpt);

  // Update Content
  post.content = post.content.map((paragraph: any) => {
    let p = applyReplacements(paragraph);
    
    // Inject SEO keywords if it's a heading
    if (p.startsWith('## ') || p.startsWith('# ')) {
      if (p.toLowerCase().includes('corporate') && !p.toLowerCase().includes('event planner')) {
        // Just natural replacement
      }
    }
    return p;
  });

  return post;
}

const updatedPosts = blogPosts.map(processPost);

// Now we need to write back the file
const fileContent = `export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  featured: boolean;
  content: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export const blogCategories = [
  "All",
  "Event Planning",
  "Color Trends",
  "Decor Ideas",
  "Weddings",
  "Corporate",
  "Lifestyle",
];

export const blogPosts: BlogPost[] = ${JSON.stringify(updatedPosts, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/blog-data.ts'), fileContent, 'utf-8');
console.log('Successfully updated blog posts!');
