import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'Our Services | Saudi Event Management',
  description: 'Explore our luxury event management services in KSA and Pakistan.',
  alternates: { canonical: 'https://saudieventmanagement.com/services' },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-navy-950 overflow-hidden pt-20">
      <Navbar />
      <Services />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
