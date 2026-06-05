"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Cake, Flower2, Star, ArrowRight, X, Calendar, Users, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";

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

  const inputClass = "w-full bg-neutral-50 border border-neutral-200/80 px-4 py-3.5 text-[14px] text-neutral-900 placeholder-neutral-400 focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/10 transition-all outline-none rounded-xl";

  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <ScrollProgress />
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-24 px-6 bg-[var(--surface-raised)] border-b border-neutral-200/80 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="section-label bg-white border border-neutral-200/80">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              The Elite Collective
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 mb-6" style={{ letterSpacing: "-0.025em" }}>
            Vendor <span className="text-[var(--primary)]">Directory</span>
          </h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-[16px] md:text-lg leading-relaxed">
            Browse our handpicked selection of the most prestigious event partners.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        {categories.map((category: any) => {
          const categoryVendors = vendors.filter(v => v.categoryId === category.id);
          return (
            <section key={category.id} id={category.id} className="relative">
              <div className="flex items-center gap-6 mb-12 border-b border-neutral-100 pb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[var(--primary)]">
                  <category.icon size={24} />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900" style={{ letterSpacing: "-0.02em" }}>{category.name}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryVendors.map((vendor: any) => (
                  <div key={vendor.id} className="group bg-white border border-neutral-200/80 rounded-3xl overflow-hidden hover:border-neutral-300 transition-all duration-500 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)] flex flex-col">
                    <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                      <Image src={vendor.image} alt={vendor.name} width={600} height={400} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute top-4 start-4">
                        <span className="px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-lg text-[11px] text-[var(--primary)] font-medium shadow-sm">{vendor.location}</span>
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-[var(--primary)] transition-colors" style={{ letterSpacing: "-0.01em" }}>{vendor.name}</h3>
                        <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-100 px-2 py-1 rounded-lg">
                          <Star size={12} className="text-[var(--primary)] fill-[var(--primary)]" />
                          <span className="text-neutral-700 text-[12px] font-semibold">{vendor.rating}</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-6 flex flex-col gap-6">
                        <button 
                          onClick={() => openQuoteModal(vendor)}
                          className="w-full py-3.5 bg-[var(--primary)] text-white text-[13px] font-medium rounded-xl hover:bg-[var(--primary-dark)] transition-all flex items-center justify-center gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]"
                        >
                          Request a Quote <ArrowRight size={14} />
                        </button>
                        <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
                          <span className="text-neutral-500 text-[12px] font-medium">{vendor.reviews} Verified Reviews</span>
                          <span className="text-[var(--primary)] text-[12px] font-medium cursor-pointer hover:text-[var(--primary-dark)]">View Portfolio</span>
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
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 end-6 text-neutral-400 hover:text-neutral-600 transition-colors bg-neutral-50 p-2 rounded-full">
                <X size={20} />
              </button>

              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--primary)]">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-2xl font-semibold text-neutral-900 mb-3" style={{ letterSpacing: "-0.01em" }}>Request Sent!</h2>
                  <p className="text-neutral-500 text-[15px] leading-relaxed">The vendor and Saudi Event Management admin have been notified. You will receive a quote shortly.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <span className="section-label mb-3">
                      <span className="w-3 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
                      Quotation For
                    </span>
                    <h2 className="text-3xl font-semibold text-neutral-900" style={{ letterSpacing: "-0.025em" }}>{selectedVendor?.name}</h2>
                  </div>

                  <form onSubmit={handleQuoteSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[12px] text-neutral-500 font-medium">Your Name</label>
                        <input required type="text" value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} className={inputClass} placeholder="Full Name" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[12px] text-neutral-500 font-medium">Email</label>
                        <input required type="email" value={formData.clientEmail} onChange={e => setFormData({...formData, clientEmail: e.target.value})} className={inputClass} placeholder="email@example.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[12px] text-neutral-500 font-medium">Event Date</label>
                        <div className="relative">
                          <Calendar className="absolute start-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                          <input required type="date" value={formData.eventDate} onChange={e => setFormData({...formData, eventDate: e.target.value})} className={`${inputClass} ps-11`} />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[12px] text-neutral-500 font-medium">Guests</label>
                        <div className="relative">
                          <Users className="absolute start-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                          <input type="number" value={formData.guestCount} onChange={e => setFormData({...formData, guestCount: e.target.value})} className={`${inputClass} ps-11`} placeholder="e.g. 150" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[12px] text-neutral-500 font-medium">Specific Requirements</label>
                      <div className="relative">
                        <MessageSquare className="absolute start-4 top-4 text-neutral-400" size={16} />
                        <textarea rows={3} value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} className={`${inputClass} ps-11 resize-none`} placeholder="Any special requests or details..." />
                      </div>
                    </div>

                    <button disabled={loading} type="submit" className="w-full py-4 bg-[var(--primary)] text-white font-medium text-[14px] rounded-xl hover:bg-[var(--primary-dark)] transition-all flex items-center justify-center gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] mt-2">
                      {loading ? "Processing..." : "Submit Quote Request"} <Send size={15} />
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
