import { Metadata } from "next";
import { caseStudyMetadata } from "@/lib/case-studies";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return caseStudyMetadata("riyadh-luxury-soiree", locale);
}

export default function RiyadhLuxurySoireeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
