"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FounderSection() {
  return (
    <section className="py-24 bg-charcoal-900 relative overflow-hidden border-t border-white/5">
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
            <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
              <Image
                src="/founder.webp"
                alt="Amara Chen, Founder & Creative Director of Saudi Event Management"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Decorative border */}
              <div className="absolute inset-0 border border-gold-500/20" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-charcoal-800 border border-gold-500/30 px-8 py-5 hidden md:block"
            >
              <p className="text-gold-500 text-2xl font-sans font-bold">12+</p>
              <p className="text-gray-400 text-xs uppercase tracking-wider">Years of Excellence</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gold-500 text-xs uppercase tracking-[0.4em] font-medium mb-4 block">
              The Visionary
            </span>
            <h2 className="text-2xl md:text-3xl font-sans text-white mb-3 font-bold">
              Meet <span className="text-shimmer font-bold">Amara Chen</span>
            </h2>
            <p className="text-gold-500/80 text-sm uppercase tracking-[0.2em] mb-8">
              Founder & Creative Director
            </p>

            <div className="space-y-8 text-gray-400 font-light leading-relaxed">
              <p>
                With over a decade orchestrating the world&apos;s most exclusive celebrations, 
                Amara founded Saudi Event Management with a singular vision: to transform fleeting moments into 
                timeless legacies of beauty and emotion.
              </p>
              <p>
                Trained at the Paris School of Art and Design and mentored by industry luminaries, 
                she brings an unparalleled eye for detail and a deep understanding of what makes 
                an event truly unforgettable.
              </p>
              <p>
                Her philosophy is simple — every celebration should feel like a work of art, 
                effortlessly beautiful and deeply personal.
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
