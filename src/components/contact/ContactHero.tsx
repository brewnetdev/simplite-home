import { useTranslations } from 'next-intl';

export default function ContactHero() {
  const t = useTranslations('contact');
  return (
    <header style={{ padding: '80px 0 40px', textAlign: 'center' }}>
      <div className="container">
        <span className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>
          {t('eyebrow')}
        </span>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(48px, 6vw, 84px)',
          fontStyle: 'italic', color: 'var(--green)', margin: '18px 0 24px', lineHeight: 1.1
        }}>
          {t('title')}<span style={{ color: 'var(--rust)', fontStyle: 'normal' }}>?</span>
        </h1>
        <p style={{ fontSize: 17, color: 'var(--ink-soft)', maxWidth: 580, margin: '0 auto', lineHeight: 1.65 }}>
          {t('desc')}
        </p>
      </div>
    </header>
  );
}
