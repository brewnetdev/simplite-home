import { useTranslations } from 'next-intl';
import SectionHead from '@/components/ui/SectionHead';
import styles from './ConvertGrid.module.css';

const FORMATS = ['.docx', '.pptx', '.html', '.pdf'];

export default function ConvertGrid() {
  const t = useTranslations('markflow');

  return (
    <section>
      <div className="container">
        <SectionHead
          eyebrow={t('convert_eyebrow')}
          title={<>모든 포맷을 <span style={{ color: 'var(--green)' }}>Markdown</span>으로.</>}
          aside={t('convert_aside')}
        />
        <div className={styles.convert}>
          {FORMATS.map((ext) => (
            <div key={ext} className={styles.convCard}>
              <div className={styles.ext}>{ext}</div>
              <div className={styles.arrow}>→ convert →</div>
              <div className={styles.to}>Markdown</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
