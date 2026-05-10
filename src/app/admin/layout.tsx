"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
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
  Bell
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/calendar", label: "Calendar & Schedule", icon: CalendarDays },
  { href: "/admin/quotes", label: "Vendor Quotes", icon: MessageSquareQuote },
  { href: "/admin/events", label: "Bookings & Events", icon: Bookmark },
  { href: "/admin/inquiries", label: "Leads & Inquiries", icon: Mail },
  { href: "/admin/clients", label: "Clients CRM", icon: Users },
  { href: "/admin/vendors", label: "Vendors & Team", icon: Briefcase },
  { href: "/admin/status", label: "Business Status", icon: Activity },
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

  // Login page gets no layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-8 border-b border-slate-100">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="p-2 bg-gold-500 rounded-xl shadow-lg shadow-gold-500/20">
              <Sparkles className="text-white" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 tracking-tight leading-none">Lumina</span>
              <span className="text-[10px] text-gold-600 font-black uppercase tracking-[0.2em] mt-1">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gold-50 text-gold-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <item.icon size={20} className={isActive ? "text-gold-600" : "text-slate-400 group-hover:text-slate-900"} />
                <span className="tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 w-full group"
          >
            <LogOut size={20} className="text-slate-400 group-hover:text-red-500" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-sm font-semibold text-slate-500 hidden sm:block">
              Saudi Event Management System
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-gold-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gold-100 border border-gold-200 flex items-center justify-center text-gold-700 font-bold text-xs shadow-sm">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10 bg-slate-50 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

