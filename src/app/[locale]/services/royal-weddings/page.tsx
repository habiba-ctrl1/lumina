import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import {
  Crown,
  Heart,
  Sparkles,
  Star,
  MapPin,
  Music,
  Camera,
  Gem,
  Shield,
  Users,
  Flower2,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   ENTITY MAP (semantic density layer — drives NLP co-occurrence signals)
   Primary:  Royal Wedding Planner Saudi Arabia | مخطط أفراح ملكي السعودية
   Cultural: Nikah · Walima · Zaffa · Laylat al-Henna · Milka · Mahr · Aqd
   Venues:   Ritz-Carlton Riyadh · Four Seasons Kingdom Centre · Al Faisaliah
             Waldorf Astoria Jeddah · Four Seasons Jeddah · Sharaan AlUla
   Entities: Vision 2030 · GEA · Saudi Tourism Authority · HNWI · VIP Protocol
───────────────────────────────────────────────────────────────────────────── */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    /* ── 1. Service ── */
    {
      "@type": "Service",
      "@id": "https://saudieventmanagement.com/services/royal-weddings#service",
      name: "Royal Wedding Planning Saudi Arabia",
      alternateName: [
        "تنظيم أعراس ملكية السعودية",
        "مخطط أفراح ملكي الرياض",
        "Royal Wedding Planner KSA",
      ],
      serviceType: "Royal Wedding & Ceremonial Event Management",
      description:
        "Bespoke royal wedding planning and ceremonial management for distinguished Saudi families — encompassing Nikah, Walima, Zaffa, Laylat al-Henna, and Milka ceremonies at the Kingdom's most prestigious palace venues and five-star hotels in Riyadh, Jeddah, AlUla, and NEOM.",
      provider: {
        "@type": "LocalBusiness",
        "@id": "https://saudieventmanagement.com#organization",
        name: "Saudi Event Management",
        image: "https://saudieventmanagement.com/wedding_stage_backdrop_decor.webp",
        url: "https://saudieventmanagement.com",
        telephone: "+966501234567",
        address: {
          "@type": "PostalAddress",
          streetAddress: "King Fahd Road",
          addressLocality: "Riyadh",
          addressRegion: "Riyadh",
          postalCode: "11564",
          addressCountry: "SA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "24.7136",
          longitude: "46.6753",
        },
        sameAs: [
          "https://saudieventmanagement.com",
          "https://www.instagram.com/saudieventmanagement",
        ],
      },
      areaServed: [
        { "@type": "City", name: "Riyadh", sameAs: "https://en.wikipedia.org/wiki/Riyadh" },
        { "@type": "City", name: "Jeddah", sameAs: "https://en.wikipedia.org/wiki/Jeddah" },
        { "@type": "City", name: "AlUla", sameAs: "https://en.wikipedia.org/wiki/Al-Ula" },
        { "@type": "Place", name: "NEOM", sameAs: "https://en.wikipedia.org/wiki/NEOM" },
        { "@type": "City", name: "Dammam" },
        { "@type": "City", name: "Makkah" },
        { "@type": "Country", name: "Saudi Arabia", sameAs: "https://en.wikipedia.org/wiki/Saudi_Arabia" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Royal Wedding Packages Saudi Arabia",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Elite Royal Wedding Package",
            description:
              "Full-service planning for intimate royal celebrations — up to 300 guests, curated venue, Nikah ceremony, and Walima reception at a five-star Riyadh hotel.",
            priceRange: "SAR 250,000–500,000",
          },
          {
            "@type": "Offer",
            name: "Royal Grand Wedding Package",
            description:
              "Comprehensive planning for large royal celebrations — 300–1,000 guests, multi-day ceremonies, Zaffa procession, Laylat al-Henna, and dedicated VIP guest management.",
            priceRange: "SAR 500,000–1,500,000",
          },
          {
            "@type": "Offer",
            name: "Imperial Royal Wedding Package",
            description:
              "The pinnacle of Saudi royal wedding planning — 1,000–3,000+ guests, palace venue or exclusive resort takeover in AlUla or NEOM, full royal protocol, cinematic production, and bespoke floral installations.",
            priceRange: "SAR 1,500,000+",
          },
        ],
      },
    },

    /* ── 2. FAQPage (GEO/LLM citation layer) ── */
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who are the best royal wedding planners in Saudi Arabia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Saudi Event Management is widely recognised as Saudi Arabia's foremost royal wedding planning specialist. With over 15 years of ceremonial expertise, we deliver bespoke royal experiences — from intimate Nikah ceremonies to grand Walima receptions for 2,000+ guests — at the Kingdom's most prestigious venues including the Ritz-Carlton Riyadh, Four Seasons Kingdom Centre, and exclusive palace properties. Our portfolio covers Riyadh, Jeddah, AlUla, and NEOM.",
          },
        },
        {
          "@type": "Question",
          name: "How much does a royal wedding cost in Saudi Arabia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Royal weddings in Saudi Arabia typically range from SAR 250,000 for an intimate elite celebration to over SAR 1,500,000 for a grand multi-day imperial event. Key cost drivers include the number of guests (typically 500–3,000 for royal occasions), venue exclusivity, custom floral installations, cinematic production, Zaffa performance, catering per-head costs at five-star venues (SAR 400–900 per guest), and bespoke entertainment such as Tarab orchestras and Oud soloists.",
          },
        },
        {
          "@type": "Question",
          name: "What ceremonies are included in a traditional Saudi royal wedding?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A traditional Saudi royal wedding encompasses multiple ceremonies: (1) Milka — the formal betrothal gathering; (2) Laylat al-Henna — the bride's henna night with family and female guests; (3) Aqd al-Nikah — the Islamic marriage contract signing conducted by a Ma'dhoun (licensed officiant); (4) Zaffa — the celebratory groom's procession with Nasheed chanters, drummers, and sword dancers; (5) Walima — the grand reception feast, often held on a separate day, which is a Sunnah obligation in Islam. Gender-separated celebrations are customary in conservative royal families.",
          },
        },
        {
          "@type": "Question",
          name: "What is a Walima reception in a Saudi wedding?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Walima (وليمة الزواج) is the post-Nikah wedding feast — a Sunnah obligation in Islamic tradition — held within three days of the Nikah ceremony. For royal Saudi families, the Walima is often a grand banquet for hundreds or thousands of guests, featuring lavish multi-course Saudi and international cuisine, Tarab music, and formal VIP seating arrangements. Saudi Event Management manages full Walima logistics including venue booking, menu curation, entertainment programming, and royal protocol.",
          },
        },
        {
          "@type": "Question",
          name: "What is a Zaffa procession and how is it organised?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Zaffa (زفة العريس) is a traditional celebratory procession that escorts the groom — and sometimes the bride — into the wedding reception hall, accompanied by live Nasheed chanters, Tabl drummers, Mizmar reed pipers, and Al-Ardah sword dancers. Saudi Event Management sources and coordinates authentic Zaffa performance troupes, choreographs the procession route, and integrates it with the venue's sound and lighting systems for maximum cinematic impact.",
          },
        },
        {
          "@type": "Question",
          name: "What are the best venues for royal weddings in Riyadh?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The finest royal wedding venues in Riyadh include: (1) The Ritz-Carlton Riyadh — Al Hada ballroom for 1,200+ guests with gold-gilded interiors; (2) Four Seasons Hotel Riyadh at Kingdom Centre — Sky Bridge and grand ballroom; (3) JW Marriott Hotel Riyadh — flexible 1,500-capacity ballrooms; (4) Al Faisaliah Hotel — the iconic tower with panoramic city views; (5) Fairmont Riyadh — KAFD location with modern royal aesthetics; (6) Private royal palace venues — managed on a confidential basis by Saudi Event Management.",
          },
        },
        {
          "@type": "Question",
          name: "What are the best hotels for royal weddings in Jeddah?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jeddah's premier royal wedding venues include: (1) Waldorf Astoria Jeddah – Qasr Al Sharq — oceanfront palace-style hotel with Red Sea views; (2) Four Seasons Hotel Jeddah at Kingdom of Sheba — beachfront luxury; (3) The Ritz-Carlton Jeddah — Red Sea beach setting with classical Saudi architecture; (4) Park Hyatt Jeddah — Marina and Beach Club for intimate royal experiences; (5) InterContinental Jeddah — grand Corniche ballrooms. Saudi Event Management holds preferred-partner status with each property.",
          },
        },
        {
          "@type": "Question",
          name: "How far in advance should a royal wedding in Saudi Arabia be planned?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Royal weddings in Saudi Arabia require a planning lead time of 12–24 months for an exceptional result. Venue booking at top Riyadh or Jeddah properties requires 12–18 months advance notice, especially for peak seasons (October–March). Custom floral installations and imported décor require 6–9 months. Securing exclusive entertainment such as international Tarab orchestras or renowned calligraphers for personalised gifts requires 9–12 months. Saudi Event Management recommends initiating the consultation at least 18 months before the planned date.",
          },
        },
        {
          "@type": "Question",
          name: "Do Saudi royal weddings have separate men's and women's receptions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In traditional Saudi royal weddings, gender separation is customary — the men's reception (Majlis) and women's reception (Haflah Nisaa'iyya) are held in entirely separate halls or floors, each with its own entertainment, catering, and décor. Saudi Event Management has extensive expertise managing dual-reception logistics with parity of quality across both spaces, including coordination of CCTV links for the bride and groom to observe both celebrations simultaneously.",
          },
        },
        {
          "@type": "Question",
          name: "Can Saudi Event Management plan royal weddings in AlUla or NEOM?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Saudi Event Management specialises in destination royal weddings in AlUla and NEOM — two of Saudi Arabia's most spectacular settings. In AlUla, we manage events at Sharaan Nature Reserve, Hegra (the UNESCO World Heritage site), and Maraya Concert Hall. In NEOM, we coordinate exclusive experiences on Sindalah Island and in Neom Bay. Both destinations require specialist logistics, Royal Commission permits, and sustainable event protocols that our team manages end-to-end.",
          },
        },
        {
          "@type": "Question",
          name: "What is Laylat al-Henna in a Saudi wedding?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Laylat al-Henna (ليلة الحناء) — the Henna Night — is a pre-wedding celebration held exclusively for the bride and her female family and friends, typically one to three nights before the Nikah. Traditional henna artists apply intricate Arabic calligraphy and floral patterns to the bride's hands and feet, symbolising beauty, joy, and protection. Saudi Event Management coordinates premium henna artists, custom décor (candlelight, rose petals, gold and blush palettes), entertainment such as Khaleeji music, and personalised bridal gifting.",
          },
        },
        {
          "@type": "Question",
          name: "How many guests attend a Saudi royal wedding?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Saudi royal and high-society weddings typically host between 500 and 3,000 guests, with the women's reception often exceeding the men's in number. The Walima feast is the largest gathering; it is not uncommon for prominent tribal or royal families to host 2,000–5,000 guests across multiple days. Saudi Event Management has managed events at every scale, with dedicated VIP guest management, shuttle coordination, and layered security protocols for events above 1,000 attendees.",
          },
        },
        {
          "@type": "Question",
          name: "مخطط أفراح ملكي في السعودية",
          acceptedAnswer: {
            "@type": "Answer",
            text: "سعودي إيفنت مانجمنت هي الشركة الرائدة في تخطيط وتنظيم الأعراس الملكية الفاخرة في المملكة العربية السعودية. نقدم خدمات شاملة تشمل عقد القران، وليمة الزواج، زفة العريس، وليلة الحناء في أرقى فنادق الرياض وجدة والعُلا.",
          },
        },
      ],
    },

    /* ── 3. HowTo (Planning process — captures "how to plan" queries) ── */
    {
      "@type": "HowTo",
      name: "How to Plan a Royal Wedding in Saudi Arabia",
      description:
        "A step-by-step guide to planning a luxury royal wedding in Saudi Arabia, from initial concept to post-wedding celebration, by Saudi Event Management.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Initial Royal Consultation",
          text: "Book a private consultation with our senior royal wedding consultant to discuss your vision, guest count, ceremony types (Nikah, Walima, Zaffa, Henna Night), budget parameters, and preferred cities. We sign an NDA to protect your family's privacy.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Venue Sourcing & Securing",
          text: "We present a curated shortlist of royal-appropriate venues — palace properties, five-star ballrooms, or exclusive resort takeovers — with preferred-partner pricing. Venue contracts are secured 12–18 months in advance.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Ceremony Design & Cultural Curation",
          text: "Our creative team designs each ceremony — from the intimate Milka gathering to the grand Walima — integrating authentic Saudi traditions, Islamic protocols, and contemporary luxury aesthetics.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Vendor Assembly & Rehearsal",
          text: "We assemble and contract your royal vendor team: master florists, Zaffa troupes, Tarab orchestra, halal catering chef teams, cinematic photographers, and calligraphers. Full rehearsals are conducted for ceremonial timing.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "VIP Guest Management & Royal Protocol",
          text: "We manage full guest logistics: bespoke invitation suites, RSVP tracking, VIP transportation, seating protocol, designated majlis areas for senior tribal or royal guests, and on-the-day hospitality concierge.",
        },
        {
          "@type": "HowToStep",
          position: 6,
          name: "Day-of Execution & Post-Wedding",
          text: "Our on-day team of 15–40 professionals manages every minute of the celebration timeline, from Zaffa procession cue to final farewell. Post-wedding, we deliver cinematic film edits, photo albums, and a full event archive.",
        },
      ],
    },

    /* ── 4. ItemList — Royal Venues ── */
    {
      "@type": "ItemList",
      name: "Best Royal Wedding Venues Saudi Arabia",
      description:
        "Saudi Event Management's curated list of premier royal wedding venues across Saudi Arabia.",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "The Ritz-Carlton Riyadh", url: "https://saudieventmanagement.com/services/royal-weddings#venues" },
        { "@type": "ListItem", position: 2, name: "Four Seasons Hotel Riyadh at Kingdom Centre" },
        { "@type": "ListItem", position: 3, name: "Al Faisaliah Hotel Riyadh" },
        { "@type": "ListItem", position: 4, name: "JW Marriott Hotel Riyadh" },
        { "@type": "ListItem", position: 5, name: "Waldorf Astoria Jeddah – Qasr Al Sharq" },
        { "@type": "ListItem", position: 6, name: "Four Seasons Hotel Jeddah at Kingdom of Sheba" },
        { "@type": "ListItem", position: 7, name: "Ritz-Carlton Jeddah" },
        { "@type": "ListItem", position: 8, name: "Sharaan Nature Reserve AlUla" },
        { "@type": "ListItem", position: 9, name: "Maraya Concert Hall AlUla" },
        { "@type": "ListItem", position: 10, name: "Sindalah Island NEOM" },
      ],
    },

    /* ── 5. AggregateRating ── */
    {
      "@type": "AggregateRating",
      itemReviewed: {
        "@type": "LocalBusiness",
        name: "Saudi Event Management",
        "@id": "https://saudieventmanagement.com#organization",
      },
      ratingValue: "4.9",
      reviewCount: "148",
      bestRating: "5",
    },

    /* ── 6. BreadcrumbList ── */
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://saudieventmanagement.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://saudieventmanagement.com/services" },
        { "@type": "ListItem", position: 3, name: "Luxury Weddings", item: "https://saudieventmanagement.com/services/weddings" },
        { "@type": "ListItem", position: 4, name: "Royal Weddings", item: "https://saudieventmanagement.com/services/royal-weddings" },
      ],
    },

    /* ── 7. WebPage (entity linking to Wikipedia) ── */
    {
      "@type": "WebPage",
      "@id": "https://saudieventmanagement.com/services/royal-weddings",
      name: "Royal Wedding Planner Saudi Arabia",
      description:
        "Semantic authority page for royal wedding planning services in Saudi Arabia — covering ceremonies, venues, traditions, pricing, and cultural protocols.",
      url: "https://saudieventmanagement.com/services/royal-weddings",
      inLanguage: ["en", "ar"],
      about: [
        { "@type": "Thing", name: "Wedding", sameAs: "https://en.wikipedia.org/wiki/Wedding" },
        { "@type": "Thing", name: "Walima", sameAs: "https://en.wikipedia.org/wiki/Walimah" },
        { "@type": "Thing", name: "Nikah", sameAs: "https://en.wikipedia.org/wiki/Nikah" },
        { "@type": "Thing", name: "Zaffa", sameAs: "https://en.wikipedia.org/wiki/Zaffa" },
        { "@type": "Thing", name: "Saudi Arabia", sameAs: "https://en.wikipedia.org/wiki/Saudi_Arabia" },
      ],
    },
  ],
};

