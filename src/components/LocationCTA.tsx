import Link from "next/link";
import { CalendarCheck, ArrowRight } from "lucide-react";

const WhatsAppIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

/**
 * Inline conversion CTA for location pages — placed once per page, after the
 * services section. Offers the two highest-intent channels side by side:
 *   • WhatsApp (instant chat, prefilled with the city)
 *   • Book a free consultation
 * Deliberately a single, well-placed card per page so CTAs never feel spammy.
 * The global floating WhatsApp button handles the persistent/sticky channel.
 */
export default function LocationCTA({ city }: { city: string }) {
  const waText = encodeURIComponent(
    `Hi Saudi Event Management! I'd like to plan an event in ${city}. Could you share availability and a proposal?`
  );
  const waUrl = `https://wa.me/966501234567?text=${waText}`;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        <div
          className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-emerald-50/50 px-7 py-10 md:px-12 md:py-12"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <span className="section-label mb-3 flex">
                <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
                Plan Your {city} Event
              </span>
              <h2 className="text-2xl md:text-[28px] font-semibold text-neutral-900 mb-3" style={{ letterSpacing: "-0.02em" }}>
                Talk to an event planner in {city}
              </h2>
              <p className="text-neutral-500 text-[15px] leading-relaxed">
                Share your dates and vision — our local team replies within the hour on WhatsApp,
                or book a free consultation to plan your event step by step.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] text-white text-[14px] font-semibold transition-transform hover:scale-[1.02]"
                style={{ boxShadow: "0 6px 18px rgba(37,211,102,0.30), inset 0 1px 0 rgba(255,255,255,0.18)" }}
              >
                <WhatsAppIcon size={18} />
                Chat on WhatsApp
              </a>
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-neutral-200 text-neutral-800 text-[14px] font-semibold transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                <CalendarCheck size={16} />
                Book a Free Consultation
              </Link>
            </div>
          </div>

          <div className="mt-7 pt-6 border-t border-emerald-100/80">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors"
            >
              Prefer email? Request a detailed proposal
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
