import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: "Schedule your discovery session with our luxury event experts. We bring your vision to life with perfect planning and design that makes people feel special.",
  alternates: {
    canonical: "https://saudieventmanagement.com/consultation",
  },
};

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
