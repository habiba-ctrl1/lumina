import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Testimonials Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const testimonial = await prisma.testimonial.create({
      data: {
        quote: body.quote,
        author: body.author,
        role: body.role,
        rating: parseInt(body.rating) || 5,
      },
    });
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Testimonial Create Error:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Testimonial Delete Error:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
