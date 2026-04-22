import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionHead from '@/components/ui/SectionHead';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './PricingSection.module.css';

export default function PricingSection() {
  const t = useTranslations('pricing');
  const free = {
    features: t.raw('free.features') as string[],
    off: t.raw('free.off') as string[],
  };
  const team = { features: t.raw('team.features') as string[] };
  const ent = { features: t.raw('enterprise.features') as string[] };

  return (
    <section id="pricing">
      <div className="container">
        <SectionHead
          eyebrow={t('eyebrow')}
          title={<>자유롭게 시작하고, <span style={{ color: 'var(--green)' }}>필요할 때</span> 확장하세요.</>}
          aside={t('aside')}
        />
        <div className={styles.priceGrid}>
          <ScrollReveal className={styles.plan}>
            <div className={styles.pname}>Free<span style={{ color: 'var(--rust)' }}>.</span></div>
            <div className={styles.ptier}>{t('free.tier')}</div>
            <div className={styles.pprice}>{t('free.price')}</div>
            <div className={styles.pnote}>{t('free.note')}</div>
            <ul>
              {free.features.map((f, i) => <li key={i}>{f}</li>)}
              {free.off.map((f, i) => <li key={`off-${i}`} className={styles.off}>{f}</li>)}
            </ul>
            <a href="https://github.com/claude-code-expert" target="_blank" rel="noopener noreferrer" className="btn btn-outline">{t('free.cta')}</a>
          </ScrollReveal>

          <ScrollReveal className={`${styles.plan} ${styles.feat}`} delay={100}>
            <div className={styles.pbadge}>{t('team.badge')}</div>
            <div className={styles.pname}>Team<span style={{ color: 'var(--rust)' }}>.</span></div>
            <div className={styles.ptier}>{t('team.tier')}</div>
            <div className={styles.pprice}>{t('team.price')} <small>{t('team.priceUnit')}</small></div>
            <div className={styles.pnote}>{t('team.note')}</div>
            <ul>
              {team.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <Link href="/contact" className="btn btn-primary">{t('team.cta')}</Link>
          </ScrollReveal>

          <ScrollReveal className={styles.plan} delay={200}>
            <div className={styles.pname}>Enterprise<span style={{ color: 'var(--rust)' }}>.</span></div>
            <div className={styles.ptier}>{t('enterprise.tier')}</div>
            <div className={styles.pprice}>{t('enterprise.price')}</div>
            <div className={styles.pnote}>{t('enterprise.note')}</div>
            <ul>
              {ent.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <Link href="/contact" className="btn btn-outline">{t('enterprise.cta')}</Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
