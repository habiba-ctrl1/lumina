"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, ShieldCheck, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message === 'Failed to fetch' 
        ? 'Network error: Could not connect to the authentication server.' 
        : 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gold-200/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-gold-300/10 rounded-full blur-[140px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="bg-ink-800 border border-ink-600 p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 backdrop-blur-xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gold-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-gold-500/20">
              <ShieldCheck className="text-white" size={40} />
            </div>
            <h1 className="text-4xl font-extrabold text-sand-50 tracking-tight mb-3">
              Saudi Event <span className="text-gold-500">Admin</span>
            </h1>
            <p className="text-sand-300 font-medium">Restricted Access • Strategic Operations</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-2xl flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </motion.div>
            )}

            <div className="space-y-3">
              <label className="text-[10px] uppercase font-black tracking-widest text-sand-400 ml-1">
                Administrative ID
              </label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-sand-400 group-focus-within:text-gold-500 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-ink-950 border border-ink-600 rounded-2xl py-5 pl-14 pr-6 text-sand-50 font-bold focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all placeholder:text-sand-400"
                  placeholder="admin@saudievent.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase font-black tracking-widest text-sand-400 ml-1">
                Access Credentials
              </label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-sand-400 group-focus-within:text-gold-500 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-ink-950 border border-ink-600 rounded-2xl py-5 pl-14 pr-6 text-sand-50 font-bold focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all placeholder:text-sand-400"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-black py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 mt-6 shadow-xl shadow-slate-900/10 transform active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Authenticating...
                </>
              ) : (
                <>
                  Authorize & Enter
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => router.push("/")}
            className="text-sand-400 hover:text-sand-50 font-bold text-sm transition-all flex items-center gap-2 mx-auto bg-ink-800 px-6 py-2 rounded-full border border-ink-500 shadow-sm"
          >
            ← Exit to Public Site
          </button>
        </div>
      </motion.div>
    </div>
  );
}

