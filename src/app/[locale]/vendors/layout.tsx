import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Event Vendors in Saudi Arabia | Saudi Event Management",
  description: "Browse our handpicked selection of the most prestigious event partners in Saudi Arabia. Elite photographers, luxury caterers, and floral designers across Riyadh and Jeddah.",
  keywords: [
    "Saudi Event Vendors",
    "Luxury Event Partners KSA",
    "Riyadh Event Catering",
    "Jeddah Wedding Photographers",
    "Premium Event Suppliers Saudi Arabia"
  ],
};

export default function VendorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
