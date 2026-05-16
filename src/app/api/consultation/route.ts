import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { logActivity } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API || 're_missing_key');
    const body = await request.json();
    const { 
      name, email, phone, eventType, budget, 
      eventDate, message 
    } = body;

    console.log('Incoming Consultation Request:', { name, email, eventType });

    if (!name || !email || !phone || !eventType || !budget || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const team = ["Sarah", "Ahmed", "Nora", "Admin"];
    const randomAssignee = team[Math.floor(Math.random() * team.length)];

    // 1. Save to Prisma
    let consultation;
    try {
      consultation = await prisma.inquiry.create({
        data: {
          name,
          email,
          phone,
          eventType,
          budget,
          eventDate: eventDate || null,
          message,
          assignedTo: randomAssignee,
          source: 'consultation_page',
          status: 'New'
        }
      });

      // ALSO: Create a Record in QuoteRequest Table
      await prisma.quoteRequest.create({
        data: {
          clientName: name,
          clientPhone: phone,
          clientEmail: email,
          eventType: eventType,
          eventDate: eventDate ? new Date(eventDate) : null,
          eventCity: 'Riyadh', // Default for now
          guestCount: null,
          budgetRange: budget,
          requirements: message,
          source: 'consultation_form',
          status: 'pending'
        }
      });
    } catch (prismaError) {
      console.error('Prisma Create Error (Consultation):', prismaError);
    }

    // 2. Log Activity
    await logActivity(
      'New Consultation Requested', 
      `Request from ${name} (Auto-assigned to ${randomAssignee}). Vision: ${message.substring(0, 50)}...`, 
      email
    );

    // 3. Send Emails via Resend
    if (process.env.RESEND_API && process.env.RESEND_API !== 'missing-key') {
      try {
        // Admin Notification
        await resend.emails.send({
          from: 'Saudi Event Management <onboarding@resend.dev>',
          to: ['hello@saudieventmanagement.com'],
          subject: `Consultation Requested: ${name}`,
          html: `
            <div style="font-family: sans-serif; padding: 30px; border: 1px solid #f0f0f0; border-radius: 20px;">
              <h2 style="color: #1a1a1a;">New Consultation Request</h2>
              <p style="font-size: 16px; color: #666;">A new discovery session has been requested and assigned to <strong>${randomAssignee}</strong>.</p>
              
              <div style="background: #f9f9f9; padding: 20px; border-radius: 15px; margin: 20px 0;">
                <p><strong>Client:</strong> ${name} (${email})</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Event Type:</strong> ${eventType}</p>
                <p><strong>Target Date:</strong> ${eventDate || 'Not specified'}</p>
                <p><strong>Budget Range:</strong> ${budget}</p>
                <p><strong>Vision Overview:</strong></p>
                <p style="font-style: italic; color: #555;">${message}</p>
              </div>

              <p style="font-size: 14px; color: #999;">Please follow up within 90 minutes as per our priority guarantee.</p>
            </div>
          `,
        });

        // User Confirmation
        await resend.emails.send({
          from: 'Saudi Event Management <onboarding@resend.dev>',
          to: [email],
          subject: 'Consultation Request Received - Saudi Event Management',
          html: `
            <div style="font-family: sans-serif; padding: 30px; line-height: 1.6;">
              <h2 style="color: #c5a059;">Discovery Session Requested</h2>
              <p>Dear ${name},</p>
              <p>Thank you for requesting a discovery session with Saudi Event Management. We are excited to learn more about your vision for your upcoming <strong>${eventType}</strong>.</p>
              
              <div style="border-left: 4px solid #c5a059; padding-left: 20px; margin: 25px 0;">
                <p>Your request has been received and assigned to our senior consultant, <strong>${randomAssignee}</strong>.</p>
                <p>Our concierge team will review your details and contact you via phone or email within <strong>90 minutes</strong> to finalize your session time.</p>
              </div>

              <p>We look forward to creating something extraordinary together.</p>
              
              <p>Warm regards,<br>The Saudi Event Management Team</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Consultation API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
