"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/transportation/attribution";
import { trackTransportEvent } from "@/lib/transportation/analytics";

/** Renders nothing: records first/last-touch attribution and one page-view event. */
export default function TransportTracker({ page }: { page: string }) {
  useEffect(() => {
    captureAttribution();
    trackTransportEvent("transport_page_view", { page });
  }, [page]);
  return null;
}
