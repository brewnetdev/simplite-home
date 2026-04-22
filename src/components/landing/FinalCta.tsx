import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './FinalCta.module.css';

export default function FinalCta() {
  const t = useTranslations('finalCta');

  return (
    <section className={styles.final}>
      <div className="container">
        <span className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>
          {t('eyebrow')}
        </span>
        <h2 style={{ marginTop: 20 }}>
          Simply manage<br />your <em>knowledge</em> and <em>tasks</em>.
        </h2>
        <p>{t('desc')}</p>
        <div className={styles.finalCtas}>
          <a href="https://github.com/claude-code-expert" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            {t('cta_github')}
          </a>
          <Link href="/contact" className="btn btn-outline">
            {t('cta_contact')}
          </Link>
        </div>
      </div>
    </section>
  );
}
