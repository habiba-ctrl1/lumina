import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { logActivity } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || 're_missing_key');
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
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'missing-key') {
      try {
        // Admin Notification
        await resend.emails.send({
          from: 'Saudi Event Management <info@saudieventmanagement.com>',
          to: ['infosaudieventmanagement@gmail.com'],
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
          from: 'Saudi Event Management <info@saudieventmanagement.com>',
          to: [email],
          subject: 'Consultation Request Received - Saudi Event Management',
          html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px;">
              <!-- Logo Header -->
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: #000000; font-size: 22px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin: 0;">Saudi Event Management</h1>
                <div style="width: 40px; height: 2px; background-color: #c5a059; margin: 20px auto 0;"></div>
              </div>

              <!-- Content -->
              <h2 style="color: #1a1a1a; font-size: 20px; font-weight: 400; margin-bottom: 24px;">Dear ${name},</h2>
              
              <p style="color: #4a4a4a; font-size: 15px; line-height: 1.8; margin-bottom: 24px;">
                Thank you for requesting a private discovery session with <strong>Saudi Event Management</strong>. We are honored to be considered as the architects for your upcoming <strong>${eventType}</strong>.
              </p>

              <p style="color: #4a4a4a; font-size: 15px; line-height: 1.8; margin-bottom: 24px;">
                At Saudi Event Management, our philosophy is rooted in creating extraordinary, bespoke experiences. Your request has been received by our executive planning committee and we are currently matching you with the ideal specialist for your unique vision.
              </p>

              <!-- Highlight Box -->
              <div style="background-color: #faf9f7; border-left: 4px solid #c5a059; padding: 24px; margin: 32px 0;">
                <p style="font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">Consultation Status</p>
                <p style="font-size: 18px; color: #1a1a1a; margin: 0 0 8px 0; font-weight: 500;">Assigned to: <strong>${randomAssignee}</strong></p>
                <p style="font-size: 14px; color: #4a4a4a; margin: 0; line-height: 1.5;">Senior Event Director, Saudi Event Management</p>
              </div>

              <p style="color: #4a4a4a; font-size: 15px; line-height: 1.8; margin-bottom: 32px;">
                Your dedicated director will contact you via your preferred method within the next <strong>90 minutes</strong> to finalize the schedule for your discovery session. We look forward to translating your ideas into an unforgettable reality.
              </p>

              <!-- Sign-off -->
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
        console.error('Email notification failed:', emailError);
      }
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Consultation API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
