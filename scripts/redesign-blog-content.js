const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/blog-data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// We will use a regex to find the blogPosts array and parse it.
// Actually, it's safer to just do a smart string replace line by line or block by block, but parsing as JS is better.
// Since it's a TS file with interfaces, let's extract the array string, evaluate it, modify it, and write it back.

const arrayStartIndex = content.indexOf('export const blogPosts: BlogPost[] = [');
if (arrayStartIndex === -1) throw new Error("Could not find blogPosts array");

const arrayEndIndex = content.lastIndexOf('];') + 1;
const arrayString = content.slice(arrayStartIndex + 'export const blogPosts: BlogPost[] = '.length, arrayEndIndex);

// Evaluate the array
let blogPosts;
try {
  blogPosts = eval(`(${arrayString})`);
} catch (e) {
  console.error("Failed to eval blogPosts", e);
  process.exit(1);
}

const getHook = (category) => {
  switch (category) {
    case 'Corporate':
      return "In the high-stakes world of Saudi business, standard networking events are no longer sufficient. Driven by Vision 2030's economic mandate, corporate gatherings in Riyadh and Jeddah have transformed into strategic platforms for growth, requiring flawless execution and innovative engagement.";
    case 'Weddings':
      return "The Saudi wedding landscape is experiencing a breathtaking evolution. Moving beyond traditional hotel ballrooms, today's couples are seeking immersive destination experiences—from the ancient canyons of AlUla to the pristine shores of the Red Sea—that blend profound cultural heritage with unprecedented design.";
    case 'Event Planning':
      return "Executing a flawless event in Saudi Arabia requires more than just logistical coordination; it demands a deep understanding of local nuances, GEA regulations, and the art of 'architectural emotion.' As the Kingdom's event sector expands at breakneck speed, mastering these elements is the key to creating unforgettable experiences.";
    case 'Decor Ideas':
      return "Event design in Saudi Arabia is undergoing a renaissance, fusing deep-rooted Najdi and Hejazi heritage with bold, futuristic aesthetics. Today's most talked-about events leverage this cultural fusion to create immersive environments that engage all the senses and leave a lasting legacy.";
    case 'Color Trends':
      return "Color is the silent language of any spectacular event. In Saudi Arabia, the most sophisticated palettes are now drawing direct inspiration from the Kingdom's majestic natural landscapes—from the golden hues of AlUla to the deep azure of the Red Sea—setting a new global standard for event aesthetics.";
    case 'Lifestyle':
      return "The definition of high-end living in Saudi Arabia has shifted from mere possession to bespoke, experiential access. Today's elite seek curated journeys and invitation-only access to the Kingdom's most prestigious cultural and entertainment events, demanding white-glove service at every touchpoint.";
    default:
      return "Saudi Arabia's event landscape is transforming at an unprecedented pace. Driven by Vision 2030, the demand for innovative, culturally resonant, and flawlessly executed events has never been higher, challenging planners to redefine what is possible.";
  }
};

