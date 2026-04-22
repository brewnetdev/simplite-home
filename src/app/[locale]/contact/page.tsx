import { getTranslations } from 'next-intl/server';
import ContactHero from '@/components/contact/ContactHero';
import ContactTabs from '@/components/contact/ContactTabs';
import ExtraChannels from '@/components/contact/ExtraChannels';

const BASE_URL = 'https://simplite.net';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const ogLocale = locale === 'ko' ? 'ko_KR' : 'en_US';

  return {
    title: t('title') + ' — Simplite.',
    description: t('desc'),
    keywords: ['Simplite 문의', '도입 상담', '기술 지원', 'contact', 'enterprise'],
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
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: { ko: `${BASE_URL}/ko/contact`, en: `${BASE_URL}/en/contact` },
    },
  };
}

export default function ContactPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Simplite', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE_URL}/ko/contact` },
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
