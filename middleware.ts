import { NextRequest } from 'next/server';
import cookie from 'cookie';

export const locales = ['en', 'fr', 'kw'];
const defaultLocale = 'en';

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
  //middleware will be applied to all paths except those that contain _next, api, favicon.ico, or manifest.json
  matcher: ['/((?!_next|api|favicon.ico|manifest.json).*)'],
};