const getInsights = (category) => {
  const insights = [];
  if (category === 'Corporate') {
    insights.push("[INSIGHT] The MICE sector in KSA is projected to grow exponentially, with Riyadh's KAFD and RICEC leading the charge as global hubs for international business summits.");
    insights.push("[TIP] When planning a corporate gala, allocate at least 15% of your budget to high-quality AV and lighting to ensure your keynote presentations and branding leave a lasting impact.");
    insights.push("[MISTAKE] Treating a Saudi corporate event like a standard Western conference. Failing to incorporate local hospitality traditions (like proper Arabic coffee service) can alienate key stakeholders.");
    insights.push("[RECOMMENDATION] Secure venues for major corporate events at least 6-8 months in advance, especially if the dates coincide with Riyadh Season or major industry exhibitions.");
  } else if (category === 'Weddings') {
    insights.push("[INSIGHT] Destination weddings in AlUla are seeing a 400% year-over-year increase in inquiries among high-net-worth families looking for unique, heritage-rich backdrops.");
    insights.push("[TIP] For Red Sea or desert weddings, always prioritize weather contingency plans and ensure your event management company has experience with remote logistics and silent generator deployments.");
    insights.push("[MISTAKE] Underestimating the lead time required for custom structural tents and imported floral masterpieces. These elements require months of fabrication and supply chain coordination.");
    insights.push("[RECOMMENDATION] Partner with an event planner who has established relationships with the Royal Commission for AlUla (RCU) or Red Sea Global to streamline bespoke venue access.");
  } else {
    insights.push("[INSIGHT] GEA (General Entertainment Authority) permits are now mandatory for any event featuring live music or public entertainment. Processing typically takes 4-8 weeks.");
    insights.push("[TIP] Elevate your guest experience by implementing seamless, tech-enabled RSVP and concierge services, ensuring VIPs feel valued before they even arrive at the venue.");
    insights.push("[MISTAKE] Starting the planning process with a rigid budget rather than a clear emotional vision. The most successful events allocate funds based on the desired guest impact.");
    insights.push("[RECOMMENDATION] Always conduct a full technical rehearsal 24 hours prior to your event to iron out any AV, lighting, or flow issues in the actual venue space.");
  }
  return insights;
};

const processPost = (post) => {
  let newContent = [];
  let tldrRemoved = false;
  let introAdded = false;
  let h2Count = 0;
  const insights = getInsights(post.category);

  for (let i = 0; i < post.content.length; i++) {
    const block = post.content[i];
    
    // 1. Remove TL;DR
    if (block.startsWith('**TL;DR') || block.startsWith('**Executive Summary') || block.includes('TL;DR')) {
      tldrRemoved = true;
      continue;
    }

    // 2. Replace first paragraph with an engaging intro
    if (!introAdded && !block.startsWith('#')) {
      newContent.push(getHook(post.category));
      newContent.push(block); // keep the original first paragraph as a follow-up
      introAdded = true;
      continue;
    }

    newContent.push(block);

    // 3. Inject tips/insights after H2s
    if (block.startsWith('## ') && !block.includes('Key Takeaways') && !block.includes('Ready to Elevate')) {
      h2Count++;
      if (h2Count === 1 && insights[0]) newContent.push(insights[0]);
      if (h2Count === 2 && insights[1]) newContent.push(insights[1]);
      if (h2Count === 3 && insights[2]) newContent.push(insights[2]);
      if (h2Count === 4 && insights[3]) newContent.push(insights[3]);
    }
  }

  // Ensure intro was added if it somehow missed
  if (!introAdded) {
    newContent.unshift(getHook(post.category));
  }

  // Remove existing Key Takeaways or FAQs to standardize
  newContent = newContent.filter(block => !block.startsWith('## Frequently Asked Questions') && !block.startsWith('### Q:'));

  // 4. Append Key Takeaways
  newContent.push('## Key Takeaways');
  newContent.push('- **Align with Vision 2030**: Ensure your event narrative and execution reflect the Kingdom\'s ambitious forward momentum and cultural pride.');
  newContent.push('- **Plan for Logistics**: Premium venues and specialized vendors in KSA require significant lead time—aim for 6-12 months for major events.');
  newContent.push('- **Leverage Expert Management**: Partnering with a specialized event management company is critical for navigating local regulations, GEA permits, and remote production challenges.');

  // 5. Append CTA
  newContent.push('## Ready to Elevate Your Next Event?');
  newContent.push('Whether you are planning a high-profile corporate summit in Riyadh, an exhibition in Jeddah, or a breathtaking destination wedding in AlUla, our expert event planners are here to turn your vision into an unprecedented reality. [Contact Saudi Event Management today](/contact) to discuss your requirements and secure the finest event experiences in the Kingdom.');

  post.content = newContent;
  return post;
};

const updatedPosts = blogPosts.map(processPost);

const newFileContent = content.slice(0, arrayStartIndex) + 'export const blogPosts: BlogPost[] = ' + JSON.stringify(updatedPosts, null, 2) + ';\n';

fs.writeFileSync(filePath, newFileContent, 'utf-8');
console.log('Successfully redesigned blog content!');
