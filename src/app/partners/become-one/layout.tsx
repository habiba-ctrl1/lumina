import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Partner",
  description: "Join our elite ecosystem of event professionals. Apply to become a strategic partner, elite supplier, or cultural collaborator with Saudi Event Management.",
  alternates: {
    canonical: "https://saudieventmanagement.com/partners/become-one",
  },
};

export default function BecomeOneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
