"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Mail, User, Briefcase, FileText, CalendarDays, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

type SearchResult = {
  id: string;
  type: 'inquiry' | 'client' | 'vendor' | 'event' | 'blog';
  title: string;
  subtitle: string;
  href: string;
};

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const [inqRes, clientRes, vendorRes, eventRes, blogRes] = await Promise.all([
        fetch(`/api/contact?search=${query}`),
        fetch(`/api/clients?search=${query}`),
        fetch(`/api/vendors?search=${query}`),
        fetch(`/api/events?search=${query}`),
        fetch(`/api/blog`) // Blog API search not yet implemented, fetching all
      ]);

      const [inquiries, clients, vendors, events, blogs] = await Promise.all([
        inqRes.json(),
        clientRes.json(),
        vendorRes.json(),
        eventRes.json(),
        blogRes.json()
      ]);

      const formattedResults: SearchResult[] = [
        ...(Array.isArray(inquiries) ? inquiries.map((i: any) => ({
          id: i.id,
          type: 'inquiry' as const,
          title: i.name,
          subtitle: `Inquiry: ${i.eventType || 'General'}`,
          href: '/admin/inquiries'
        })) : []),
        ...(Array.isArray(clients) ? clients.map((c: any) => ({
          id: c.id,
          type: 'client' as const,
          title: c.name,
          subtitle: `Client: ${c.company || 'Private'}`,
          href: '/admin/clients'
        })) : []),
        ...(Array.isArray(vendors) ? vendors.map((v: any) => ({
          id: v.id,
          type: 'vendor' as const,
          title: v.name,
          subtitle: `Vendor: ${v.category}`,
          href: '/admin/vendors'
        })) : []),
        ...(Array.isArray(events.data) ? events.data.map((e: any) => ({
          id: e.id,
          type: 'event' as const,
          title: e.title,
          subtitle: `Event: ${e.type}`,
          href: '/admin/events'
        })) : []),
        ...(Array.isArray(blogs) ? blogs.filter((b: any) => 
          b.title.toLowerCase().includes(query.toLowerCase())
        ).map((b: any) => ({
          id: b.id,
          type: 'blog' as const,
          title: b.title,
          subtitle: `Article: ${b.category}`,
          href: '/admin/blog'
        })) : [])
      ];

      setResults(formattedResults);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'inquiry': return <Mail size={18} />;
      case 'client': return <User size={18} />;
      case 'vendor': return <Briefcase size={18} />;
      case 'event': return <CalendarDays size={18} />;
      case 'blog': return <FileText size={18} />;
    }
  };

  return (
    <div className="pb-16 max-w-[1440px] mx-auto text-slate-800">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
          Universal Search
        </h1>
        <p className="text-slate-500 text-sm">
          Showing results for &quot;<span className="text-teal-650 font-bold">{query}</span>&quot; across the intelligence hub.
        </p>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-teal-600" size={28} />
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Scanning Repositories</p>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm">
            <div className="w-14 h-14 bg-slate-50 border rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={22} className="text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">No Matches Located</h3>
            <p className="text-slate-500 text-xs max-w-xs mx-auto">We couldn't find any records matching your query. Try different keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {results.map((result: any, i: number) => (
              <motion.div
                key={`${result.type}-${result.id}`}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link 
                  href={result.href}
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between hover:border-teal-400 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-teal-50 text-teal-600 border border-teal-100 rounded-xl flex items-center justify-center transition-all shadow-sm">
                      {getTypeIcon(result.type)}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-800 mb-0.5 group-hover:text-teal-600 transition-colors tracking-tight">{result.title}</h3>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{result.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-teal-600 transition-all">
                    Access Record <ArrowRight size={12} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="text-xs text-slate-400">Loading Search...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
