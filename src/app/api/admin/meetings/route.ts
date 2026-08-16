import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

// /api/admin/meetings (GET, POST — admin only)
// One place answering "today, what time, with whom" — logged whenever a
// booking/confirmation email or calendar invite comes in.

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const meetings = await prisma.meeting.findMany({
      orderBy: { startTime: 'asc' },
    });
    return NextResponse.json({ data: meetings });
  } catch (error) {
    console.error('Meetings Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch meetings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    if (!body.title || !body.startTime) {
      return NextResponse.json({ error: 'title and startTime are required' }, { status: 400 });
    }

    const meeting = await prisma.meeting.create({
      data: {
        title: body.title,
        contactName: body.contactName || null,
        contactEmail: body.contactEmail || null,
        company: body.company || null,
        startTime: new Date(body.startTime),
        endTime: body.endTime ? new Date(body.endTime) : null,
        platform: body.platform || null,
        meetingLink: body.meetingLink || null,
        status: body.status || 'Scheduled',
        source: body.source || 'email',
        notes: body.notes || null,
      },
    });
    return NextResponse.json({ data: meeting }, { status: 201 });
  } catch (error) {
    console.error('Meeting Create Error:', error);
    return NextResponse.json({ error: 'Failed to create meeting' }, { status: 500 });
  }
}
