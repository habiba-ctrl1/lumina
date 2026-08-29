import { NextResponse } from 'next/server';
import { resend, isResendConfigured, FROM_EMAIL } from '@/lib/resend';

/**
 * Email deliverability diagnostic (Gmail SMTP via nodemailer).
 *
 *   GET /api/email-test                      → config check only (no send)
 *   GET /api/email-test?to=you@example.com   → sends a real test email and
 *                                              returns the transport response
 *
 * What the response tells you:
 *   - "Invalid login" / 535                  → wrong SMTP_USER / SMTP_PASS (app password)
 *   - "self signed certificate" / ECONNECT   → wrong SMTP_HOST / SMTP_PORT
 *   - From rewritten to the gmail address     → "Send mail as" alias not verified in Gmail
 *   - { sent: true, id: "..." }               → success, message accepted by Gmail SMTP
 *
 * Remove this route before going to production (it can send mail).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const to = searchParams.get('to');

  const config = {
    hasSmtpHost: Boolean(process.env.SMTP_HOST),
    hasSmtpUser: Boolean(process.env.SMTP_USER),
    hasSmtpPass: Boolean(process.env.SMTP_PASS),
    smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com (default)',
    smtpPort: process.env.SMTP_PORT || '465 (default)',
    userPreview: process.env.SMTP_USER
      ? `${process.env.SMTP_USER.slice(0, 3)}…@${(process.env.SMTP_USER.split('@')[1] || '')}`
      : null,
    fromAddress: FROM_EMAIL,
  };

  if (!isResendConfigured) {
    return NextResponse.json(
      { ok: false, config, hint: 'SMTP_HOST / SMTP_USER / SMTP_PASS missing in env.' },
      { status: 500 }
    );
  }

  if (!to) {
    return NextResponse.json({
      ok: true,
      config,
      hint: 'Config looks valid. Append ?to=your@email.com to send a real test email.',
    });
  }

  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to: [to],
    subject: 'SMTP Test — Saudi Event Management',
    html: '<p>This is a deliverability test from your website. If you received this, Gmail SMTP and your sending identity are configured correctly.</p>',
  });

  if (result.error) {
    return NextResponse.json(
      { ok: false, config, sent: false, error: String(result.error) },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, config, sent: true, id: result.data?.id });
}
