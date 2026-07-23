import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Award, MapPin, BookOpen } from "lucide-react";

// ─── Expert Author Profiles ───────────────────────────────────────────────────
// These profiles serve as EEAT trust signals, enabling author attribution
// on blog posts and service pages.
// ─────────────────────────────────────────────────────────────────────────────

const TEAM_PROFILES: Record<
  string,
  {
    name: string;
    nameAr: string;
    slug: string;
    role: string;
    roleAr: string;
    location: string;
    locationAr: string;
    specialisms: string[];
    specialismsAr: string[];
    credentials: string[];
    bio: string[];
    bioAr: string[];
    publications: { title: string; href: string }[];
    services: { name: string; href: string }[];
    image: string;
  }
> = {
  "habiba-asghar": {
    name: "Habiba Asghar",
    nameAr: "حبيبة أصغر",
    slug: "habiba-asghar",
    role: "Founder & CEO",
    roleAr: "المؤسِّسة والرئيسة التنفيذية",
    location: "Riyadh, Saudi Arabia",
    locationAr: "الرياض، المملكة العربية السعودية",
    specialisms: [
      "Luxury Event Strategy",
      "Corporate Event Management",
      "Vendor Network Development",
      "VIP Protocol Management",
      "Vision 2030 Events Alignment",
    ],
    specialismsAr: [
      "استراتيجية الفعاليات الفاخرة",
      "إدارة فعاليات الشركات",
      "تطوير شبكة الموردين",
      "إدارة بروتوكول كبار الشخصيات",
      "مواءمة فعاليات رؤية 2030",
    ],
    credentials: [],
    bio: [
      "Habiba Asghar is the Founder of Saudi Event Management, an event coordination and vendor-sourcing platform connecting clients with a curated network of experienced delivery partners across Saudi Arabia.",
      "Habiba personally oversees Saudi Event Management's vendor vetting and coordination standards — matching client briefs with the right specialist partners for corporate events, luxury weddings, exhibitions, and cultural activations across Riyadh, Jeddah, Dammam, and AlUla.",
      "Her philosophy: every event is a story. The best events don't just happen — they are authored, from the first guest arrival to the final farewell.",
    ],
    bioAr: [
      "حبيبة أصغر هي مؤسِّسة إدارة الفعاليات السعودية، منصة لتنسيق الفعاليات وتوفير الموردين تربط العملاء بشبكة مختارة من شركاء تنفيذ ذوي خبرة في جميع أنحاء المملكة العربية السعودية.",
      "تشرف حبيبة شخصياً على عملية توثيق الموردين ومعايير التنسيق في إدارة الفعاليات السعودية — لمطابقة احتياجات كل عميل مع الشريك المتخصص المناسب لفعاليات الشركات، وحفلات الزفاف الفاخرة، والمعارض، والتفعيلات الثقافية في الرياض وجدة والدمام والعُلا.",
      "فلسفتها: كل فعالية قصة. أفضل الفعاليات لا تحدث صدفة — بل تُؤلَّف، من لحظة وصول أول ضيف وحتى الوداع الأخير.",
    ],
    publications: [
      { title: "How Much Does a Luxury Wedding Cost in Saudi Arabia? (2026 Guide)", href: "/blog/luxury-wedding-cost-saudi-arabia-guide" },
      { title: "MICE Tourism Saudi Arabia 2026: The Complete Industry Guide", href: "/blog/mice-tourism-saudi-arabia-complete-guide-2026" },
      { title: "The State of the MICE Industry in Saudi Arabia 2026", href: "/blog/state-of-mice-industry-saudi-arabia-2026" },
    ],
    services: [
      { name: "Corporate Events", href: "/services/corporate-events" },
      { name: "Luxury Weddings", href: "/services/weddings" },
      { name: "Conference Management", href: "/services/conferences" },
      { name: "Luxury VIP Events", href: "/services/luxury-vip-events" },
    ],
    image: "/gallery_charity_gala.webp",
  },
};

