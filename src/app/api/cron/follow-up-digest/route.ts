import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { resend, isResendConfigured, ADMIN_EMAIL, FROM_EMAIL } from '@/lib/resend';
import { logActivity } from '@/lib/logger';
import { OPEN_STAGES, PARTNER_STALE_HOURS } from '@/lib/pipeline';

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

// The deal pipeline (QuoteRequest.stage / nextActionAt / partner fields) drives
// this digest. Vendor applications and triaged inbox emails are a one-line count
// each — listing them in full buried the real client leads (Oct 2026 audit).
const VENDOR_APP_STALE_DAYS = 5; // partner application awaiting review
const EMAIL_LEAD_STALE_DAYS = 2; // triaged inbox email not yet reviewed
const MAX_ROWS = 12;

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

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const partnerCutoff = Date.now() - PARTNER_STALE_HOURS * 60 * 60 * 1000;

    const [openDeals, staleApplications, staleEmailLeads] = await Promise.all([
      prisma.quoteRequest.findMany({
        where: { business: 'SEM', stage: { in: [...OPEN_STAGES] } },
        orderBy: [{ nextActionAt: { sort: 'asc', nulls: 'first' } }, { createdAt: 'asc' }],
        include: { partner: { select: { name: true } } },
      }),
      prisma.vendorApplication.count({
        where: { status: 'Pending', createdAt: { lt: daysAgo(VENDOR_APP_STALE_DAYS) } },
      }),
      prisma.emailLead.count({
        where: { status: 'New', createdAt: { lt: daysAgo(EMAIL_LEAD_STALE_DAYS) } },
      }),
    ]);

    const due = openDeals.filter((d) => !d.nextActionAt || d.nextActionAt <= endOfToday);
    const partnerSilent = openDeals.filter((d) => {
      if (!d.partnerId) return false;
      const last = d.partnerLastUpdateAt || d.partnerHandedAt;
      return !last || last.getTime() < partnerCutoff;
    });

    if (due.length + partnerSilent.length === 0) {
      return NextResponse.json({ ok: true, sent: false, reason: 'nothing due' });
    }

    const when = (d: Date | null) =>
      !d ? 'no next action set' : d < new Date(new Date().toDateString()) ? `overdue since ${d.toISOString().slice(0, 10)}` : 'today';
    const more = (n: number) => (n > MAX_ROWS ? [`…and ${n - MAX_ROWS} more in the Pipeline page`] : []);
    const totalStale = due.length + partnerSilent.length;

    const html = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0d0d0d; padding: 28px 32px;">
          <p style="color: #c5a059; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px 0;">Daily Follow-Up Digest</p>
          <h1 style="color: #ffffff; font-size: 20px; font-weight: 500; margin: 0;">${totalStale} item${totalStale === 1 ? '' : 's'} waiting on you</h1>
        </div>
        <div style="padding: 28px 32px;">
          ${section(
            'Due today',
            [
              ...due.slice(0, MAX_ROWS).map((d) =>
                `<strong>${d.clientName}</strong> — ${d.eventType}, ${d.eventCity} — <em>${d.nextAction || 'qualify: date, city, pax, budget, decision-maker'}</em> (${when(d.nextActionAt)})`),
              ...more(due.length),
            ]
          )}
          ${section(
            `Partner hasn't updated in ${PARTNER_STALE_HOURS}h`,
            [
              ...partnerSilent.slice(0, MAX_ROWS).map((d) =>
                `<strong>${d.clientName}</strong> — ${d.partner?.name || 'partner'} — last update ${d.partnerLastUpdateAt ? `${daysSince(d.partnerLastUpdateAt)} days ago` : 'never'}`),
              ...more(partnerSilent.length),
            ]
          )}
          ${staleApplications || staleEmailLeads
            ? `<p style="font-size: 13px; color: #888; margin-top: 24px;">Also waiting: ${staleApplications} partner application${staleApplications === 1 ? '' : 's'} · ${staleEmailLeads} triaged inbox email${staleEmailLeads === 1 ? '' : 's'}.</p>`
            : ''}
          <div style="margin-top: 28px; text-align: center;">
            <a href="https://saudieventmanagement.com/admin/pipeline" style="display: inline-block; background-color: #0d0d0d; color: #ffffff; text-decoration: none; font-size: 14px; padding: 14px 28px; border-radius: 8px;">Open Pipeline &rarr;</a>
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
      `${totalStale} items: ${due.length} deals due, ${partnerSilent.length} partner-silent deals, ${staleApplications} applications, ${staleEmailLeads} email leads`,
      'follow-up-cron'
    );

    return NextResponse.json({ ok: true, sent: isResendConfigured, totalStale });
  } catch (error) {
    console.error('Follow-Up Digest Error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
