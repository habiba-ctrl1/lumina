import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    const updated = await prisma.quoteRequest.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update Request Status Error:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.quoteRequest.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete Request Error:', error);
    return NextResponse.json({ error: 'Failed to delete request' }, { status: 500 });
  }
}