/* ─────────────────────────── DATA CONSTANTS ─────────────────────────── */

const ceremonies = [
  {
    icon: Heart,
    name: "Milka",
    arabic: "الملكة",
    desc: "The formal betrothal gathering — a private family celebration to mark the official engagement, often held in a home or private majlis with close relatives.",
  },
  {
    icon: Sparkles,
    name: "Laylat al-Henna",
    arabic: "ليلة الحناء",
    desc: "The bride's henna night — an intimate women's celebration with master henna artists, Khaleeji music, and personalised gifting, held 1–3 nights before the Nikah.",
  },
  {
    icon: Star,
    name: "Aqd al-Nikah",
    arabic: "عقد النكاح",
    desc: "The Islamic marriage contract ceremony — conducted by a licensed Ma'dhoun — typically in a mosque, home, or dedicated majlis, observed by male family members and witnesses.",
  },
  {
    icon: Music,
    name: "Zaffa Procession",
    arabic: "زفة العريس",
    desc: "The ceremonial groom's procession with live Nasheed chanters, Tabl drummers, Mizmar pipers, and Al-Ardah sword dancers escorting the groom into the reception hall.",
  },
  {
    icon: Crown,
    name: "Walima Reception",
    arabic: "وليمة الزواج",
    desc: "The grand post-Nikah wedding feast — a Sunnah obligation — hosting 300 to 3,000+ guests with lavish multi-course Saudi cuisine, Tarab orchestra, and formal VIP seating.",
  },
  {
    icon: Gem,
    name: "Sabahiyya",
    arabic: "الصبحية",
    desc: "The morning-after celebration where the bride's family receives the couple in a warm family breakfast gathering, completing the multi-day royal wedding journey.",
  },
];

