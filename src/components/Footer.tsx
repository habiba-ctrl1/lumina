import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const Instagram = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Twitter = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Linkedin = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="#" className="text-3xl font-bold text-white tracking-widest uppercase block mb-6">
              Lumina<span className="text-gold-500">.</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Crafting extraordinary experiences and timeless memories through unparalleled luxury event management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-6 text-sm">Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">Luxury Weddings</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">Corporate Galas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">Private Parties</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">Destination Events</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-6 text-sm">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">About Us</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">Our Portfolio</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">Testimonials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-6 text-sm">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-gold-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">123 Luxury Avenue, Suite 500<br/>New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-gold-500 mr-3 shrink-0" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-gold-500 mr-3 shrink-0" />
                <span className="text-gray-400 text-sm">hello@luminaevents.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Lumina Event Management. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
