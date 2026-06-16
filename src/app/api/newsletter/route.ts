import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { logActivity } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || 're_missing_key');
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    console.log('Incoming Newsletter Subscription:', email);

    // Log the subscription so it surfaces in the admin activity feed.
    await logActivity('Newsletter Subscription', `New subscriber: ${email}`, email);

    // Send emails via Resend (admin notice + customer welcome).
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'missing-key') {
      try {
        // Admin notification
        await resend.emails.send({
          from: 'Saudi Event Management <info@saudieventmanagement.com>',
          to: ['infosaudieventmanagement@gmail.com'],
          subject: `New Newsletter Subscriber: ${email}`,
          html: `
            <div style="font-family: sans-serif; padding: 30px; border: 1px solid #f0f0f0; border-radius: 20px;">
              <h2 style="color: #1a1a1a;">New Newsletter Subscriber</h2>
              <p style="font-size: 16px; color: #666;"><strong>${email}</strong> has subscribed to the newsletter from the website.</p>
            </div>
          `,
        });

        // Customer welcome / confirmation
        await resend.emails.send({
          from: 'Saudi Event Management <info@saudieventmanagement.com>',
          to: [email],
          subject: 'Welcome to Saudi Event Management',
          html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px;">
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: #000000; font-size: 22px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin: 0;">Saudi Event Management</h1>
                <div style="width: 40px; height: 2px; background-color: #c5a059; margin: 20px auto 0;"></div>
              </div>

              <h2 style="color: #1a1a1a; font-size: 20px; font-weight: 400; margin-bottom: 24px;">You're on the list.</h2>

              <p style="color: #4a4a4a; font-size: 15px; line-height: 1.8; margin-bottom: 24px;">
                Thank you for subscribing to <strong>Saudi Event Management</strong>. You'll now receive curated insights on luxury events, exclusive venues, and behind-the-scenes stories from across the Kingdom — from Riyadh and Jeddah to AlUla and NEOM.
              </p>

              <div style="border-top: 1px solid #eaeaea; padding-top: 32px; margin-top: 32px;">
                <p style="color: #1a1a1a; font-size: 15px; margin: 0 0 4px 0;">With warm regards,</p>
                <p style="color: #c5a059; font-size: 16px; font-weight: 500; margin: 0 0 16px 0;">The Executive Team</p>
                <p style="color: #888; font-size: 12px; margin: 0;">Saudi Event Management</p>
                <p style="color: #888; font-size: 12px; margin: 4px 0 0 0;"><a href="https://saudieventmanagement.com" style="color: #c5a059; text-decoration: none;">saudieventmanagement.com</a> | Riyadh, Kingdom of Saudi Arabia</p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Newsletter email failed:', emailError);
      }
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
