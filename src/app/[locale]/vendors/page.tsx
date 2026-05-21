"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Cake, Flower2, Star, ArrowRight, X, Calendar, Users, MessageSquare, Send, CheckCircle2 } from "lucide-react";

const categories = [
  { id: "photography", name: "Professional Photography", icon: Camera },
  { id: "cakes", name: "Luxury Wedding Cakes", icon: Cake },
  { id: "floral", name: "Floral Design", icon: Flower2 },
];

const vendors = [
  { id: 1, categoryId: "photography", name: "Al-Majid Studios", image: "/wedding.webp", rating: 5.0, reviews: 124, location: "Riyadh, KSA" },
  { id: 2, categoryId: "photography", name: "Elite Vision PK", image: "/gallery_1.webp", rating: 4.9, reviews: 45, location: "Islamabad, PK" },
  { id: 3, categoryId: "cakes", name: "The Golden Whisk", image: "/gallery_wedding_reception.webp", rating: 4.9, reviews: 89, location: "Riyadh, KSA" },
  { id: 4, categoryId: "cakes", name: "Velvet Sugar", image: "/gallery_corporate_gala.webp", rating: 5.0, reviews: 32, location: "Karachi, PK" },
  { id: 5, categoryId: "floral", name: "Sapphire Blooms", image: "/gallery_destination_wedding.webp", rating: 5.0, reviews: 56, location: "Jeddah, KSA" },
  { id: 6, categoryId: "floral", name: "Oasis Petals", image: "/gallery_garden_party.webp", rating: 4.8, reviews: 78, location: "Jeddah, KSA" },
];

export default function VendorsPage() {
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    eventDate: "",
    guestCount: "",
    requirements: ""
  });

  const openQuoteModal = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId: selectedVendor.id,
          vendorName: selectedVendor.name,
          ...formData
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setFormData({ clientName: "", clientEmail: "", eventDate: "", guestCount: "", requirements: "" });
        }, 3000);
      }
    } catch (error) {
      console.error("Quote request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-emerald-950 overflow-hidden pt-24">
      <Navbar />

      <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-gold-500 text-xs uppercase tracking-[0.4em] font-medium mb-8 block">The Elite Collective</span>
          <h1 className="text-3xl md:text-5xl font-sans text-white mb-8 font-bold">
            Vendor <span className="text-shimmer font-bold">Directory</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Browse our handpicked selection of the most prestigious event partners.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 space-y-32">
        {categories.map((category) => {
          const categoryVendors = vendors.filter(v => v.categoryId === category.id);
          return (
            <section key={category.id} id={category.id} className="relative">
              <div className="flex items-center gap-10 mb-12 border-b border-white/10 pb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-900 border border-gold-500/30 flex items-center justify-center text-gold-500">
                  <category.icon size={24} />
                </div>
                <h2 className="text-2xl md:text-3xl font-sans text-white font-bold">{category.name}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {categoryVendors.map((vendor) => (
                  <div key={vendor.id} className="group bg-emerald-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-gold-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/5 flex flex-col">
                    <div className="relative h-64 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-emerald-950" />
                      <Image src={vendor.image} alt={vendor.name} width={600} height={400} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-950/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] text-gold-500 uppercase tracking-widest font-bold">{vendor.location}</span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-8">
                        <h3 className="text-xl font-sans font-bold text-white group-hover:text-gold-400 transition-colors">{vendor.name}</h3>
                        <div className="flex items-center gap-1 bg-gold-500/10 px-2 py-1 rounded">
                          <Star size={12} className="text-gold-500 fill-gold-500" />
                          <span className="text-gold-500 text-xs font-bold">{vendor.rating}</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-6 flex flex-col gap-10">
                        <button 
                          onClick={() => openQuoteModal(vendor)}
                          className="w-full py-3 bg-gold-500 text-sand-50 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gold-400 transition-all flex items-center justify-center gap-2"
                        >
                          Request a Quote <ArrowRight size={14} />
                        </button>
                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                          <span className="text-gray-400 text-xs">{vendor.reviews} Verified Reviews</span>
                          <span className="text-gold-500 text-[10px] uppercase font-bold tracking-tighter cursor-pointer hover:underline">View Portfolio</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Quote Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-emerald-950 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                <X size={24} />
              </button>

              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-500">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Request Sent!</h2>
                  <p className="text-gray-400">The vendor and Saudi Event Management admin have been notified. You will receive a quote shortly.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <span className="text-gold-500 text-[10px] uppercase tracking-widest font-bold block mb-2">Quotation for</span>
                    <h2 className="text-3xl font-bold text-white">{selectedVendor?.name}</h2>
                  </div>

                  <form onSubmit={handleQuoteSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-10">
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Your Name</label>
                        <input required type="text" value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} className="w-full bg-emerald-900/50 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500/50" placeholder="Full Name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Email</label>
                        <input required type="email" value={formData.clientEmail} onChange={e => setFormData({...formData, clientEmail: e.target.value})} className="w-full bg-emerald-900/50 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500/50" placeholder="email@example.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Event Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500" size={16} />
                          <input required type="date" value={formData.eventDate} onChange={e => setFormData({...formData, eventDate: e.target.value})} className="w-full bg-emerald-900/50 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500/50" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Guests</label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500" size={16} />
                          <input type="number" value={formData.guestCount} onChange={e => setFormData({...formData, guestCount: e.target.value})} className="w-full bg-emerald-900/50 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500/50" placeholder="e.g. 150" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Specific Requirements</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 text-gold-500" size={16} />
                        <textarea rows={3} value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} className="w-full bg-emerald-900/50 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500/50" placeholder="Any special requests or details..." />
                      </div>
                    </div>

                    <button disabled={loading} type="submit" className="w-full py-4 bg-gold-500 text-sand-50 font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-gold-400 transition-all flex items-center justify-center gap-2 shadow-xl shadow-gold-500/10">
                      {loading ? "Processing..." : "Submit Quote Request"} <Send size={16} />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
