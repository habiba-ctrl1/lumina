// Lead "lanes" — a display-only sort of incoming queries by the SERVICE they are about,
// so a solo founder can see at a glance what each query is and who should handle it.
// Pure keyword logic over existing Inquiry fields: no schema change, nothing is written.
// The lane is a SUGGESTION shown in the admin UI; it never reroutes or edits a lead.

export type LaneKey =
  | "vip_transport"
  | "cross_border"
  | "valet"
  | "birthday"
  | "nikkah_wedding"
  | "decor"
  | "catering"
  | "henna"
  | "mascot"
  | "booth"
  | "led"
  | "av_production"
  | "venue"
  | "corporate"
  | "other"
  | "not_client";

export type Lane = {
  key: LaneKey;
  label: string;
  /** Tailwind classes for the badge */
  tone: string;
  /** Small, quick-to-close requirement types — the founder's "high converting" list */
  quickWin: boolean;
  /** Keyword patterns (lower-case, English + common Arabic) */
  patterns: RegExp[];
};

export const LANES: Lane[] = [
  {
    key: "not_client",
    label: "Not a client",
    tone: "bg-slate-100 text-slate-500 border-slate-200",
    quickWin: false,
    patterns: [
      /looking for a job|job as|iqama|iqamah|\bcv\b|resume|vacanc|hiring|اوظيفة|وظيفة/,
      /optimi[sz]ing their online|seo (services|audit)|web ?design|website (design|development)|guest post|backlink|digital marketing|social media (management|marketing)/,
      /we are pleased to introduce our company|introduce our company|our company (provides|offers|specializ)|we (supply|provide|offer) .*(rental|supply|services)|portfolio:|reliable provider|i am a .*(artist|editor|dj|photographer|graduate)|i perform as|need to work with your team|available internationally/,
      /تسرنا|يسعدنا أن نكون جزءًا|نقدم خدمات|شركة متخصصة/,
    ],
  },
  {
    key: "cross_border",
    label: "Cross-border ride",
    tone: "bg-indigo-50 text-indigo-700 border-indigo-100",
    quickWin: true,
    patterns: [
      /(dubai|uae|abu dhabi|bahrain|qatar|doha|kuwait|oman|muscat|jordan|amman).{0,40}(riyadh|jeddah|dammam|khobar|saudi|ksa|kuwait|dubai|bahrain|qatar)/,
      /(riyadh|jeddah|dammam|khobar|saudi|ksa).{0,40}(dubai|uae|abu dhabi|bahrain|qatar|doha|kuwait|oman)/,
      /cross[- ]border|gcc (transfer|ride|trip)|intercity (ride|transfer)|king fahd causeway|الكويت.{0,20}(دبي|الرياض)|دبي.{0,20}(الكويت|الرياض)/,
    ],
  },
  {
    key: "vip_transport",
    label: "VIP transport",
    tone: "bg-sky-50 text-sky-700 border-sky-100",
    quickWin: true,
    patterns: [
      /airport (pick|transfer|drop)|chauffeur|limousine|limo\b|\bvip (car|transport|transfer|ride)|executive (car|transport)|delegate (transport|transfer)|guest (transport|transfer)|shuttle|gmc|suburban|rolls|بيك اب|توصيل|سائق|ليموزين|نقل (vip|ضيوف)/,
    ],
  },
  {
    key: "valet",
    label: "Valet parking",
    tone: "bg-cyan-50 text-cyan-700 border-cyan-100",
    quickWin: true,
    patterns: [/valet|car park(ing)? (service|attendant)|صف سيارات|فاليه/],
  },
  {
    key: "henna",
    label: "Henna / mehndi",
    tone: "bg-orange-50 text-orange-700 border-orange-100",
    quickWin: true,
    patterns: [/henna|mehndi|mehendi|mehandi|نقش|حناء|حنة|نقاشة/],
  },
  {
    key: "mascot",
    label: "Mascots / kids",
    tone: "bg-pink-50 text-pink-700 border-pink-100",
    quickWin: true,
    patterns: [/mascot|rainbow party|kids (party|entertain)|clown|face paint|bouncy|بالونات|ماسكوت|شخصيات كرتون|حفلة اطفال|حفل أطفال/],
  },
  {
    key: "birthday",
    label: "Birthday / private",
    tone: "bg-rose-50 text-rose-700 border-rose-100",
    quickWin: true,
    patterns: [/birthday|b-?day|baby shower|gender reveal|engagement|anniversary|surprise (party|setup)|عيد ميلاد|يوم ميلاد|خطوبة|حفل (صغير|خاص)/],
  },
  {
    key: "nikkah_wedding",
    label: "Nikkah / wedding",
    tone: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100",
    quickWin: false,
    patterns: [/nikkah|nikah|wedding|bride|groom|walima|mehndi night|زواج|عرس|نكاح|زفاف|عقد قران/],
  },
  {
    key: "decor",
    label: "Decor / setup",
    tone: "bg-amber-50 text-amber-700 border-amber-100",
    quickWin: true,
    patterns: [/decor|setup|set-up|backdrop|flowers|floral|balloon|kosha|stage design|تنسيق|ديكور|كوشة|زهور/],
  },
  {
    key: "catering",
    label: "Catering",
    tone: "bg-lime-50 text-lime-700 border-lime-100",
    quickWin: true,
    patterns: [/cater|buffet|coffee break|lunch box|boxed lunch|gala dinner food|food (for|service)|بوفيه|ضيافة|تموين|قهوة|عشاء/],
  },
  {
    key: "booth",
    label: "Booth / stand",
    tone: "bg-violet-50 text-violet-700 border-violet-100",
    quickWin: false,
    patterns: [/booth|stand (design|build)|exhibition (stand|booth)|custom stand|جناح|معرض/],
  },
  {
    key: "led",
    label: "LED screens",
    tone: "bg-blue-50 text-blue-700 border-blue-100",
    quickWin: true,
    patterns: [/led (screen|wall|display)|video wall|شاشة|شاشات/],
  },
  {
    key: "av_production",
    label: "AV / production",
    tone: "bg-teal-50 text-teal-700 border-teal-100",
    quickWin: false,
    patterns: [/\bav\b|audio ?visual|sound|lighting|stage|staging|production|projector|translation|interpret|conference (setup|tech)|إنتاج|صوتيات|إضاءة|مسرح/],
  },
  {
    key: "venue",
    label: "Venue",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
    quickWin: false,
    patterns: [/venue|ballroom|hall (for|rental)|hotel (hall|ballroom)|قاعة|قاعات|فندق/],
  },
  {
    key: "corporate",
    label: "Corporate event",
    tone: "bg-slate-50 text-slate-700 border-slate-200",
    quickWin: false,
    patterns: [/corporate|conference|summit|gala|team[- ]?building|product launch|brand activation|investor|launch event|award|شركة|مؤتمر|تدشين|حفل/],
  },
];

