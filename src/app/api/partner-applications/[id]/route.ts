import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/logger';
import { requireAdmin } from '@/lib/api-auth';

type Params = { params: Promise<{ id: string }> };

// All routes here are ADMIN ONLY — applications hold private vendor contact info.

// GET /api/partner-applications/:id — full application detail
export async function GET(request: Request, { params }: Params) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const application = await prisma.vendorApplication.findUnique({ where: { id } });
  if (!application) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(application);
}

/** Archival note appended to the vendor's log when an application is approved. */
function buildOnboardingNote(app: {
  appNumber: string;
  logoLink: string | null;
  profileLink: string | null;
  portfolioLink: string | null;
  videoLink: string | null;
  rateCardLink: string | null;
  permMediaUse: boolean;
  permLogoUse: boolean;
  permNonCircumvention: boolean;
  backlinkAnswer: string | null;
  featureOnSem: boolean;
  createdAt: Date;
}): string {
  const d = app.createdAt.toISOString().slice(0, 10);
  return [
    `Onboarding form ${app.appNumber} submitted ${d}.`,
    `Links — logo: ${app.logoLink || '—'} | profile: ${app.profileLink || '—'} | photos: ${app.portfolioLink || '—'} | video: ${app.videoLink || '—'} | rate card: ${app.rateCardLink || '—'}.`,
    `Permissions — media use: ${app.permMediaUse ? 'YES' : 'no'} | logo display: ${app.permLogoUse ? 'YES' : 'no'} | non-circumvention: ${app.permNonCircumvention ? 'AGREED' : 'no'}.`,
    `Backlink: ${app.backlinkAnswer || '—'} | wants SEM feature: ${app.featureOnSem ? 'yes' : 'no'}.`,
  ].join(' ');
}

// PATCH /api/partner-applications/:id
// body.action: "approve" (optional body.mergeVendorId) | "reject" | "reopen"
export async function PATCH(request: Request, { params }: Params) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const app = await prisma.vendorApplication.findUnique({ where: { id } });
    if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    if (body.action === 'reject') {
      const updated = await prisma.vendorApplication.update({
        where: { id },
        data: { status: 'Rejected', reviewedAt: new Date() },
      });
      await logActivity('Partner Application Rejected', `${app.appNumber} — ${app.companyName}`, user.email || 'admin');
      return NextResponse.json(updated);
    }

    if (body.action === 'reopen') {
      const updated = await prisma.vendorApplication.update({
        where: { id },
        data: { status: 'Pending', reviewedAt: null },
      });
      return NextResponse.json(updated);
    }

    if (body.action !== 'approve') {
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }

    // ── Approve ──
    // NOTE: approval adds the vendor to the INTERNAL database only. Public site
    // listing is a separate, later decision (founder's SEO brief).
    const note = buildOnboardingNote(app);
    const yearsExp = app.yearsInBusiness ? parseInt(app.yearsInBusiness, 10) : NaN;
    let vendorId: string;

    if (body.mergeVendorId) {
      // Merge into an existing vendor: only fill fields that are currently
      // empty — never overwrite the founder's curated data.
      const existing = await prisma.vendor.findUnique({ where: { id: body.mergeVendorId } });
      if (!existing) return NextResponse.json({ error: 'Merge target vendor not found' }, { status: 404 });

      const fill: Record<string, unknown> = {};
      const fillIfEmpty = (field: keyof typeof existing, value: unknown) => {
        if (value && !existing[field]) fill[field as string] = value;
      };
      fillIfEmpty('contactPerson', app.contactPerson);
      fillIfEmpty('email', app.email);
      fillIfEmpty('phone', app.phone);
      fillIfEmpty('whatsapp', app.whatsapp);
      fillIfEmpty('city', app.city);
      fillIfEmpty('services', app.servicesDesc);
      fillIfEmpty('portfolio', app.website || app.instagram || app.portfolioLink);
      fillIfEmpty('portfolioFiles', app.portfolioLink);
      fillIfEmpty('rateCardFiles', app.rateCardLink);
      fillIfEmpty('rateCardSummary', app.pricingType);
      fillIfEmpty('certifications', app.certifications);
      if (!Number.isNaN(yearsExp) && !existing.yearsExperience) fill.yearsExperience = yearsExp;
      if (existing.categories.length === 0 && app.categories.length > 0) fill.categories = app.categories;
      if (existing.regionCoverage.length === 0 && app.regionCoverage.length > 0) fill.regionCoverage = app.regionCoverage;
      // Written media permission from the form upgrades the flag, never downgrades.
      if (app.permMediaUse) fill.photoPermission = true;

      await prisma.vendor.update({ where: { id: existing.id }, data: fill });
      vendorId = existing.id;
    } else {
      const created = await prisma.vendor.create({
        data: {
          name: app.companyName,
          category: app.categories[0] || 'Other',
          categories: app.categories,
          services: app.servicesDesc,
          contactPerson: app.contactPerson,
          contactInfo: [app.email, app.phone || app.whatsapp].filter(Boolean).join(' | ') || null,
          email: app.email,
          phone: app.phone,
          whatsapp: app.whatsapp,
          city: app.city,
          regionCoverage: app.regionCoverage,
          portfolio: app.website || app.instagram || app.portfolioLink,
          portfolioFiles: app.portfolioLink,
          rateCardFiles: app.rateCardLink,
          rateCardSummary: app.pricingType,
          certifications: app.certifications,
          yearsExperience: Number.isNaN(yearsExp) ? null : yearsExp,
          photoPermission: app.permMediaUse,
          verificationStatus: 'Pending',
          meetingStatus: 'Contacted',
          availability: 'Available',
        },
      });
      vendorId = created.id;
    }

    await prisma.vendorNote.create({ data: { vendorId, note } });
    const updated = await prisma.vendorApplication.update({
      where: { id },
      data: { status: 'Approved', vendorId, reviewedAt: new Date() },
    });

    await logActivity(
      'Partner Application Approved',
      `${app.appNumber} — ${app.companyName}${body.mergeVendorId ? ' (merged into existing vendor)' : ' (new vendor created)'}`,
      user.email || 'admin'
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Partner Application Update Error:', error);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}

// DELETE /api/partner-applications/:id — spam cleanup
export async function DELETE(request: Request, { params }: Params) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await prisma.vendorApplication.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
