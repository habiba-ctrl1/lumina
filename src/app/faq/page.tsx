import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import FAQ from "@/components/FAQ";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'FAQ | Lumina Events',
  description: 'Frequently asked questions about our event management services.',
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-charcoal-900 overflow-hidden pt-20">
      <Preloader />
      <CustomCursor />
      <Navbar />
      <FAQ />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
