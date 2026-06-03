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
          href: '/admin/calendar'
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
    <div className="pb-20 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-sand-50 tracking-tight mb-2">
          Universal Search
        </h1>
        <p className="text-sand-300 font-medium">
          Showing results for &quot;<span className="text-gold-600 font-bold">{query}</span>&quot; across the intelligence hub.
        </p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-28 flex flex-col items-center justify-center gap-10">
            <Loader2 className="animate-spin text-gold-500" size={32} />
            <p className="text-xs font-black uppercase tracking-[0.4em] text-sand-500">Scanning Repositories</p>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-ink-800 border border-ink-600 rounded-[2.5rem] p-20 text-center shadow-sm">
            <div className="w-20 h-20 bg-ink-950 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search size={32} className="text-slate-200" />
            </div>
            <h3 className="text-xl font-bold text-sand-50 mb-2">No Matches Located</h3>
            <p className="text-sand-400 font-medium max-w-xs mx-auto">We couldn't find any records matching your query. Try different keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10">
            {results.map((result: any, i: number) => (
              <motion.div
                key={`${result.type}-${result.id}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link 
                  href={result.href}
                  className="bg-ink-800 border border-ink-500 rounded-3xl p-6 flex items-center justify-between hover:border-gold-500/30 hover:shadow-xl hover:shadow-gold-500/5 transition-all group"
                >
                  <div className="flex items-center gap-10">
                    <div className="w-12 h-12 bg-ink-950 rounded-2xl flex items-center justify-center text-sand-400 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-sm">
                      {getTypeIcon(result.type)}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-sand-50 mb-0.5 group-hover:text-gold-600 transition-colors uppercase tracking-tight">{result.title}</h3>
                      <p className="text-[10px] text-sand-400 font-black uppercase tracking-widest">{result.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-sand-500 group-hover:text-gold-600 transition-all">
                    Access Record <ArrowRight size={14} />
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
    <Suspense fallback={<div>Loading Search...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
