import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { resend, isResendConfigured, ADMIN_EMAIL, FROM_EMAIL } from '@/lib/resend';
import { logActivity } from '@/lib/logger';

import { generateAutomatedQuote } from '@/lib/quote-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name, email, phone, company, eventType, budget,
      eventDate, guestCount, venueCity, message, source, inquiryType
    } = body;

    // A "vendor" submission is a supplier/partner pitching their services — NOT a
    // client booking an event. These must skip quote generation and the sales
    // pipeline so they never pollute leads/quotes with fake estimates.
    const isVendor = inquiryType === 'vendor';

    console.log('Incoming Inquiry:', { name, email, eventType, inquiryType: isVendor ? 'vendor' : 'client' });

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // All inbound client leads are routed to Habiba Asghar (single point of ownership).
    const randomAssignee = "Habiba Asghar";

    // 1. Save to Prisma using Transaction (All or Nothing)
    let inquiry: any;
    try {
      if (isVendor) {
        // Vendor / partner inquiry: store a record only — no estimate, no Client,
        // Lead, or QuoteRequest. Keeps the sales pipeline & quotes clean.
        inquiry = await prisma.inquiry.create({
          data: {
            name,
            email,
            phone: phone || null,
            company: company || null,
            eventType: eventType || 'Vendor / Partnership',
            message,
            assignedTo: randomAssignee,
            source: 'vendor_inquiry',
          },
        });
      } else {
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
      }

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
        // ── VENDOR / PARTNER PATH ───────────────────────────────────────────
        // No quote, no sales-pipeline noise. Just notify the team and acknowledge.
        if (isVendor) {
          await logActivity(
            'New Vendor Inquiry',
            `Partnership / supplier inquiry from ${name}${company ? ` (${company})` : ''}.`,
            email
          );

          if (isResendConfigured) {
            const vendorWa = phone ? phone.replace(/[^0-9]/g, '') : null;
            const vendorMsg = message || 'No additional details provided.';

            // Admin notification (vendor pitch — deliberately no estimate).
            await resend.emails.send({
              from: FROM_EMAIL,
              to: [ADMIN_EMAIL],
              replyTo: email,
              subject: `🤝 New Partner Inquiry: ${name}${company ? ` · ${company}` : ''}`,
              html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden;">
                  <div style="background-color: #0d0d0d; padding: 28px 32px;">
                    <p style="color: #c5a059; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px 0;">Partner / Vendor Inquiry</p>
                    <h1 style="color: #ffffff; font-size: 20px; font-weight: 500; margin: 0;">A supplier wants to partner with you</h1>
                  </div>
                  <div style="padding: 28px 32px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333;">
                      <tr><td style="padding: 8px 0; color: #888; width: 130px;">Contact</td><td style="padding: 8px 0; font-weight: 500;">${name}</td></tr>
                      ${company ? `<tr><td style="padding: 8px 0; color: #888;">Company</td><td style="padding: 8px 0; font-weight: 500;">${company}</td></tr>` : ''}
                      <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #c5a059; text-decoration: none;">${email}</a></td></tr>
                      ${phone ? `<tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #c5a059; text-decoration: none;">${phone}</a></td></tr>` : ''}
                    </table>
                    <h3 style="font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin: 24px 0 12px 0;">Their Message</h3>
                    <div style="background-color: #faf9f7; border-left: 3px solid #c5a059; padding: 16px 20px; font-size: 14px; line-height: 1.7; color: #444; border-radius: 0 8px 8px 0;">${vendorMsg}</div>
                    <div style="margin-top: 28px; text-align: center;">
                      ${vendorWa ? `<a href="https://wa.me/${vendorWa}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 14px 28px; border-radius: 8px; margin: 0 6px 12px 6px;">WhatsApp ${name} &rarr;</a>` : ''}
                      <a href="mailto:${email}" style="display: inline-block; background-color: #0d0d0d; color: #ffffff; text-decoration: none; font-size: 14px; padding: 14px 28px; border-radius: 8px; margin: 0 6px 12px 6px;">Reply by Email &rarr;</a>
                    </div>
                  </div>
                  <div style="background-color: #0d0d0d; padding: 18px 32px; text-align: center;">
                    <p style="color: #888; font-size: 11px; margin: 0;">Saudi Event Management · Partner Inquiries</p>
                  </div>
                </div>
              `,
            });

            // Acknowledgement to the vendor — partnership tone, no quote/SAR figure.
            await resend.emails.send({
              from: FROM_EMAIL,
              to: [email],
              replyTo: ADMIN_EMAIL,
              subject: 'Thank you for your partnership inquiry — Saudi Event Management',
              html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px;">
                  <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="color: #000000; font-size: 22px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin: 0;">Saudi Event Management</h1>
                    <div style="width: 40px; height: 2px; background-color: #c5a059; margin: 20px auto 0;"></div>
                  </div>
                  <h2 style="color: #1a1a1a; font-size: 20px; font-weight: 400; margin-bottom: 24px;">Dear ${name},</h2>
                  <p style="color: #4a4a4a; font-size: 15px; line-height: 1.8; margin-bottom: 24px;">
                    Thank you for reaching out and for your interest in partnering with <strong>Saudi Event Management</strong>. We're always glad to connect with talented suppliers and creative partners across the Kingdom and the wider GCC.
                  </p>
                  <p style="color: #4a4a4a; font-size: 15px; line-height: 1.8; margin-bottom: 24px;">
                    Our team will review your details${company ? ` and ${company}'s profile` : ''} and will be in touch should there be a fit for our upcoming events. If you have a portfolio, rate card, or showreel, feel free to reply to this email and include it.
                  </p>
                  <div style="border-top: 1px solid #eaeaea; padding-top: 32px; margin-top: 32px;">
                    <p style="color: #1a1a1a; font-size: 15px; margin: 0 0 4px 0;">With warm regards,</p>
                    <p style="color: #c5a059; font-size: 16px; font-weight: 500; margin: 0 0 16px 0;">The Partnerships Team</p>
                    <p style="color: #888; font-size: 12px; margin: 0;">Saudi Event Management</p>
                    <p style="color: #888; font-size: 12px; margin: 4px 0 0 0;"><a href="https://saudieventmanagement.com" style="color: #c5a059; text-decoration: none;">saudieventmanagement.com</a> | Riyadh, Kingdom of Saudi Arabia</p>
                  </div>
                </div>
              `,
            });
          }
          return; // Vendor path complete — skip all client/quote emails below.
        }

        await logActivity(
          'New Lead Received',
          `Inquiry from ${name} (Auto-assigned to ${inquiry.assignedTo}). Projected Quote: SAR ${inquiry.estimate?.totalAmount.toLocaleString()}`,
          email
        );

        if (isResendConfigured) {
          // Admin / Team Notification ----------------------------------------
          // Safe fallbacks so the email never shows "undefined" for optional fields.
          const safeEventType = eventType || 'General Enquiry';
          const safeGuests = guestCount ? `${guestCount} guests` : 'Guest count TBD';
          const safeCity = venueCity || 'TBD';
          const safeDate = eventDate || 'Flexible / TBD';
          const safeBudget = budget || 'Not specified';
          const safePhone = phone || null;
          const safeCompany = company || null;
          const safeMessage = message || 'No additional details provided.';
          const estimateValue = inquiry.estimate?.totalAmount.toLocaleString() ?? 'N/A';
          // wa.me needs digits only (no +, spaces or dashes).
          const waClient = safePhone ? safePhone.replace(/[^0-9]/g, '') : null;
          const waClientText = encodeURIComponent(
            `Hello ${name}, thank you for contacting Saudi Event Management regarding your ${safeEventType}. I'm Habiba, your dedicated event consultant.`
          );

          await resend.emails.send({
            from: FROM_EMAIL,
            to: [ADMIN_EMAIL],
            replyTo: email,
            subject: `🔔 New Lead: ${name} · ${safeEventType} · SAR ${estimateValue}`,
            html: `
              <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden;">

                <!-- Header -->
                <div style="background-color: #0d0d0d; padding: 28px 32px;">
                  <p style="color: #c5a059; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px 0;">Internal Lead Alert</p>
                  <h1 style="color: #ffffff; font-size: 20px; font-weight: 500; margin: 0;">New Quote Request Received</h1>
                </div>

                <!-- Assignee + Estimate banner -->
                <div style="padding: 24px 32px; background-color: #faf9f7; border-bottom: 1px solid #eee;">
                  <p style="font-size: 14px; color: #555; margin: 0 0 4px 0;">Auto-assigned to <strong style="color: #0d0d0d;">${inquiry.assignedTo}</strong></p>
                  <p style="font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin: 12px 0 4px 0;">Projected Estimate</p>
                  <p style="font-size: 26px; color: #c5a059; font-weight: 600; margin: 0;">SAR ${estimateValue}</p>
                </div>

                <!-- Event details table -->
                <div style="padding: 28px 32px;">
                  <h3 style="font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">Event Details</h3>
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333;">
                    <tr><td style="padding: 8px 0; color: #888; width: 130px;">Event Type</td><td style="padding: 8px 0; font-weight: 500;">${safeEventType}</td></tr>
                    <tr><td style="padding: 8px 0; color: #888;">Guests</td><td style="padding: 8px 0; font-weight: 500;">${safeGuests}</td></tr>
                    <tr><td style="padding: 8px 0; color: #888;">Location</td><td style="padding: 8px 0; font-weight: 500;">${safeCity}</td></tr>
                    <tr><td style="padding: 8px 0; color: #888;">Event Date</td><td style="padding: 8px 0; font-weight: 500;">${safeDate}</td></tr>
                    <tr><td style="padding: 8px 0; color: #888;">Budget</td><td style="padding: 8px 0; font-weight: 500;">${safeBudget}</td></tr>
                  </table>

                  <h3 style="font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin: 28px 0 16px 0;">Client</h3>
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333;">
                    <tr><td style="padding: 8px 0; color: #888; width: 130px;">Name</td><td style="padding: 8px 0; font-weight: 500;">${name}</td></tr>
                    <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #c5a059; text-decoration: none;">${email}</a></td></tr>
                    ${safePhone ? `<tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0;"><a href="tel:${safePhone}" style="color: #c5a059; text-decoration: none;">${safePhone}</a></td></tr>` : ''}
                    ${safeCompany ? `<tr><td style="padding: 8px 0; color: #888;">Company</td><td style="padding: 8px 0; font-weight: 500;">${safeCompany}</td></tr>` : ''}
                  </table>

                  <h3 style="font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin: 28px 0 12px 0;">Message</h3>
                  <div style="background-color: #faf9f7; border-left: 3px solid #c5a059; padding: 16px 20px; font-size: 14px; line-height: 1.7; color: #444; border-radius: 0 8px 8px 0;">
                    ${safeMessage}
                  </div>

                  <!-- CTA -->
                  <div style="margin-top: 32px; text-align: center;">
                    ${waClient ? `<a href="https://wa.me/${waClient}?text=${waClientText}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 14px 28px; border-radius: 8px; letter-spacing: 0.3px; margin: 0 6px 12px 6px;">WhatsApp ${name} &rarr;</a>` : ''}
                    <a href="https://saudieventmanagement.com/admin/dashboard" style="display: inline-block; background-color: #0d0d0d; color: #ffffff; text-decoration: none; font-size: 14px; padding: 14px 28px; border-radius: 8px; letter-spacing: 0.5px; margin: 0 6px 12px 6px;">Open Admin Console &rarr;</a>
                    <p style="margin: 14px 0 0 0;"><a href="mailto:${email}" style="color: #c5a059; font-size: 13px; text-decoration: none;">Or reply directly by email to ${name}</a></p>
                  </div>
                </div>

                <!-- Footer -->
                <div style="background-color: #0d0d0d; padding: 18px 32px; text-align: center;">
                  <p style="color: #888; font-size: 11px; margin: 0;">Saudi Event Management · Automated Lead Engine</p>
                </div>
              </div>
            `,
          });

          // User Confirmation
          await resend.emails.send({
            from: FROM_EMAIL,
            to: [email],
            replyTo: ADMIN_EMAIL,
            subject: 'Your Luxury Event Projection - Saudi Event Management',
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
                  Thank you for reaching out to <strong>Saudi Event Management</strong>. We have successfully received your inquiry regarding your upcoming <strong>${eventType}</strong>.
                </p>

                <p style="color: #4a4a4a; font-size: 15px; line-height: 1.8; margin-bottom: 24px;">
                  At Saudi Event Management, we specialize in curating unparalleled luxury experiences across the Kingdom—from the majestic landscapes of AlUla to the bustling financial districts of Riyadh. Our executive team is currently reviewing the details of your request to ensure we assign the most specialized consultant to your portfolio.
                </p>

                <!-- Highlight Box -->
                <div style="background-color: #faf9f7; border-left: 4px solid #c5a059; padding: 24px; margin: 32px 0;">
                  <p style="font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">Preliminary Projection</p>
                  <p style="font-size: 20px; color: #1a1a1a; margin: 0; font-weight: 500;">SAR ${inquiry.estimate?.totalAmount.toLocaleString()}*</p>
                  <p style="font-size: 12px; color: #888; margin: 12px 0 0 0; line-height: 1.5;">*This is an automated baseline projection based on your initial parameters. Your dedicated consultant will provide a fully customized, detailed proposal.</p>
                </div>

                <p style="color: #4a4a4a; font-size: 15px; line-height: 1.8; margin-bottom: 28px;">
                  A member of our senior concierge team will be in touch with you <strong>the same day</strong> to discuss your vision in detail and outline the exact next steps to bring your event to life.
                </p>

                <!-- WhatsApp CTA -->
                <div style="text-align: center; margin: 0 0 32px 0;">
                  <p style="color: #888; font-size: 13px; margin: 0 0 14px 0;">Prefer to talk now? Reach us instantly on WhatsApp.</p>
                  <a href="https://wa.me/966539388072?text=${encodeURIComponent(`Hi Saudi Event Management, I just submitted an inquiry about my ${eventType || 'event'} and would like to discuss it.`)}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; padding: 14px 36px; border-radius: 8px; letter-spacing: 0.3px;">Chat with us on WhatsApp</a>
                </div>

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
