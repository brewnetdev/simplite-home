import { useTranslations } from 'next-intl';
import SectionHead from '@/components/ui/SectionHead';
import styles from './DualEditorDemo.module.css';

export default function DualEditorDemo() {
  const t = useTranslations('markflow');

  return (
    <section id="dual">
      <div className="container">
        <SectionHead
          eyebrow={t('dual_eyebrow')}
          title={t.rich('dual_title', { accent: (chunks) => <span style={{ color: 'var(--green)' }}>{chunks}</span> })}
          aside={t('dual_aside')}
        />
        <div className={styles.dual}>
          <div className={styles.dualBar}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
            <div className={styles.tabs}>
              <span>H1 H2 H3</span><span>B I</span><span>⟨⟩ Σ</span><span>[ ]</span>
            </div>
          </div>
          <div className={styles.dualGrid}>
            <div className={`${styles.dualCol} ${styles.editor}`}>
              <pre style={{ margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                <span className={styles.mdH}># {t('demo_h1')}</span>{'\n\n'}
                <span className={styles.mdComment}>## {t('demo_h2_overview')}</span>{'\n\n'}
                {t('demo_body')}{'\n\n'}
                <span className={styles.mdComment}>## {t('demo_h2_features')}</span>{'\n\n'}
                - <span className={styles.mdLink}>[[{t('demo_feat1')}]]</span> {t('demo_feat1_suffix')}{'\n'}
                - {t('demo_feat2')}{'\n'}
                - LaTeX: $E = mc^2${'\n'}
                - <span className={styles.mdCode}>`{t('demo_feat3_code')}`</span> {t('demo_feat3_suffix')}{'\n\n'}
                <span className={styles.mdComment}>## {t('demo_h2_linked')}</span>{'\n\n'}
                {t('demo_prev_label')} ← <span className={styles.mdLink}>[[{t('demo_prev')}]]</span>{'\n'}
                {t('demo_next_label')} → <span className={styles.mdLink}>[[{t('demo_next')}]]</span>
              </pre>
            </div>
            <div className={`${styles.dualCol} ${styles.preview}`}>
              <h2>{t('demo_h1')}</h2>
              <h3>{t('demo_h2_overview')}</h3>
              <p>{t('demo_body')}</p>
              <h3>{t('demo_h2_features')}</h3>
              <ul>
                <li><a href="#">{t('demo_feat1')}</a> {t('demo_feat1_suffix')}</li>
                <li>{t('demo_feat2')}</li>
                <li>LaTeX: <span className={styles.math}>E = mc²</span></li>
                <li><code>{t('demo_feat3_code')}</code> {t('demo_feat3_suffix')}</li>
              </ul>
              <h3>{t('demo_h2_linked')}</h3>
              <p>{t('demo_prev_label')} ← <a href="#">{t('demo_prev')}</a><br />{t('demo_next_label')} → <a href="#">{t('demo_next')}</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
