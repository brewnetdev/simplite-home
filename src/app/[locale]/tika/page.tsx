import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TikaHero from '@/components/tika/TikaHero';
import KanbanDemo from '@/components/tika/KanbanDemo';
import HierarchyDiagram from '@/components/tika/HierarchyDiagram';
import FeatureGrid from '@/components/ui/FeatureGrid';
import ScreenshotGrid from '@/components/ui/ScreenshotGrid';
import FinalCta from '@/components/landing/FinalCta';

const BASE_URL = 'https://simplite.net';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tika' });
  const ogLocale = locale === 'ko' ? 'ko_KR' : 'en_US';

  return {
    title: 'Tika — Ticket-based Kanban · Simplite',
    description: t('sub'),
    keywords: [
      '이슈트래커', 'Jira 대체', '온프레미스 설치형 업무 트래킹',
      '칸반보드', '티켓관리', '계층형 티켓', '드래그앤드롭 칸반',
      'Goal Story Feature Task', '번다운 차트', '워크로드', 'WBS 간트',
      'Issue Tracker', 'Jira Alternative', 'On-premise Self-hosted Work Tracking',
      'kanban board', 'ticket management', 'project management',
    ],
    openGraph: {
      title: 'Tika — Ticket-based Kanban · Simplite',
      description: t('sub'),
      url: `${BASE_URL}/${locale}/tika`,
      siteName: 'Simplite',
      locale: ogLocale,
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: 'Tika — Ticket-based Kanban · Simplite',
      description: t('sub'),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/tika`,
      languages: { ko: `${BASE_URL}/ko/tika`, en: `${BASE_URL}/en/tika` },
    },
  };
}

export default function TikaPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Simplite', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE_URL}/#products` },
      { '@type': 'ListItem', position: 3, name: 'Tika', item: `${BASE_URL}/ko/tika` },
    ],
  };

  const softwareLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Tika',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Docker, Kubernetes',
    description: 'Ticket-based kanban board with hierarchical Goal→Story→Feature→Task structure',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
      description: 'Apache 2.0 Open Source — Free forever',
    },
    author: { '@type': 'Organization', name: 'Simplite', url: BASE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbLd, softwareLd]) }}
      />
      <TikaHero />
      <KanbanDemo />
      <HierarchyDiagram />
      <FeatureGrid namespace="tika" />
      <ScreenshotGrid
        shots={[
          { src: '/assets/tika-board.png', alt: 'Tika Kanban Board', name: 'Kanban Board', tag: 'DRAG · FILTER · SEARCH' },
          { src: '/assets/tika-dashboard.png', alt: 'Tika Dashboard', name: 'Team Dashboard', tag: 'BURNDOWN · WORKLOAD · GOALS' },
        ]}
        namespace="tika"
      />
      <FinalCta />
    </>
  );
}
