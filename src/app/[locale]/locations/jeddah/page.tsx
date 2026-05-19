import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Anchor, Waves, Camera, Building } from "lucide-react";

export const metadata = {
  title: 'Luxury Events in Jeddah',
  description: 'Exquisite event planning in Jeddah. Specialists in Red Sea coastal weddings, corporate summits in the financial district, and luxury private parties.',
  keywords: 'event management Jeddah, Jeddah weddings, corporate events Jeddah, Red Sea events, luxury planners Jeddah',
  alternates: { canonical: 'https://saudieventmanagement.com/locations/jeddah' },
};

export default function JeddahPage() {
  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/gallery_corporate_gala.webp" 
            alt="Luxury Event Management Jeddah - Red Sea Coastline" 
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/60 to-slate-50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="section-label">
            The Bride of the Red Sea | Jeddah
          </span>
          <h1 className="font-display font-medium text-slate-900 mb-6 leading-tight text-3xl md:text-5xl">
            Coastal Elegance & <br/><span className="text-shimmer italic font-semibold">Bespoke Galas</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            From the mesmerizing spray of <span className="text-slate-900 font-semibold">King Fahd&apos;s Fountain</span> to the historic soul of <span className="text-slate-900 font-semibold">Al-Balad</span>, we design events that breathe with the spirit of Jeddah.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="btn-primary hover:scale-105 transition-all shadow-sm rounded-sm"
            >
              Consult Our Jeddah Team
            </Link>
            <Link
              href="/portfolio"
              className="btn-outline hover:scale-105 transition-all rounded-sm"
            >
              Jeddah Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* City Landmarks & Expertise */}
      <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1 relative aspect-[4/5] rounded-sm overflow-hidden border border-slate-200/80 shadow-md">
            <Image src="/gallery_garden_party.webp" alt="Al-Balad Jeddah Event" width={800} height={1000} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
               <div className="glass p-6 rounded-sm">
                 <p className="text-white text-sm font-display italic font-light">&quot;Where the heritage of the past meets the luxury of the future.&quot;</p>
               </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="section-label">Event Venues Jeddah</span>
            <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">Red Sea <span className="text-shimmer italic">Grandeur</span></h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              Jeddah&apos;s vibrant energy is matched only by its stunning coastal backdrop. We excel in planning high-end waterfront weddings on the <span className="text-slate-950 font-semibold">Jeddah Corniche</span> and intimate, soulful gatherings within the coral-stone walls of <span className="text-slate-950 font-semibold">Al-Balad</span>. Our team understands the unique rhythm of the Hijaz region.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Waves, title: "Waterfront Galas", text: "Luxury yacht parties and seaside ballroom celebrations." },
                { icon: Building, title: "Historic Heritage", text: "Exclusive events in Al-Balad's meticulously restored mansions." },
                { icon: Anchor, title: "Yacht Concierge", text: "Bespoke private celebrations on the Red Sea's elite vessels." },
                { icon: Camera, title: "Cinematic Vibe", text: "Leveraging Jeddah's unique golden hour for perfect events." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2 p-4 bg-white border border-slate-100 rounded-sm shadow-2xs">
                  <item.icon size={20} className="text-emerald-800" />
                  <h3 className="font-display font-medium text-slate-900 text-sm">{item.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Descriptive SEO Section */}
      <section className="py-20 relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display font-medium text-slate-900 mb-8 uppercase tracking-tight text-2xl md:text-3xl">
          The Jeddah <span className="text-shimmer italic">Experience</span>
        </h2>
        <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-6 font-light">
          <p>
            As the spiritual gateway to the Holy Cities and a vibrant hub for global trade, Jeddah offers a unique canvas for luxury events. Our Jeddah-based team specializes in navigating the city&apos;s diverse micro-environments, from the sleek, modern architecture of the Obhur coastline to the historic, coral-stone mansions of Al-Balad. We maintain close partnerships with the city&apos;s most prestigious five-star hotels and private estates, ensuring that our clients have access to the most exclusive venues available.
          </p>
          <p>
            The &quot;Bride of the Red Sea&quot; is known for its sophisticated social scene and appreciation for the arts. Our event designs in Jeddah often incorporate elements of maritime elegance and Hijazi hospitality, blending traditional motifs with contemporary luxury. Whether it is a high-profile corporate product launch during the Jeddah Season or an intimate private celebration overlooking the world&apos;s tallest fountain, Saudi Event Management provides the end-to-end expertise required to manage Jeddah&apos;s unique climate, logistical requirements, and cultural expectations.
          </p>
        </div>
      </section>

      {/* Jeddah Stats */}
      <section className="py-24 bg-slate-100/50 border-t border-b border-slate-200/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Jeddah Weddings", val: "85+" },
              { label: "Waterfront Venues", val: "30+" },
              { label: "Hijazi Experts", val: "8" },
              { label: "Logistics Fleet", val: "Premium" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-display font-medium text-slate-900 mb-2">{stat.val}</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
