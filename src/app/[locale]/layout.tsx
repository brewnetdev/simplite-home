import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { routing } from '@/i18n/routing';
import { jetbrainsMono } from '@/lib/fonts';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://simplite.net'),
  title: {
    template: '%s · Simplite',
    default: 'Simplite — 쉽게 쓰고, 효율적으로 해내다',
  },
  applicationName: 'Simplite',
  authors: [{ name: 'Simplite Team', url: 'https://simplite.net' }],
  creator: 'Simplite Team',
  publisher: 'Simplite',
  generator: 'Next.js',
  category: 'technology',
  icons: {
    icon: [
      { url: '/assets/simplite-favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon-64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [{ url: '/assets/favicon-192.png', sizes: '192x192', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a3a2e',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ko' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={jetbrainsMono.variable}>
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          {locale === 'ko' ? '본문으로 건너뛰기' : 'Skip to content'}
        </a>
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
