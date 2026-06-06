import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Planning Glossary | Saudi Event Management",
  description: "Understand the terminology of luxury event planning, corporate exhibitions, and VIP protocols in Saudi Arabia. Our comprehensive event management glossary.",
  keywords: [
    "Event Management Glossary",
    "Event Planning Terms",
    "Corporate Event Terminology",
    "Saudi Event Management Dictionary",
    "Event Production Terms KSA"
  ],
};

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
