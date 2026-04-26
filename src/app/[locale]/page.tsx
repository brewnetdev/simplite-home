import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/landing/HeroSection';
import LogoStrip from '@/components/landing/LogoStrip';
import PhilosophySection from '@/components/landing/PhilosophySection';
import ProductShowcase from '@/components/landing/ProductShowcase';
import WhySection from '@/components/landing/WhySection';
import EnterpriseSection from '@/components/landing/EnterpriseSection';
import PricingSection from '@/components/landing/PricingSection';
import FaqSection from '@/components/landing/FaqSection';
import RoadmapSection from '@/components/landing/RoadmapSection';

const BASE_URL = 'https://simplite.net';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  const ogLocale = locale === 'ko' ? 'ko_KR' : 'en_US';

  return {
    title: 'Simplite. — ' + t('subtitle'),
    description: t('description'),
    keywords: [
      '마크다운 에디터', '이슈트래커', 'Jira 대체', '온프레미스 설치형 업무 트래킹',
      '마크다운 지식관리 시스템', '칸반보드', '티켓관리', '오픈소스 업무도구',
      'MCP AI', '온프레미스', '계층형 티켓', '드래그앤드롭 칸반',
      '듀얼 에디터', '문서 관계맵', 'AI 자동화', 'SSO RBAC', 'Apache 2.0',
      'Markdown Editor', 'Issue Tracker', 'Jira Alternative',
      'On-premise Self-hosted Work Tracking', 'Markdown Knowledge Management System',
      'kanban board', 'ticket management', 'markdown knowledge', 'open source',
    ],
    openGraph: {
      title: 'Simplite. — ' + t('subtitle'),
      description: t('description'),
      url: `${BASE_URL}/${locale}`,
      siteName: 'Simplite',
      locale: ogLocale,
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: 'Simplite. — ' + t('subtitle'),
      description: t('description'),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: { ko: `${BASE_URL}/ko`, en: `${BASE_URL}/en` },
    },
  };
}

export default async function HomePage() {
  const t = await getTranslations('faq');

  const faqItems = [];
  for (let i = 0; i < 6; i++) {
    faqItems.push({
      '@type': 'Question',
      name: t(`items.${i}.q`),
      acceptedAnswer: { '@type': 'Answer', text: t(`items.${i}.a`) },
    });
  }

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Simplite',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/simplite-logo-nav.svg`,
    description: 'Open-source knowledge & task management suite — Tika + MarkFlow',
  };

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Simplite',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationLd, websiteLd, faqLd]) }}
      />
      <HeroSection />
      <LogoStrip />
      <PhilosophySection />
      <ProductShowcase />
      <WhySection />
      <EnterpriseSection />
      <PricingSection />
      <FaqSection />
      <RoadmapSection />
    </>
  );
}
