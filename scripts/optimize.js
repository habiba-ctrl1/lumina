const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/blog-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update Interface
content = content.replace(
  'content: string[];\n}',
  'content: string[];\n  metaTitle?: string;\n  metaDescription?: string;\n}'
);

// 2. Add Meta & FAQs & CTA to each blog using regex/replacement
const blogs = [
  {
    slug: 'ultimate-guide-luxury-event-planning',
    metaTitle: 'Ultimate Guide to Luxury Event Planning in Saudi Arabia',
    metaDescription: 'Discover the insider secrets top event planners use to create seamless, unforgettable luxury experiences in Riyadh and Jeddah.',
    faq: [
      "## Frequently Asked Questions (FAQs)",
      "### Q: What is the most important element of luxury event planning?",
      "A: The most important element is defining a clear emotional vision before setting the budget. It ensures every riyal is spent on elements that contribute to the overall guest experience.",
      "### Q: How early should I start planning a luxury event?",
      "A: For large-scale galas or weddings, 8-12 months is recommended to secure premium venues and top-tier vendors in Saudi Arabia.",
      "## Ready to Plan Your Luxury Event?",
      "Looking for a premium partner to bring your vision to life? Check out our [Luxury Event Services](/services/luxury-vip-events) and let Saudi Event Management handle every detail with flawless execution. Contact us today!"
    ]
  },
  {
    slug: 'trending-colors-2026-event-palette',
    metaTitle: '2026 Event Color Trends: The Defining Palette for Luxury Events',
    metaDescription: 'Explore the stunning color trends dominating luxury events this year in Saudi Arabia, from Sage Green to Deep Plum.',
    faq: [
      "## Frequently Asked Questions (FAQs)",
      "### Q: What is the 60-30-10 color rule?",
      "A: It is a design principle where 60% of the room is the dominant color, 30% is the secondary color, and 10% is used for bold accent colors.",
      "### Q: Which color palette is best for corporate events?",
      "A: Deep Emerald Greens paired with Champagne Gold or crisp Navy and Silver are excellent choices that convey trust, luxury, and professionalism.",
      "## Elevate Your Next Corporate Event",
      "Need expert design and styling for your upcoming summit? Explore our [Corporate Event Management Services](/services/corporate-events) to see how we blend trending aesthetics with flawless logistics."
    ]
  },
  {
    slug: 'show-stopping-decor-ideas-events',
    metaTitle: '10 Show-Stopping Event Decor Ideas in Saudi Arabia',
    metaDescription: 'Transform any venue with these avant-garde decor concepts blending artistry, innovation, and pure luxury for Saudi events.',
    faq: [
      "## Frequently Asked Questions (FAQs)",
      "### Q: How can I make my event entrance more dramatic?",
      "A: Use LED light tunnels, mirror corridors, or projection mapping to create an immersive transition from the outside world into your event space.",
      "### Q: Are suspended floral installations safe?",
      "A: Yes, when executed by professionals. We always work with structural engineers to ensure the venue ceiling can safely support the weight.",
      "## Transform Your Event Space",
      "Ready to implement these show-stopping ideas? Discover our [Exhibition Management Services](/services/exhibitions) to see how we build immersive, custom environments."
    ]
  },
  {
    slug: 'destination-wedding-planning-guide',
    metaTitle: 'Planning a Dream Destination Wedding in Saudi Arabia & Beyond',
    metaDescription: 'Everything you need to know about planning a luxury destination wedding that exceeds every expectation.',
    faq: [
      "## Frequently Asked Questions (FAQs)",
      "### Q: How far in advance should guests be invited to a destination wedding?",
      "A: Send save-the-dates at least 10-12 months in advance so guests have ample time to arrange travel and accommodations.",
      "### Q: Do I need a local wedding planner?",
      "A: Absolutely. A local coordinator understands the cultural nuances, vendor landscape, and logistical requirements specific to the destination.",
      "## Plan Your Dream Wedding",
      "Let us manage the logistics while you enjoy the romance. Learn more about our [Luxury Wedding Services](/services/weddings) and start planning your perfect day."
    ]
  },
  {
    slug: 'elevating-corporate-events-guide',
    metaTitle: 'Elevating Corporate Events: A Guide to Premium Brand Experiences',
    metaDescription: 'Learn how to transform standard corporate gatherings into premium brand experiences that inspire teams and impress clients.',
    faq: [
      "## Frequently Asked Questions (FAQs)",
      "### Q: How do we measure the ROI of a corporate event?",
      "A: Track metrics aligned with your purpose: networking connections, post-event survey scores, lead generation, and social media engagement.",
      "### Q: How can we make corporate catering more exciting?",
      "A: Move away from standard buffets and opt for interactive chef stations, themed cultural cuisines, and high-end molecular gastronomy.",
      "## Host an Unforgettable Corporate Summit",
      "Upgrade your next AGM or corporate retreat. Visit our [Conference Management Services](/services/conferences) page to see how we handle high-stakes corporate gatherings."
    ]
  },
  {
    slug: 'art-of-tablescaping-guide',
    metaTitle: 'The Art of Tablescaping for Luxury Events',
    metaDescription: 'Master the art of luxurious table design with expert tips on layering textures, linens, and centerpieces for Saudi events.',
    faq: [
      "## Frequently Asked Questions (FAQs)",
      "### Q: How tall should centerpieces be?",
      "A: Centerpieces should be either below eye level (under 12 inches) or tall enough to see under (over 24 inches) to avoid blocking conversation.",
      "### Q: Is it okay to mix metals on a table?",
      "A: Yes! Mixing metals like brushed gold and antique silver adds depth and a curated, modern aesthetic.",
      "## Let Us Design Your Tablescape",
      "From royal dinners to VIP corporate galas, we curate perfection. Explore our [Cultural Events Services](/services/cultural-events) to see our breathtaking designs."
    ]
  }
];

