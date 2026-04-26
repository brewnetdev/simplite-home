import { useTranslations } from 'next-intl';
import Image from 'next/image';
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
        <div className={styles.featRow}>
          <span className="badge green">{t('dual_feat1')}</span>
          <span className="badge">{t('dual_feat2')}</span>
          <span className="badge">{t('dual_feat3')}</span>
          <span className="badge">{t('dual_feat4')}</span>
        </div>
        <p className={styles.tagline}>{t('dual_tagline')}</p>
        <div className={styles.shot}>
          <div className={styles.shotBar}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
            <div className={styles.url}>markflow · live preview</div>
          </div>
          <Image
            src="/assets/markflow-full.png"
            alt="MarkFlow dual editor live preview"
            width={3504}
            height={2032}
            sizes="(max-width: 1100px) 100vw, 1080px"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
}
