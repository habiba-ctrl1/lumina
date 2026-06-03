import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Group Events by type
    const eventTypesRaw = await prisma.event.groupBy({
      by: ['type'],
      _count: { _all: true }
    });
    const eventTypes = eventTypesRaw.map(item => ({
      name: item.type,
      value: item._count._all
    }));

    // 2. Group Events by status
    const eventStatusRaw = await prisma.event.groupBy({
      by: ['status'],
      _count: { _all: true }
    });
    const eventStatuses = eventStatusRaw.map(item => ({
      name: item.status,
      value: item._count._all
    }));

    // 3. Count Vendors by category
    const vendorCategoriesRaw = await prisma.vendor.groupBy({
      by: ['category'],
      _count: { _all: true }
    });
    const vendorCategories = vendorCategoriesRaw.map(item => ({
      name: item.category,
      value: item._count._all
    }));

    // 4. Monthly Finance summaries (Mocked/Aggregated)
    const finances = await prisma.financialRecord.findMany({
      orderBy: { date: 'asc' }
    });

    const monthlyData: Record<string, { month: string; revenue: number; expense: number }> = {};
    
    // Fallback default months if finance is empty
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    months.forEach((m, idx) => {
      monthlyData[idx.toString()] = { month: m, revenue: 0, expense: 0 };
    });

    finances.forEach(record => {
      const monthIndex = new Date(record.date).getMonth();
      const monthName = months[monthIndex % 6];
      const key = (monthIndex % 6).toString();
      
      if (record.type === 'revenue') {
        monthlyData[key].revenue += record.amount;
      } else {
        monthlyData[key].expense += record.amount;
      }
    });

    const monthlyFinance = Object.values(monthlyData);

    // 5. General stats counters
    const [totalEvents, totalClients, totalVendors, totalInquiries, totalProposals] = await Promise.all([
      prisma.event.count(),
      prisma.client.count(),
      prisma.vendor.count(),
      prisma.inquiry.count(),
      prisma.proposal.count()
    ]);

    return NextResponse.json({
      counters: {
        totalEvents,
        totalClients,
        totalVendors,
        totalInquiries,
        totalProposals
      },
      eventTypes,
      eventStatuses,
      vendorCategories,
      monthlyFinance
    });
  } catch (error) {
    console.error('Stats Analytics Error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics stats' }, { status: 500 });
  }
}
