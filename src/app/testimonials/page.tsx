import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'Testimonials | Lumina Events',
  description: 'Read what our clients say about our luxury event management.',
};

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-charcoal-900 overflow-hidden pt-20">
      <Preloader />
      <CustomCursor />
      <Navbar />
      <Testimonials />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
