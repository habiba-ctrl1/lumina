import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from '@/lib/api-auth';

// ─────────────────────────────────────────────────────────────────────────────
// /api/partner-applications/file-url
// GET — ADMIN ONLY: turns a private-bucket storage path (stored in an
// application's link fields as "supabase://vendor-files/<path>") into a
// short-lived signed download URL. The bucket must stay private — uploaded
// rate cards are confidential vendor business data.
// ─────────────────────────────────────────────────────────────────────────────

const BUCKET = 'vendor-files';

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
      return NextResponse.json({ error: 'Uploads are not configured' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    // Accept both the raw storage path and the "supabase://bucket/path" form.
    const raw = searchParams.get('path') || '';
    const path = raw.replace(`supabase://${BUCKET}/`, '');
    if (!path || path.includes('..')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const supabase = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60 * 60);
    if (error) throw error;

    return NextResponse.json({ url: data.signedUrl });
  } catch (error) {
    console.error('File URL Error:', error);
    return NextResponse.json({ error: 'Failed to open file' }, { status: 500 });
  }
}
