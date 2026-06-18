import { redirect } from "next/navigation";

// Legacy thin placeholder route. Redirect to the real portfolio so any
// residual links/crawls land on indexable, high-value content.
export default function PortfolioLuxuryRedirect() {
  redirect("/portfolio");
}