const services = [
  {
    icon: MapPin,
    title: "Royal Venue Sourcing",
    desc: "Exclusive access to palace properties, five-star ballrooms, and private resort takeovers across Riyadh, Jeddah, AlUla, and NEOM — with preferred-partner pricing.",
  },
  {
    icon: Flower2,
    title: "Floral & Décor Design",
    desc: "Bespoke floral installations — from rose-gold arches to cascading white orchid ceilings — crafted by KSA's most awarded floral designers for royal-scale impact.",
  },
  {
    icon: Crown,
    title: "Royal Protocol Management",
    desc: "Experienced VIP protocol officers manage guest hierarchy seating, Ma'dhoun coordination, tribal elder reception, and diplomatic guest logistics with absolute discretion.",
  },
  {
    icon: Music,
    title: "Zaffa & Entertainment",
    desc: "Authentic Zaffa procession troupes, Tarab orchestras, Oud soloists, and Nasheed ensembles — all GEA-licensed and rigorously vetted for royal-standard performance.",
  },
  {
    icon: Camera,
    title: "Cinematic Media Production",
    desc: "4K drone cinematography, multi-camera Nikah coverage, and post-production film editing that transforms your royal celebration into a lasting editorial masterpiece.",
  },
  {
    icon: Users,
    title: "VIP Guest Management",
    desc: "Full-service invitation design, RSVP tracking, personalised guest kits, luxury shuttle coordination, and on-day hospitality concierge for VIP and royal guests.",
  },
  {
    icon: Sparkles,
    title: "Bridal Styling Concierge",
    desc: "Private fashion consultations connecting the bride with Saudi couturiers, international bridal houses, and master jewellers — from the wedding abaya to the reception gown.",
  },
  {
    icon: Shield,
    title: "Discreet Security & Privacy",
    desc: "Trusted partnerships with licensed private security firms ensure complete event security, media embargo management, and NDA compliance for royal families and HNWIs.",
  },
];

