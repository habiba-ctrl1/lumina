import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * Email deliverability diagnostic.
 *
 *   GET /api/email-test                      → config check only (no send)
 *   GET /api/email-test?to=you@example.com   → sends a real test email and
 *                                              returns Resend's raw response
 *
 * The raw Resend response is what reveals the real problem:
 *   - 401 / "API key is invalid"            → bad RESEND_API_KEY
 *   - 403 / "domain is not verified"        → verify saudieventmanagement.com in Resend
 *   - 422 / "from address ... not allowed"  → sending domain mismatch
 *   - { id: "..." }                         → success, email accepted by Resend
 *
 * Remove this route before going to production (it can send mail).
 */
export async function GET(request: Request) {
  const key = process.env.RESEND_API_KEY;
  const { searchParams } = new URL(request.url);
  const to = searchParams.get('to');

  // Config check — never leaks the key, only its shape.
  const config = {
    hasKey: Boolean(key),
    keyLooksValid: Boolean(key && key.startsWith('re_') && key.length > 20),
    keyPreview: key ? `${key.slice(0, 6)}…${key.slice(-4)}` : null,
    fromAddress: 'info@saudieventmanagement.com',
  };

  if (!config.hasKey || !config.keyLooksValid) {
    return NextResponse.json(
      { ok: false, config, hint: 'RESEND_API_KEY is missing or malformed in .env.local.' },
      { status: 500 }
    );
  }

  if (!to) {
    return NextResponse.json({
      ok: true,
      config,
      hint: 'Config looks valid. Append ?to=your@email.com to send a real test email and verify domain/key.',
    });
  }

  try {
    const resend = new Resend(key);
    const result = await resend.emails.send({
      from: 'Saudi Event Management <info@saudieventmanagement.com>',
      to: [to],
      subject: 'Resend Test — Saudi Event Management',
      html: '<p>This is a deliverability test from your website. If you received this, Resend and your domain are configured correctly.</p>',
    });

    // Resend returns { data, error } — surface both so domain/key issues are visible.
    if (result.error) {
      return NextResponse.json(
        { ok: false, config, sent: false, resendError: result.error },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, config, sent: true, id: result.data?.id });
  } catch (error) {
    return NextResponse.json(
      { ok: false, config, sent: false, error: String(error) },
      { status: 502 }
    );
  }
}
