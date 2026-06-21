import { permanentRedirect } from "next/navigation";

// Legacy thin placeholder route with no unique content. It issues a 308
// PERMANENT redirect to the real portfolio so search engines consolidate all
// ranking signals into /portfolio and drop this URL from the index. A redirect
// renders no HTML, so no robots/canonical meta applies here — and the route is
// deliberately left OUT of robots.txt so crawlers can actually see the redirect.
export default function PortfolioLuxuryRedirect() {
  permanentRedirect("/portfolio");
}
