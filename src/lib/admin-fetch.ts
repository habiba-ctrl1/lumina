import { supabase } from './supabase';

/**
 * fetch() wrapper for admin pages — attaches the logged-in admin's Supabase
 * access token so protected API routes (guarded by requireAdmin) accept the call.
 */
export async function adminFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const headers = new Headers(init.headers);
  if (session?.access_token) {
    headers.set('Authorization', `Bearer ${session.access_token}`);
  }
  return fetch(input, { ...init, headers });
}
