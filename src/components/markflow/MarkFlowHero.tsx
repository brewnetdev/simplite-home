import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import styles from './MarkFlowHero.module.css';

export default function MarkFlowHero() {
  const t = useTranslations('markflow');

  return (
    <header className={styles.phero}>
      <div className="container">
        <div className={styles.crumb}>
          <Link href="/" style={{ color: 'var(--green)' }}>SIMPLITE</Link> / PRODUCTS / <span style={{ color: 'var(--green)' }}>MARKFLOW</span>
        </div>
        <div className={styles.pheroInner}>
          <div>
            <a href="https://markflow-web.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="MarkFlow website">
              <Image src="/assets/markflow-logo-transparent.png" alt="MarkFlow" width={278} height={114} className={styles.logo} priority />
            </a>
            <div className="badge green" style={{ marginBottom: 16 }}>{t('badge')}</div>
            <h1 className={styles.h1}>
              Write in <em>Markdown</em>.<br />Think in <em>Context</em>.
            </h1>
            <p className={styles.sub}>{t('sub')}</p>
            <div className={styles.metaRow}>
              <span className="badge green">Apache 2.0</span>
              <span className="badge">Dual Editor</span>
              <span className="badge">LaTeX · Code</span>
              <span className="badge">Cloudflare Workers</span>
            </div>
            <div className={styles.ctas}>
              <a href="https://github.com/claude-code-expert/markflow" target="_blank" rel="noopener noreferrer" className="btn btn-primary">{t('hero_cta_github')}</a>
              <a href="https://markflow-web.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">{t('hero_cta_preview')}</a>
            </div>
          </div>
          <div className="win">
            <div className="win-bar">
              <div className="dot-r" /><div className="dot-y" /><div className="dot-g" />
              <div className="url">markflow-web.vercel.app</div>
            </div>
            <Image src="/assets/mark-landing.png" alt="MarkFlow landing" width={1200} height={800} style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '3380 / 2610', objectFit: 'cover', objectPosition: 'top center' }} />
          </div>
        </div>
      </div>
    </header>
  );
}
