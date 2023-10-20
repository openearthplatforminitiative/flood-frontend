import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: PageProps;
}) {
  return (
    <html lang={lang}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#90cdf4" />
        <title>FloodSafe</title>
      </head>
      <body style={{ height: '100%', width: '100%', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
