// Shared vocabulary for the deal pipeline (QuoteRequest + LeadUpdate).
// Kept in one place so the API validation, admin UI and digest agree.

export const STAGES = [
  'new',            // just arrived, not yet qualified
  'qualifying',     // asking date / city / pax / budget / decision-maker
  'sourcing',       // with a vendor or partner for pricing
  'quote_sent',
  'negotiating',
  'waiting_client', // ball is in the client's court
  'won',
  'lost',
  'parked',         // real but on hold (date moved, "keep us in list")
] as const;

export const OPEN_STAGES = STAGES.filter(s => !['won', 'lost', 'parked'].includes(s));

export const TRACKS = ['broker', 'partner'] as const; // broker = SEM quotes; partner = Saudi partner leads, SEM margin

export const CHANNELS = ['whatsapp', 'email', 'website', 'referral', 'phone'] as const;

export const LOST_REASONS = [
  'budget_mismatch',
  'price',
  'no_response',
  'partner_slow',
  'vendor_unavailable',
  'cr_vat_required',
  'payment_method',
  'service_mismatch',
  'date_change',
  'lost_to_competitor',
  'low_intent',
  'other',
] as const;

export const UPDATE_KINDS = [
  'note',
  'client_reply',
  'partner_update',
  'call',
  'meeting',
  'quote_sent',
  'follow_up',
  'status_change',
] as const;

// Kinds that count as real contact with the client (bump lastContactAt).
export const CLIENT_CONTACT_KINDS = ['client_reply', 'call', 'meeting', 'quote_sent', 'follow_up'];

// A partner-track deal with no partner update for this long is flagged.
export const PARTNER_STALE_HOURS = 48;

export const label = (s: string) => s.replace(/_/g, ' ');
