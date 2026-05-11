
export interface QuoteBreakdown {
  label: string;
  amount: number;
}

export interface QuoteResult {
  baseAmount: number;
  serviceFee: number;
  totalAmount: number;
  breakdown: QuoteBreakdown[];
}

export function generateAutomatedQuote(
  eventType: string | null,
  guestCount: string | null,
  budget: string | null
): QuoteResult {
  // Base rates per event type
  const baseRates: Record<string, number> = {
    "Luxury Wedding": 25000,
    "Corporate Gala": 15000,
    "Private Party": 5000,
    "Cultural Festival": 20000,
    "Product Launch": 12000,
    "general": 5000,
  };

  const type = eventType || "general";
  let baseAmount = baseRates[type] || baseRates["general"];
  
  // Adjust by guest count
  const guests = parseInt(guestCount || "0");
  if (guests > 500) baseAmount *= 2.5;
  else if (guests > 200) baseAmount *= 1.8;
  else if (guests > 50) baseAmount *= 1.3;

  // Service fee (e.g., 15%)
  const serviceFee = baseAmount * 0.15;
  const totalAmount = baseAmount + serviceFee;

  const breakdown: QuoteBreakdown[] = [
    { label: "Venue & Production Base", amount: baseAmount * 0.6 },
    { label: "Catering & Hospitality", amount: baseAmount * 0.3 },
    { label: "Design & Decoration", amount: baseAmount * 0.1 },
  ];

  return {
    baseAmount,
    serviceFee,
    totalAmount,
    breakdown,
  };
}
