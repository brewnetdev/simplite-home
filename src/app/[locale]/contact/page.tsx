import { getTranslations } from 'next-intl/server';
import ContactHero from '@/components/contact/ContactHero';
import ContactTabs from '@/components/contact/ContactTabs';
import ExtraChannels from '@/components/contact/ExtraChannels';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title') + ' — Simplite.',
    description: t('desc'),
  };
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactTabs />
      <ExtraChannels />
    </>
  );
}
