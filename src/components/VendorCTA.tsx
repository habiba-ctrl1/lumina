import Link from "next/link";
import { ArrowRight, Store } from "lucide-react";

export default function VendorCTA() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          className="rounded-3xl px-10 py-14 md:px-16 md:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-12"
          style={{ background: "#FBF6E9", border: "1px solid #EDE0C4" }}
        >
          {/* Icon */}
          <div
            className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "#C5A880", boxShadow: "0 4px 16px rgba(197,168,128,0.25)" }}
          >
            <Store size={28} className="text-white" />
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-start">
            <span className="block text-[12px] font-semibold tracking-[0.1em] uppercase text-[#8B6F3E] mb-2">
              For Service Providers
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3"
              style={{ letterSpacing: "-0.02em" }}
            >
              Are You an Event Industry Vendor?
            </h2>
            <p className="text-neutral-600 text-[15px] leading-relaxed max-w-2xl">
              Join our curated network of 200+ premium vendors trusted by royal commissions and Fortune 500 delegations across Saudi Arabia.
            </p>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <Link
              href="/vendors"
              className="inline-flex items-center gap-2.5 text-white font-semibold px-7 py-4 rounded-xl text-[14px] transition-all duration-200 hover:opacity-90 whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #C5A880 0%, #A8875E 100%)",
                boxShadow: "0 4px 16px rgba(197,168,128,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              Apply to Become a Vendor
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
