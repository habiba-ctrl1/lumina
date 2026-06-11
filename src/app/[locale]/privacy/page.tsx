import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: 'Privacy Policy',
    description: 'Privacy policy for Saudi Event Management website and services.',
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/privacy`,
      languages: { "en-US": `${base}/privacy`, "ar-SA": `${base}/ar/privacy` },
    },
  };
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-charcoal-900 overflow-hidden">
      <Navbar />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-gold-500 hover:text-gold-400 mb-8 transition-colors text-sm">
            <ArrowLeft size={16} className="me-2" /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-white mb-8">Privacy Policy</h1>
          <div className="prose prose-invert prose-gold max-w-none text-gray-300">
            <p className="mb-8">Last updated: May 2026</p>
            <p className="mb-8">
              At Saudi Event Management, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information when you use our website and services.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-8">Information Collection</h2>
            <p className="mb-8">
              We collect information that you voluntarily provide to us when you fill out contact forms, including your name, email address, phone number, and event details.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-8">How We Use Your Information</h2>
            <p className="mb-8">
              The information we collect is used solely to communicate with you regarding your event inquiries and to provide our luxury event management services. We may use your contact details to send personalized proposals, event updates, and service-related notifications relevant to your upcoming celebrations or corporate functions.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-8">Data Protection & Security</h2>
            <p className="mb-8">
              Saudi Event Management employs industry-standard encryption protocols and secure servers to safeguard your personal data. All sensitive information, including financial details and guest lists, is stored on encrypted databases with restricted access limited to authorized personnel. We conduct regular security audits to ensure the highest level of data protection for our clientele across Riyadh, Jeddah, AlUla, and Dammam.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-8">Cookies & Tracking Technologies</h2>
            <p className="mb-8">
              Our website uses cookies to enhance your browsing experience and analyze site traffic. These small text files help us understand how visitors interact with our pages, allowing us to improve navigation, personalize content recommendations, and optimize the overall user experience. You may configure your browser to reject cookies, though certain features of our website may be limited as a result.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-8">Third-Party Sharing</h2>
            <p className="mb-8">
              We do not sell, rent, or share your personal information with third parties for marketing purposes. In the course of delivering our event management services, we may share relevant details with trusted vendors, caterers, venue partners, and logistics providers who are contractually bound to protect your information and use it solely for event execution purposes.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-8">Data Retention</h2>
            <p className="mb-8">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, typically for a period of 24 months following the completion of your event. After this period, your data is securely deleted from our systems unless you request an earlier removal or opt to remain in our client database for future engagements.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-8">Your Rights</h2>
            <p className="mb-8">
              You have the right to access, correct, or delete your personal information at any time. To exercise these rights, or if you have any questions regarding this privacy policy, please contact our data protection team at privacy@saudieventmanagement.com or call our Riyadh headquarters directly.
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
