import ServiceMobileCTA from "@/components/ServiceMobileCTA";

// Wraps every /services route (hub, individual services, and PSEO [slug] pages).
// Per-service child layouts still own their own metadata; this parent only adds
// the shared mobile sticky consultation CTA.
export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ServiceMobileCTA />
    </>
  );
}
