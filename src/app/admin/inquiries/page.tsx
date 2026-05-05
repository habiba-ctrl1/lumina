"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Mail, Calendar, User, Trash2, RefreshCw, Search } from "lucide-react";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  event_type?: string;
  budget?: string;
  event_date?: string;
  guest_count?: string;
  venue_city?: string;
  message: string;
  created_at: string;
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setInquiries(data || []);
    setLoading(false);
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (!error) setInquiries(inquiries.filter((i) => i.id !== id));
  };

  const filtered = inquiries.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase()) ||
      i.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-light text-white mb-2">
            Client <span className="text-gold-500 font-semibold italic">Inquiries</span>
          </h1>
          <p className="text-gray-500">Messages received from the contact form.</p>
        </div>
        <button
          onClick={fetchInquiries}
          className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-gold-500"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or message..."
          className="w-full bg-charcoal-800 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-gold-500/30 transition-colors"
        />
      </div>

      {/* Inquiries */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-charcoal-800 animate-pulse rounded-2xl border border-white/5" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 bg-charcoal-800 rounded-2xl border border-white/5">
          <Mail size={48} className="mx-auto text-gray-700 mb-4" />
          <p className="text-gray-500">
            {search ? "No matching inquiries found." : "No inquiries received yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((inquiry) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-charcoal-800 border border-white/5 p-6 rounded-2xl group hover:border-gold-500/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gold-500/10 rounded-lg text-gold-500">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white leading-tight">{inquiry.name}</h3>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-0.5">
                      {inquiry.event_type || "Event Inquiry"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteInquiry(inquiry.id)}
                  className="text-gray-700 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-gold-500 text-sm flex items-center gap-2">
                  <Mail size={14} className="shrink-0" /> {inquiry.email}
                </p>
                {inquiry.phone && (
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <RefreshCw size={14} className="shrink-0 rotate-90" /> {inquiry.phone}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-charcoal-900/40 p-2 rounded border border-white/5">
                  <p className="text-[8px] text-gray-500 uppercase tracking-tighter">Budget</p>
                  <p className="text-xs text-white font-medium">{inquiry.budget || "N/A"}</p>
                </div>
                <div className="bg-charcoal-900/40 p-2 rounded border border-white/5">
                  <p className="text-[8px] text-gray-500 uppercase tracking-tighter">Location</p>
                  <p className="text-xs text-white font-medium truncate">{inquiry.venue_city || "N/A"}</p>
                </div>
              </div>

              <div className="bg-charcoal-900/50 p-4 rounded-xl border border-white/5 mb-4 flex-grow">
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">{inquiry.message}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(inquiry.created_at).toLocaleDateString()}
                </span>
                {inquiry.guest_count && (
                  <span className="bg-white/5 px-2 py-0.5 rounded text-[10px]">
                    {inquiry.guest_count} Guests
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
