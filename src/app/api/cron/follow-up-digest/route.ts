import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { resend, isResendConfigured, ADMIN_EMAIL, FROM_EMAIL } from '@/lib/resend';
import { logActivity } from '@/lib/logger';

// ─────────────────────────────────────────────────────────────────────────────
// /api/cron/follow-up-digest — hit daily by Vercel Cron (see vercel.json).
// Real gap this closes: quote requests, client leads, vendor applications and
// triaged inbox emails can sit unanswered for days/weeks with nobody noticing
// (UNIQDINING sat 5 weeks, Mustafa 8 days — both found manually, 2026-07-19).
// This scans for stale items across the pipeline and emails ONE digest to
// ADMIN_EMAIL — only when there's something to act on, not a daily "all clear"
// noise email. Auth: Vercel's standard cron convention — when CRON_SECRET is
// set, Vercel auto-sends `Authorization: Bearer <CRON_SECRET>` on the request.
// ─────────────────────────────────────────────────────────────────────────────

// Staleness thresholds — adjust here if these feel too aggressive/lax.
const INQUIRY_STALE_DAYS = 2; // new client lead, no status change yet
const QUOTE_PENDING_STALE_DAYS = 2; // request received, no quote sent yet
const QUOTE_SENT_STALE_DAYS = 5; // quote sent, no client decision yet
const VENDOR_APP_STALE_DAYS = 5; // partner application awaiting review
const EMAIL_LEAD_STALE_DAYS = 2; // triaged inbox email not yet reviewed

const daysAgo = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

function section(title: string, rows: string[]): string {
  if (rows.length === 0) return '';
  return `
    <h3 style="font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin: 28px 0 12px 0;">${title} (${rows.length})</h3>
    <div style="background-color: #faf9f7; border-left: 3px solid #c5a059; border-radius: 0 8px 8px 0; overflow: hidden;">
      ${rows.map((r) => `<div style="padding: 12px 16px; border-bottom: 1px solid #eee; font-size: 14px; color: #444;">${r}</div>`).join('')}
    </div>
  `;
}

const daysSince = (d: Date) => Math.floor((Date.now() - d.getTime()) / (24 * 60 * 60 * 1000));

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [staleInquiries, stalePendingQuotes, staleSentQuotes, staleApplications, staleEmailLeads] =
      await Promise.all([
        prisma.inquiry.findMany({
          where: { status: 'Pending', createdAt: { lt: daysAgo(INQUIRY_STALE_DAYS) } },
          orderBy: { createdAt: 'asc' },
        }),
        prisma.quoteRequest.findMany({
          where: { status: 'pending', createdAt: { lt: daysAgo(QUOTE_PENDING_STALE_DAYS) } },
          orderBy: { createdAt: 'asc' },
        }),
        prisma.quoteRequest.findMany({
          where: { status: 'quote_sent', updatedAt: { lt: daysAgo(QUOTE_SENT_STALE_DAYS) } },
          orderBy: { updatedAt: 'asc' },
        }),
        prisma.vendorApplication.findMany({
          where: { status: 'Pending', createdAt: { lt: daysAgo(VENDOR_APP_STALE_DAYS) } },
          orderBy: { createdAt: 'asc' },
        }),
        prisma.emailLead.findMany({
          where: { status: 'New', createdAt: { lt: daysAgo(EMAIL_LEAD_STALE_DAYS) } },
          orderBy: { createdAt: 'asc' },
        }),
      ]);

    const totalStale =
      staleInquiries.length + stalePendingQuotes.length + staleSentQuotes.length +
      staleApplications.length + staleEmailLeads.length;

    if (totalStale === 0) {
      return NextResponse.json({ ok: true, sent: false, reason: 'nothing stale' });
    }

    const html = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0d0d0d; padding: 28px 32px;">
          <p style="color: #c5a059; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px 0;">Daily Follow-Up Digest</p>
          <h1 style="color: #ffffff; font-size: 20px; font-weight: 500; margin: 0;">${totalStale} item${totalStale === 1 ? '' : 's'} waiting on you</h1>
        </div>
        <div style="padding: 28px 32px;">
          ${section(
            'New client leads with no reply yet',
            staleInquiries.map((i) => `<strong>${i.name}</strong> — ${i.eventType || 'event type not set'} — ${daysSince(i.createdAt)} days ago`)
          )}
          ${section(
            'Quote requests never quoted',
            stalePendingQuotes.map((q) => `<strong>${q.clientName}</strong> — ${q.eventType}, ${q.eventCity} — ${daysSince(q.createdAt)} days ago`)
          )}
          ${section(
            'Quotes sent, no client decision yet',
            staleSentQuotes.map((q) => `<strong>${q.clientName}</strong> — ${q.eventType}, ${q.eventCity} — sent ${daysSince(q.updatedAt)} days ago`)
          )}
          ${section(
            'Partner applications awaiting review',
            staleApplications.map((a) => `<strong>${a.companyName}</strong> — ${a.categories.join(', ') || 'category not set'} — ${daysSince(a.createdAt)} days ago`)
          )}
          ${section(
            'Inbox emails triaged but not reviewed',
            staleEmailLeads.map((e) => `<strong>${e.senderName || e.senderEmail}</strong> — ${e.category} — ${daysSince(e.createdAt)} days ago`)
          )}
          <div style="margin-top: 28px; text-align: center;">
            <a href="https://saudieventmanagement.com/admin/dashboard" style="display: inline-block; background-color: #0d0d0d; color: #ffffff; text-decoration: none; font-size: 14px; padding: 14px 28px; border-radius: 8px;">Open Admin Panel &rarr;</a>
          </div>
        </div>
        <div style="background-color: #0d0d0d; padding: 18px 32px; text-align: center;">
          <p style="color: #888; font-size: 11px; margin: 0;">Saudi Event Management · Automated Follow-Up Digest</p>
        </div>
      </div>
    `;

    if (isResendConfigured) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        subject: `⏰ ${totalStale} item${totalStale === 1 ? '' : 's'} need follow-up`,
        html,
      });
    }

    await logActivity(
      'Follow-Up Digest Sent',
      `${totalStale} stale items: ${staleInquiries.length} leads, ${stalePendingQuotes.length} unquoted, ${staleSentQuotes.length} awaiting decision, ${staleApplications.length} applications, ${staleEmailLeads.length} email leads`,
      'follow-up-cron'
    );

    return NextResponse.json({ ok: true, sent: isResendConfigured, totalStale });
  } catch (error) {
    console.error('Follow-Up Digest Error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
