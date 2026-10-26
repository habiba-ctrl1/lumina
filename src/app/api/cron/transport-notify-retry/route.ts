import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { normalizeEnquiry } from '@/lib/transportation/enquiry';
import { sendTransportNotifications } from '@/lib/transportation/notify';

// Daily retry for transportation enquiries whose notification emails failed
// (notifyStatus failed/partial). Only the email(s) that failed are re-sent, at
// most 4 attempts in total, within 3 days of submission. Same CRON_SECRET
// convention as /api/cron/follow-up-digest.
const MAX_ATTEMPTS = 4;

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization') || '';
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const rows = await prisma.quoteRequest.findMany({
      where: {
        leadDepartment: 'transportation',
        notifyStatus: { in: ['failed', 'partial'] },
        notifyAttempts: { lt: MAX_ATTEMPTS },
        createdAt: { gte: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
      },
      select: { id: true, leadRef: true, details: true, notifyError: true, notifyAttempts: true },
      take: 25,
    });
    let retried = 0;
    for (const r of rows) {
      if (!r.leadRef || !r.details) continue;
      const enquiry = normalizeEnquiry({ ...(r.details as object), privacyConsent: true });
      const err = r.notifyError || '';
      // A previous partial failure names which email failed; otherwise resend both.
      const only =
        err.includes('internal') || err.includes('customer')
          ? { internal: err.includes('internal'), customer: err.includes('customer') }
          : { internal: true, customer: true };
      const result = await sendTransportNotifications({ reference: r.leadRef, enquiry }, only);
      await prisma.quoteRequest.update({
        where: { id: r.id },
        data: {
          notifyStatus: result.status,
          notifyAttempts: r.notifyAttempts + 1,
          notifyError: result.error,
        },
      });
      retried++;
    }
    return NextResponse.json({ ok: true, retried });
  } catch (err) {
    console.error('[transport-notify-retry]', (err as { code?: string })?.code ?? (err as Error)?.name);
    return NextResponse.json({ error: 'Retry run failed.' }, { status: 500 });
  }
}
