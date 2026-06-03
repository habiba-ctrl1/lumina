import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { logActivity } from '@/lib/logger';

import { generateAutomatedQuote } from '@/lib/quote-engine';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API || 're_missing_key');
    const body = await request.json();
    const { 
      name, email, phone, company, eventType, budget, 
      eventDate, guestCount, venueCity, message, source 
    } = body;

    console.log('Incoming Inquiry:', { name, email, eventType });

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const team = ["Sarah", "Ahmed", "Nora", "Admin"];
    const randomAssignee = team[Math.floor(Math.random() * team.length)];

    // 1. Save to Prisma using Transaction (All or Nothing)
    let inquiry;
    try {
      const quoteData = generateAutomatedQuote(eventType, guestCount, budget);

      inquiry = await prisma.$transaction(async (tx) => {
        // 1a. Create Inquiry and Estimate
        const createdInquiry = await tx.inquiry.create({
          data: {
            name,
            email,
            phone: phone || null,
            company: company || null,
            eventType: eventType || 'General',
            budget: budget || null,
            eventDate: eventDate || null,
            guestCount: guestCount || null,
            venueCity: venueCity || null,
            message,
            assignedTo: randomAssignee,
            source: source || 'direct_contact',
            estimate: {
              create: {
                baseAmount: quoteData.baseAmount,
                serviceFee: quoteData.serviceFee,
                totalAmount: quoteData.totalAmount,
                breakdown: JSON.stringify(quoteData.breakdown),
                status: 'Generated'
              }
            }
          },
          include: {
            estimate: true
          }
        });

        // 1b. Automatically create Client in CRM database if not exists
        await tx.client.upsert({
          where: { email },
          update: {
            phone: phone || undefined,
            company: company || undefined
          },
          create: {
            name,
            email,
            phone: phone || null,
            company: company || null,
            status: 'Lead',
            notes: `Created automatically from website form: "${message}"`
          }
        });

        // 1c. Automatically create Lead Pipeline record
        await tx.lead.create({
          data: {
            name,
            email,
            phone: phone || null,
            company: company || null,
            eventType: eventType || 'General',
            budget: budget || null,
            eventDate: eventDate || null,
            source: 'website',
            status: 'New',
            notes: `Projected Estimate: SAR ${quoteData.totalAmount.toLocaleString()}`
          }
        });

        // 1d. Create a Record in QuoteRequest Table
        await tx.quoteRequest.create({
          data: {
            clientName: name,
            clientPhone: phone || '---',
            clientEmail: email,
            eventType: eventType || 'General',
            eventDate: eventDate ? new Date(eventDate) : null,
            eventCity: venueCity || 'Riyadh',
            guestCount: guestCount ? parseInt(guestCount) : null,
            budgetRange: budget,
            requirements: message,
            source: 'homepage_form',
            status: 'pending'
          }
        });

        return createdInquiry;
      });

    } catch (prismaError) {
      console.error('Prisma Transaction Error:', prismaError);
      return NextResponse.json({ error: 'Database transaction failed.', details: String(prismaError) }, { status: 500 });
    }

    // 2. Background Jobs (Non-blocking)
    // We execute these asynchronously without `await` to give the user a lightning-fast response (0.1s).
    // Note: If deployed on Vercel, consider wrapping this in Next.js `waitUntil` or `unstable_after` 
    // to ensure the serverless function doesn't sleep before the email sends.
    const executeBackgroundTasks = async () => {
      try {
        await logActivity(
          'New Lead Received', 
          `Inquiry from ${name} (Auto-assigned to ${inquiry.assignedTo}). Projected Quote: SAR ${inquiry.estimate?.totalAmount.toLocaleString()}`, 
          email
        );

        if (process.env.RESEND_API && process.env.RESEND_API !== 'missing-key') {
          // Admin Notification
          await resend.emails.send({
            from: 'Saudi Event Management <onboarding@resend.dev>',
            to: ['infosaudieventmanagement@gmail.com'],
            subject: `New Lead: ${name} (Quote: SAR ${inquiry.estimate?.totalAmount.toLocaleString()})`,
            html: `
              <div style="font-family: sans-serif; padding: 30px; border: 1px solid #f0f0f0; border-radius: 20px;">
                <h2 style="color: #1a1a1a;">Automated Quote Generated</h2>
                <p style="font-size: 16px; color: #666;">A new lead has been auto-assigned to <strong>${inquiry.assignedTo}</strong>.</p>
                
                <div style="background: #f9f9f9; padding: 20px; border-radius: 15px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #c5a059;">Projected Estimate: SAR ${inquiry.estimate?.totalAmount.toLocaleString()}</h3>
                  <p><strong>Event:</strong> ${eventType} for ${guestCount} guests</p>
                  <p><strong>Location:</strong> ${venueCity}</p>
                  <p><strong>Client:</strong> ${name} (${email})</p>
                </div>
              </div>
            `,
          });

          // User Confirmation
          await resend.emails.send({
            from: 'Saudi Event Management <onboarding@resend.dev>',
            to: [email],
            subject: 'Your Luxury Event Projection - Saudi Event Management',
            html: `
              <div style="font-family: sans-serif; padding: 30px; line-height: 1.6;">
                <h2 style="color: #c5a059;">Building Your Vision</h2>
                <p>Dear ${name},</p>
                <p>Thank you for choosing Saudi Event Management. Based on your initial inquiry for a <strong>${eventType}</strong>, our intelligence system has generated a preliminary projection to help you start planning.</p>
                
                <div style="border-left: 4px solid #c5a059; padding-left: 20px; margin: 25px 0;">
                  <p style="font-size: 18px; margin: 0;">Projected Investment: <strong>SAR ${inquiry.estimate?.totalAmount.toLocaleString()}*</strong></p>
                  <p style="font-size: 12px; color: #999; margin-top: 5px;">*This is an automated estimate for initial planning. Final pricing will be customized by your dedicated consultant.</p>
                </div>
              </div>
            `,
          });
        }
      } catch (err) {
        console.error('Background Task Execution Error:', err);
      }
    };

    // Fire and forget
    executeBackgroundTasks();

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    console.error('General Contact API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.', details: String(error) }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { message: { contains: search } },
        { company: { contains: search } }
      ];
    }

    if (category && category !== 'all') {
      where.eventType = category;
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error('Prisma Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.inquiry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Prisma Delete Error:', error);
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const body = await request.json();
    const updated = await prisma.inquiry.update({
      where: { id },
      data: body
    });

    if (body.assignedTo) {
      await logActivity('Lead Assigned', `Inquiry from ${updated.name} assigned to ${body.assignedTo}`, 'admin@saudievent.com');
    }
    
    if (body.status) {
      await logActivity('Inquiry Updated', `Status changed to ${body.status} for ${updated.name}`, 'admin@saudievent.com');
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Prisma Patch Error:', error);
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}
