import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/logger';
import { requireAdmin } from '@/lib/api-auth';

// ─────────────────────────────────────────────────────────────────────────────
// /api/admin/email-leads
// POST — called only by the scheduled inbox-triage routine (shared secret,
//        not a person). Upserts on gmailThreadId so re-processing a thread
//        (e.g. a follow-up reply) updates the row instead of erroring.
// GET  — ADMIN ONLY, for the /admin/email-leads review page.
// PDF/attachment CONTENT is never parsed or stored — only filenames.
// ─────────────────────────────────────────────────────────────────────────────

const str = (v: unknown, max = 500) =>
  typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null;

const CATEGORIES = ['Partnership', 'CV', 'ClientInquiry', 'Spam', 'Uncertain'];

export async function POST(request: Request) {
  try {
    const secret = request.headers.get('x-intake-secret');
    if (!secret || secret !== process.env.EMAIL_LEAD_INTAKE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const category = CATEGORIES.includes(body.category) ? body.category : 'Uncertain';
    const gmailThreadId = str(body.gmailThreadId, 200);
    const gmailMessageId = str(body.gmailMessageId, 200);
    const senderEmail = str(body.senderEmail, 300);
    if (!gmailThreadId || !gmailMessageId || !senderEmail) {
      return NextResponse.json(
        { error: 'gmailThreadId, gmailMessageId and senderEmail are required' },
        { status: 400 }
      );
    }

    const data = {
      category,
      gmailMessageId,
      senderEmail,
      senderName: str(body.senderName, 200),
      companyName: str(body.companyName, 200),
      subject: str(body.subject, 500),
      summary: str(body.summary, 2000),
      suggestedAction: str(body.suggestedAction, 100),
      needsMeeting: body.needsMeeting === true,
      attachmentNames: str(body.attachmentNames, 1000),
      draftCreated: body.draftCreated === true,
    };

    const lead = await prisma.emailLead.upsert({
      where: { gmailThreadId },
      create: { gmailThreadId, ...data },
      update: data,
    });

    await logActivity(
      'Email Lead Triaged',
      `${category}: ${data.senderName || senderEmail} — ${data.subject || '(no subject)'}`,
      'inbox-routine'
    );

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error('Email Lead Create Error:', error);
    return NextResponse.json({ error: 'Failed to save email lead' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const where: Record<string, string> = {};
    if (status && status !== 'all') where.status = status;
    if (category && category !== 'all') where.category = category;

    const leads = await prisma.emailLead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const counts = {
      new: await prisma.emailLead.count({ where: { status: 'New' } }),
      reviewed: await prisma.emailLead.count({ where: { status: 'Reviewed' } }),
      actioned: await prisma.emailLead.count({ where: { status: 'Actioned' } }),
    };

    return NextResponse.json({ leads, counts });
  } catch (error) {
    console.error('Email Leads Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch email leads' }, { status: 500 });
  }
}
