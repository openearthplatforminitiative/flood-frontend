import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLang, languages } from '@/utils/dictionaries';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import withAuth, { NextRequestWithAuth } from 'next-auth/middleware';

function getBrowserLocale(request: NextRequest) {
  const languageHeader = request.headers.get('accept-language');
  if (!languageHeader) return defaultLocale;
  const headers = { 'accept-language': languageHeader };
  const browserlanguages = new Negotiator({ headers }).languages();
  return match(browserlanguages, languages, defaultLocale);
}

function isPublicPath(pathname: string, lang?: string): boolean {
  const publicPaths = [
    '/',
    ...(lang ? [`/${lang}/sign-in`, `/${lang}/token-expired`, `/${lang}`] : []),
  ];

  return publicPaths.includes(pathname) || pathname.startsWith('/assets');
}

export function middleware(request: NextRequestWithAuth) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api')) {
    return withAuth(request, {
      pages: {
        signIn: '/en/sign-in',
      },
    });
  }

  const pathnameLocale = languages.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If no language in path, redirect to default language
  if (!pathnameLocale) {
    const selectedLocale = request.cookies.get('language')?.value;
    const locale = isLang(selectedLocale)
      ? selectedLocale
      : getBrowserLocale(request);

    const newPathname =
      pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
    request.nextUrl.pathname = newPathname;
    return NextResponse.redirect(request.nextUrl);
  }

  if (isPublicPath(pathname, pathnameLocale)) {
    return NextResponse.next();
  }

  return withAuth(request, {
    pages: {
      signIn: `/${pathnameLocale}/sign-in`,
    },
  });
}

export const config = {
  // Middleware will be applied to all paths except those that contain _next, api, favicon.ico, manifest.json, service-worker.js, or start with assets/
  matcher: [
    '/((?!_next|favicon.ico|manifest.json|service-worker.js|assets).*)',
  ],
};
