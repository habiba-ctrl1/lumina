import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-charcoal-900 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-gold-500 hover:text-gold-400 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-display text-white mb-6">About Us</h1>
        <div className="prose prose-invert prose-gold max-w-none">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Lumina is a premier luxury event management company dedicated to crafting extraordinary experiences. 
            With years of expertise in orchestrating high-end weddings, corporate galas, and exclusive private parties, 
            we transform visions into breathtaking realities.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Our meticulous attention to detail and unwavering commitment to perfection ensure that every event we touch becomes a timeless memory.
          </p>
        </div>
      </div>
    </div>
  );
}