// Loop and inject
blogs.forEach(blog => {
  const searchStr = `slug: "${blog.slug}",`;
  if(content.includes(searchStr)) {
    // Inject Meta tags
    content = content.replace(
      searchStr,
      `${searchStr}\n    metaTitle: "${blog.metaTitle}",\n    metaDescription: "${blog.metaDescription}",`
    );

    // Inject FAQ & CTA at the end of the content array
    // We need to find the end of the content array for this specific blog.
    // This is a bit tricky with regex, so we'll do a string manipulation
    const contentStartStr = `slug: "${blog.slug}"`;
    const contentStartIndex = content.indexOf(contentStartStr);
    const contentArrayStart = content.indexOf('content: [', contentStartIndex);
    const contentArrayEnd = content.indexOf('],', contentArrayStart);
    
    if (contentArrayStart !== -1 && contentArrayEnd !== -1) {
      const faqStrings = blog.faq.map(str => `\n      "${str.replace(/"/g, '\\"')}"`).join(',');
      
      const before = content.substring(0, contentArrayEnd);
      const after = content.substring(contentArrayEnd);
      
      // Check if we already added it to prevent duplicates
      if (!before.includes("Frequently Asked Questions (FAQs)")) {
        content = before + ',' + faqStrings + after;
      }
    }
  }
});

// Add the two missing blogs we seeded earlier to blog-data.ts so they appear on the site!
if (!content.includes('event-management-cost-saudi-arabia')) {
  const newBlogs = `
  {
    slug: "event-management-cost-saudi-arabia",
    title: "How Much Does Event Management Cost in Saudi Arabia? A Comprehensive Guide",
    excerpt: "Understanding the financial aspects of event planning in Riyadh, Jeddah, and Dammam for effective budgeting and successful outcomes.",
    category: "Event Planning",
    image: "/gallery_corporate_gala.webp",
    date: "May 15, 2026",
    readTime: "8 min read",
    author: "Saudi Event Management Editorial",
    featured: true,
    metaTitle: "Event Management Cost in Saudi Arabia | Your Budget Guide",
    metaDescription: "Explore the costs of event management in Saudi Arabia, including factors influencing pricing in Riyadh, Jeddah, and Dammam.",
    content: [
      "Saudi Arabia's event industry is booming, driven by ambitious Vision 2030 initiatives that are transforming the Kingdom into a global hub for business, tourism, and entertainment. As more businesses and organizations look to host impactful events in cities like Riyadh, Jeddah, and Dammam, a crucial question arises: **How much does event management cost in Saudi Arabia?**",
      "## Typical Cost Breakdown for Corporate Events",
      "While exact figures depend on specifics, a mid-sized corporate event (e.g., a one-day conference for 200 delegates) in Riyadh can range from SAR 320,000 to SAR 380,000.",
      "## Frequently Asked Questions (FAQs)",
      "### Q: Are there hidden costs in event management?",
      "A: Reputable event management companies are transparent about all costs. However, unforeseen circumstances can arise. This is why a contingency fund (10-15% of the total budget) is highly recommended.",
      "## Plan Your Next Event with Us",
      "Looking for a professional event management company in Saudi Arabia? Discover our [Corporate Events Services](/services/corporate-events) and get a precise quote today."
    ]
  },
  {
    slug: "best-event-management-company-saudi-arabia",
    title: "Best Event Management Company in Saudi Arabia: Your Guide",
    excerpt: "Discover how to choose the best event management company in Saudi Arabia for your corporate events, conferences, and festivals.",
    category: "Corporate",
    image: "/gallery_2.webp",
    date: "May 20, 2026",
    readTime: "9 min read",
    author: "Saudi Event Management Editorial",
    featured: false,
    metaTitle: "Best Event Management Company Saudi Arabia | Your Guide",
    metaDescription: "Expert tips on choosing the best event management company in Saudi Arabia for your corporate events, conferences, and festivals in Riyadh, Jeddah, and Dammam.",
    content: [
      "Saudi Arabia is rapidly transforming, driven by Vision 2030, which aims to diversify its economy and position the Kingdom as a global hub for business, tourism, and entertainment. This ambitious vision has fueled an unprecedented boom in the events industry.",
      "## What to Look for in the Best Event Management Company",
      "Choosing the right partner is paramount. Look for experience, a comprehensive service offering, local market knowledge, creativity, and strong client testimonials.",
      "## Frequently Asked Questions (FAQs)",
      "### Q: Do I need a permit to organize an event in Saudi Arabia?",
      "A: Yes, most public and commercial events require permits from the General Entertainment Authority (GEA) and potentially other government bodies.",
      "## Partner With The Best",
      "Ready to host an unforgettable event? Check out our [Event Production Services](/services/event-production) and let us transform your vision into reality."
    ]
  }
];`;

  content = content.replace('];\n', ',' + newBlogs);
}

fs.writeFileSync(filePath, content);
console.log('Successfully optimized blogs in blog-data.ts!');
