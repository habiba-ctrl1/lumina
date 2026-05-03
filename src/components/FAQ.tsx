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
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 bg-charcoal-800 relative border-t border-white/5">
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
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-white mb-6"
          >
            Curated <span className="text-shimmer font-semibold italic">Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
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
                <span className={`text-lg md:text-xl font-display transition-colors ${openIndex === index ? 'text-gold-500' : 'text-gray-300 group-hover:text-white'}`}>
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
