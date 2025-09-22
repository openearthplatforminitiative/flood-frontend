import { NextRequest } from 'next/server';
import { defaultLocale, isLang, languages } from '@/app/[lang]/dictionaries';
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

function auth(request: NextRequestWithAuth, pathname: string, lang: string) {
  const allowedPaths = [
    `/${lang}/sign-in`,
    `/${lang}/token-expired`,
    `/${lang}`,
    '/',
  ];
  if (allowedPaths.includes(pathname)) {
    return;
  }
  return withAuth(request, {
    pages: {
      signIn: `/${lang}/sign-in`,
    },
  });
}

export function middleware(request: NextRequestWithAuth) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameLocale = languages.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameLocale) {
    const selectedLocale = request.cookies.get('language')?.value;
    if (isLang(selectedLocale)) {
      // If the user previously selected a language, redirect to that language
      request.nextUrl.pathname = `/${selectedLocale}/`;
      return Response.redirect(request.nextUrl);
    } else {
      // Redirect to the browser's preferred locale if supported, otherwise the default locale
      const locale = getBrowserLocale(request);
      request.nextUrl.pathname = `/${locale}/`;
      return Response.redirect(request.nextUrl);
    }
  }
  return auth(request, pathname, pathnameLocale);
}

export const config = {
  //middleware will be applied to all paths except those that contain _next, api, favicon.ico, manifest.json, or assets/*
  matcher: ['/((?!_next|api|favicon.ico|manifest.json|assets).*)'],
};
