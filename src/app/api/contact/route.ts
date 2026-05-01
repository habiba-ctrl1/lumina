import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // 1. Save to Supabase
    const { data, error: supabaseError } = await supabase
      .from('contact_messages')
      .insert([{ name, email, message }])
      .select()
      .single();

    if (supabaseError) throw supabaseError;

    // 2. Send Emails via Resend
    try {
      // Admin Notification
      await resend.emails.send({
        from: 'Lumina Events <onboarding@resend.dev>',
        to: ['delivered@resend.dev'], // Resend default testing address or your verified email
        subject: `New Inquiry: ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #D4AF37;">New Inquiry Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
            <hr />
            <p style="font-size: 12px; color: #888;">Sent from Lumina Events Website Backend</p>
          </div>
        `,
      });

      // User Confirmation
      await resend.emails.send({
        from: 'Lumina Events <onboarding@resend.dev>',
        to: [email],
        subject: 'We received your inquiry - Lumina Events',
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; text-align: center;">
            <h1 style="color: #D4AF37;">Thank You!</h1>
            <p>Hi ${name},</p>
            <p>We've received your message and our team will get back to you within 24 hours.</p>
            <div style="margin-top: 30px; padding: 20px; border-top: 1px solid #eee;">
              <p style="font-size: 14px; color: #555;">Best Regards,</p>
              <p style="font-weight: bold; color: #D4AF37;">Lumina Events Team</p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      // We don't want to fail the whole request if email fails, 
      // but we should log it.
      console.error('Resend email error:', emailError);
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('General error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
