import { useTranslations } from 'next-intl';
import SectionHead from '@/components/ui/SectionHead';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './FeatureGrid.module.css';

export default function FeatureGrid({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const items: Array<{ title: string; desc: string }> = t.raw('feat_items');

  return (
    <section className="dot-bg">
      <div className="container">
        <SectionHead eyebrow={t('feat_eyebrow')} title={t('feat_title')} />
        <div className={styles.featGrid}>
          {items.map((item, i) => (
            <ScrollReveal key={i} className={styles.featCard} delay={i * 60}>
              <div className={styles.ic}>{String(i + 1).padStart(2, '0')}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
