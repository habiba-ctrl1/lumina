import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    let where: any = {};
    if (type && type !== 'all') {
      where.type = type;
    }

    const records = await prisma.financialRecord.findMany({
      where,
      orderBy: { date: 'desc' }
    });

    return NextResponse.json(records);
  } catch (err) {
    console.error('Prisma error:', err);
    return NextResponse.json({ error: 'Failed to fetch financial records' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, category, amount, description, reference, date } = body;

    if (!type || !amount) {
      return NextResponse.json({ error: 'Type and amount are required fields' }, { status: 400 });
    }

    const record = await prisma.financialRecord.create({
      data: {
        type,
        category,
        amount: parseFloat(amount),
        description,
        reference,
        date: date ? new Date(date) : new Date()
      }
    });

    // Create activity log
    await prisma.activityLog.create({
      data: {
        action: 'Financial Record',
        details: `Created ${type} entry in ${category || 'General'} of SAR ${amount}`,
        userEmail: 'admin@lumina.sa'
      }
    });

    return NextResponse.json(record, { status: 201 });
  } catch (err) {
    console.error('Prisma error:', err);
    return NextResponse.json({ error: 'Failed to save financial record' }, { status: 500 });
  }
}
