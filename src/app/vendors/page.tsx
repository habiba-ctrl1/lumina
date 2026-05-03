import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Image from "next/image";
import Link from "next/link";
import { Camera, Cake, Flower2, Star, ArrowRight } from "lucide-react";

const categories = [
  { id: "photography", name: "Professional Photography", icon: Camera },
  { id: "cakes", name: "Luxury Wedding Cakes", icon: Cake },
  { id: "floral", name: "Floral Design", icon: Flower2 },
];

const vendors = [
  {
    id: 1,
    categoryId: "photography",
    name: "Al-Majid Studios",
    image: "/vendor_photo_1.png",
    rating: 5.0,
    reviews: 124,
    location: "Riyadh, KSA",
  },
  {
    id: 2,
    categoryId: "photography",
    name: "Elite Vision PK",
    image: "/vendor_photo_2.png",
    rating: 4.9,
    reviews: 45,
    location: "Islamabad, PK",
  },
  {
    id: 3,
    categoryId: "cakes",
    name: "The Golden Whisk",
    image: "/vendor_cake_1.png",
    rating: 4.9,
    reviews: 89,
    location: "Dubai, UAE",
  },
  {
    id: 4,
    categoryId: "cakes",
    name: "Velvet Sugar",
    image: "/vendor_cake_2.png",
    rating: 5.0,
    reviews: 32,
    location: "Karachi, PK",
  },
  {
    id: 5,
    categoryId: "floral",
    name: "Emerald Blooms",
    image: "/vendor_floral_1.png",
    rating: 5.0,
    reviews: 56,
    location: "Lahore, PK",
  },
  {
    id: 6,
    categoryId: "floral",
    name: "Oasis Petals",
    image: "/vendor_floral_2.png",
    rating: 4.8,
    reviews: 78,
    location: "Jeddah, KSA",
  },
];

export const metadata = {
  title: 'Luxury Vendor Directory | Lumina Events',
  description: 'Discover our curated selection of premium event vendors including photographers, cake designers, and florists across KSA and Pakistan.',
};

export default function VendorsPage() {
  return (
    <main className="min-h-screen bg-emerald-950 overflow-hidden pt-24">
      <Preloader />
      <CustomCursor />
      <Navbar />

      {/* Hero Section for Vendors */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-gold-500 text-xs uppercase tracking-[0.4em] font-medium mb-4 block">
            The Elite Collective
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-light text-white mb-6">
            Vendor <span className="text-shimmer font-semibold italic">Directory</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Browse our handpicked selection of the most prestigious event partners, 
            from award-winning photographers to master cake artisans.
          </p>
        </div>
      </section>

      {/* Categories & Vendors */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        {categories.map((category) => {
          const categoryVendors = vendors.filter(v => v.categoryId === category.id);

          return (
            <section key={category.id} id={category.id} className="relative">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
                <div className="w-12 h-12 rounded-full bg-charcoal-800 border border-gold-500/30 flex items-center justify-center text-gold-500">
                  <category.icon size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display text-white">{category.name}</h2>
              </div>

              {/* Vendor Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="group bg-charcoal-800/40 border border-white/5 rounded-2xl overflow-hidden hover:border-gold-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/5 flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="relative h-64 md:h-72 w-full overflow-hidden">
                      {/* Using a placeholder gradient if images don't exist, but Next Image is used */}
                      <div className="absolute inset-0 bg-charcoal-900" />
                      <Image
                        src={vendor.image}
                        alt={vendor.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-emerald-950/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] text-gold-500 uppercase tracking-widest font-bold">
                          {vendor.location}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-display font-medium text-white group-hover:text-gold-400 transition-colors">
                            {vendor.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1 bg-gold-500/10 px-2 py-1 rounded">
                          <Star size={12} className="text-gold-500 fill-gold-500" />
                          <span className="text-gold-500 text-xs font-bold">{vendor.rating}</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                        <span className="text-gray-400 text-xs italic">
                          {vendor.reviews} Verified Reviews
                        </span>
                        <a 
                          href={`https://wa.me/923001234567?text=Hi Lumina Events, I would like to know more about the vendor: ${encodeURIComponent(vendor.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gold-500 text-xs font-bold uppercase tracking-widest group/btn"
                        >
                          View Details
                          <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <Footer />
    </main>
  );
}