// Arabic labels for the related-service links (keyed by canonical href).
const SERVICE_NAMES_AR: Record<string, string> = {
  "/services/corporate-events": "فعاليات الشركات",
  "/services/weddings": "حفلات الزفاف الفاخرة",
  "/services/conferences": "إدارة المؤتمرات",
  "/services/luxury-vip-events": "فعاليات كبار الشخصيات الفاخرة",
  "/services/event-production": "إنتاج الفعاليات",
  "/services/production-venues": "قاعات الإنتاج",
  "/services/exhibitions": "المعارض",
  "/services/destination-events": "فعاليات الوجهات",
  "/services/cultural-events": "الفعاليات الثقافية",
};

interface PageProps {
  params: Promise<{ locale: string; name: string }>;
}

/**
 * Canonical (locale-agnostic) slugs of every team-member detail page.
 * Single source of truth — reused by `generateStaticParams` here and by the XML
 * sitemap (so new profiles appear in both without a second edit).
 */
export const teamMemberSlugs = Object.keys(TEAM_PROFILES);

export async function generateStaticParams() {
  return teamMemberSlugs.flatMap((name) => [
    { locale: "en", name },
    { locale: "ar", name },
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, name } = await params;
  const profile = TEAM_PROFILES[name];
  if (!profile) return {};

  const isAr = locale === "ar";
  const dName = isAr ? profile.nameAr : profile.name;
  const dRole = isAr ? profile.roleAr : profile.role;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/about/our-team/${name}`;
  return {
    title: `${dName} — ${dRole} | ${isAr ? "إدارة الفعاليات السعودية" : "Saudi Event Management"}`,
    description: isAr
      ? `${dName} هي/هو ${dRole} في إدارة الفعاليات السعودية، ومتخصص(ة) في ${profile.specialismsAr.slice(0, 3).join("، ")}.`
      : `${profile.name} is ${profile.role} at Saudi Event Management, specialising in ${profile.specialisms.slice(0, 3).join(", ")}.`,
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates(`/about/our-team/${name}`),
    },
    openGraph: {
      title: `${dName} — ${dRole}`,
      description: isAr ? profile.bioAr[0] : profile.bio[0],
      url: canonicalUrl,
      images: [{ url: profile.image, width: 1200, height: 630, alt: `${dName} — ${dRole} at Saudi Event Management` }],
    },
  };
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { locale, name } = await params;
  const profile = TEAM_PROFILES[name];
  if (!profile) notFound();

  const isAr = locale === "ar";
  const dName = isAr ? profile.nameAr : profile.name;
  const dRole = isAr ? profile.roleAr : profile.role;
  const dLocation = isAr ? profile.locationAr : profile.location;
  const dBio = isAr ? profile.bioAr : profile.bio;
  const dSpecialisms = isAr ? profile.specialismsAr : profile.specialisms;
  const dFirstName = isAr ? profile.nameAr.replace(/^د\.\s*/, "").split(" ")[0] : profile.name.split(" ")[0];

  const canonicalUrl = `https://saudieventmanagement.com/about/our-team/${name}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": canonicalUrl,
        "name": profile.name,
        "jobTitle": profile.role,
        "worksFor": {
          "@type": "Organization",
          "name": "Saudi Event Management",
          "url": "https://saudieventmanagement.com",
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": profile.location.split(",")[0],
          "addressCountry": "SA",
        },
        "knowsAbout": profile.specialisms,
        "description": dBio[0],
        "inLanguage": isAr ? "ar-SA" : "en-US",
        "url": canonicalUrl,
        "image": `https://saudieventmanagement.com${profile.image}`,
        "hasCredential": profile.credentials.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          "name": c,
        })),
        "author": profile.publications.map((p) => ({
          "@type": "Article",
          "name": p.title,
          "url": `https://saudieventmanagement.com${p.href}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
          { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://saudieventmanagement.com/about" },
          { "@type": "ListItem", "position": 3, "name": "Our Team", "item": "https://saudieventmanagement.com/about/our-team" },
          { "@type": "ListItem", "position": 4, "name": profile.name, "item": canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white text-slate-800">
        <WhatsAppButton />
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-10 flex-wrap">
              <Link href="/" className="hover:text-slate-700 transition-colors">{isAr ? "الرئيسية" : "Home"}</Link>
              <ChevronRight size={10} className="rtl:rotate-180" />
              <Link href="/about" className="hover:text-slate-700 transition-colors">{isAr ? "من نحن" : "About"}</Link>
              <ChevronRight size={10} className="rtl:rotate-180" />
              <Link href="/about/our-team" className="hover:text-slate-700 transition-colors">{isAr ? "فريقنا" : "Our Team"}</Link>
              <ChevronRight size={10} className="rtl:rotate-180" />
              <span className="text-slate-900">{dName}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Profile card */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="aspect-[3/4] relative bg-slate-100">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${profile.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-white font-bold text-lg leading-tight">{dName}</p>
                      <p className="text-gold-400 text-xs font-semibold mt-1">{dRole}</p>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <MapPin size={12} className="shrink-0" />
                      <span>{dLocation}</span>
                    </div>
                    {profile.credentials.length > 0 && (
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <Award size={12} className="shrink-0" />
                        <span>{isAr ? `${profile.credentials.length} اعتمادات مهنية` : `${profile.credentials.length} Professional Credentials`}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-500 text-xs" dir={isAr ? "ltr" : "rtl"}>
                      <span className="font-medium text-slate-700">{isAr ? profile.name : profile.nameAr}</span>
                      <span className="text-slate-400">•</span>
                      <span>{isAr ? profile.role : profile.roleAr}</span>
                    </div>
                  </div>
                </div>

                {/* Credentials */}
                {profile.credentials.length > 0 && (
                  <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4">{isAr ? "المؤهلات" : "Credentials"}</h3>
                    <ul className="space-y-2">
                      {profile.credentials.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600 text-xs leading-relaxed">
                          <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bio */}
              <div className="lg:col-span-2">
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)]">{isAr ? "ملف الخبير" : "Expert Profile"}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                  {dName}
                </h1>
                <p className="text-slate-500 text-base mb-8">{dRole}{isAr ? "، إدارة الفعاليات السعودية" : ", Saudi Event Management"}</p>

                <div className="space-y-5 text-slate-600 text-sm leading-relaxed">
                  {dBio.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {/* Specialisms */}
                <div className="mt-10 pt-8 border-t border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-5">{isAr ? "مجالات الخبرة" : "Areas of Expertise"}</h3>
                  <div className="flex flex-wrap gap-2">
                    {dSpecialisms.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-5">{isAr ? "خدمات ذات صلة" : "Related Services"}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {profile.services.map((svc) => (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
                      >
                        <ChevronRight size={12} className="shrink-0 text-[var(--primary)] rtl:rotate-180" />
                        {isAr ? (SERVICE_NAMES_AR[svc.href] ?? svc.name) : svc.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publications */}
        {profile.publications.length > 0 && (
          <section className="py-20 bg-white border-t border-slate-200">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen size={20} className="text-[var(--primary)]" />
                <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest">
                  {isAr ? `مقالات بقلم ${dFirstName}` : `Articles by ${dFirstName}`}
                </h2>
              </div>
              <div className="space-y-4">
                {profile.publications.map((pub, i) => (
                  <Link
                    key={i}
                    href={pub.href}
                    className="group flex items-start gap-4 p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-[var(--primary)]/40 hover:shadow-md transition-all"
                  >
                    <ChevronRight size={16} className="text-[var(--primary)] shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                    <span className="text-slate-900 text-sm font-medium group-hover:text-[var(--primary)] transition-colors">
                      {pub.title}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[var(--primary)] text-sm font-bold mt-2 hover:underline"
                >
                  {isAr ? "عرض جميع المقالات" : "View all articles"} <ChevronRight size={14} className="rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Team CTA */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-slate-500 text-sm mb-1">{isAr ? `هل أنت مستعد للعمل مع ${dFirstName}؟` : `Ready to work with ${dFirstName}?`}</p>
              <p className="text-slate-900 font-bold">{isAr ? "احصل على عرض فعالية مخصّص لمشروعك." : "Get a bespoke event proposal for your project."}</p>
            </div>
            <div className="flex gap-4">
              <Link href="/contact" className="btn-primary rounded-sm shrink-0">{isAr ? "اطلب عرضاً" : "Request Proposal"}</Link>
              <Link href="/about/our-team" className="btn-outline rounded-sm shrink-0">{isAr ? "تعرّف على الفريق" : "Meet the Team"}</Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
