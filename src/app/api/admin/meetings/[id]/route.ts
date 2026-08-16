import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const data: Record<string, unknown> = {};
    for (const key of ['title', 'contactName', 'contactEmail', 'company', 'platform', 'meetingLink', 'status', 'source', 'notes']) {
      if (key in body) data[key] = body[key];
    }
    if ('startTime' in body) data.startTime = new Date(body.startTime);
    if ('endTime' in body) data.endTime = body.endTime ? new Date(body.endTime) : null;

    const meeting = await prisma.meeting.update({ where: { id }, data });
    return NextResponse.json({ data: meeting });
  } catch (error) {
    console.error('Meeting Update Error:', error);
    return NextResponse.json({ error: 'Failed to update meeting' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    await prisma.meeting.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Meeting Delete Error:', error);
    return NextResponse.json({ error: 'Failed to delete meeting' }, { status: 500 });
  }
}
