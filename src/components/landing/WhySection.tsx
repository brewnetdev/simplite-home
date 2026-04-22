import { useTranslations } from 'next-intl';
import SectionHead from '@/components/ui/SectionHead';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './WhySection.module.css';

export default function WhySection() {
  const t = useTranslations('why');

  const problems = [
    { no: t('p1_no'), bad: t('p1_bad'), good: t('p1_good') },
    { no: t('p2_no'), bad: t('p2_bad'), good: t('p2_good') },
    { no: t('p3_no'), bad: t('p3_bad'), good: t('p3_good') },
  ];

  return (
    <section id="why" className="dot-bg">
      <div className="container">
        <SectionHead
          eyebrow={t('eyebrow')}
          title={<>우리가 <span style={{ color: 'var(--rust)' }}>해결한</span> 불편들.</>}
          aside={t('aside')}
        />
        <div className={styles.whyGrid}>
          {problems.map((p, i) => (
            <ScrollReveal key={i} className={styles.problem} delay={i * 100}>
              <div className={styles.no}>{p.no}</div>
              <div className={styles.bad}>{p.bad}</div>
              <div className={styles.arrow}>→ SIMPLITE ANSWER</div>
              <div className={styles.good}>{p.good}</div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
