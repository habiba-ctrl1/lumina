"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const Instagram = ({ size = 20, className = "" }: { size?: number; className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);
const Twitter = ({ size = 20, className = "" }: { size?: number; className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>);
const Linkedin = ({ size = 20, className = "" }: { size?: number; className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);

const WHATSAPP_URL = "https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20would%20like%20to%20connect.";

export default function Footer() {

  const socialLinks = [
    { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/saudieventmanagement?igsh=enVkcGtuZGxiZ2Nn" },
    { icon: Twitter, label: "Twitter", url: "https://twitter.com/saudieventmgmt" },
    { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/company/saudieventmanagement" },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-100 relative pt-20 pb-12">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-8">
              <Image 
                src="/main-logo.webp" 
                alt="Saudi Event Management Logo" 
                width={280} 
                height={100}
                className="object-contain h-16 w-auto"
              />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-sm">Crafting extraordinary experiences and timeless memories through unparalleled luxury event management across the Middle East.</p>
            <div className="flex space-x-3">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.label}`}
                  className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all duration-300 rounded-lg bg-white"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-black font-bold uppercase tracking-[0.2em] mb-6 text-[11px]">Services</h4>
            <ul className="space-y-8">
              {["Royal Weddings", "Corporate Events", "Elite Birthdays", "Destination"].map((item) => (
                <li key={item}><Link href="/services" className="text-gray-500 hover:text-primary transition-colors text-sm flex items-center gap-2 group"><span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-black font-bold uppercase tracking-[0.2em] mb-6 text-[11px]">Company</h4>
            <ul className="space-y-8">
              {[
                { name: "About Us", href: "/about" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Journal", href: "/blog" },
                { name: "Locations", href: "/locations" },
                { name: "FAQ", href: "/faq" },
                { name: "Book Session", href: "/consultation" }
              ].map((item) => (
                <li key={item.name}><Link href={item.href} className="text-gray-500 hover:text-primary transition-colors text-sm flex items-center gap-2 group"><span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />{item.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-black font-bold uppercase tracking-[0.2em] mb-6 text-[11px]">Contact</h4>
            <ul className="space-y-8">
              <li className="flex items-start"><MapPin size={16} className="text-primary mr-3 mt-0.5 shrink-0" /><span className="text-gray-600 text-sm">Riyadh, Jeddah, AlUla & Dammam</span></li>
              <li className="flex items-center"><Phone size={16} className="text-primary mr-3 shrink-0" /><span className="text-gray-600 text-sm">+966 50 123 4567</span></li>
              <li className="flex items-center"><Mail size={16} className="text-primary mr-3 shrink-0" /><span className="text-gray-600 text-sm">hello@saudieventmanagement.com</span></li>
            </ul>
          </div>
        </div>

        {/* Partner With Us & Strategic Alignment */}
        <div className="border-y border-gray-200 py-16 mb-12">
          <div className="text-center mb-12">
            <h4 className="text-black font-bold uppercase tracking-[0.3em] mb-4 text-xs">Our Trusted Partners & Vendors</h4>
            <Link 
              href="/partners" 
              className="text-primary text-[10px] font-bold uppercase tracking-widest border-b border-primary/30 hover:border-primary transition-all pb-1"
            >
              Partner With Us
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 grayscale opacity-40">
            {[
              "General Entertainment Authority", 
              "Ministry of Culture", 
              "Saudi Tourism Authority", 
              "Vision 2030", 
              "NEOM", 
              "Diriyah Gate", 
              "Red Sea Global", 
              "Riyadh Season", 
              "Saudi Seasons"
            ].map((entity) => (
              <span key={entity} className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-500">{entity}</span>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white border border-gray-100 rounded-[2rem] p-10 md:p-16 mb-20 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-black mb-4 uppercase tracking-tight">Stay Inspired</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed">Join our inner circle for exclusive event insights, luxury trends, and a first look at our latest masterpieces.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-grow bg-white border-2 border-gray-100 p-5 rounded-xl text-sm focus:border-primary outline-none transition-all shadow-inner placeholder:text-gray-400 text-black"
                required
              />
              <button 
                type="submit" 
                className="bg-black text-white px-10 py-5 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-all shadow-lg"
              >
                Join the Circle
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-[11px] mb-4 md:mb-0 uppercase tracking-widest">&copy; {new Date().getFullYear()} Saudi Event Management. All rights reserved.</p>
          <div className="flex space-x-8">
            <Link href="/privacy" className="text-gray-400 hover:text-primary text-[11px] uppercase tracking-widest transition-colors">Privacy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-primary text-[11px] uppercase tracking-widest transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
