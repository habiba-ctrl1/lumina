"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2 } from "lucide-react";

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
        ? 'Network error: Could not connect to the authentication server. Please check your internet connection or ad-blocker.' 
        : 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-charcoal-800 border border-white/5 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-light text-white mb-2">
              Saudi Event Management <span className="text-gold-500 font-semibold ">Admin</span>
            </h1>
            <p className="text-gray-400">Please sign in to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gold-500/50 transition-colors"
                  placeholder="admin@saudieventmanagement.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gold-500/50 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-500 hover:bg-gold-600 disabled:bg-gold-800 disabled:cursor-not-allowed text-charcoal-900 font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-4 shadow-lg shadow-gold-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Signing In...
                </>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => router.push("/")}
            className="text-gray-500 hover:text-white text-sm transition-colors"
          >
            ← Back to Website
          </button>
        </div>
      </motion.div>
    </div>
  );
}
