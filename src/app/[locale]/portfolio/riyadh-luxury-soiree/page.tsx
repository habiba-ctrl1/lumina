"use client";

import Navbar from "@/components/Navbar";
import CaseStudySchema from "@/components/CaseStudySchema";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, GlassWater, Music, Sparkles, Camera } from "lucide-react";


export default function RiyadhLuxurySoiree() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />
      <CaseStudySchema slug="riyadh-luxury-soiree" />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-neutral-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/portfolio/riyadh-soiree.webp" 
            alt="Riyadh Luxury Soiree" 
            fill
            sizes="100vw"
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Link href="/portfolio" className="inline-flex items-center text-[var(--primary)] hover:text-white transition-colors mb-8 text-[10px] uppercase tracking-[0.3em] font-bold">
            <ArrowLeft size={16} className="me-2" /> Back to Portfolio
          </Link>
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block bg-white/10 backdrop-blur-md inline-block px-8 py-3 rounded-full border border-white/20"
          >
            Private Elite Celebration
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-sans font-bold text-white mb-8 leading-tight uppercase tracking-tighter">
            Riyadh <span className="text-[var(--primary)] ">Luxury</span> Soiree
          </h1>
          <p className="text-neutral-600 text-xl font-light max-w-2xl mx-auto leading-relaxed">Redefining the boundaries of private entertainment. A night of avant-garde design and sensory wonder.</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-32 bg-white border-y border-neutral-200/80 relative z-20 -mt-24 mx-4 md:mx-auto max-w-6xl rounded-[4rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8 md:px-16">
          {[
            { icon: Sparkles, label: "Theme", val: "Avant-Garde" },
            { icon: GlassWater, label: "Dining", val: "Michelin Style" },
            { icon: Music, label: "Sound", val: "Live Orchestra" },
            { icon: Camera, label: "Media", val: "Private Film" }
          ].map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <stat.icon size={32} className="text-[var(--primary)] mx-auto mb-8" />
              <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 mb-2 font-bold">{stat.label}</div>
              <div className="text-base font-sans font-bold text-neutral-900 uppercase">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-600 font-light text-lg leading-relaxed space-y-32">
        
        {/* The Brief */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">The <span className="text-[var(--primary)] ">Ambition</span></h2>
            <p className="mb-8">
              A private client sought to host a soiree that would be remembered as a cultural milestone in Riyadh's social calendar. The requirement was to transcend traditional luxury and enter the realm of the "immersive masterpiece."
            </p>
            <p>
              We transformed a private estate into a multi-sensory journey, featuring kinetic art installations, holographic performances, and a dining experience that evolved with the music throughout the night.
            </p>
          </div>
          <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl border-8 border-neutral-200/80">
            <Image src="/gallery_1.webp" alt="Soiree Ambience" width={800} height={800} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Masterful Execution */}
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: "Kinetic Decor", desc: "Ceiling installations that moved in sync with the live orchestra, creating a 'living' environment." },
            { title: "Gourmet Theater", desc: "A 10-course tasting menu where each dish was introduced by a bespoke digital projection on the table." },
            { title: "Elite Privacy", desc: "Implementation of a 'No-Phone' protocol with secure digital lockers to ensure absolute privacy for VVIP guests." }
          ].map((item: any, i: number) => (
            <div key={i} className="p-12 bg-white rounded-[3rem] border border-neutral-200/80 hover:shadow-2xl transition-all group">
              <div className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[var(--primary)] transition-colors">
                <CheckCircle2 size={24} className="text-white" />
              </div>
              <h3 className="text-neutral-900 text-sm font-bold uppercase tracking-widest mb-8">{item.title}</h3>
              <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Impact */}
        <div className="bg-neutral-900 text-white p-12 md:p-32 rounded-[5rem] text-center relative overflow-hidden">
          <div className="absolute top-0 start-0 w-full h-full opacity-30">
            <Image src="/portfolio/riyadh-soiree.webp" alt="Background" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-sans font-bold mb-10 uppercase tracking-tight">A Night of <span className="text-[var(--primary)] ">Wonder</span></h3>
            <p className="text-neutral-600 text-xl max-w-3xl mx-auto font-light leading-relaxed mb-16">
              The soiree set a new standard for private celebrations in the Kingdom. It was not just a party; it was an exhibition of the possible, blending the finest hospitality with the most advanced production techniques in the world.
            </p>
            <div className="flex justify-center gap-16">
              <div>
                <div className="text-3xl font-bold text-[var(--primary)]">100%</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mt-2">Privacy Maintained</div>
              </div>
              <div className="w-px h-16 bg-white/10" />
              <div>
                <div className="text-3xl font-bold text-[var(--primary)]">VVIP</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mt-2">Guest Tier</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[var(--surface-raised)] border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-xs font-bold text-neutral-500 mb-6 uppercase tracking-widest">Related Services</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/services/luxury-vip-events" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Luxury &amp; VIP Events
            </Link>
            <Link href="/services/weddings" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Luxury Wedding Planning
            </Link>
            <Link href="/services/event-production" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Event Production
            </Link>
            <Link href="/locations/riyadh" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Exclusive Events in Riyadh
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center bg-white">
        <h3 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">Host Your <span className="text-[var(--primary)] ">Private Masterpiece</span></h3>
        <Link
          href="/contact"
          className="inline-block px-12 py-6 bg-neutral-900 text-white font-bold uppercase tracking-[0.2em] hover:bg-[var(--primary)] transition-all rounded-xl shadow-2xl text-xs"
        >
          Request a Private Briefing
        </Link>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
