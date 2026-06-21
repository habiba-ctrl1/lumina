import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveEventTracker from "@/components/LiveEventTracker";
import WhatsAppButton from "@/components/WhatsAppButton";

// Private utility route. Kept OUT of the sitemap and CRAWLABLE (not robots.txt-
// blocked) so this `noindex, nofollow` meta is actually seen and honored — the
// only reliable way to keep the URL out of the index even if external links exist.
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