const venues = [
  {
    city: "Riyadh",
    arabic: "الرياض",
    tag: "Capital Grandeur",
    color: "bg-slate-900",
    properties: [
      "The Ritz-Carlton Riyadh — Al Hada Grand Ballroom (1,200+ guests)",
      "Four Seasons at Kingdom Centre — Sky Bridge & Royal Ballrooms",
      "Al Faisaliah Hotel — Panoramic tower banqueting suites",
      "JW Marriott Riyadh — 1,500-capacity flexible ballrooms",
      "Fairmont Riyadh KAFD — Contemporary royal aesthetic",
    ],
  },
  {
    city: "Jeddah",
    arabic: "جدة",
    tag: "Red Sea Elegance",
    color: "bg-emerald-950",
    properties: [
      "Waldorf Astoria Jeddah – Qasr Al Sharq — Oceanfront palace",
      "Four Seasons Jeddah at Kingdom of Sheba — Beachfront luxury",
      "The Ritz-Carlton Jeddah — Red Sea beach setting",
      "Park Hyatt Jeddah — Marina & Beach Club",
      "InterContinental Jeddah — Grand Corniche ballrooms",
    ],
  },
  {
    city: "AlUla & NEOM",
    arabic: "العُلا · نيوم",
    tag: "Destination Majesty",
    color: "bg-stone-900",
    properties: [
      "Sharaan Nature Reserve — Carved sandstone retreat",
      "Maraya Concert Hall — World's largest mirrored building",
      "Hegra UNESCO Heritage Site — Ancient Nabataean backdrop",
      "Sindalah Island NEOM — Private island resort",
      "Desert plateau private camps — Exclusive buyout experiences",
    ],
  },
];

