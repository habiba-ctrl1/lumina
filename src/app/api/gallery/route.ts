import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/logger';

export async function GET() {
  try {
    const assets = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        event: true
      }
    });
    return NextResponse.json(assets);
  } catch (error) {
    console.error('Gallery Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, alt, type, eventId } = body;

    const asset = await prisma.mediaAsset.create({
      data: {
        url,
        alt: alt || "Luxury Event Asset",
        type: type || "image",
        eventId: eventId || null,
      }
    });

    await logActivity('Gallery Update', `New asset added to portfolio: ${asset.alt}`, 'admin@saudievent.com');

    return NextResponse.json(asset, { status: 201 });
  } catch (error) {
    console.error('Gallery Create Error:', error);
    return NextResponse.json({ error: 'Failed to add asset' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.mediaAsset.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Gallery Delete Error:', error);
    return NextResponse.json({ error: 'Failed to delete asset' }, { status: 500 });
  }
}
