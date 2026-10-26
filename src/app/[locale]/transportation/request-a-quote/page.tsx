import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TransportEnquiryForm from "@/components/transportation/TransportEnquiryForm";
import TransportTracker from "@/components/transportation/TransportTracker";
import { SITE_URL } from "@/lib/seo";
import { COUNTRIES, SERVICE_CATEGORIES, VEHICLE_CLASSES, type ServiceCategoryKey } from "@/lib/transportation/config";
import type { EnquiryInput } from "@/lib/transportation/enquiry";

const PAGE_URL = `${SITE_URL}/transportation/request-a-quote`;

export const metadata: Metadata = {
  title: { absolute: "Request a Transportation Quote | Saudi Event Management" },
  description:
    "Request a tailored quotation for a chauffeur or private cross-border transfer. Share your route, passengers and vehicle preference.",
  alternates: { canonical: PAGE_URL },
};

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

/** Prefill from the hub's route selector. Values are re-validated on submit. */
function initialFrom(sp: SP): Partial<EnquiryInput> {
  const out: Partial<EnquiryInput> = { formId: "transport_request_a_quote" };
  const service = one(sp.service) as ServiceCategoryKey;
  if (service in SERVICE_CATEGORIES) out.serviceCategory = service;
  const countries = new Set(COUNTRIES.map((c) => c.key));
  const oc = one(sp.oc);
  const dc = one(sp.dc);
  if (countries.has(oc)) out.originCountry = oc;
  if (countries.has(dc)) out.destinationCountry = dc;
  const ocity = one(sp.ocity).slice(0, 80);
  const dcity = one(sp.dcity).slice(0, 80);
  if (ocity) out.originCity = ocity;
  if (dcity) out.destinationCity = dcity;
  if (/^\d{4}-\d{2}-\d{2}$/.test(one(sp.date))) out.travelDate = one(sp.date);
  if (/^\d{2}:\d{2}$/.test(one(sp.time))) out.pickupTime = one(sp.time);
  const pax = Number(one(sp.pax));
  if (pax >= 1 && pax <= 100) out.passengers = Math.trunc(pax);
  if (VEHICLE_CLASSES.some((v) => v.key === one(sp.vehicle))) out.vehicles = [one(sp.vehicle)];
  return out;
}

export default async function RequestAQuotePage({ searchParams }: { searchParams: Promise<SP> }) {
  const initial = initialFrom(await searchParams);
  return (
    <>
      <TransportTracker page="request_a_quote" />
      <main className="tx-root min-h-screen bg-[#0b1623] text-white">
        <Navbar darkHero />
        <div className="mx-auto max-w-3xl px-5 pb-20 pt-32 md:pt-40">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs text-white/60">
            <Link href="/" className="text-white/70 hover:text-white">Home</Link> <span aria-hidden>/</span>{" "}
            <Link href="/transportation" className="text-white/70 hover:text-white">Transportation</Link> <span aria-hidden>/</span>{" "}
            <span className="text-white/90">Request a quote</span>
          </nav>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5a059]">Request a quote</p>
          <h1 className="mt-3 font-serif text-3xl font-bold !text-white md:text-4xl">Request a Transportation Quotation</h1>
          <p className="mb-8 mt-4 max-w-xl text-white/75">
            Share your route, passengers and vehicle preference. We review feasibility and availability, then reply with a written quotation. Submitting this form is an enquiry, not a booking.
          </p>
          <TransportEnquiryForm formId="transport_request_a_quote" initial={initial} />
        </div>
        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
