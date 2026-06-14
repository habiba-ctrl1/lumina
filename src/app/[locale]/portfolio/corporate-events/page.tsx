import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import Image from "next/image";
import ScrollProgress from "@/components/ScrollProgress";
import { ArrowRight, Briefcase, Building2, Presentation } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: 'Corporate Event Management Saudi Arabia | Executive Summits',
    description: 'Elite corporate event management in Saudi Arabia. We specialize in executive summits, AGMs, trade shows, and B2B matchmaking across Riyadh, Jeddah, and the GCC.',
    keywords: 'Corporate event management Saudi Arabia, Executive summits Riyadh, AGM planner KSA, B2B event management Jeddah, Trade show organizer',
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/portfolio/corporate-events`,
      languages: { "en-US": `${base}/portfolio/corporate-events`, "ar-SA": `${base}/ar/portfolio/corporate-events` },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": "Corporate Event Management Portfolio",
      "description": "Showcase of elite corporate events, executive summits, and AGMs produced by Saudi Event Management.",
      "url": "https://saudieventmanagement.com/portfolio/corporate-events",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Global Tech Summit Riyadh",
            "url": "https://saudieventmanagement.com/portfolio/global-tech-summit"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Executive Summit Jeddah",
            "url": "https://saudieventmanagement.com/portfolio/executive-summit-jeddah"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Dammam Corporate Seminar",
            "url": "https://saudieventmanagement.com/portfolio/dammam-corporate-seminar"
          }
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://saudieventmanagement.com/portfolio" },
        { "@type": "ListItem", "position": 3, "name": "Corporate Events", "item": "https://saudieventmanagement.com/portfolio/corporate-events" }
      ]
    }
  ]
};

export default async function CorporateEventsPortfolio({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-hidden relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollProgress />
      <Navbar />
      
      <InternalPageHero
        title="Corporate Events Portfolio"
        subtitle="From high-stakes board meetings to massive international trade shows, we provide military-grade logistics and unparalleled production quality for the corporate sector."
        backgroundImage="/riyadh_summit_people.webp"
        imageAlt="Corporate event management Saudi Arabia portfolio"
        badge="Corporate Events Portfolio"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Corporate Events" },
        ]}
        minHeight="standard"
      />

      {/* NLP / GEO Methodology Block */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Briefcase className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Executive Summits</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">End-to-end management of AGMs, C-suite retreats, and shareholder meetings with strict confidentiality protocols.</p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Presentation className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">AV & Rigging</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">State-of-the-art projection mapping, LED screens, and professional stage rigging for maximum audience impact.</p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Building2 className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">B2B Matchmaking</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">Advanced networking technologies and protocol coordination for international delegations and corporate giants.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-24 bg-[var(--surface-raised)]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-12 text-center">Featured Corporate Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Global Tech Summit", loc: "Riyadh", img: "/gallery_2.webp", slug: "global-tech-summit" },
              { title: "Executive Summit", loc: "Jeddah", img: "/gallery_corporate_gala.webp", slug: "executive-summit-jeddah" },
              { title: "Corporate Seminar", loc: "Dammam", img: "/gallery_vip_party.webp", slug: "dammam-corporate-seminar" }
            ].map((item, i) => (
              <Link href={`/portfolio/${item.slug}`} key={i} className="group block bg-white rounded-2xl overflow-hidden border border-neutral-200/80 hover:shadow-lg transition-all">
                <div className="h-64 overflow-hidden relative">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider mb-2">{item.loc}</p>
                  <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-[var(--primary)] transition-colors">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            {isAr ? "التميز في إدارة فعاليات الشركات في المملكة العربية السعودية" : "Excellence in Corporate Event Management in Saudi Arabia"}
          </h2>
          <div className="text-neutral-600 text-[15px] leading-relaxed max-w-4xl space-y-4">
            <p>
              {isAr
                ? "تعد إدارة الفعاليات السعودية الشريك الاستراتيجي الأول لتنظيم وإدارة فعاليات الشركات الكبرى، المؤتمرات التنفيذية، والمعارض الدولية في المملكة العربية السعودية. نحن نتفهم تماماً أن فعاليات الشركات ليست مجرد تجمعات، بل هي منصات حيوية لتعزيز العلامات التجارية، وتوسيع شبكات الأعمال، وعقد الشراكات الاستراتيجية."
                : "Saudi Event Management is the premier strategic partner for organizing and managing large-scale corporate events, executive summits, and international exhibitions across Saudi Arabia. We fully understand that corporate events are not merely gatherings, but vital platforms for brand enhancement, business networking, and forging strategic partnerships."}
            </p>
            <p>
              {isAr
                ? "سواء كنتم تخططون لعقد اجتماع لمجلس الإدارة في الرياض، أو قمة عالمية في جدة، أو ملتقى استثماري في الدمام، فإن فريقنا المكون من خبراء ومنتجين يعمل بتفانٍ لضمان تنفيذ لا تشوبه شائبة. نحن نوفر حلولاً شاملة تتضمن إدارة اللوجستيات المعقدة، تأمين المتحدثين، تخطيط البروتوكول الحكومي والرسمي، وتوفير أحدث التقنيات السمعية والبصرية."
                : "Whether you are planning a board meeting in Riyadh, a global summit in Jeddah, or an investment forum in Dammam, our team of dedicated experts and producers works tirelessly to ensure flawless execution. We provide comprehensive solutions that include complex logistics management, speaker procurement, official government protocol planning, and the provision of cutting-edge audiovisual technologies."}
            </p>
            <p>
              {isAr
                ? "بصفتنا وكالة رائدة تتماشى مع رؤية السعودية 2030، نحرص على تقديم فعاليات مبتكرة ومستدامة تعكس المكانة الاقتصادية المتنامية للمملكة على الساحة العالمية. نحن نضع نجاح أعمالكم في صميم أهدافنا، لتقديم تجارب استثنائية ترتقي بمكانة مؤسستكم أمام شركائكم وعملائكم."
                : "As a leading agency aligned with Saudi Vision 2030, we are committed to delivering innovative and sustainable events that reflect the Kingdom's growing economic prominence on the global stage. We place your business success at the core of our objectives, delivering extraordinary experiences that elevate your organization's standing among partners and clients."}
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden max-w-6xl mx-auto shadow-2xl">
          <div className="absolute inset-0 bg-[url('/riyadh_summit_people.webp')] opacity-10 bg-cover bg-center" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6" style={{ letterSpacing: "-0.025em" }}>Ready to Host Your <span className="text-emerald-400">Next Summit?</span></h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-10 text-[15px] leading-relaxed">
              Let's align our global production standards with your corporate vision.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 font-medium hover:bg-neutral-50 transition-colors rounded-xl text-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.1)] group"
            >
              Request a Corporate Deck
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
