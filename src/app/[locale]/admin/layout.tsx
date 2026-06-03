"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronRight,
  ChevronDown,
  Target,
  FileText,
  DollarSign,
  TrendingUp,
  BarChart3,
  Settings,
  Star,
  Image,
  Megaphone,
  Wallet,
  Receipt,
  PieChart,
  ClipboardList,
  Zap
} from "lucide-react";

type NavGroup = {
  label: string;
  items: {
    href: string;
    label: string;
    icon: React.ElementType;
    badge?: number;
  }[];
};

const navGroups: NavGroup[] = [
  {
    label: "",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Sales",
    items: [
      { href: "/admin/inquiries", label: "Leads", icon: Target },
      { href: "/admin/clients", label: "CRM", icon: Users },
      { href: "/admin/proposals", label: "Proposals", icon: FileText },
    ],
  },
  {
    label: "Events",
    items: [
      { href: "/admin/events", label: "Events", icon: CalendarDays },
      { href: "/admin/calendar", label: "Calendar", icon: CalendarDays },
      { href: "/admin/gallery", label: "Gallery", icon: Image },
    ],
  },
  {
    label: "Vendors",
    items: [
      { href: "/admin/vendors", label: "Vendors", icon: Briefcase },
      { href: "/admin/quotes", label: "Quotes", icon: MessageSquareQuote },
    ],
  },
  {
    label: "Marketing",
    items: [
      { href: "/admin/blog", label: "Blog", icon: Sparkles },
      { href: "/admin/testimonials", label: "Testimonials", icon: Star },
    ],
  },
  {
    label: "Finance",
    items: [
      { href: "/admin/finance", label: "Revenue", icon: DollarSign },
    ],
  },
  {
    label: "Reports",
    items: [
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/admin/status", label: "Activity Logs", icon: Activity },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingQuoteCount, setPendingQuoteCount] = useState(0);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
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

  const toggleGroup = (label: string) => {
    setCollapsedGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Loading Dashboard…</span>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-['Inter',system-ui,sans-serif] text-slate-800">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ───────────────────────────────────────────────────── */}
      <aside className={`fixed lg:static inset-y-0 start-0 z-[70] w-[260px] bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}`}>
        
        {/* Brand */}
        <div className="px-5 py-4 border-b border-slate-100">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm shadow-teal-500/20 group-hover:shadow-md group-hover:shadow-teal-500/30 transition-all duration-300">
              <Zap className="text-white" size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-slate-900 tracking-tight leading-none">Saudi Event</span>
              <span className="text-[9px] text-teal-600 font-semibold uppercase tracking-[0.15em] mt-0.5">Admin Console</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto scrollbar-thin">
          {navGroups.map((group, groupIdx) => {
            const isCollapsed = collapsedGroups[group.label];
            
            return (
              <div key={groupIdx} className={groupIdx > 0 ? "mt-2" : ""}>
                {/* Group Label */}
                {group.label && (
                  <button
                    onClick={() => toggleGroup(group.label)}
                    className="w-full flex items-center justify-between px-3 py-2 mb-0.5 group/header cursor-pointer"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 group-hover/header:text-slate-500 transition-colors">
                      {group.label}
                    </span>
                    <ChevronDown 
                      size={12} 
                      className={`text-slate-400 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`} 
                    />
                  </button>
                )}
                
                {/* Group Items */}
                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {group.items.map((item) => {
                        const isActive = pathname?.includes(item.href);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center group relative px-3 py-[7px] rounded-lg text-[13px] font-medium transition-all duration-200 ${
                              isActive
                                ? "bg-teal-50 text-teal-700 font-semibold"
                                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <item.icon size={15} className={`transition-colors duration-200 flex-shrink-0 ${isActive ? "text-teal-600" : "text-slate-400 group-hover:text-slate-500"}`} />
                            <span className="ms-2.5 truncate">{item.label}</span>
                            {item.href === "/admin/quotes" && pendingQuoteCount > 0 && (
                              <span className="ms-auto px-1.5 py-0.5 bg-teal-500 text-white text-[9px] font-bold rounded-full min-w-[18px] text-center">
                                {pendingQuoteCount}
                              </span>
                            )}
                            {isActive && (
                              <motion.div 
                                layoutId="active-indicator"
                                className="absolute end-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                              </motion.div>
                            )}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Settings + Logout */}
        <div className="px-3 py-3 border-t border-slate-100 space-y-0.5">
          <Link
            href="/admin/settings"
            className="flex items-center gap-2.5 px-3 py-[7px] rounded-lg text-[13px] font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all duration-200 w-full"
          >
            <Settings size={15} className="text-slate-400" />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-[7px] rounded-lg text-[13px] font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 w-full group"
          >
            <LogOut size={15} className="transition-transform group-hover:-translate-x-0.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 px-6 h-14 flex items-center justify-between">
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
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 group transition-all focus-within:border-teal-400/50 focus-within:bg-white focus-within:shadow-sm focus-within:shadow-teal-500/5"
            >
              <Search size={14} className="text-slate-400 group-focus-within:text-teal-500 transition-colors" />
              <input 
                name="q"
                type="text" 
                placeholder="Search clients, vendors, quotes…" 
                className="bg-transparent border-none text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none w-56"
              />
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-slate-100 rounded border border-slate-200">⌘K</kbd>
            </form>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all relative">
              <Bell size={17} />
              <span className="absolute top-2 end-2 w-2 h-2 bg-teal-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-6 w-px bg-slate-200 mx-1" />
            <div className="flex items-center gap-2.5 group cursor-pointer hover:bg-slate-50 rounded-lg px-2 py-1.5 transition-all">
              <div className="text-end hidden sm:block">
                <p className="text-xs font-semibold text-slate-700 leading-none">Administrator</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Saudi Event HQ</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold text-[11px] shadow-sm shadow-teal-500/20">
                SE
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 lg:p-6 overflow-x-hidden">
          <div className="max-w-[1440px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
