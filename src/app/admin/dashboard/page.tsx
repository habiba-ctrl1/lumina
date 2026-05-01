"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Image, MessageSquareQuote, Mail, TrendingUp } from "lucide-react";

type Stats = {
  events: number;
  testimonials: number;
  inquiries: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ events: 0, testimonials: 0, inquiries: 0 });
  const [recentInquiries, setRecentInquiries] = useState<{ id: string; name: string; email: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    const [eventsRes, testimonialsRes, inquiriesRes] = await Promise.all([
      supabase.from("events").select("id", { count: "exact", head: true }),
      supabase.from("testimonials").select("id", { count: "exact", head: true }),
      supabase.from("contact_messages").select("id", { count: "exact", head: true }),
    ]);

    setStats({
      events: eventsRes.count || 0,
      testimonials: testimonialsRes.count || 0,
      inquiries: inquiriesRes.count || 0,
    });

    // Fetch recent 5 inquiries
    const { data } = await supabase
      .from("contact_messages")
      .select("id, name, email, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    setRecentInquiries(data || []);
    setLoading(false);
  };

  const statCards = [
    { label: "Total Events", value: stats.events, icon: Image, color: "from-amber-500/20 to-amber-600/5", iconColor: "text-amber-400" },
    { label: "Testimonials", value: stats.testimonials, icon: MessageSquareQuote, color: "from-emerald-500/20 to-emerald-600/5", iconColor: "text-emerald-400" },
    { label: "Inquiries", value: stats.inquiries, icon: Mail, color: "from-blue-500/20 to-blue-600/5", iconColor: "text-blue-400" },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-light text-white mb-2">
          Welcome to <span className="text-gold-500 font-semibold italic">Dashboard</span>
        </h1>
        <p className="text-gray-500">Overview of your website content and activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br ${card.color} border border-white/5 rounded-2xl p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <card.icon size={24} className={card.iconColor} />
              <TrendingUp size={16} className="text-gray-600" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">
              {loading ? "—" : card.value}
            </p>
            <p className="text-sm text-gray-400">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-charcoal-800 border border-white/5 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-lg font-medium text-white">Recent Inquiries</h2>
        </div>
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-charcoal-900 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : recentInquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No inquiries yet.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                <div>
                  <p className="text-white text-sm font-medium">{inq.name}</p>
                  <p className="text-gray-500 text-xs">{inq.email}</p>
                </div>
                <p className="text-xs text-gray-600">
                  {new Date(inq.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
