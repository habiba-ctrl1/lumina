import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecentEvents from "@/components/RecentEvents";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'Event Portfolio | Lumina Events',
  description: 'View our gallery of luxury events, weddings, and corporate summits.',
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-charcoal-900 overflow-hidden pt-20">
      <Navbar />
      <RecentEvents />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
