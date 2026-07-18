import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ─────────────────────────────────────────────────────────────────────────────
// /api/partner-applications/upload-url
// POST — PUBLIC: issues a one-time signed upload URL so the onboarding form can
// upload files DIRECTLY to Supabase Storage (bypasses Vercel's 4.5MB body cap —
// vendor profile PDFs run 15–20MB). The bucket is PRIVATE: files are only
// readable through the admin-guarded /api/partner-applications/file-url route,
// because rate cards are confidential business data (non-circumvention).
// Requires SUPABASE_SERVICE_ROLE_KEY (server-only env — never NEXT_PUBLIC).
// ─────────────────────────────────────────────────────────────────────────────

const BUCKET = 'vendor-files';

// Per-field rules: extension whitelist + max size (bytes).
const KINDS: Record<string, { exts: string[]; maxBytes: number }> = {
  profile: { exts: ['pdf'], maxBytes: 25 * 1024 * 1024 },
  ratecard: { exts: ['pdf', 'png', 'jpg', 'jpeg', 'webp'], maxBytes: 25 * 1024 * 1024 },
  logo: { exts: ['png', 'jpg', 'jpeg', 'webp', 'svg'], maxBytes: 5 * 1024 * 1024 },
  portfolio: { exts: ['pdf', 'zip', 'png', 'jpg', 'jpeg', 'webp'], maxBytes: 25 * 1024 * 1024 },
};

// Best-effort rate limit (per serverless instance): max 12 upload URLs/hour/IP —
// enough for one application (4 file fields) with retries, cheap to abuse-proof.
const issueLog = new Map<string, number[]>();
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 12;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (issueLog.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) return true;
  recent.push(now);
  issueLog.set(ip, recent);
  return false;
}

let bucketReady = false;

export async function POST(request: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
      // Graceful degrade — the form falls back to link-only when uploads are off.
      return NextResponse.json({ error: 'Uploads are not configured' }, { status: 503 });
    }

    const body = await request.json();
    // Honeypot mirror of the main form — bots get a dead-end fake success.
    if (body.companyUrl) {
      return NextResponse.json({ error: 'Uploads are not configured' }, { status: 503 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many uploads. Please try again later or share a link instead.' },
        { status: 429 }
      );
    }

    const kind = KINDS[String(body.kind)];
    const filename = typeof body.filename === 'string' ? body.filename : '';
    const size = Number(body.size) || 0;
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    if (!kind) return NextResponse.json({ error: 'Unknown file field' }, { status: 400 });
    if (!kind.exts.includes(ext)) {
      return NextResponse.json(
        { error: `Allowed file types: ${kind.exts.join(', ').toUpperCase()}` },
        { status: 400 }
      );
    }
    if (size <= 0 || size > kind.maxBytes) {
      return NextResponse.json(
        { error: `File too large — max ${Math.round(kind.maxBytes / 1024 / 1024)}MB. Larger files: share a Drive/Dropbox link.` },
        { status: 400 }
      );
    }

    const supabase = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // One-time bucket setup (private). Safe to race — "already exists" is fine.
    if (!bucketReady) {
      const { error } = await supabase.storage.createBucket(BUCKET, { public: false });
      if (error && !/already exists/i.test(error.message)) throw error;
      bucketReady = true;
    }

    const safeName = filename
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(-80);
    const path = `applications/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;

    const { data, error } = await supabase.storage.from(BUCKET).createSignedUploadUrl(path);
    if (error) throw error;

    return NextResponse.json({ bucket: BUCKET, path: data.path, token: data.token });
  } catch (error) {
    console.error('Upload URL Error:', error);
    return NextResponse.json({ error: 'Failed to prepare upload' }, { status: 500 });
  }
}
