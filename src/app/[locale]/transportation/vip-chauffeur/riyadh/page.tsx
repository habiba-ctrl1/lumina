import TransportContentPage, { getTransportPage, transportMetadata } from "@/components/transportation/TransportContentPage";

const page = getTransportPage("vip-chauffeur/riyadh");

export const metadata = transportMetadata(page);

export default function Page() {
  return <TransportContentPage page={page} />;
}
