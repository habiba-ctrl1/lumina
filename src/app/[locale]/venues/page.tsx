import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Venue Portfolio — Saudi Event Management",
  description: "A showcase of premier destination venues in AlUla curated by Saudi Event Management.",
  robots: { index: false, follow: false },
};

const venues = [
  {
    slug: "alfursan-equestrian-village",
    name: "AlFursan Equestrian Village",
    tagline: "Heritage meets equestrian excellence",
    image: "/venues/alfursan_p2_1.jpeg",
  },
  {
    slug: "almughayra-heritage-sport-village",
    name: "AlMughayra Heritage Sport Village",
    tagline: "Traditional sports, camel racing & cultural events",
    image: "/venues/almughayra_p2_1.jpeg",
  },
];

export default function VenuesIndexPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden font-sans">
      <Navbar />

      <div className="fixed top-0 inset-x-0 z-[200] bg-amber-500 text-white text-center text-[12px] sm:text-[13px] font-bold tracking-widest uppercase py-2 shadow-md">
        DRAFT — Internal Proposal
      </div>

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-24 flex flex-col justify-center items-center overflow-hidden bg-neutral-900">
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
            Venue <span className="text-emerald-400">Portfolio</span>
          </h1>
          <p className="text-neutral-300 text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed font-light">
            Destination assets curated by Saudi Event Management for premium hosting in AlUla.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {venues.map((v) => (
            <Link
              key={v.slug}
              href={`/venues/${v.slug}`}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] block shadow-lg"
            >
              <Image
                src={v.image}
                alt={v.name}
                fill
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-8">
                <span className="flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-emerald-400 mb-3">
                  <MapPin size={14} /> AlUla
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{v.name}</h2>
                <p className="text-neutral-300 text-[15px] font-light mb-4">{v.tagline}</p>
                <span className="inline-flex items-center gap-2 text-white text-[14px] font-medium">
                  View Venue <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
