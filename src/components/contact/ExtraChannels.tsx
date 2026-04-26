import { useTranslations } from 'next-intl';
import SectionHead from '@/components/ui/SectionHead';
import styles from './ExtraChannels.module.css';

export default function ExtraChannels() {
  const t = useTranslations('contact');

  const channels = [
    { key: 'partnership', email: 'brewnet.dev@gmail.com' },
    { key: 'press', email: 'brewnet.dev@gmail.com' },
    { key: 'security', email: 'brewnet.dev@gmail.com' },
  ] as const;

  return (
    <section className={styles.extra}>
      <div className="container">
        <SectionHead eyebrow={t('extra_eyebrow')} title={t('extra_title')} />
        <div className={styles.extraGrid}>
          {channels.map((ch) => (
            <div key={ch.key} className={styles.extraCard}>
              <h4>{t(`${ch.key}.title`)}</h4>
              <p>{t(`${ch.key}.desc`)}</p>
              <a href={`mailto:${ch.email}`}>{ch.email} →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