const planningSteps = [
  {
    step: "01",
    title: "Royal Consultation",
    desc: "A confidential briefing session — under NDA — where we map your ceremonial vision, guest scale, city preferences, and budget framework.",
  },
  {
    step: "02",
    title: "Venue & Date Securing",
    desc: "Curated venue shortlist with site visits. Contracts signed 12–18 months ahead to lock preferred ballrooms and resort buyouts.",
  },
  {
    step: "03",
    title: "Ceremony Design",
    desc: "Creative direction for each ceremony — Milka, Henna, Nikah, Zaffa, and Walima — with full mood boards, colour palettes, and floral concepts.",
  },
  {
    step: "04",
    title: "Vendor Assembly",
    desc: "Hand-picked royal vendor teams: master florists, Zaffa troupes, Tarab orchestras, halal chef teams, cinematic crews, and henna artists.",
  },
  {
    step: "05",
    title: "Protocol & Logistics",
    desc: "VIP guest management, invitation suites, transportation, security briefings, and on-day protocol playbooks for every ceremony.",
  },
  {
    step: "06",
    title: "Flawless Execution",
    desc: "An on-day team of 15–40 professionals manages every minute — from the first Zaffa drumbeat to the final farewell — with zero margin for error.",
  },
];

const packages = [
  {
    tier: "Elite",
    arabic: "النخبة",
    guests: "Up to 300 guests",
    price: "From SAR 250,000",
    highlight: false,
    features: [
      "Nikah ceremony coordination",
      "Walima reception (1 venue)",
      "Curated floral & décor design",
      "Zaffa procession troupe",
      "Halal multi-course catering",
      "Photography & videography",
      "Bridal styling concierge",
      "Dedicated planning consultant",
    ],
  },
  {
    tier: "Royal",
    arabic: "الملكي",
    guests: "300–1,000 guests",
    price: "From SAR 500,000",
    highlight: true,
    features: [
      "All Elite inclusions",
      "Multi-ceremony management (Milka → Walima)",
      "Laylat al-Henna organisation",
      "Dual-reception logistics (M/F)",
      "Tarab orchestra & Oud soloist",
      "4K cinematic film production",
      "VIP guest management suite",
      "Dedicated protocol officer",
      "Private security coordination",
    ],
  },
  {
    tier: "Imperial",
    arabic: "الإمبراطوري",
    guests: "1,000–3,000+ guests",
    price: "From SAR 1,500,000",
    highlight: false,
    features: [
      "All Royal inclusions",
      "Exclusive venue / resort buyout",
      "AlUla / NEOM destination option",
      "Multi-day royal programme",
      "International entertainment artists",
      "Sabahiyya & post-wedding events",
      "Full media management & NDA",
      "40-person on-day operations team",
      "Bespoke gifting & legacy album",
    ],
  },
];

const faqs = [
  {
    q: "Who are the best royal wedding planners in Saudi Arabia?",
    a: "Saudi Event Management is Saudi Arabia's foremost royal wedding specialist — over 15 years of ceremonial expertise, preferred-partner status at all major five-star venues, and a dedicated royal protocol team. Our portfolio spans Riyadh, Jeddah, AlUla, and NEOM.",
  },
  {
    q: "How much does a royal wedding cost in Saudi Arabia?",
    a: "Royal wedding costs in KSA range from SAR 250,000 for intimate elite celebrations (up to 300 guests) to SAR 1.5M+ for grand imperial events (1,000–3,000+ guests). Key cost factors include venue exclusivity, multi-ceremony scope, entertainment calibre, and floral installation scale.",
  },
  {
    q: "What ceremonies are included in a Saudi royal wedding?",
    a: "A traditional Saudi royal wedding encompasses: Milka (betrothal), Laylat al-Henna (bride's henna night), Aqd al-Nikah (marriage contract ceremony), Zaffa (groom's procession), Walima (wedding feast), and Sabahiyya (morning-after family gathering). We manage all six ceremonies end-to-end.",
  },
  {
    q: "What is the difference between Nikah and Walima?",
    a: "The Nikah (عقد النكاح) is the Islamic marriage contract — a formal legal and religious ceremony before witnesses. The Walima (وليمة) is the celebratory feast held after the Nikah — often the grandest event, hosting hundreds to thousands of guests, and obligatory in Islamic tradition.",
  },
  {
    q: "How far in advance should a royal wedding in Saudi Arabia be planned?",
    a: "We recommend 12–24 months for a royal-standard event. Five-star venues in Riyadh and Jeddah require 12–18 months advance booking. Custom imported décor and exclusive entertainment require 6–9 months. Begin your consultation at least 18 months before the target date.",
  },
  {
    q: "Do Saudi royal weddings have separate men's and women's receptions?",
    a: "Yes — gender-separated receptions are customary in traditional Saudi royal families. We manage dual-venue logistics with equal quality across both spaces, including coordinating shared entertainment, simultaneous catering service, and CCTV connectivity for the bride and groom.",
  },
  {
    q: "Can you plan a royal wedding in AlUla or NEOM?",
    a: "Absolutely. We specialise in destination royal weddings at Sharaan Nature Reserve, Hegra UNESCO Heritage Site, and Maraya Concert Hall in AlUla, and at Sindalah Island in NEOM. Both require Royal Commission permits that our team manages end-to-end.",
  },
  {
    q: "What is the Zaffa procession in a Saudi wedding?",
    a: "The Zaffa (زفة) is the celebratory procession escorting the groom into the reception, accompanied by Nasheed chanters, Tabl drummers, Mizmar pipers, and Al-Ardah sword dancers. We source and choreograph authentic Zaffa troupes and integrate them with venue AV systems.",
  },
];

/* ─────────────────────────── PAGE COMPONENT ─────────────────────────── */

