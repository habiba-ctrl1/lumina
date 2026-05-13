"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Users, Clock, Sparkles, HeartHandshake, Globe } from "lucide-react";

const reasons = [
  {
    icon: <ShieldCheck size={28} />,
    title: "Stress-Free Execution",
    desc: "We handle every detail from logistics to last-minute changes, so you can be fully present in the moment.",
  },
  {
    icon: <Users size={28} />,
    title: "Elite Vendor Network",
    desc: "Access our curated network of 200+ premium vendors — florists, caterers, photographers — all vetted for excellence.",
  },
  {
    icon: <Clock size={28} />,
    title: "Timeline Mastery",
    desc: "Our military-precise timeline management ensures zero delays. Every second of your event flows seamlessly.",
  },
  {
    icon: <Sparkles size={28} />,
    title: "Bespoke Design",
    desc: "No templates. Every element is custom-designed to reflect your unique personality, story, and aesthetic vision.",
  },
  {
    icon: <HeartHandshake size={28} />,
    title: "Dedicated Concierge",
    desc: "One dedicated planner handles your entire event. You&apos;ll never be passed between teams or departments.",
  },
  {
    icon: <Globe size={28} />,
    title: "Global Reach",
    desc: "From royal palaces in Riyadh to GIGA projects in NEOM — we execute flawlessly across AlUla and the Red Sea.",
  },
  {
    icon: <Sparkles size={28} />,
    title: "Vision 2030 Alignment",
    desc: "Supporting the General Entertainment Authority (GEA) and Saudi Seasons through world-class cultural activations.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="container-luxury relative z-10">
        {/* Main Box Wrapper */}
        <div className="border border-gray-200 bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-sm mx-auto w-full transition-all duration-300 hover:shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Header Area */}
            <div className="lg:col-span-4 flex flex-col justify-start pt-4">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-primary text-xs uppercase tracking-[0.4em] font-bold mb-4 block"
              >
                The Saudi Event Management Difference
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-black text-2xl md:text-3xl mb-4 font-bold"
              >
                The Saudi Event Management <span className="text-primary italic">Standard</span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 text-[13px] leading-relaxed mb-8 max-w-sm"
              >
                Absolute perfection for your grandest visions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="w-16 h-0.5 bg-primary/40 mb-10"
              />

              {/* Consultation Form / CTA (Top of section) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gray-50 border border-gray-100 p-6 rounded-2xl shadow-sm"
              >
                <h4 className="text-black text-sm font-bold uppercase tracking-widest mb-4">Request a Consultation</h4>
                <p className="text-gray-500 text-xs mb-6 leading-relaxed">
                  Tell us about your vision and we'll craft a bespoke proposal tailored to your needs.
                </p>
                <div className="flex flex-col gap-3">
                  <Link 
                    href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20would%20like%20to%20request%20a%20consultation%20for%20my%20upcoming%20event."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all"
                  >
                    Chat on WhatsApp
                  </Link>
                  <Link 
                    href="/contact"
                    className="w-full bg-primary text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary-dark transition-all"
                  >
                    Submit Inquiry
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Grid of Reasons */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
                {reasons.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col group"
                  >
                    <div className="text-primary mb-5 bg-gold-50 w-14 h-14 flex items-center justify-center rounded-full border border-gold-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {reason.icon}
                    </div>
                    <h5 className="text-black text-sm md:text-base mb-3 font-bold uppercase tracking-tight">
                      {reason.title}
                    </h5>
                    <p className="text-gray-600 text-[13px] leading-relaxed">
                      {reason.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
