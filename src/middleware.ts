import createMiddleware from 'next-intl/middleware';
import type {NextRequest} from 'next/server';
import {routing} from './i18n/routing';
import {shouldNoindexArabicPath} from './lib/seo';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Run the next-intl middleware first (locale routing + the language switcher
  // both depend on this — do not bypass it).
  const response = intlMiddleware(request);

  // TEMPORARY Arabic SEO protection: untranslated `/ar/*` routes get a
  // `noindex, follow` directive via the X-Robots-Tag header. This is the single,
  // route-accurate enforcement point — promoting a route to "translated" is done
  // by editing TRANSLATED_AR_ROUTES in `@/lib/seo`, with no page edits required.
  if (shouldNoindexArabicPath(request.nextUrl.pathname)) {
    response.headers.set('X-Robots-Tag', 'noindex, follow');
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
