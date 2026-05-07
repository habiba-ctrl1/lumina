"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const Instagram = ({ size = 20, className = "" }: { size?: number; className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);
const Twitter = ({ size = 20, className = "" }: { size?: number; className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>);
const Linkedin = ({ size = 20, className = "" }: { size?: number; className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);

const WHATSAPP_URL = "https://wa.me/923001234567?text=Hi%20Lumina%20Events!%20I%20would%20like%20to%20connect.";

export default function Footer() {

  const socialLinks = [
    { icon: Instagram, label: "Instagram", url: WHATSAPP_URL },
    { icon: Twitter, label: "Twitter", url: WHATSAPP_URL },
    { icon: Linkedin, label: "LinkedIn", url: WHATSAPP_URL },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 relative pt-12 pb-8">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-6">
              <Image 
                src="/lumina-logo-transparent.png" 
                alt="Lumina Events Logo" 
                width={180} 
                height={70}
                className="object-contain h-16 w-auto"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light max-w-sm">Crafting extraordinary experiences and timeless memories through unparalleled luxury event management across the Middle East.</p>
            <div className="flex space-x-3">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.label}`}
                  className="w-9 h-9 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-champagne-500 hover:border-champagne-500/50 transition-all duration-300 rounded-sm"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#041E42] font-bold uppercase tracking-wider mb-5 text-[10px]">Services</h4>
            <ul className="space-y-3">
              {["Royal Weddings", "Corporate Events", "Elite Birthdays", "Destination"].map((item) => (
                <li key={item}><Link href="/services" className="text-gray-500 hover:text-champagne-500 transition-colors text-sm font-light flex items-center gap-2 group"><span className="w-0 h-px bg-champagne-500 group-hover:w-3 transition-all duration-300" />{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#041E42] font-bold uppercase tracking-wider mb-5 text-[10px]">Company</h4>
            <ul className="space-y-3">
              {[
                { name: "Portfolio", href: "/portfolio" },
                { name: "Journal", href: "/blog" },
                { name: "Locations", href: "/locations" },
                { name: "FAQ", href: "/faq" },
                { name: "Book Session", href: "/consultation" }
              ].map((item) => (
                <li key={item.name}><Link href={item.href} className="text-gray-500 hover:text-champagne-500 transition-colors text-sm font-light flex items-center gap-2 group"><span className="w-0 h-px bg-champagne-500 group-hover:w-3 transition-all duration-300" />{item.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#041E42] font-bold uppercase tracking-wider mb-5 text-[10px]">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start"><MapPin size={14} className="text-champagne-500 mr-2 mt-0.5 shrink-0" /><span className="text-gray-500 text-xs font-light">Riyadh, Jeddah & Dubai</span></li>
              <li className="flex items-center"><Phone size={14} className="text-champagne-500 mr-2 shrink-0" /><span className="text-gray-500 text-xs font-light">+966 50 123 4567</span></li>
              <li className="flex items-center"><Mail size={14} className="text-champagne-500 mr-2 shrink-0" /><span className="text-gray-500 text-xs font-light">hello@luminaevents.com</span></li>
            </ul>
          </div>
        </div>

        {/* Strategic Alignment */}
        <div className="border-y border-gray-100 py-8 mb-12">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 grayscale opacity-40">
            {[
              "General Entertainment Authority — هيئة الترفيه", 
              "Ministry of Culture — وزارة الثقافة", 
              "Saudi Tourism Authority — هيئة السياحة", 
              "Vision 2030 — رؤية 2030", 
              "NEOM", 
              "Diriyah Gate Development Authority", 
              "Red Sea Development Company", 
              "Riyadh Season — موسم الرياض", 
              "RCEF — الهيئة الملكية للمعارض", 
              "King Abdulaziz International Conference Center", 
              "Riyadh Exhibition & Convention Center (RECC)", 
              "AlUla", 
              "GIGA projects", 
              "Saudi Seasons"
            ].map((entity) => (
              <span key={entity} className="text-[10px] font-bold tracking-[0.2em] uppercase">{entity}</span>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-[9px] text-gray-400 uppercase tracking-[0.4em] font-light">
              Proudly supporting Saudi Arabia&apos;s <span className="text-champagne-600 font-bold">Vision 2030</span> through world-class events.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-[10px] mb-4 md:mb-0 uppercase tracking-widest">&copy; {new Date().getFullYear()} Lumina Event Management. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-champagne-500 text-[10px] uppercase tracking-widest transition-colors">Privacy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-champagne-500 text-[10px] uppercase tracking-widest transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
