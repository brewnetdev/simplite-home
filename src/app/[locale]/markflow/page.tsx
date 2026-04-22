import { getTranslations } from 'next-intl/server';
import MarkFlowHero from '@/components/markflow/MarkFlowHero';
import DualEditorDemo from '@/components/markflow/DualEditorDemo';
import DocumentMap from '@/components/markflow/DocumentMap';
import ConvertGrid from '@/components/markflow/ConvertGrid';
import FeatureGrid from '@/components/ui/FeatureGrid';
import ScreenshotGrid from '@/components/ui/ScreenshotGrid';
import FinalCta from '@/components/landing/FinalCta';

const BASE_URL = 'https://simplite.net';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'markflow' });
  const ogLocale = locale === 'ko' ? 'ko_KR' : 'en_US';

  return {
    title: 'MarkFlow — Markdown Knowledge System · Simplite',
    description: t('sub'),
    keywords: [
      '마크다운 지식관리', '듀얼 에디터', '문서 관계맵', '지식 그래프',
      '마크다운 에디터', 'docx 변환', '문서 퍼블리시',
      'markdown editor', 'knowledge management', 'document graph',
    ],
    openGraph: {
      title: 'MarkFlow — Markdown Knowledge System · Simplite',
      description: t('sub'),
      url: `${BASE_URL}/${locale}/markflow`,
      siteName: 'Simplite',
      locale: ogLocale,
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: 'MarkFlow — Markdown Knowledge System · Simplite',
      description: t('sub'),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/markflow`,
      languages: { ko: `${BASE_URL}/ko/markflow`, en: `${BASE_URL}/en/markflow` },
    },
  };
}

export default function MarkFlowPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Simplite', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE_URL}/#products` },
      { '@type': 'ListItem', position: 3, name: 'MarkFlow', item: `${BASE_URL}/ko/markflow` },
    ],
  };

  const softwareLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MarkFlow',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Docker, Kubernetes',
    description: 'Markdown-based knowledge management system with dual editor and document relation map',
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
      <MarkFlowHero />
      <DualEditorDemo />
      <DocumentMap />
      <ConvertGrid />
      <FeatureGrid namespace="markflow" />
      <ScreenshotGrid
        shots={[
          { src: '/assets/mark-write.png', alt: 'MarkFlow Editor', name: 'Editor & Preview', tag: 'DUAL · LATEX · LINK' },
          { src: '/assets/mark-document-map.png', alt: 'Document Map', name: 'Document Map', tag: 'RELATION · GRAPH' },
        ]}
        namespace="markflow"
      />
      <FinalCta />
    </>
  );
}
