"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FounderSection() {
  return (
    <section className="py-32 bg-emerald-950 relative overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden rounded-2xl">
              <Image
                src="/gallery_2.webp"
                alt="Founder Habiba Asghar - Saudi Event Management Luxury Event Vision"
                width={800}
                height={1000}
                className="w-full h-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Decorative border */}
              <div className="absolute inset-0 border border-primary/20 rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041E42]/60 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-[#041E42] border border-primary/30 px-8 py-5 hidden md:block rounded-xl shadow-2xl"
            >
              <p className="text-primary text-2xl font-sans font-bold">12+</p>
              <p className="text-gray-300 text-[10px] uppercase tracking-wider font-bold">Years of Excellence</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary text-xs uppercase tracking-[0.4em] font-bold mb-8 block">
              The Vision
            </span>
            <h2 className="text-2xl md:text-4xl font-sans text-white mb-3 font-bold uppercase tracking-tight leading-tight">
              Crafting <span className="text-primary font-bold">Memories That</span> Last Forever
            </h2>
            <p className="text-gray-400 text-sm uppercase tracking-[0.2em] mb-8 font-semibold">
              Personalized Event Management
            </p>

            <div className="space-y-6 text-gray-300 font-medium leading-relaxed">
              <p>
                With over a decade organizing and managing the world&apos;s most exclusive celebrations, 
                our agency was founded by **Habiba Asghar** with a singular vision: to transform short, special times into 
                memories that last forever, full of beauty and emotion.
              </p>
              <p>
                We bring an unparalleled eye for detail and a deep understanding of what makes 
                an event truly unforgettable. Every celebration is treated as a unique work of art.
              </p>
              <p>
                Our philosophy is simple — every detail should feel intentional, 
                effortlessly beautiful and deeply resonant with our clients&apos; vision.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-12 mt-10 pt-10 border-t border-white/5">
              {[
                { number: "500+", label: "Events Crafted" },
                { number: "15+", label: "Countries Served" },
                { number: "100%", label: "Client Satisfaction" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <p className="text-xl md:text-2xl font-sans font-bold text-white mb-1">{stat.number}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
