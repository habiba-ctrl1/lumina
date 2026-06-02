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
  const [pendingQuoteCount, setPendingQuoteCount] = useState(0);
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

    // Fetch pending quotes count
    const fetchCounts = async () => {
      try {
        const res = await fetch('/api/admin/quote-requests');
        const data = await res.json();
        if (data.counts) setPendingQuoteCount(data.counts.pending || 0);
      } catch (e) {
        console.error('Failed to fetch counts');
      }
    };
    fetchCounts();
    const interval = setInterval(fetchCounts, 60000); // Refresh every minute
    return () => clearInterval(interval);
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
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Loading Dashboard…</span>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex font-sans">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ───────────────────────────────────────────────────── */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-[70] w-72 bg-[#0d1321] border-r border-white/[0.06] flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}`}>
        
        {/* Brand */}
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-amber-500/10 rounded-xl flex items-center justify-center group-hover:bg-amber-500 transition-all duration-300">
              <Sparkles className="text-amber-500 group-hover:text-white transition-colors" size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight leading-none">Saudi Event</span>
              <span className="text-[9px] text-amber-500/80 font-semibold uppercase tracking-[0.2em] mt-0.5">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <div className="px-3 mb-3">
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">Management</span>
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center group relative px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/[0.08] text-white"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                <item.icon size={16} className={`transition-colors duration-200 flex-shrink-0 ${isActive ? "text-amber-500" : "text-slate-500 group-hover:text-slate-300"}`} />
                <span className="ml-3 truncate">{item.label}</span>
                {item.href === "/admin/quotes" && pendingQuoteCount > 0 && (
                  <span className="ml-auto px-1.5 py-0.5 bg-amber-500 text-white text-[9px] font-bold rounded-full min-w-[18px] text-center">
                    {pendingQuoteCount}
                  </span>
                )}
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute right-3"
                  >
                    <ChevronRight size={12} className="text-amber-500" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/[0.06]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full group"
          >
            <LogOut size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-50 bg-[#0d1321]/80 backdrop-blur-xl border-b border-white/[0.06] px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center hover:bg-white/[0.06] rounded-lg text-slate-400 transition-all"
            >
              <Menu size={18} />
            </button>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const q = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value;
                if (q.trim()) router.push(`/admin/search?q=${encodeURIComponent(q)}`);
              }}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] rounded-lg border border-white/[0.06] group transition-all focus-within:border-amber-500/30 focus-within:bg-white/[0.06]"
            >
              <Search size={14} className="text-slate-500 group-focus-within:text-amber-500 transition-colors" />
              <input 
                name="q"
                type="text" 
                placeholder="Search…" 
                className="bg-transparent border-none text-sm text-white placeholder:text-slate-500 focus:outline-none w-44"
              />
            </form>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] rounded-lg transition-all relative">
              <Bell size={17} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-amber-500 rounded-full" />
            </button>
            <div className="h-5 w-px bg-white/[0.08]" />
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-white leading-none">Administrator</p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">Saudi Event HQ</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-[11px] group-hover:bg-amber-500/20 transition-all">
                SE
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
