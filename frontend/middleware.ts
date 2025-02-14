import { NextRequest } from 'next/server';
import { defaultLocale, isLang, languages } from '@/app/[lang]/dictionaries';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getBrowserLocale(request: NextRequest) {
  const languageHeader = request.headers.get('accept-language');
  if (!languageHeader) return defaultLocale;
  const headers = { 'accept-language': languageHeader };
  const browserlanguages = new Negotiator({ headers }).languages();
  return match(browserlanguages, languages, defaultLocale);
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

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

export const config = {
  //middleware will be applied to all paths except those that contain _next, api, favicon.ico, manifest.json, or assets/*
  matcher: ['/((?!_next|api|favicon.ico|manifest.json|assets).*)'],
};
