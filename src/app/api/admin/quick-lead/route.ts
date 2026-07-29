import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import { logActivity } from '@/lib/logger';
import { parseLead } from '@/lib/parse-lead';

// /api/admin/quick-lead (POST — admin only)
// Manual intake for WhatsApp/phone/email queries that never touched the website
// form. Two modes on one endpoint:
//   { parseOnly: true, raw }  → parse pasted chat, return fields, NO db write
//   { ...fields }             → create the lead across all CRM tables
// Mirrors the multi-table creation in /api/contact so a manually-added lead is
// indistinguishable from a website lead, but tolerant of a missing email
// (WhatsApp leads often have only a number).

export async function POST(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();

    // ── Mode 1: parse only ────────────────────────────────────────────────
    if (body.parseOnly) {
      const parsed = parseLead(body.raw || '');
      return NextResponse.json({ data: parsed });
    }

    // ── Mode 2: create ────────────────────────────────────────────────────
    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || '').trim();
    const message = (body.message || '').trim();

    // A lead needs a name and at least one way to reach them.
    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { error: 'Name and at least one of email or phone are required.' },
        { status: 400 }
      );
    }

    const eventType = (body.eventType || '').trim() || 'General';
    const budget = (body.budget || '').trim() || null;
    const eventDate = (body.eventDate || '').trim() || null;
    const guestCount = (body.guestCount || '').trim() || null;
    const venueCity = (body.venueCity || '').trim() || null;
    const company = (body.company || '').trim() || null;
    const source = (body.source || '').trim() || 'whatsapp_manual';

    // eventDate is a free-text field (e.g. "15 March", "next month"); only feed a
    // real Date to QuoteRequest.eventDate, otherwise Prisma throws on an invalid date.
    const parsedDate = eventDate ? new Date(eventDate) : null;
    const validEventDate = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : null;

    // Client CRM is keyed by unique email. When the lead gave no email, mint a
    // stable placeholder from their phone so the same number always maps to the
    // same client (dedupe) instead of creating a fake-looking address collision.
    const clientKey = email || (phone ? `whatsapp-${phone.replace(/\D/g, '')}@lead.sem` : '');

    const inquiry = await prisma.$transaction(async (tx) => {
      const createdInquiry = await tx.inquiry.create({
        data: {
          name,
          email: email || clientKey,
          phone: phone || null,
          company,
          eventType,
          budget,
          eventDate,
          guestCount,
          venueCity,
          message: message || `Manually added ${source} query.`,
          assignedTo: 'Habiba Asghar',
          source,
        },
      });

      if (clientKey) {
        await tx.client.upsert({
          where: { email: clientKey },
          update: {
            phone: phone || undefined,
            company: company || undefined,
          },
          create: {
            name,
            email: clientKey,
            phone: phone || null,
            company,
            status: 'Lead',
            notes: email
              ? `Added manually from ${source}.`
              : `Added manually from ${source} — no email on file, contact via WhatsApp/phone.`,
          },
        });
      }

      await tx.lead.create({
        data: {
          name,
          email: email || clientKey,
          phone: phone || null,
          company,
          eventType,
          budget,
          eventDate,
          source: 'whatsapp',
          status: 'New',
          notes: budget ? `Client stated budget: ${budget}` : `Manually captured ${source} query.`,
        },
      });

      await tx.quoteRequest.create({
        data: {
          clientName: name,
          clientPhone: phone || '---',
          clientEmail: email || null,
          eventType,
          eventDate: validEventDate,
          eventCity: venueCity || 'Riyadh',
          guestCount: guestCount ? parseInt(guestCount, 10) || null : null,
          budgetRange: budget,
          requirements: message || null,
          source: source,
          status: 'pending',
        },
      });

      return createdInquiry;
    });

    await logActivity(
      'Manual Lead Added',
      `${source} query from ${name}${venueCity ? ` (${venueCity})` : ''} captured manually.`,
      user.email || 'admin'
    );

    return NextResponse.json({ data: inquiry }, { status: 201 });
  } catch (error) {
    console.error('Quick Lead Error:', error);
    return NextResponse.json({ error: 'Failed to save lead', details: String(error) }, { status: 500 });
  }
}
