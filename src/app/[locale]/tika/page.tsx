import { getTranslations } from 'next-intl/server';
import TikaHero from '@/components/tika/TikaHero';
import KanbanDemo from '@/components/tika/KanbanDemo';
import HierarchyDiagram from '@/components/tika/HierarchyDiagram';
import FeatureGrid from '@/components/ui/FeatureGrid';
import ScreenshotGrid from '@/components/ui/ScreenshotGrid';
import FinalCta from '@/components/landing/FinalCta';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tika' });
  return {
    title: 'Tika — Ticket-based Kanban · Simplite',
    description: t('sub'),
  };
}

export default function TikaPage() {
  return (
    <>
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
