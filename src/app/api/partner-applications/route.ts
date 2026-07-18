import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/logger';
import { requireAdmin } from '@/lib/api-auth';

// ─────────────────────────────────────────────────────────────────────────────
// /api/partner-applications
// POST — PUBLIC: vendors submit the /partner-onboarding form (their own info).
// GET  — ADMIN ONLY: applications contain private contact info; never expose
//        them on public routes (same hard rule as the Vendor table).
// ─────────────────────────────────────────────────────────────────────────────

// Best-effort rate limit (per serverless instance): max 3 submissions/hour/IP.
const submissionLog = new Map<string, number[]>();
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 3;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionLog.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) return true;
  recent.push(now);
  submissionLog.set(ip, recent);
  return false;
}

const str = (v: unknown, max = 500) =>
  typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null;

const strArr = (v: unknown, max = 20) =>
  Array.isArray(v) ? v.filter((x) => typeof x === 'string' && x.trim()).slice(0, max) : [];

/** Next sequential application number, e.g. "SEM-P-0007". */
async function nextAppNumber(): Promise<string> {
  const last = await prisma.vendorApplication.findFirst({
    orderBy: { createdAt: 'desc' },
    select: { appNumber: true },
  });
  const lastNum = last ? parseInt(last.appNumber.replace(/\D/g, ''), 10) || 0 : 0;
  return `SEM-P-${String(lastNum + 1).padStart(4, '0')}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot — hidden field real vendors never see. Bots that fill it get a
    // fake success so they don't retry.
    if (body.companyUrl) {
      return NextResponse.json({ ok: true, appNumber: 'SEM-P-0000' }, { status: 201 });
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // Required: only the bare minimum so small vendors can still register.
    const companyName = str(body.companyName, 200);
    const contactPerson = str(body.contactPerson, 200);
    const whatsapp = str(body.whatsapp, 50);
    const city = str(body.city, 100);
    const categories = strArr(body.categories);
    if (!companyName || !contactPerson || !whatsapp || !city || categories.length === 0) {
      return NextResponse.json(
        { error: 'Please fill company name, contact person, WhatsApp, city and at least one service.' },
        { status: 400 }
      );
    }
    if (body.permAccurate !== true) {
      return NextResponse.json(
        { error: 'Please confirm the information provided is accurate.' },
        { status: 400 }
      );
    }
    if (body.permNonCircumvention !== true) {
      return NextResponse.json(
        { error: 'Please accept the non-circumvention agreement.' },
        { status: 400 }
      );
    }

    // appNumber has a unique constraint — retry once on a rare collision.
    let application;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        application = await prisma.vendorApplication.create({
          data: {
            appNumber: await nextAppNumber(),
            companyName,
            businessType: str(body.businessType, 200),
            contactPerson,
            jobTitle: str(body.jobTitle, 200),
            whatsapp,
            email: str(body.email, 200),
            phone: str(body.phone, 50),
            city,
            regionCoverage: strArr(body.regionCoverage),
            website: str(body.website),
            instagram: str(body.instagram),
            linkedin: str(body.linkedin),
            facebook: str(body.facebook),
            tiktok: str(body.tiktok),
            youtube: str(body.youtube),
            googleMaps: str(body.googleMaps),
            categories,
            servicesDesc: str(body.servicesDesc, 2000),
            yearsInBusiness: str(body.yearsInBusiness, 50),
            teamSize: str(body.teamSize, 50),
            languages: str(body.languages, 200),
            crNumber: str(body.crNumber, 100),
            vatNumber: str(body.vatNumber, 100),
            logoLink: str(body.logoLink),
            profileLink: str(body.profileLink),
            portfolioLink: str(body.portfolioLink),
            videoLink: str(body.videoLink),
            rateCardLink: str(body.rateCardLink),
            pricingType: str(body.pricingType, 50),
            majorClients: str(body.majorClients, 1000),
            certifications: str(body.certifications, 1000),
            permLogoUse: body.permLogoUse === true,
            permMediaUse: body.permMediaUse === true,
            permAccurate: true,
            permNonCircumvention: true,
            featureOnSem: body.featureOnSem === true,
            backlinkAnswer: str(body.backlinkAnswer, 50),
            extraNotes: str(body.extraNotes, 2000),
          },
        });
        break;
      } catch (e: any) {
        if (e?.code !== 'P2002' || attempt === 1) throw e;
      }
    }

    await logActivity(
      'Partner Application',
      `New onboarding submission ${application!.appNumber}: ${companyName} (${categories.join(', ')}) — ${city}`,
      'partner-onboarding'
    );

    return NextResponse.json(
      { ok: true, appNumber: application!.appNumber },
      { status: 201 }
    );
  } catch (error) {
    console.error('Partner Application Create Error:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const where = status && status !== 'all' ? { status } : {};

    const applications = await prisma.vendorApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const counts = {
      pending: await prisma.vendorApplication.count({ where: { status: 'Pending' } }),
      approved: await prisma.vendorApplication.count({ where: { status: 'Approved' } }),
      rejected: await prisma.vendorApplication.count({ where: { status: 'Rejected' } }),
    };

    return NextResponse.json({ applications, counts });
  } catch (error) {
    console.error('Partner Applications Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
