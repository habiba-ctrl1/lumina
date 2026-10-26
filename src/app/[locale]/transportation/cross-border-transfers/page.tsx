import TransportContentPage, { getTransportPage, transportMetadata } from "@/components/transportation/TransportContentPage";

const page = getTransportPage("cross-border-transfers");

export const metadata = transportMetadata(page);

export default function Page() {
  return <TransportContentPage page={page} />;
}
