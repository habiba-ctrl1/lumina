import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { resend, isResendConfigured, FROM_EMAIL } from '@/lib/resend';
import { welcomeTextToHtml } from '@/lib/partner-welcome';
import { logActivity } from '@/lib/logger';

// POST /api/admin/partner-welcome — send the (founder-reviewed) welcome email
// to a newly-approved partner. Admin only. Never fires on its own: the panel
// only calls this after the founder clicks Send.
export async function POST(request: Request) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { to, subject, body, companyName } = await request.json();
    const recipient = typeof to === 'string' ? to.trim() : '';
    const subj = typeof subject === 'string' ? subject.trim() : '';
    const text = typeof body === 'string' ? body.trim() : '';

    if (!recipient || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(recipient)) {
      return NextResponse.json({ error: 'A valid recipient email is required.' }, { status: 400 });
    }
    if (!subj || !text) {
      return NextResponse.json({ error: 'Subject and message body are required.' }, { status: 400 });
    }
    if (!isResendConfigured) {
      return NextResponse.json(
        {
          error:
            'Email is not configured (SMTP credentials missing). The partner was still approved — copy the message and send it manually for now.',
        },
        { status: 503 }
      );
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [recipient],
      subject: subj,
      html: welcomeTextToHtml(text),
      text,
    });

    if (error) {
      console.error('Partner welcome email error:', error);
      return NextResponse.json({ error: 'Email provider rejected the message.' }, { status: 502 });
    }

    await logActivity(
      'Partner Welcome Email Sent',
      `${companyName || recipient} — ${recipient}`,
      user.email || 'admin'
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Partner welcome route error:', e);
    return NextResponse.json({ error: 'Failed to send welcome email.' }, { status: 500 });
  }
}
