import type { Metadata } from 'next';
import { ReactNode } from 'react';
import ThemeRegistry from '@/app/components/ThemeRegistry';
import { Box } from '@mui/material';
import { Inter } from 'next/font/google';
import { getDictonaryWithDefault, languages } from './dictionaries';

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
    <html lang={lang} className={inter.className}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#90cdf4" />
        <title>{dict.title}</title>
      </head>
      <body
        style={{
          display: 'flex',
          minHeight: '100vh',
          width: '100%',
          margin: 0,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
        </Box>
      </body>
    </html>
  );
}
