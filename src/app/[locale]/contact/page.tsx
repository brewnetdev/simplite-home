import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactHero from '@/components/contact/ContactHero';
import ContactTabs from '@/components/contact/ContactTabs';
import ExtraChannels from '@/components/contact/ExtraChannels';

const BASE_URL = 'https://simplite.net';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const ogLocale = locale === 'ko' ? 'ko_KR' : 'en_US';

  return {
    title: t('title'),
    description: t('desc'),
    keywords: [
      'Simplite 문의', '도입 상담', '기술 지원', '파트너십', '언론 문의',
      '온프레미스 설치형 업무 트래킹', '이슈트래커 도입', '마크다운 지식관리 시스템',
      'Simplite contact', 'sales inquiry', 'technical support',
      'On-premise Self-hosted Work Tracking', 'enterprise',
    ],
    openGraph: {
      title: t('title') + ' — Simplite.',
      description: t('desc'),
      url: `${BASE_URL}/${locale}/contact`,
      siteName: 'Simplite',
      locale: ogLocale,
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: t('title') + ' — Simplite.',
      description: t('desc'),
      images: [`${BASE_URL}/${locale}/contact/opengraph-image`],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        ko: `${BASE_URL}/ko/contact`,
        en: `${BASE_URL}/en/contact`,
        'x-default': `${BASE_URL}/ko/contact`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Simplite', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE_URL}/${locale}/contact` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ContactHero />
      <ContactTabs />
      <ExtraChannels />
    </>
  );
}
