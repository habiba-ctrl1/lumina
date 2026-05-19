import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Riyadh Luxury Soiree Case Study',
  description: 'An exclusive high-society soiree in Riyadh, featuring bespoke production and elite hospitality by Saudi Event Management.',
  alternates: { canonical: 'https://saudieventmanagement.com/portfolio/riyadh-luxury-soiree' },
};

export default function RiyadhLuxurySoireeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
