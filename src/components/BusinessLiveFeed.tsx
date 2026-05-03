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

export default function BusinessLiveFeed() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      const { data } = await supabase
        .from("business_updates")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      
      if (data) setUpdates(data);
      setLoading(false);
    };

    fetchUpdates();
  }, []);

  return (
    <section className="py-24 bg-charcoal-900 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-[100px] -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-gold-500/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-gold-500 font-bold">Live from Lumina</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-white mb-8 leading-tight">
              Real-Time <span className="text-shimmer italic">Updates</span> & Business Milestones
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-10 max-w-lg">
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
            <div className="relative space-y-4">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse" />
                ))
              ) : updates.length > 0 ? (
                updates.map((update, i) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                    className="bg-white/[0.02] border border-white/5 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 group"
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
                    <p className="text-gray-300 font-light leading-relaxed group-hover:text-white transition-colors duration-500">
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