const OTHER_LANE: Lane = {
  key: "other",
  label: "Other",
  tone: "bg-slate-50 text-slate-500 border-slate-200",
  quickWin: false,
  patterns: [],
};

export type LaneInput = {
  eventType?: string | null;
  message?: string | null;
  source?: string | null;
  company?: string | null;
};

const VENDOR_SOURCES = ["vendor_registration", "become_one_partnership", "vendor_inquiry"];

export function laneFor(input: LaneInput): Lane {
  const source = (input.source || "").toLowerCase();
  const eventType = (input.eventType || "").toLowerCase();
  if (VENDOR_SOURCES.includes(source) || eventType.includes("vendor")) {
    // Vendor pitches arrive through the same forms — keep them out of the client lanes.
    const text = `${eventType} ${input.message || ""}`.toLowerCase();
    return LANES.find((l) => l.key === "not_client")!.patterns.some((p) => p.test(text)) || VENDOR_SOURCES.includes(source)
      ? LANES.find((l) => l.key === "not_client")!
      : OTHER_LANE;
  }

  const text = `${eventType} ${(input.message || "").slice(0, 1500)}`.toLowerCase();

  // Solicitations / job seekers / pitches first — they often mention "events" generically.
  const spam = LANES.find((l) => l.key === "not_client")!;
  if (spam.patterns.some((p) => p.test(text))) return spam;

  for (const lane of LANES) {
    if (lane.key === "not_client") continue;
    if (lane.patterns.some((p) => p.test(text))) return lane;
  }
  return OTHER_LANE;
}

export function laneByKey(key: LaneKey): Lane {
  return LANES.find((l) => l.key === key) || OTHER_LANE;
}

/** Next sensible action for a lead, shown as a one-liner. Pure suggestion. */
export function nextStepFor(status: string | undefined, lane: Lane, hasPhone: boolean): string {
  const s = status || "Pending";
  if (lane.key === "not_client") return "Ignore or archive";
  if (s === "Pending") return hasPhone ? "WhatsApp them today, then ask vendor for a quote" : "Email them, ask for a WhatsApp number";
  if (s === "Contacted") return "Chase vendor quote / send client quote";
  if (s === "Confirmed") return "Track delivery & payment";
  return "—";
}
