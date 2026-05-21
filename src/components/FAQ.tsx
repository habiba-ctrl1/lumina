"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqCategories = [
  { id: "general", name: "General" },
  { id: "pricing", name: "Booking & Pricing" },
  { id: "logistics", name: "Services & Logistics" }
];

const faqs = [
  // General
  {
    category: "general",
    question: "Do you handle events outside Saudi Arabia?",
    answer: "Yes. We operate in UAE, Qatar, and internationally for destination events. Our Riyadh and Jeddah teams coordinate global logistics for seamless execution across borders."
  },
  {
    category: "general",
    question: "What cities do you operate in?",
    answer: "We have a strong operational presence across the Kingdom, including Riyadh, Jeddah, AlUla, Dammam, Makkah, and Madinah. We also travel internationally for bespoke projects."
  },
  {
    category: "general",
    question: "How far in advance should we book your services?",
    answer: "For luxury weddings and large-scale corporate galas, we recommend booking 9 to 12 months in advance. For exclusive private parties, 3 to 6 months is typically sufficient."
  },
  {
    category: "general",
    question: "Do you offer destination event planning?",
    answer: "Absolutely. We specialize in curating breathtaking destination weddings and events globally, managing all travel arrangements and local vendor sourcing."
  },
  {
    category: "general",
    question: "What types of events do you specialize in?",
    answer: "We specialize in luxury weddings, corporate summits, cultural activations, private VIP celebrations, and high-end seasonal events."
  },
  // Booking & Pricing
  {
    category: "pricing",
    question: "What is your minimum event budget?",
    answer: "Our events start from SAR 25,000 for intimate private gatherings. For royal weddings and large corporate galas, budgets typically range from SAR 200,000 to SAR 2M+."
  },
  {
    category: "pricing",
    question: "How do I get a quote?",
    answer: "Submit your inquiry through our 'Book Now' form or contact us via WhatsApp. We typically provide a detailed initial proposal within 24 hours."
  },
  {
    category: "pricing",
    question: "What is your cancellation policy?",
    answer: "Each contract outlines specific terms based on the event scale. Generally, initial deposits are non-refundable within 30 days of the scheduled event date."
  },
  {
    category: "pricing",
    question: "Is 15% VAT included in your prices?",
    answer: "All prices are quoted exclusive of 15% Saudi VAT. A valid VAT registration number is provided on all official invoices."
  },
  // Services & Logistics
  {
    category: "logistics",
    question: "Do you manage vendor contracts?",
    answer: "Absolutely. We handle all vendor negotiations, contracts, payments, and on-day coordination so you don't have to manage multiple touchpoints."
  },
  {
    category: "logistics",
    question: "Can you handle high-profile and VIP events?",
    answer: "Yes. We specialize in absolute discretion for royal families, government officials, and celebrity clients. NDAs are standard for all our elite projects."
  },
  {
    category: "logistics",
    question: "Do you offer day-of coordination only?",
    answer: "We offer full-service planning, partial planning, and dedicated day-of coordination packages to suit your specific involvement level."
  },
  {
    category: "logistics",
    question: "Can you arrange entertainment and performers?",
    answer: "Yes. We have exclusive access to top Saudi and international performers, live orchestras, cultural acts, and world-class stage productions."
  },
  {
    category: "logistics",
    question: "Do you handle all vendor communications?",
    answer: "Yes, our comprehensive service includes complete vendor management, leveraging our exclusive network to ensure every element meets our rigorous standards."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("general");

  const filteredFaqs = faqs.filter(faq => faq.category === activeCategory);

  return (
    <section id="faq" className="py-32 bg-emerald-950 relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="text-gold-500 text-xs uppercase tracking-[0.4em] font-medium mb-8 block"
          >
            Inquiries
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-2xl md:text-4xl font-sans text-white mb-8 font-bold uppercase tracking-tight"
          >
            Curated <span className="text-primary font-bold">Questions</span>
          </motion.h1>
        </div>

        {/* Categories / Tabs */}
        <div className="flex flex-wrap justify-center gap-10 mb-12 border-b border-white/10 pb-6">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
                activeCategory === cat.id 
                  ? "bg-gold-500 text-sand-50" 
                  : "bg-ink-800/5 text-gray-400 hover:bg-ink-800/10 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="bg-ink-800/5 border border-white/10 overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left group transition-colors duration-300"
                  >
                    <span className={`text-sm md:text-base font-sans font-semibold transition-colors ${openIndex === index ? 'text-gold-500' : 'text-gray-300 group-hover:text-white'}`}>
                      {faq.question}
                    </span>
                    <span className="ml-6 flex-shrink-0 text-gold-500">
                      {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <p className="px-6 pb-6 text-gray-400 font-light text-sm leading-relaxed pr-12 border-t border-white/5 pt-4">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* WhatsApp CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 text-center bg-ink-800/5 border border-white/10 p-10 rounded-sm"
        >
          <h3 className="text-white font-sans font-bold text-xl mb-8 uppercase tracking-tight">Still have questions?</h3>
          <p className="text-gray-400 text-sm font-light mb-8 max-w-lg mx-auto">
            Our priority concierge team is available 24/7 via WhatsApp for immediate white-glove assistance.
          </p>
          <a 
            href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20have%20a%20question%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold-500 text-sand-50 px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-ink-800 transition-all"
          >
            Message us on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
