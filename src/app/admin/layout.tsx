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
  Bookmark
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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
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
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-charcoal-900 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-charcoal-800 border-r border-white/5 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-8 border-b border-white/5">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <Sparkles className="text-gold-500" size={24} />
            <span className="text-xl font-light text-white tracking-tight">
              Saudi Event Management <span className="text-gold-500 font-bold">Admin</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-8 space-y-3 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-6 px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gold-500/10 text-gold-500 border border-gold-500/20 shadow-2xl shadow-gold-500/5"
                    : "text-gray-500 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <item.icon size={22} className={isActive ? "text-gold-500" : "text-gray-600 group-hover:text-white"} />
                <span className="tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-300 w-full group"
          >
            <LogOut size={20} className="text-gray-500 group-hover:text-red-400" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-charcoal-900/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between lg:justify-end">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <p className="text-gray-500 text-sm">
            Saudi Event Management Management Panel
          </p>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
