"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, Mail, Calendar, User, Trash2, RefreshCw } from "lucide-react";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    fetchInquiries();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    }
  };

  const fetchInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching inquiries:", error);
    } else {
      setInquiries(data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting inquiry");
    } else {
      setInquiries(inquiries.filter(i => i.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-white">
      {/* Sidebar / Header */}
      <nav className="border-b border-white/5 bg-charcoal-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-light">
            Lumina <span className="text-gold-500 font-semibold italic">Dashboard</span>
          </h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-light mb-2">Contact Inquiries</h2>
            <p className="text-gray-500">Manage your latest messages from potential clients</p>
          </div>
          <button 
            onClick={fetchInquiries}
            className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-gold-500"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-charcoal-800 animate-pulse rounded-2xl border border-white/5" />
            ))}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-24 bg-charcoal-800 rounded-2xl border border-white/5">
            <Mail size={48} className="mx-auto text-gray-700 mb-4" />
            <p className="text-gray-500">No inquiries found yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inquiries.map((inquiry) => (
              <motion.div
                key={inquiry.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-charcoal-800 border border-white/5 p-6 rounded-2xl group hover:border-gold-500/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-gold-500/10 rounded-lg text-gold-500">
                    <User size={20} />
                  </div>
                  <button 
                    onClick={() => deleteInquiry(inquiry.id)}
                    className="text-gray-600 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-white mb-1">{inquiry.name}</h3>
                <p className="text-gold-500 text-sm mb-4 flex items-center gap-1">
                  <Mail size={14} /> {inquiry.email}
                </p>
                
                <div className="bg-charcoal-900/50 p-4 rounded-xl border border-white/5 mb-4 h-32 overflow-y-auto">
                  <p className="text-gray-400 text-sm leading-relaxed">{inquiry.message}</p>
                </div>

                <div className="flex items-center text-xs text-gray-500 gap-1">
                  <Calendar size={14} />
                  {new Date(inquiry.created_at).toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
