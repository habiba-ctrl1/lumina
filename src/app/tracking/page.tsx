import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveEventTracker from "@/components/LiveEventTracker";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'Live Event Tracking | Saudi Event Management',
  description: 'Track the progress and execution of your luxury event in real-time.',
};

export default function TrackingPage() {
  return (
    <main className="min-h-screen bg-charcoal-900 overflow-hidden pt-20">
      <Navbar />
      <LiveEventTracker />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
