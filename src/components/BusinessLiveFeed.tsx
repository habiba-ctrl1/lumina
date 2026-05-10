"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Update = {
  id: string;
  text: string;
  label: string;
  created_at: string;
};

const FALLBACK_UPDATES: Update[] = [
  {
    id: "1",
    label: "Success",
    text: "Successfully executed the 2026 Executive Summit in Jeddah with over 500 international delegates.",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    label: "Milestone",
    text: "Bespoke Royal Wedding planning initiated for a prominent Riyadh estate. Expected completion: Q4 2026.",
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "3",
    label: "Planning",
    text: "Secured exclusive access to a new UNESCO-heritage site in AlUla for luxury destination activations.",
    created_at: new Date(Date.now() - 172800000).toISOString()
  }
];

export default function BusinessLiveFeed() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const { data, error } = await supabase
          .from("business_updates")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);
        
        if (error) {
          // If table doesn't exist or other Supabase error, use fallbacks
          setUpdates(FALLBACK_UPDATES);
        } else if (data && data.length > 0) {
          setUpdates(data);
        } else {
          // Fallback if table is empty
          setUpdates(FALLBACK_UPDATES);
        }
      } catch (err) {
        setUpdates(FALLBACK_UPDATES);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <section className="py-24 bg-charcoal-950 overflow-hidden relative border-t border-white/5">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-[100px] -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-gold-500/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-gold-500 font-bold">Live from Saudi Event Management</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-sans text-white mb-8 leading-tight font-bold">
              Real-Time <span className="text-shimmer font-bold">Updates</span> & Business Milestones
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-lg">
              Transparency is at our core. Track our latest project progress, signed contracts, and agency achievements as they happen.
            </p>
            <Link 
              href="/#contact" 
              className="inline-flex items-center gap-3 text-white text-xs uppercase tracking-[0.2em] font-bold group border-b border-white/10 pb-2 hover:border-gold-500 transition-all duration-500"
            >
              Partner with us
              <ArrowRight size={16} className="text-gold-500 group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </motion.div>

          {/* Feed Content */}
          <div className="relative">
            <div className="absolute inset-0 bg-gold-500/5 blur-[80px] rounded-full" />
            <div className="relative space-y-8">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-charcoal-800/50 border border-white/5 rounded-2xl animate-pulse" />
                ))
              ) : updates.length > 0 ? (
                updates.map((update, i) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                    className="bg-charcoal-900/40 border border-white/5 backdrop-blur-sm p-6 rounded-2xl hover:bg-charcoal-800/60 hover:shadow-lg hover:border-gold-500/20 transition-all duration-500 group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border ${
                        update.label === "Success" ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10" : 
                        update.label === "Milestone" ? "text-amber-400 border-amber-500/20 bg-amber-500/10" : 
                        update.label === "Planning" ? "text-blue-400 border-blue-500/20 bg-blue-500/10" : "text-gold-500 border-gold-500/20 bg-gold-500/10"
                      }`}>
                        {update.label}
                      </span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                        {new Date(update.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed group-hover:text-white transition-colors duration-500">
                      {update.text}
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500 italic">No recent updates. Check back soon!</div>
              )}
              
              {/* Pulsing indicator to show it's "Live" */}
              <div className="flex items-center justify-center pt-6 gap-2">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-[9px] uppercase tracking-[0.4em] text-gray-600 font-bold">Agency Live Feed Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
