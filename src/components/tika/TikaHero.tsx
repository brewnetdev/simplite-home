import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import styles from './TikaHero.module.css';

export default function TikaHero() {
  const t = useTranslations('tika');

  return (
    <header className={styles.phero}>
      <div className="container">
        <div className={styles.crumb}>
          <Link href="/" style={{ color: 'var(--green)' }}>SIMPLITE</Link> / PRODUCTS / <span style={{ color: 'var(--green)' }}>TIKA</span>
        </div>
        <div className={styles.pheroInner}>
          <div>
            <div className={styles.glyph}>T</div>
            <div className="badge green" style={{ marginBottom: 16 }}>{t('badge')}</div>
            <h1 className={styles.h1}>
              Plan <em>Simply</em>.<br />Ship <em>Boldly</em>.
            </h1>
            <p className={styles.sub}>{t('sub')}</p>
            <div className={styles.metaRow}>
              <span className="badge green">Apache 2.0</span>
              <span className="badge">Next.js + NextAuth v5</span>
              <span className="badge">MCP Native</span>
              <span className="badge">Slack · Telegram</span>
            </div>
            <div className={styles.ctas}>
              <a href="https://github.com/claude-code-expert/tika" target="_blank" rel="noopener noreferrer" className="btn btn-primary">GitHub에서 보기 →</a>
              <a href="https://tika-app.vercel.app" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">라이브 데모</a>
            </div>
          </div>
          <div className="win">
            <div className="win-bar">
              <div className="dot-r" /><div className="dot-y" /><div className="dot-g" />
              <div className="url">tika-app.vercel.app</div>
            </div>
            <Image src="/assets/tika-landing.png" alt="Tika landing" width={1200} height={800} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </div>
    </header>
  );
}
