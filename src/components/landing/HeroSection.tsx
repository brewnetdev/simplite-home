import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.heroInner}>
          <div className="reveal in">
            <span className="eyebrow">{t('eyebrow')}</span>
            <h1 className={styles.h1}>
              <span className={styles.em}>{t('title1')}</span>
              <br />
              {t('title2')}
              <br />
              {t('title3')}
            </h1>
            <p className={styles.heroSub}>
              {t('description')}
            </p>
            <div className={styles.heroCtas}>
              <Link href="/#products" className="btn btn-primary">
                {t('cta_products')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                {t('cta_contact')}
              </Link>
            </div>
            <div className={styles.heroMeta}>
              <span>
                <span className={styles.pulse} />
                {t('meta_oss')}
              </span>
              <span>{t('meta_mcp')}</span>
              <span>{t('meta_onprem')}</span>
            </div>
          </div>

          <div className={`${styles.heroStack} reveal in`}>
            <div className={`${styles.heroCard} ${styles.tika}`}>
              <Image src="/assets/tika-landing.png" alt="Tika landing" width={1200} height={800} style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div className={styles.cap}>TIKA · Plan Simply. Ship Boldly.</div>
            </div>
            <div className={`${styles.heroCard} ${styles.mark}`}>
              <Image src="/assets/mark-document-map.png" alt="MarkFlow document map" width={1200} height={800} style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div className={styles.cap}>MARKFLOW · Markdown Knowledge</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
