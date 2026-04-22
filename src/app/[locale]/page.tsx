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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  return {
    title: 'Simplite. — ' + t('subtitle'),
    description: t('description'),
    openGraph: {
      title: 'Simplite.',
      description: t('description'),
    },
  };
}

export default function HomePage() {
  return (
    <>
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
