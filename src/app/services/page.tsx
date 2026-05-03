import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'Our Services | Lumina Events',
  description: 'Explore our luxury event management services in KSA and Pakistan.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-charcoal-900 overflow-hidden pt-20">
      <Preloader />
      <CustomCursor />
      <Navbar />
      <Services />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
