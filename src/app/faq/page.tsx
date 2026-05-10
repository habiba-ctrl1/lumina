import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'FAQ | Saudi Event Management',
  description: 'Frequently asked questions about our event management services.',
  alternates: { canonical: 'https://saudieventmanagement.com/faq' },
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-charcoal-900 overflow-hidden pt-20">
      <Navbar />
      <FAQ />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
