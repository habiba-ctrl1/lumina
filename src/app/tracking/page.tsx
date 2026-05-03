import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import LiveEventTracker from "@/components/LiveEventTracker";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'Live Event Tracking | Lumina Events',
  description: 'Track the progress and execution of your luxury event in real-time.',
};

export default function TrackingPage() {
  return (
    <main className="min-h-screen bg-charcoal-900 overflow-hidden pt-20">
      <Preloader />
      <CustomCursor />
      <Navbar />
      <LiveEventTracker />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
