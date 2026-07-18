import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// ─────────────────────────────────────────────────────────────────────────────
// /api/keepalive — hit daily by Vercel Cron (see vercel.json).
// Supabase free tier pauses projects after 7 days without database activity,
// and a paused project does NOT wake on request — vendor form submissions
// would fail until someone resumes it in the dashboard. One trivial query a
// day keeps the inactivity counter from ever reaching 7 days.
// Returns no data — safe to leave public.
// ─────────────────────────────────────────────────────────────────────────────

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true });
  } catch {
    // Don't leak DB details — the cron log status code is all that's needed.
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
