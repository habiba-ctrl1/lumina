import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'Client Testimonials',
  description: 'Read what our clients say about our luxury event management.',
};

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-emerald-950 overflow-hidden pt-20">
      <Navbar />
      <Testimonials />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