export default function RoyalWeddingsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white">
        <Navbar />

        {/* ── HERO ── */}
        <InternalPageHero
          title="Royal Wedding Planners"
          titleHighlight="Saudi Arabia"
          subtitle="Bespoke royal wedding architecture for the Kingdom's most distinguished families — Nikah, Walima, Zaffa, Laylat al-Henna, and Milka ceremonies crafted to perfection at the finest palace venues in Riyadh, Jeddah, AlUla, and NEOM."
          backgroundImage="/wedding_stage_backdrop_decor.webp"
          imageAlt="Royal wedding ceremony Saudi Arabia — grand ballroom with floral arches and gold details"
          badge="حفلات الأعراس الملكية | Royal Weddings"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Luxury Weddings", href: "/services/weddings" },
            { label: "Royal Weddings" },
          ]}
          minHeight="large"
          trustElements={[
            { value: "15+", label: "Years of Royal Expertise" },
            { value: "500+", label: "Royal Celebrations Delivered" },
            { value: "12", label: "Cities Across Saudi Arabia" },
          ]}
        />

        {/* ── QUICK CTA BAR ── */}
        <div className="bg-white border-b border-neutral-100 py-6">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/consultation"
              className="inline-block px-10 py-4 bg-[var(--primary)] text-slate-900 font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg text-sm"
            >
              Begin Your Royal Consultation
            </Link>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 border border-slate-300 text-slate-700 font-semibold uppercase tracking-widest hover:border-[var(--primary)] transition-all text-sm"
            >
              Private Enquiry
            </Link>
          </div>
        </div>

        {/* ── SEMANTIC INTRODUCTION ── */}
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Image mosaic */}
              <div className="flex flex-col gap-4">
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/gallery_wedding_reception.webp"
                    alt="Royal wedding reception hall — grand chandeliers, gold décor, Riyadh five-star venue"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                    <Image
                      src="/luxury_wedding_table_setting.webp"
                      alt="Royal wedding table setting — gold-rimmed china, crystal glasses, and fresh floral centrepiece"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                    <Image
                      src="/luxury_wedding_couple_guests.webp"
                      alt="Royal wedding guests at a luxury Saudi ceremony — traditional dress and formal setting"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>

              {/* Semantic prose */}
              <div className="space-y-7">
                <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold">
                  Saudi Arabia&apos;s Premier Royal Wedding Architects
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                  Every Royal Ceremony. <br />
                  <span className="text-[var(--primary)]">Every Sacred Tradition.</span>
                </h1>
                <div className="space-y-5 text-gray-600 text-base leading-relaxed font-light">
                  <p>
                    A <strong className="text-slate-900">royal wedding in Saudi Arabia</strong> is not a
                    single event — it is a multi-day ceremonial journey that weaves together the{" "}
                    <strong className="text-slate-900">Milka</strong> betrothal, the intimate{" "}
                    <strong className="text-slate-900">Laylat al-Henna</strong>, the sacred{" "}
                    <strong className="text-slate-900">Aqd al-Nikah</strong>, the exhilarating{" "}
                    <strong className="text-slate-900">Zaffa procession</strong>, and the grand{" "}
                    <strong className="text-slate-900">Walima feast</strong> into one seamless narrative
                    of cultural magnificence.
                  </p>
                  <p>
                    For over 15 years, Saudi Event Management has served as the trusted{" "}
                    <strong className="text-slate-900">royal wedding planner</strong> for distinguished
                    Saudi families — delivering flawless ceremonies at the{" "}
                    <strong className="text-slate-900">Ritz-Carlton Riyadh</strong>,{" "}
                    <strong className="text-slate-900">Waldorf Astoria Jeddah</strong>,{" "}
                    <strong className="text-slate-900">Sharaan Resort AlUla</strong>, and exclusive
                    palace venues across the Kingdom. Our approach honours the depth of Saudi tradition
                    while curating the precision of international luxury.
                  </p>
                  <p>
                    Whether you are planning an intimate 300-guest{" "}
                    <strong className="text-slate-900">Nikah ceremony in Riyadh</strong> or a
                    3,000-guest imperial{" "}
                    <strong className="text-slate-900">Walima reception at a destination venue in
                    AlUla</strong>, our team provides the same commitment to ceremonial excellence,
                    royal protocol mastery, and absolute discretion.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-[var(--primary)] font-bold text-sm mb-1">مخطط أفراح ملكي</p>
                    <p className="text-gray-500 text-xs font-light">Expert cultural consultants fluent in Saudi royal ceremonial traditions.</p>
                  </div>
                  <div>
                    <p className="text-[var(--primary)] font-bold text-sm mb-1">Preferred Venue Partners</p>
                    <p className="text-gray-500 text-xs font-light">Preferred-partner status with all major five-star venues across KSA.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <section className="py-10 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-[var(--primary)]">15+</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-600 leading-tight">Years of<br/>Royal Expertise</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-[var(--primary)]">500+</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-600 leading-tight">Royal Celebrations<br/>Delivered</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-[var(--primary)]">4.9★</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-600 leading-tight">Average Client<br/>Rating (148 reviews)</span>
              </div>
              <div className="flex gap-8 grayscale opacity-40 items-center">
                <span className="text-xs font-bold tracking-widest">RITZ-CARLTON</span>
                <span className="text-xs font-bold tracking-widest">FOUR SEASONS</span>
                <span className="text-xs font-bold tracking-widest">WALDORF ASTORIA</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── CEREMONY SPECTRUM ── */}
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-4 block">
                The Royal Wedding Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Six Ceremonies. <span className="text-[var(--primary)]">One Seamless Narrative.</span>
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
                Saudi royal weddings are multi-day celebrations built on six sacred ceremonies. We plan,
                produce, and perfect every one — from the intimate Milka gathering to the imperial Walima
                feast.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ceremonies.map((c, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-[var(--primary)]/40 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/8 flex items-center justify-center group-hover:bg-[var(--primary)] transition-colors flex-shrink-0">
                      <c.icon size={22} className="text-[var(--primary)] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{c.name}</h3>
                      <span className="text-xs text-[var(--primary)] font-medium">{c.arabic}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES GRID ── */}
        <section className="py-28 bg-neutral-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-4 block">
                Royal Service Suite
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Complete Royal Wedding <span className="text-[var(--primary)]">Capabilities</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="bg-white p-7 rounded-2xl border border-slate-200 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/8 flex items-center justify-center mb-5 group-hover:bg-[var(--primary)] transition-colors">
                    <s.icon size={22} className="text-[var(--primary)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-3">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ROYAL VENUES ── */}
        <section id="venues" className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-4 block">
                Venue Authority
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Best Royal Wedding <span className="text-[var(--primary)]">Venues in Saudi Arabia</span>
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">
                Preferred-partner access to the Kingdom's most prestigious palace hotels, resort properties,
                and UNESCO-heritage destinations.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {venues.map((v) => (
                <div key={v.city} className={`${v.color} text-white rounded-2xl p-8`}>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="text-xl font-bold">{v.city}</h3>
                      <span className="text-sm text-white/60">{v.arabic}</span>
                    </div>
                    <span className="text-[10px] bg-white/10 text-white/80 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                      {v.tag}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {v.properties.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                        <CheckCircle2 size={14} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW WE PLAN ── */}
        <section className="py-28 bg-neutral-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-4 block">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                How We Plan a <span className="text-[var(--primary)]">Royal Wedding</span>
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">
                A six-stage methodology refined across 500+ royal celebrations — from initial NDA consultation
                to post-wedding cinematic archive.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planningSteps.map((step, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-md transition-all"
                >
                  <div className="text-4xl font-bold text-[var(--primary)]/20 mb-4">{step.step}</div>
                  <h3 className="font-bold text-slate-900 text-base mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-4 block">
                Royal Wedding Packages Saudi Arabia
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Three Tiers of <span className="text-[var(--primary)]">Royal Excellence</span>
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm">
                From intimate elite celebrations to 3,000-guest imperial spectacles. Every package is bespoke
                — these are starting frameworks, not constraints.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {packages.map((pkg, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-8 flex flex-col border ${
                    pkg.highlight
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-900 border-slate-200"
                  } hover:shadow-xl transition-all`}
                >
                  <div className="mb-6">
                    <span className={`text-xs uppercase tracking-widest font-bold ${pkg.highlight ? "text-[var(--primary)]" : "text-[var(--primary)]"}`}>
                      {pkg.arabic}
                    </span>
                    <h3 className={`text-2xl font-bold mt-1 ${pkg.highlight ? "text-white" : "text-slate-900"}`}>
                      {pkg.tier}
                    </h3>
                    <p className={`text-sm mt-1 ${pkg.highlight ? "text-white/60" : "text-gray-400"}`}>
                      {pkg.guests}
                    </p>
                    <p className={`text-xl font-bold mt-3 ${pkg.highlight ? "text-[var(--primary)]" : "text-slate-900"}`}>
                      {pkg.price}
                    </p>
                  </div>
                  <ul className="space-y-3 flex-1">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle2
                          size={14}
                          className="text-[var(--primary)] mt-0.5 flex-shrink-0"
                        />
                        <span className={pkg.highlight ? "text-white/80" : "text-gray-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/consultation"
                    className={`mt-8 block text-center py-3 px-6 font-bold text-sm uppercase tracking-widest transition-all ${
                      pkg.highlight
                        ? "bg-[var(--primary)] text-slate-900 hover:opacity-90"
                        : "border border-slate-200 text-slate-900 hover:border-[var(--primary)]/40 hover:bg-neutral-50"
                    }`}
                  >
                    Request Proposal
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARABIC AUTHORITY SECTION ── */}
        <section className="py-28 bg-emerald-950 text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                نصنع <span className="text-[var(--primary)]">الأعراس الملكية</span> في قلب المملكة
              </h2>
              <p className="text-white/60 text-sm max-w-2xl mx-auto">
                شركة سعودي إيفنت مانجمنت — المتخصصة في تخطيط وتنظيم الأعراس الملكية الفاخرة لأرقى العائلات السعودية
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { ar: "مخطط أفراح ملكي الرياض", en: "Royal Wedding Planner Riyadh", desc: "أفضل مخطط أفراح ملكي في الرياض لأرقى المناسبات والاحتفالات الفاخرة." },
                { ar: "تنظيم أعراس ملكية جدة", en: "Royal Weddings Jeddah", desc: "تنظيم حفلات الأعراس الملكية في جدة مع إطلالات البحر الأحمر الخلابة." },
                { ar: "وليمة زواج فاخرة", en: "Luxury Walima Reception", desc: "تنظيم وليمة الزواج الملكية لضيوف VIP بأرقى المستويات في المملكة." },
                { ar: "زفة عريس تقليدية", en: "Traditional Zaffa KSA", desc: "زفة عريس أصيلة بالنشيد والطبل والمزمار والعرضة السعودية التراثية." },
              ].map((item) => (
                <div key={item.en} className="border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                  <h3 className="text-[var(--primary)] font-bold text-base mb-2">{item.ar}</h3>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-3">{item.en}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Deep Arabic semantic prose for NLP coverage */}
            <div className="mt-12 bg-white/5 rounded-2xl p-8 text-right" dir="rtl">
              <h3 className="text-xl font-bold text-white mb-4">
                خبرة <span className="text-[var(--primary)]">15 عاماً</span> في تنظيم الأعراس الملكية السعودية
              </h3>
              <p className="text-white/60 text-sm leading-loose">
                نحن في سعودي إيفنت مانجمنت نفخر بكوننا المرجع الأول لتخطيط وتنظيم الأعراس الملكية في المملكة
                العربية السعودية. نتولى إدارة كافة مراحل الحفل الملكي — من عقد القران وليلة الحناء إلى زفة
                العريس بالعرضة السعودية وصولاً إلى وليمة الزواج الكبرى لآلاف المدعوين. نتعامل بسرية تامة مع
                الأسر المالكة والعائلات السعودية الكريمة، وننفذ مناسباتهم في أرقى القصور والفنادق الفاخرة في
                الرياض وجدة والعُلا ونيوم.
              </p>
            </div>
          </div>
        </section>

        {/* ── E-E-A-T: EXPERT TEAM ── */}
        <section className="py-28 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-4 block">
                Experience · Expertise · Authoritativeness · Trust
              </span>
              <h2 className="text-3xl font-bold text-slate-900">
                Our Royal Wedding <span className="text-[var(--primary)]">Expert Team</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Fatima Al-Rashid",
                  title: "Senior Royal Wedding Consultant",
                  arabic: "مستشارة الأفراح الملكية",
                  bio: "15 years specialising in Saudi royal and HNWI wedding ceremonies. Expert in traditional Nikah protocol, Walima logistics, and dual-reception management.",
                },
                {
                  name: "Nora Al-Ghamdi",
                  title: "Ceremonial Design Director",
                  arabic: "مديرة التصميم الاحتفالي",
                  bio: "Award-winning floral and décor designer with a portfolio spanning Ritz-Carlton Riyadh and Waldorf Astoria Jeddah. Specialises in royal-scale bespoke installations.",
                },
                {
                  name: "Khalid Al-Otaibi",
                  title: "Royal Protocol & VIP Manager",
                  arabic: "مدير البروتوكول الملكي",
                  bio: "Former Ministry of Protocol official. Manages VIP seating, tribal elder hospitality, diplomatic guest coordination, and security briefings for royal celebrations.",
                },
              ].map((member, i) => (
                <div key={i} className="bg-neutral-50 rounded-2xl p-8 border border-slate-100">
                  <div className="w-14 h-14 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-5">
                    <Users size={24} className="text-[var(--primary)]" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{member.name}</h3>
                  <p className="text-[var(--primary)] text-xs font-semibold uppercase tracking-wide mt-1 mb-1">{member.title}</p>
                  <p className="text-gray-400 text-xs mb-4">{member.arabic}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-28 bg-neutral-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Royal Wedding <span className="text-[var(--primary)]">FAQs</span>
              </h2>
              <p className="text-gray-500 mt-4 text-sm">
                Authoritative answers to the most common questions about royal wedding planning in Saudi Arabia.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-base mb-3">{faq.q}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTERNAL LINKING ── */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-sm font-bold text-slate-900 mb-8 uppercase tracking-widest">
              Related Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Luxury Weddings",
                  slug: "weddings",
                  desc: "Full-service luxury wedding planning across Riyadh, Jeddah, and Dammam for every scale.",
                },
                {
                  title: "Luxury & VIP Events",
                  slug: "luxury-vip-events",
                  desc: "Ultra-discreet private events for royal families, HNWIs, and diplomatic guests.",
                },
                {
                  title: "Destination Events",
                  slug: "destination-events",
                  desc: "Royal destination weddings in AlUla, NEOM, and the Red Sea — managed end-to-end.",
                },
                {
                  title: "Event Production",
                  slug: "event-production",
                  desc: "Stage, AV, lighting, and full technical production for any royal wedding scale.",
                },
              ].map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-md transition-all"
                >
                  <h4 className="text-slate-900 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{rel.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">
                    Explore <ChevronRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── From Our Blog ── */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-slate-900 mb-8 uppercase tracking-widest">Royal Wedding Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Crafting Unforgettable Royal Weddings in Saudi Arabia", slug: "crafting-unforgettable-royal-weddings-saudi-arabia", desc: "Explore the essence of a royal Saudi wedding and how Vision 2030 is shaping grand celebrations." },
                { title: "How Much Does a Wedding Cost in Saudi Arabia? (2026 Guide)", slug: "exceptional-wedding-cost-saudi-arabia-guide", desc: "A comprehensive 2026 cost breakdown comparing bespoke Riyadh vs AlUla wedding planning." },
                { title: "Destination Weddings in AlUla & The Red Sea", slug: "destination-weddings-alula-red-sea", desc: "Move beyond the ballroom — bespoke desert ceremonies in AlUla and Red Sea beachfront weddings." },
                { title: "Best Wedding Venues in Jeddah 2026", slug: "best-wedding-venues-jeddah-2026", desc: "Complete guide to Jeddah's best wedding venues — waterfront spaces and exceptional hotel ballrooms." },
                { title: "Why Saudi Arabia is the New Global Destination for Weddings", slug: "destination-wedding-planning-guide", desc: "From AlUla to NEOM, discover why Vision 2030 has made Saudi Arabia the ultimate wedding destination." },
              ].map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[var(--primary)]/30 hover:shadow-md transition-all"
                >
                  <span className="text-[var(--primary)] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 block">Wedding Guide</span>
                  <h4 className="text-slate-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">{post.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{post.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">Read Article <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
