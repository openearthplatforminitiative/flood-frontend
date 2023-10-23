import { NextRequest } from 'next/server';
import cookie from 'cookie';

export const locales = ['en', 'fr', 'kw'];
export let defaultLocale = 'en';

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Get the language from the cookies
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const locale = cookies.language || defaultLocale;

  // Redirect to the locale path
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|manifest.json).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
