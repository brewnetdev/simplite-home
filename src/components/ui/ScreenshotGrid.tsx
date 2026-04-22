import { useTranslations } from 'next-intl';
import Image from 'next/image';
import SectionHead from '@/components/ui/SectionHead';
import styles from './ScreenshotGrid.module.css';

interface Shot {
  src: string;
  alt: string;
  name: string;
  tag: string;
}

export default function ScreenshotGrid({ shots, namespace }: { shots: Shot[]; namespace: string }) {
  const t = useTranslations(namespace);

  return (
    <section>
      <div className="container">
        <SectionHead eyebrow={t('shots_eyebrow')} title={t('shots_title')} />
        <div className={styles.shots}>
          {shots.map((shot, i) => (
            <div key={i} className={styles.shotCard}>
              <Image src={shot.src} alt={shot.alt} width={1200} height={800} style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div className={styles.cap}>
                <span className={styles.name}>{shot.name}</span>
                <span className={styles.tag}>{shot.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
