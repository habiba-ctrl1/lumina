import { Resend } from 'resend';

// Resolve the Resend API key from either env var name. The code historically used
// RESEND_API_KEY, but the variable on Vercel was added as RESEND_APIKEY (no
// underscore). Reading both means emails send in every environment regardless of
// which name is set.
export const resendApiKey =
  process.env.RESEND_API_KEY || process.env.RESEND_APIKEY || '';

export const resend = new Resend(resendApiKey || 're_missing_key');

// True only when a real key is configured (not the placeholder fallback).
export const isResendConfigured = Boolean(
  resendApiKey && resendApiKey !== 'missing-key' && resendApiKey !== 're_missing_key'
);

// Where team/admin notifications are sent.
export const ADMIN_EMAIL = 'infosaudieventmanagement@gmail.com';

// Verified sending identity.
export const FROM_EMAIL = 'Saudi Event Management <info@saudieventmanagement.com>';
