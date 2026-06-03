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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Loading Dashboard…</span>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ───────────────────────────────────────────────────── */}
      <aside className={`fixed lg:static inset-y-0 start-0 z-[70] w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}`}>
        
        {/* Brand */}
        <div className="px-6 py-5 border-b border-slate-200">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center group-hover:bg-teal-600 transition-all duration-300">
              <Sparkles className="text-teal-600 group-hover:text-white transition-colors" size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 tracking-tight leading-none">Saudi Event</span>
              <span className="text-[9px] text-teal-600 font-semibold uppercase tracking-[0.2em] mt-0.5">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <div className="px-3 mb-3">
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">Management</span>
          </div>
          {navItems.map((item: any) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center group relative px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-teal-50 text-teal-900"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <item.icon size={16} className={`transition-colors duration-200 flex-shrink-0 ${isActive ? "text-teal-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                <span className="ms-3 truncate">{item.label}</span>
                {item.href === "/admin/quotes" && pendingQuoteCount > 0 && (
                  <span className="ms-auto px-1.5 py-0.5 bg-teal-600 text-white text-[9px] font-bold rounded-full min-w-[18px] text-center">
                    {pendingQuoteCount}
                  </span>
                )}
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute end-3"
                  >
                    <ChevronRight size={12} className="text-teal-600" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 w-full group"
          >
            <LogOut size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-500 transition-all"
            >
              <Menu size={18} />
            </button>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const q = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value;
                if (q.trim()) router.push(`/admin/search?q=${encodeURIComponent(q)}`);
              }}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200 group transition-all focus-within:border-teal-500/30 focus-within:bg-white"
            >
              <Search size={14} className="text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <input 
                name="q"
                type="text" 
                placeholder="Search…" 
                className="bg-transparent border-none text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none w-44"
              />
            </form>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all relative">
              <Bell size={17} />
              <span className="absolute top-2 end-2 w-1.5 h-1.5 bg-teal-600 rounded-full" />
            </button>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-end hidden sm:block">
                <p className="text-xs font-semibold text-slate-800 leading-none">Administrator</p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">Saudi Event HQ</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-600/20 flex items-center justify-center text-teal-700 font-bold text-[11px] group-hover:bg-teal-100 transition-all">
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
