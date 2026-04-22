import { useTranslations } from 'next-intl';
import SectionHead from '@/components/ui/SectionHead';
import styles from './RoadmapSection.module.css';

export default function RoadmapSection() {
  const t = useTranslations('roadmap');
  const items: Array<{
    status: 'done' | 'progress' | 'planned';
    tag: string;
    title: string;
    desc: string;
  }> = t.raw('items');

  return (
    <section id="roadmap">
      <div className="container">
        <SectionHead
          eyebrow={t('eyebrow')}
          title={t('title')}
          center
        />
        <p style={{ textAlign: 'center', color: 'var(--ink-muted)', fontSize: 17, lineHeight: 1.7, marginTop: -40, marginBottom: 64 }}>
          {t('description')}
        </p>
        <div className={styles.track}>
          {items.map((item, i) => (
            <div key={i} className={`${styles.item} ${styles[item.status]}`}>
              {i % 2 === 0 ? (
                <>
                  <div className={styles.content}>
                    <span className={`${styles.tag} ${styles[`tag_${item.status}`]}`}>{item.tag}</span>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <div className={styles.marker} />
                  <div />
                </>
              ) : (
                <>
                  <div />
                  <div className={styles.marker} />
                  <div className={styles.content}>
                    <span className={`${styles.tag} ${styles[`tag_${item.status}`]}`}>{item.tag}</span>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
