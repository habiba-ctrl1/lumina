import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: 'Client Testimonials',
  description: 'Read what our clients say about our luxury event management.',
};

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <ScrollProgress />
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="pt-24 md:pt-32" />
      
      <Testimonials />
      
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
