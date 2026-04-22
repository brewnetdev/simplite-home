import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './PhilosophySection.module.css';

export default function PhilosophySection() {
  const t = useTranslations('philosophy');

  return (
    <section>
      <div className="container">
        <div className={styles.philosophy}>
          <span className={`eyebrow ${styles.eyebrow}`}>{t('eyebrow')}</span>
          <h2 className={styles.h2}>{t('title')}</h2>
          <p className={styles.kr}>{t('description')}</p>
          <div className={styles.pillars}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <ScrollReveal key={n} className={styles.pillar} delay={n * 100}>
                <div className={styles.no}>{t(`pillar${n}_no`)}</div>
                <h4>{t(`pillar${n}_title`)}</h4>
                <p>{t(`pillar${n}_desc`)}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
