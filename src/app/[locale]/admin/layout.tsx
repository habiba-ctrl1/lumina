"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { adminFetch } from "@/lib/admin-fetch";
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
  Zap,
  Inbox,
  ListChecks,
  Bot
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
      { href: "/admin/action-needed", label: "Action Needed", icon: ListChecks },
      { href: "/admin/copilot", label: "Copilot", icon: Bot },
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
      { href: "/admin/vendor-applications", label: "Applications", icon: ClipboardList },
      { href: "/admin/email-leads", label: "Email Leads", icon: Inbox },
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
  const [actionNeededCount, setActionNeededCount] = useState(0);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifLogs, setNotifLogs] = useState<{ id: string; action: string; details: string | null; createdAt: string }[]>([]);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);
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
        const res = await adminFetch('/api/admin/quote-requests');
        const data = await res.json();
        if (data.counts) setPendingQuoteCount(data.counts.pending || 0);
      } catch (e) {
        console.error('Failed to fetch counts');
      }
      try {
        const res = await adminFetch('/api/admin/action-needed');
        const data = await res.json();
        if (data.counts) setActionNeededCount(data.counts.total || 0);
      } catch (e) {
        console.error('Failed to fetch action-needed count');
      }
      // Notification bell — real activity feed, no separate notifications
      // table. "Unread" = entries newer than the last time this device
      // opened the bell (tracked locally; this is a single-operator system).
      try {
        const res = await adminFetch('/api/logs');
        const data = await res.json();
        const logs = Array.isArray(data) ? data.slice(0, 10) : [];
        setNotifLogs(logs);
        const lastSeen = localStorage.getItem('sem_notif_last_seen');
        const lastSeenTime = lastSeen ? new Date(lastSeen).getTime() : 0;
        setUnreadNotifCount(logs.filter((l: { createdAt: string }) => new Date(l.createdAt).getTime() > lastSeenTime).length);
      } catch (e) {
        console.error('Failed to fetch notifications');
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
      <div className="min-h-screen bg-brand-surface-raised flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-foreground-faint">Loading Dashboard…</span>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-brand-surface-raised flex font-['Inter',system-ui,sans-serif] text-brand-foreground">
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
      <aside className={`fixed lg:static inset-y-0 start-0 z-[70] w-[260px] bg-white border-r border-brand-border flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}`}>

        {/* Brand */}
        <div className="px-5 py-4 border-b border-brand-border-subtle">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-lg flex items-center justify-center shadow-card group-hover:shadow-card-hover transition-all duration-300">
              <Zap className="text-white" size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-brand-heading tracking-tight leading-none">Saudi Event</span>
              <span className="text-[9px] text-brand-primary font-semibold uppercase tracking-[0.15em] mt-0.5">Admin Console</span>
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
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-foreground-faint group-hover/header:text-brand-foreground-muted transition-colors">
                      {group.label}
                    </span>
                    <ChevronDown
                      size={12}
                      className={`text-brand-foreground-faint transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
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
                                ? "bg-brand-primary/[0.08] text-brand-primary-dark font-semibold"
                                : "text-brand-foreground-muted hover:text-brand-foreground hover:bg-brand-surface-raised"
                            }`}
                          >
                            <item.icon size={15} className={`transition-colors duration-200 flex-shrink-0 ${isActive ? "text-brand-primary" : "text-brand-foreground-faint group-hover:text-brand-foreground-muted"}`} />
                            <span className="ms-2.5 truncate">{item.label}</span>
                            {item.href === "/admin/quotes" && pendingQuoteCount > 0 && (
                              <span className="ms-auto px-1.5 py-0.5 bg-status-warning text-white text-[9px] font-bold rounded-full min-w-[18px] text-center">
                                {pendingQuoteCount}
                              </span>
                            )}
                            {item.href === "/admin/action-needed" && actionNeededCount > 0 && (
                              <span className="ms-auto px-1.5 py-0.5 bg-status-critical text-white text-[9px] font-bold rounded-full min-w-[18px] text-center">
                                {actionNeededCount}
                              </span>
                            )}
                            {isActive && (
                              <motion.div
                                layoutId="active-indicator"
                                className="absolute end-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
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
        <div className="px-3 py-3 border-t border-brand-border-subtle space-y-0.5">
          <Link
            href="/admin/settings"
            className="flex items-center gap-2.5 px-3 py-[7px] rounded-lg text-[13px] font-medium text-brand-foreground-muted hover:text-brand-foreground hover:bg-brand-surface-raised transition-all duration-200 w-full"
          >
            <Settings size={15} className="text-brand-foreground-faint" />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-[7px] rounded-lg text-[13px] font-medium text-brand-foreground-faint hover:text-status-critical hover:bg-status-critical-bg transition-all duration-200 w-full group"
          >
            <LogOut size={15} className="transition-transform group-hover:-translate-x-0.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-brand-border px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center hover:bg-brand-surface-raised rounded-lg text-brand-foreground-muted transition-all"
            >
              <Menu size={18} />
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value;
                if (q.trim()) router.push(`/admin/search?q=${encodeURIComponent(q)}`);
              }}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-brand-surface-raised rounded-lg border border-brand-border group transition-all focus-within:border-brand-primary-light/60 focus-within:bg-white focus-within:shadow-card"
            >
              <Search size={14} className="text-brand-foreground-faint group-focus-within:text-brand-primary transition-colors" />
              <input
                name="q"
                type="text"
                placeholder="Search clients, vendors, quotes…"
                className="bg-transparent border-none text-sm text-brand-foreground placeholder:text-brand-foreground-faint focus:outline-none w-56"
              />
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-brand-foreground-faint bg-brand-surface-lifted rounded border border-brand-border">⌘K</kbd>
            </form>
            {/* Mobile search entry point — the form above is `hidden md:flex`,
                so without this, search has no entry point at all below md. */}
            <Link
              href="/admin/search"
              className="md:hidden w-9 h-9 flex items-center justify-center text-brand-foreground-muted hover:bg-brand-surface-raised rounded-lg transition-all"
              aria-label="Search"
            >
              <Search size={17} />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => {
                  const opening = !notifOpen;
                  setNotifOpen(opening);
                  if (opening) {
                    localStorage.setItem('sem_notif_last_seen', new Date().toISOString());
                    setUnreadNotifCount(0);
                  }
                }}
                className="w-9 h-9 flex items-center justify-center text-brand-foreground-faint hover:text-brand-foreground-muted hover:bg-brand-surface-raised rounded-lg transition-all relative"
              >
                <Bell size={17} />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-1 end-1 min-w-[15px] h-[15px] px-[3px] bg-status-critical text-white text-[8.5px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {unreadNotifCount > 9 ? '9+' : unreadNotifCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-[80]" onClick={() => setNotifOpen(false)} />
                  <div className="absolute end-0 top-11 w-80 bg-white border border-brand-border rounded-xl shadow-2xl z-[90] overflow-hidden">
                    <div className="px-4 py-3 border-b border-brand-border-subtle flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-heading">Recent Activity</span>
                      <Link href="/admin/status" onClick={() => setNotifOpen(false)} className="text-[10px] font-bold text-brand-primary hover:text-brand-primary-dark uppercase tracking-wider">View all</Link>
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-brand-border-subtle">
                      {notifLogs.length === 0 ? (
                        <p className="px-4 py-6 text-center text-[11px] text-brand-foreground-faint">No activity yet.</p>
                      ) : (
                        notifLogs.map((log) => (
                          <div key={log.id} className="px-4 py-2.5">
                            <p className="text-[11.5px] font-semibold text-brand-foreground">{log.action}</p>
                            {log.details && <p className="text-[10.5px] text-brand-foreground-muted mt-0.5 truncate">{log.details}</p>}
                            <p className="text-[9.5px] text-brand-foreground-faint mt-0.5">{new Date(log.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="h-6 w-px bg-brand-border mx-1" />
            <div className="flex items-center gap-2.5 group cursor-pointer hover:bg-brand-surface-raised rounded-lg px-2 py-1.5 transition-all">
              <div className="text-end hidden sm:block">
                <p className="text-xs font-semibold text-brand-foreground leading-none">Administrator</p>
                <p className="text-[10px] text-brand-foreground-faint font-medium mt-0.5">Saudi Event HQ</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-primary-dark flex items-center justify-center text-white font-bold text-[11px] shadow-card">
                SE
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 lg:p-6 overflow-x-hidden">
          <div className="admin-scope max-w-[1440px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
