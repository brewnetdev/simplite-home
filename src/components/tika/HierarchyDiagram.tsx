import { useTranslations } from 'next-intl';
import styles from './HierarchyDiagram.module.css';

export default function HierarchyDiagram() {
  const t = useTranslations('tika');
  const hierRows = t.raw('hier_rows') as string[];
  const rows = [
    { cls: 'g', emoji: '🎯', label: 'Goal', desc: hierRows[0] },
    { cls: 's', emoji: '📘', label: 'Story', desc: hierRows[1] },
    { cls: 'f', emoji: '⚙️', label: 'Feature', desc: hierRows[2] },
    { cls: 't', emoji: '✓', label: 'Task', desc: hierRows[3] },
    { cls: 't', emoji: '✓', label: 'Task', desc: hierRows[4] },
    { cls: 'f', emoji: '⚙️', label: 'Feature', desc: hierRows[5] },
    { cls: 's', emoji: '📘', label: 'Story', desc: hierRows[6] },
  ];

  return (
    <section>
      <div className="container">
        <div className={styles.hier}>
          <div>
            <span className="eyebrow">{t('hier_eyebrow')}</span>
            <h3 style={{ marginTop: 12 }}>
              {t.rich('hier_title', { accent: (chunks) => <span style={{ color: 'var(--green)' }}>{chunks}</span> })}
            </h3>
            <p>{t('hier_desc')}</p>
          </div>
          <div className={styles.hierVis}>
            {rows.map((r, i) => (
              <div key={i} className={`${styles.hierRow} ${styles[r.cls]}`}>
                <span className={styles.pill}>{r.emoji} {r.label}</span>
                <span className={styles.cnt}>{r.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
