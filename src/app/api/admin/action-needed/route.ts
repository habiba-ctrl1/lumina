import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

// ─────────────────────────────────────────────────────────────────────────────
// /api/admin/action-needed  (GET, admin only)
// One aggregated "what needs YOU today" feed for the founder, priority-ordered:
//   1. Client leads awaiting a first reply (real clients, not vendor pitches)
//   2. Partner onboarding applications pending review
//   3. Partner / client emails triaged from Gmail, still New
//   4. Website quote requests still pending
// CVs / job-seekers are DELIBERATELY excluded from the action list (founder does
// not hire from these) — returned only as a muted count so the inbox stays clean.
// ─────────────────────────────────────────────────────────────────────────────

// Keep in sync with /api/contact — a "vendor" inquiry is a supplier pitch, never
// a client booking, so it must not appear in the client-leads section.
const VENDOR_SOURCES = ['vendor_registration', 'become_one_partnership', 'vendor_inquiry'];

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const [clientLeads, partnerApplications, partnerEmails, quoteRequests, cvCount] =
      await Promise.all([
        prisma.inquiry.findMany({
          where: { source: { notIn: VENDOR_SOURCES }, status: 'Pending' },
          orderBy: { createdAt: 'desc' },
          take: 30,
          select: {
            id: true, name: true, email: true, phone: true, company: true,
            eventType: true, venueCity: true, budget: true, message: true, createdAt: true,
          },
        }),
        prisma.vendorApplication.findMany({
          where: { status: 'Pending' },
          orderBy: { createdAt: 'desc' },
          take: 30,
          select: {
            id: true, appNumber: true, companyName: true, contactPerson: true,
            city: true, servicesDesc: true, createdAt: true,
          },
        }),
        prisma.emailLead.findMany({
          where: { status: 'New', category: { in: ['Partnership', 'ClientInquiry', 'Uncertain'] } },
          orderBy: { createdAt: 'desc' },
          take: 30,
          select: {
            id: true, category: true, gmailThreadId: true, senderName: true,
            senderEmail: true, companyName: true, subject: true, summary: true,
            suggestedAction: true, needsMeeting: true, createdAt: true,
          },
        }),
        prisma.quoteRequest.findMany({
          where: { status: 'pending' },
          orderBy: { createdAt: 'desc' },
          take: 30,
          select: {
            id: true, clientName: true, clientPhone: true, eventType: true,
            eventCity: true, budgetRange: true, createdAt: true,
          },
        }),
        prisma.emailLead.count({ where: { category: 'CV' } }),
      ]);

    const total =
      clientLeads.length + partnerApplications.length + partnerEmails.length + quoteRequests.length;

    return NextResponse.json({
      clientLeads,
      partnerApplications,
      partnerEmails,
      quoteRequests,
      cvCount,
      counts: {
        clientLeads: clientLeads.length,
        partnerApplications: partnerApplications.length,
        partnerEmails: partnerEmails.length,
        quoteRequests: quoteRequests.length,
        total,
      },
    });
  } catch (error) {
    console.error('Action Needed Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch action items' }, { status: 500 });
  }
}
