// Shared vendor scoring — used by the admin vendor list "Best" sort and the
// vendor-matching endpoint. Previously duplicated inline in two places; now
// one function so the scoring logic (and any future AI-adjusted term) lives
// in a single spot.

export type ScorableVendor = {
  partnershipStatus?: string | null;
  verificationStatus?: string | null;
  preferred?: boolean | null;
  internalRating?: number | null;
  rating?: number | null;
};

export function vendorScore(v: ScorableVendor): number {
  const partnershipBoost =
    v.partnershipStatus === 'Partner' ? 2000 : v.partnershipStatus === 'Verified Vendor' ? 1000 : 0;
  const verifiedBoost = v.verificationStatus === 'Verified' ? 500 : 0;
  const preferredBoost = v.preferred ? 250 : 0;
  return partnershipBoost + verifiedBoost + preferredBoost + (v.internalRating || 0) * 10 + (v.rating || 0);
}
