"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, Sparkles, Building, Utensils, 
  Palette, Camera, ArrowRight, FileText, Send, Check
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function QuoteWizard() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState<any>(null);

  // Simulated Estimate Data
  const [estimate, setEstimate] = useState({
    venue: 20000,
    catering: 15000,
    decor: 10000,
    management: 5000
  });

  useEffect(() => {
    // In a real scenario we would fetch the event data via eventId
    // For now we simulate an event context
    setEventData({
      clientName: "Ahmed",
      eventType: "Wedding",
      city: "Riyadh",
      guests: 300,
      budget: 50000
    });
  }, [eventId]);

  const nextStep = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(s => s + 1);
    }, 1500); // simulate processing delay
  };

  const calculateTotal = () => {
    return estimate.venue + estimate.catering + estimate.decor + estimate.management;
  };

  return (
    <div className="pb-16 max-w-4xl mx-auto text-slate-800">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center justify-center gap-2">
          <Sparkles className="text-gold-500" />
          Smart Quote Generation
        </h1>
        <p className="text-sm text-slate-500 mt-2">Automated end-to-end B2B proposal workflow</p>
      </div>

      {/* Stepper Header */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 rounded-full" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-teal-500 -z-10 rounded-full transition-all duration-500" 
          style={{ width: `${((step - 1) / 3) * 100}%` }} 
        />
        
        {[
          { num: 1, label: "Suggest Vendors" },
          { num: 2, label: "Generate Estimate" },
          { num: 3, label: "Create PDF" },
          { num: 4, label: "Send to Client" }
        ].map(s => (
          <div key={s.num} className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors duration-500 ${
              step > s.num ? "bg-teal-500 text-white" : 
              step === s.num ? "bg-slate-900 text-white ring-4 ring-slate-200" : 
              "bg-white text-slate-400 border border-slate-200"
            }`}>
              {step > s.num ? <Check size={18} /> : s.num}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= s.num ? 'text-slate-800' : 'text-slate-400'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Wizard Content */}
      <div className="bg-white border border-slate-200/80 rounded-[2rem] shadow-sm p-8 min-h-[400px] flex flex-col relative overflow-hidden">
        
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-slate-100 border-t-teal-500 rounded-full animate-spin mb-4" />
            <p className="text-sm font-bold text-slate-600 animate-pulse">Processing step intelligently...</p>
          </div>
        )}

        {/* Step 1: Suggested Vendors */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Step 1: AI Suggested Vendors</h2>
              <p className="text-sm text-slate-500">Based on client profile: {eventData?.eventType} in {eventData?.city} for {eventData?.guests} guests (Budget: SAR {eventData?.budget?.toLocaleString()})</p>
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl bg-slate-50">
                <div className="p-3 bg-white shadow-sm rounded-xl text-teal-600"><Building size={20} /></div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-800">Venue: Al-Faisaliah Grand Hall</h3>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Perfect match for 300 guests in Riyadh</p>
                </div>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100">98% Match</div>
              </div>

              <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl bg-slate-50">
                <div className="p-3 bg-white shadow-sm rounded-xl text-amber-600"><Utensils size={20} /></div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-800">Catering: Royal Banquet Co.</h3>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Luxury Gold Package</p>
                </div>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100">95% Match</div>
              </div>

              <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl bg-slate-50">
                <div className="p-3 bg-white shadow-sm rounded-xl text-purple-600"><Palette size={20} /></div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-800">Decor: Elite Floral Design</h3>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Custom Wedding Arch & Centerpieces</p>
                </div>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100">92% Match</div>
              </div>
            </div>

            <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
              <button onClick={nextStep} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-all">
                Confirm & Generate Estimate <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Estimate Generate */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Step 2: Automated Estimate</h2>
              <p className="text-sm text-slate-500">Breakdown generated based on selected vendors and budget constraints.</p>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
                  <span>Venue Cost</span>
                  <span>SAR {estimate.venue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
                  <span>Catering Cost</span>
                  <span>SAR {estimate.catering.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
                  <span>Decor Cost</span>
                  <span>SAR {estimate.decor.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
                  <span>Agency Management Fee (10%)</span>
                  <span>SAR {estimate.management.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-base font-bold text-slate-900">Total Projected Investment</span>
                  <span className="text-xl font-bold text-teal-650">SAR {calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
              <button onClick={nextStep} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-all">
                Approve & Build PDF <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Proposal PDF Generate */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 border-4 border-teal-200 rounded-full animate-ping opacity-20" />
              <FileText size={40} className="text-teal-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Proposal PDF Generated</h2>
            <p className="text-sm text-slate-500 max-w-sm mb-8">
              A luxury branded 12-page PDF proposal has been automatically generated with venue photos, catering menus, and terms.
            </p>
            
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm hover:bg-slate-50 transition-all mb-8">
              <FileText size={16} /> Preview Document
            </button>

            <div className="w-full flex justify-end border-t border-slate-100 pt-6">
              <button onClick={nextStep} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-all">
                Ready to Send <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Send to Client */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-500">
              <Send size={32} className="ml-1" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Proposal to Client</h2>
            <p className="text-sm text-slate-500 max-w-sm mb-10">
              One click will send the PDF via Email and push a notification to the client's WhatsApp.
            </p>

            <div className="flex gap-4">
              <button 
                onClick={nextStep} 
                className="flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/30 active:scale-95"
              >
                <Send size={16} /> One-Click Send (Email + WhatsApp)
              </button>
            </div>
          </motion.div>
        )}

        {/* Success Final State */}
        {step === 5 && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 text-white shadow-xl shadow-emerald-500/20">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Proposal Sent Successfully!</h2>
            <p className="text-sm text-slate-500 max-w-sm mb-10">
              The client has received the email and WhatsApp notification. The CRM has been updated.
            </p>

            <Link 
              href="/admin/dashboard"
              className="px-6 py-3 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-all"
            >
              Return to Dashboard
            </Link>
          </motion.div>
        )}

      </div>
    </div>
  );
}
