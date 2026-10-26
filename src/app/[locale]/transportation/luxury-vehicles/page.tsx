import TransportContentPage, { getTransportPage, transportMetadata } from "@/components/transportation/TransportContentPage";

const page = getTransportPage("luxury-vehicles");

export const metadata = transportMetadata(page);

export default function Page() {
  return <TransportContentPage page={page} />;
}
