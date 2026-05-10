import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `${title} | Saudi Event Management Portfolio`,
    description: `Detailed case study of the ${title} project by Saudi Event Management.`,
    alternates: {
      canonical: `https://saudieventmanagement.com/portfolio/${params.slug}`,
    },
    openGraph: {
      title: title,
      description: `Detailed case study of the ${title} project.`,
      url: `/portfolio/${params.slug}`,
    },
  };
}

export default function PortfolioItemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
