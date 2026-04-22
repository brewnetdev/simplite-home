import { getTranslations } from 'next-intl/server';
import MarkFlowHero from '@/components/markflow/MarkFlowHero';
import DualEditorDemo from '@/components/markflow/DualEditorDemo';
import DocumentMap from '@/components/markflow/DocumentMap';
import ConvertGrid from '@/components/markflow/ConvertGrid';
import FeatureGrid from '@/components/ui/FeatureGrid';
import ScreenshotGrid from '@/components/ui/ScreenshotGrid';
import FinalCta from '@/components/landing/FinalCta';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'markflow' });
  return {
    title: 'MarkFlow — Markdown Knowledge System · Simplite',
    description: t('sub'),
  };
}

export default function MarkFlowPage() {
  return (
    <>
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
