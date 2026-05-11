"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  MessageSquareQuote, 
  Mail, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  CalendarDays,
  Users,
  Briefcase,
  Activity,
  Bookmark,
  Bell,
  Search,
  ChevronRight
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/calendar", label: "Event Calendar", icon: CalendarDays },
  { href: "/admin/events", label: "Gallery & Events", icon: Bookmark },
  { href: "/admin/quotes", label: "Vendor Quotes", icon: MessageSquareQuote },
  { href: "/admin/inquiries", label: "Lead Pipeline", icon: Mail },
  { href: "/admin/clients", label: "Client CRM", icon: Users },
  { href: "/admin/vendors", label: "Vendor Network", icon: Briefcase },
  { href: "/admin/status", label: "Activity Logs", icon: Activity },
  { href: "/admin/blog", label: "Blog Content", icon: Sparkles },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (!session && pathname !== "/admin/login") {
          router.push("/admin/login");
        } else {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Synchronizing Vault</span>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 flex font-sans selection:bg-gold-500/10 selection:text-gold-600">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-[70] w-80 bg-white border-r border-slate-200/60 flex flex-col transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-10 border-b border-slate-100/60">
          <Link href="/admin/dashboard" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-900/20 group-hover:bg-gold-500 transition-all duration-500 transform group-hover:rotate-6">
              <Sparkles className="text-gold-500 group-hover:text-white transition-colors" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-slate-900 tracking-tighter leading-none uppercase">Saudi Event</span>
              <span className="text-[9px] text-gold-600 font-black uppercase tracking-[0.3em] mt-1.5 opacity-80">Intelligence Hub</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-8 space-y-2 overflow-y-auto custom-scrollbar">
          <div className="mb-6 px-4">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Management Suite</span>
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center group relative px-5 py-4 rounded-2xl text-[13px] font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/20"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <item.icon size={18} className={`transition-colors duration-300 ${isActive ? "text-gold-500" : "text-slate-400 group-hover:text-slate-900"}`} />
                <span className="ml-4 tracking-tight">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute right-4"
                  >
                    <ChevronRight size={14} className="text-gold-500" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-slate-100/60 bg-slate-50/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-[13px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 w-full group"
          >
            <LogOut size={18} className="transition-transform group-hover:-translate-x-1" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-600 transition-all"
            >
              <Menu size={20} />
            </button>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const q = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value;
                if (q.trim()) router.push(`/admin/search?q=${encodeURIComponent(q)}`);
              }}
              className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-slate-50 rounded-2xl border border-slate-100 group transition-all focus-within:ring-4 focus-within:ring-gold-500/5 focus-within:border-gold-500/20"
            >
              <Search size={16} className="text-slate-300 group-focus-within:text-gold-500 transition-colors" />
              <input 
                name="q"
                type="text" 
                placeholder="Universal Search..." 
                className="bg-transparent border-none text-[12px] font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none w-48"
              />
            </form>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-gold-500 rounded-full border-2 border-white shadow-sm" />
            </button>
            <div className="h-8 w-px bg-slate-100" />
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-[12px] font-black text-slate-900 leading-none">Administrator</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">SAUDI EVENT HQ</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-gold-500 font-black text-[12px] shadow-xl shadow-slate-900/10 group-hover:scale-105 transition-all">
                SE
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 lg:p-12 overflow-x-hidden relative">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
          
          {/* Subtle decoration */}
          <div className="fixed bottom-0 right-0 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
          <div className="fixed top-0 left-80 w-64 h-64 bg-slate-900/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
        </main>
      </div>
    </div>
  );
}

