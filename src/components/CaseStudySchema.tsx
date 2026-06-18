// Server component — injects per-case-study structured data (CreativeWork +
// ImageObject + BreadcrumbList) so each portfolio project is independently
// understood by search engines and AI answer engines (GEO/AIO), and matches
// the ItemList referenced from /portfolio.
//
// Usage:  <CaseStudySchema slug="makkah-vip-retreat" />

import { CASE_STUDIES } from "@/lib/case-studies";

const BASE = "https://saudieventmanagement.com";

export default function CaseStudySchema({ slug }: { slug: string }) {
  const cs = CASE_STUDIES[slug];
  if (!cs) return null;

  const url = `${BASE}/portfolio/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: cs.name,
        headline: `${cs.name} — Event Management Case Study`,
        description: cs.description,
        about: cs.category,
        url,
        image: {
          "@type": "ImageObject",
          url: `${BASE}${cs.image}`,
          caption: `${cs.name} — ${cs.category} in ${cs.location}, Saudi Arabia`,
        },
        locationCreated: {
          "@type": "Place",
          name: `${cs.location}, Saudi Arabia`,
        },
        creator: { "@id": `${BASE}/#organization` },
        provider: { "@id": `${BASE}/#organization` },
        isPartOf: { "@id": `${BASE}/#website` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Portfolio", item: `${BASE}/portfolio` },
          { "@type": "ListItem", position: 3, name: cs.name, item: url },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
