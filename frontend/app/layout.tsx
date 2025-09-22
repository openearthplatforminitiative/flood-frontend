import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Providers from '@/app/components/Providers';
import { Box } from '@mui/material';
import { Inter } from 'next/font/google';
import { getDictonaryWithDefault, languages } from './[lang]/dictionaries';
import './global.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictonaryWithDefault(lang);

  return {
    title: dict.title,
    description: dict.metadata.description,
  };
}

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});
export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictonaryWithDefault(lang);
  return (
    <html lang={lang} className={inter.className + ' h-min-full h-full'}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E9FFED" />
        <title>{dict.title}</title>
      </head>
      <body className="flex w-full h-full m-0 bg-neutralVariant-99">
        <Box sx={{ flexGrow: 1 }}>
          <Providers lang={lang}>
            {children}
          </Providers>
        </Box>
      </body>
    </html>
  );
}
