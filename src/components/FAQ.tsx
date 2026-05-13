"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Do you offer destination event planning?",
    answer: "Absolutely. We specialize in curating breathtaking destination weddings and events globally. Our team manages all logistics, travel arrangements, and local vendor sourcing to ensure a flawless experience wherever you choose to celebrate."
  },
  {
    question: "How far in advance should we book your services?",
    answer: "For luxury weddings and large-scale corporate galas, we recommend booking 9 to 12 months in advance. However, for exclusive private parties or smaller events, 3 to 6 months is typically sufficient. We limit the number of events we take per year to guarantee our undivided attention to your celebration."
  },
  {
    question: "Do you handle all vendor communications and contracts?",
    answer: "Yes, our comprehensive service includes complete vendor management. We leverage our exclusive network of premium vendors, negotiate contracts, and handle all communications to ensure every element meets our rigorous standards."
  },
  {
    question: "Can you accommodate high-profile and celebrity clientele?",
    answer: "We have extensive experience working with high-profile clients and understand the critical importance of discretion, privacy, and specialized security arrangements. Non-disclosure agreements (NDAs) are a standard part of our operating procedure."
  },
  {
    question: "What is the average budget for a luxury event in Saudi Arabia?",
    answer: "Our bespoke events typically range from SAR 250,000 for intimate luxury gatherings to over SAR 2,000,000 for grand-scale productions. Each project is unique, and we provide detailed proposals tailored to your specific vision, guest count, and venue requirements. We are transparent about costs from the initial consultation."
  },
  {
    question: "Which cities in Saudi Arabia do you operate in?",
    answer: "Saudi Event Management has a strong operational presence across the Kingdom, including Riyadh, Jeddah, AlUla, Dammam, Makkah, and Madinah. Our headquarters are in Riyadh, with dedicated regional teams in each city to ensure local expertise and vendor relationships for flawless execution."
  },
  {
    question: "Do you provide day-of coordination services?",
    answer: "Yes, we offer standalone day-of coordination for clients who have managed their own planning but require professional on-site management. Our coordination team ensures that timelines, vendors, and logistics run flawlessly on the day, allowing you and your guests to enjoy the event without any stress."
  },
  {
    question: "What types of events do you specialize in?",
    answer: "We specialize in luxury weddings, corporate summits and galas, cultural activations, private celebrations, exhibition management, and seasonal events including Ramadan gatherings and National Day celebrations. Our team brings the same level of architectural precision and creative excellence to every event type."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-charcoal-800 relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="text-gold-500 text-xs uppercase tracking-[0.4em] font-medium mb-4 block"
          >
            Inquiries
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-2xl md:text-4xl font-sans text-white mb-6 font-bold uppercase tracking-tight"
          >
            Curated <span className="text-primary font-bold">Questions</span>
          </motion.h1>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-white/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-6 text-left group transition-colors duration-300"
              >
                <span className={`text-base md:text-lg font-sans font-semibold transition-colors ${openIndex === index ? 'text-gold-500' : 'text-gray-300 group-hover:text-white'}`}>
                  {faq.question}
                </span>
                <span className="ml-6 flex-shrink-0 text-gold-500">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-gray-400 font-light leading-relaxed pr-12">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
