import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveEventTracker from "@/components/LiveEventTracker";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'Live Event Tracking',
  description: 'Track the progress and execution of your luxury event in real-time.',
  robots: { index: false, follow: false },
};

export default function TrackingPage() {
  return (
    <main className="min-h-screen bg-ink-800 overflow-hidden pt-20">
      <Navbar />
      <LiveEventTracker />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
