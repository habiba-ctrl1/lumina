"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUp, Send } from "lucide-react";
import { motion } from "framer-motion";

const Instagram = ({ size = 20, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);
const Twitter = ({ size = 20, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>);
const Linkedin = ({ size = 20, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-charcoal-950 border-t border-white/5 relative">
      {/* Back to Top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ y: -3 }}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gold-500 hover:bg-gold-400 text-charcoal-900 flex items-center justify-center transition-colors duration-300 shadow-lg shadow-gold-500/20"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </motion.button>

      {/* Newsletter Banner */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-display text-white mb-2">Stay <span className="text-gold-500 italic">Inspired</span></h3>
              <p className="text-gray-500 text-sm font-light">Exclusive event inspiration, trends, and behind-the-scenes stories delivered monthly.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" 
                required
                className="flex-1 md:w-72 bg-charcoal-900/80 border border-white/10 px-5 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
              <button type="submit" className="px-6 py-3 bg-gold-500 text-charcoal-900 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors flex items-center gap-2">
                {subscribed ? "Subscribed ✓" : <><Send size={14} />Join</>}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="#home" className="text-3xl font-display font-bold text-white tracking-widest uppercase block mb-6">
              Lumina<span className="text-gold-500">.</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light">Crafting extraordinary experiences and timeless memories through unparalleled luxury event management.</p>
            <div className="flex space-x-4">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-500 hover:text-gold-500 hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-1">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-6 text-xs">Services</h4>
            <ul className="space-y-4">
              {["Luxury Weddings", "Corporate Galas", "Private Parties", "Destination Events"].map((item) => (
                <li key={item}><a href="#services" className="text-gray-500 hover:text-gold-500 transition-colors text-sm group flex items-center gap-2 font-light"><span className="w-0 h-px bg-gold-500 group-hover:w-4 transition-all duration-300" />{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-6 text-xs">Company</h4>
            <ul className="space-y-4">
              {[{ name: "About Us", href: "/about" }, { name: "Our Portfolio", href: "#gallery" }, { name: "Blog & Lifestyle", href: "/blog" }, { name: "Testimonials", href: "#testimonials" }, { name: "Contact Us", href: "#contact" }].map((item) => (
                <li key={item.name}><a href={item.href} className="text-gray-500 hover:text-gold-500 transition-colors text-sm group flex items-center gap-2 font-light"><span className="w-0 h-px bg-gold-500 group-hover:w-4 transition-all duration-300" />{item.name}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-6 text-xs">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start"><MapPin size={16} className="text-gold-500 mr-3 mt-0.5 shrink-0" /><span className="text-gray-500 text-sm font-light">123 Luxury Avenue, Suite 500<br/>New York, NY 10001</span></li>
              <li className="flex items-center"><Phone size={16} className="text-gold-500 mr-3 shrink-0" /><span className="text-gray-500 text-sm font-light">+1 (555) 123-4567</span></li>
              <li className="flex items-center"><Mail size={16} className="text-gold-500 mr-3 shrink-0" /><span className="text-gray-500 text-sm font-light">hello@luminaevents.com</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-700 text-xs mb-4 md:mb-0">&copy; {new Date().getFullYear()} Lumina Event Management. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-700 hover:text-gray-400 text-xs transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-700 hover:text-gray-400 text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
