import { useTranslations } from 'next-intl';
import SectionHead from '@/components/ui/SectionHead';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './EnterpriseSection.module.css';

const ICONS = [
  <svg key="0" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M8 4v16"/></svg>,
  <svg key="1" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></svg>,
  <svg key="2" viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>,
  <svg key="3" viewBox="0 0 24 24"><path d="M4 7v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-7l-2-2H6a2 2 0 00-2 2z"/></svg>,
  <svg key="4" viewBox="0 0 24 24"><path d="M3 12l3-7 3 5 3-9 3 11 3-3 3 3"/></svg>,
  <svg key="5" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h6v6H9z"/></svg>,
];

export default function EnterpriseSection() {
  const t = useTranslations('enterprise');
  const items: Array<{title: string; desc: string}> = t.raw('items');

  return (
    <section id="enterprise">
      <div className="container">
        <div className={styles.ent}>
          <div className={styles.entHead}>
            <div>
              <span className={`eyebrow ${styles.eyebrow}`}>{t('eyebrow')}</span>
              <h2 style={{ marginTop: 16, color: '#fff' }}>
                설치형으로, <em style={{ color: 'var(--sand)', fontStyle: 'italic' }}>당신의 환경</em>에.
              </h2>
            </div>
            <p className={styles.desc}>{t('desc')}</p>
          </div>
          <div className={styles.entGrid}>
            {items.map((item, i) => (
              <ScrollReveal key={i} className={styles.entCell} delay={i * 80}>
                <div className={styles.icn}>{ICONS[i]}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
