import type { Metadata } from 'next';
import { ReactNode } from 'react';
import ThemeRegistry from '@/app/components/ThemeRegistry';
import { Box } from '@mui/material';
import { Inter } from 'next/font/google';
import { getDictonaryWithDefault, languages } from './dictionaries';
import './global.css';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}): Promise<Metadata> {
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
export default function RootLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  const dict = getDictonaryWithDefault(lang);
  return (
    <html lang={lang} className={inter.className + ' h-min-full h-full'}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#E9FFED" />
        <title>{dict.title}</title>
      </head>
      <body className="flex w-full h-full m-0 bg-[#FBFDF8]">
        <Box sx={{ flexGrow: 1 }}>
          <ThemeRegistry lang={lang} options={{ key: 'mui' }}>{children}</ThemeRegistry>
        </Box>
      </body>
    </html>
  );
}
