import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API || 'missing-key');
    const body = await request.json();
    const { name, email, phone, company, eventType, budget, eventDate, guestCount, venueCity, message, source } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // 1. Save to Prisma (Local SQLite)
    const contact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        company,
        event_type: eventType,
        budget,
        event_date: eventDate,
        guest_count: guestCount,
        venue_city: venueCity,
        message,
        source: source || 'direct_contact'
      }
    });

    // 2. Send Emails via Resend
    try {
      // Admin Notification
      await resend.emails.send({
        from: 'Saudi Event Management <onboarding@resend.dev>',
        to: ['habiti747@gmail.com'],
        subject: `New Inquiry: ${name}`,
        html: `<div style="font-family: sans-serif; padding: 20px;"><h2>New Inquiry Received</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p></div>`,
      });

      // User Confirmation
      await resend.emails.send({
        from: 'Saudi Event Management <onboarding@resend.dev>',
        to: [email],
        subject: 'We received your inquiry - Saudi Event Management',
        html: `<div style="font-family: sans-serif; padding: 20px;"><h2>Thank You for Reaching Out!</h2><p>Hi ${name},</p><p>We have successfully received your inquiry at Saudi Event Management. As promised, our team is already reviewing your details and we will get back to you within <strong>2 hours</strong>.</p><p>We look forward to creating something extraordinary with you.</p><p>Warm regards,<br>The Saudi Event Management Team</p></div>`,
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error('Prisma Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
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
      where.event_type = category;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const inquiries = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error('Prisma Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}
