import prisma from './prisma';
import { resend, isResendConfigured, ADMIN_EMAIL, FROM_EMAIL } from './resend';
import { buildQuotationHtml, QuotationLineItem } from './quotation-html';
import { logActivity } from './logger';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The quotation HTML ships as a standalone email attachment, so its logo needs
// an absolute URL — a relative "/main-logo.webp" only resolves inside a
// browser tab on the site's own origin (see quotation-html.ts).
const ABSOLUTE_LOGO_URL = 'https://saudieventmanagement.com/main-logo.webp';

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function escapeHtml(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildClientEmailHtml(proposal: {
  quoteNumber: string;
  validUntil: Date;
  request: { clientName: string; eventType: string; eventCity: string };
}): string {
  const { clientName, eventType, eventCity } = proposal.request;
  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #0B1D33; padding: 28px 32px;">
        <p style="color: #B0862B; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px 0;">Your Quotation</p>
        <h1 style="color: #ffffff; font-size: 20px; font-weight: 500; margin: 0;">Saudi Event Management</h1>
      </div>
      <div style="padding: 32px;">
        <p style="color: #1a1a1a; font-size: 15px; margin: 0 0 20px 0;">Dear ${escapeHtml(clientName)},</p>
        <p style="color: #4a4a4a; font-size: 14.5px; line-height: 1.8; margin: 0 0 20px 0;">
          Thank you for the opportunity to prepare a proposal for your <strong>${escapeHtml(eventType)}</strong> in ${escapeHtml(eventCity)}. Your detailed quotation is attached to this email.
        </p>
        <table style="width: 100%; border-collapse: collapse; font-size: 13.5px; color: #333; margin-bottom: 24px;">
          <tr><td style="padding: 6px 0; color: #888; width: 140px;">Quotation No.</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(proposal.quoteNumber)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Reference</td><td style="padding: 6px 0;">${escapeHtml(eventType)} &middot; ${escapeHtml(eventCity)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Valid Until</td><td style="padding: 6px 0;">${formatDate(proposal.validUntil)}</td></tr>
        </table>
        <p style="color: #4a4a4a; font-size: 14.5px; line-height: 1.8; margin: 0 0 24px 0;">
          Please open the attached quotation for the full scope of work and pricing breakdown. If you have any questions or would like to request a revision, simply reply to this email — we're happy to help.
        </p>
        <div style="border-top: 1px solid #eaeaea; padding-top: 24px;">
          <p style="color: #1a1a1a; font-size: 14px; margin: 0 0 4px 0;">With warm regards,</p>
          <p style="color: #B0862B; font-size: 15px; font-weight: 600; margin: 0 0 12px 0;">Saudi Event Management</p>
          <p style="color: #888; font-size: 12px; margin: 0;"><a href="https://saudieventmanagement.com" style="color:#B0862B;text-decoration:none;">saudieventmanagement.com</a> &middot; WhatsApp +966 539 388 072</p>
        </div>
      </div>
    </div>
  `;
}

type SendResult = { ok: true } | { ok: false; error: string };

/**
 * Emails an already-created Proposal to its QuoteRequest's client, using the
 * existing Gmail-SMTP helper (src/lib/resend.ts) — no new email config.
 *
 * Always resolves (never throws): on any failure it records `emailStatus:
 * "failed"` + `emailError` on the Proposal and returns { ok: false, error }
 * instead of pretending the send succeeded. Only on real delivery does it
 * flip Proposal.status to "sent" and QuoteRequest.status to "quote_sent" —
 * this is the fix for the button silently lying about what happened.
 *
 * Shared by the create route (POST /api/admin/quotes) and the retry route
 * (POST /api/admin/quotes/[id]/send) so both paths behave identically.
 */
export async function sendProposalEmail(proposalId: string, actorEmail?: string): Promise<SendResult> {
  const proposal = await prisma.proposal.findUnique({
    where: { id: proposalId },
    include: { request: true },
  });

  if (!proposal) {
    return { ok: false, error: 'Quotation not found.' };
  }

  const clientEmail = (proposal.request.clientEmail || '').trim();

  await logActivity(
    'Quote Email Attempted',
    `Attempting to email ${proposal.quoteNumber} to ${clientEmail || '(no email on file)'}`,
    actorEmail
  );

  if (!clientEmail || !EMAIL_RE.test(clientEmail)) {
    const error = 'Client has no valid email on file.';
    await prisma.proposal.update({ where: { id: proposalId }, data: { emailStatus: 'failed', emailError: error } });
    await logActivity('Quote Email Failed', `${proposal.quoteNumber}: ${error}`, actorEmail);
    return { ok: false, error };
  }

  if (!isResendConfigured) {
    const error = 'Email is not configured on this environment (missing SMTP settings).';
    await prisma.proposal.update({ where: { id: proposalId }, data: { emailStatus: 'failed', emailError: error } });
    await logActivity('Quote Email Failed', `${proposal.quoteNumber} to ${clientEmail}: ${error}`, actorEmail);
    return { ok: false, error };
  }

  let lineItems: QuotationLineItem[] = [];
  try {
    lineItems = JSON.parse(proposal.lineItems);
  } catch {
    lineItems = [];
  }

  const quotationHtml = buildQuotationHtml(
    {
      clientName: proposal.request.clientName,
      scope: proposal.request.eventType,
      location: proposal.request.eventCity,
      quoteNumber: proposal.quoteNumber,
      date: formatDate(proposal.createdAt),
      validity: `Valid until ${formatDate(proposal.validUntil)}`,
      lineItems,
      subtotal: proposal.subtotal,
      vatAmount: proposal.vatAmount,
      totalAmount: proposal.totalAmount,
      terms: proposal.notes || undefined,
    },
    ABSOLUTE_LOGO_URL
  );

  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to: [clientEmail],
    replyTo: ADMIN_EMAIL,
    subject: `Your Quotation ${proposal.quoteNumber} — Saudi Event Management`,
    html: buildClientEmailHtml(proposal),
    attachments: [
      {
        filename: `Quotation-${proposal.quoteNumber}.html`,
        content: quotationHtml,
        contentType: 'text/html',
      },
    ],
  });

  if (result.error) {
    const error = String(result.error);
    await prisma.proposal.update({ where: { id: proposalId }, data: { emailStatus: 'failed', emailError: error } });
    await logActivity('Quote Email Failed', `${proposal.quoteNumber} to ${clientEmail}: ${error}`, actorEmail);
    return { ok: false, error };
  }

  await prisma.proposal.update({
    where: { id: proposalId },
    data: { emailStatus: 'sent', emailSentAt: new Date(), emailError: null, status: 'sent' },
  });
  await prisma.quoteRequest.update({ where: { id: proposal.requestId }, data: { status: 'quote_sent' } });
  await logActivity('Quote Email Sent', `${proposal.quoteNumber} emailed to ${clientEmail}`, actorEmail);

  return { ok: true };
}
