import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ marginBottom: 14 }}>
              <Image src="/assets/simplite-logo-nav.svg" alt="Simplite" width={360} height={100} style={{ height: 32, width: 'auto' }} />
            </div>
            <p style={{ fontSize: 13, maxWidth: 320, lineHeight: 1.6, color: 'var(--ink-muted)' }}>
              {t('desc')}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                marginTop: 18,
                color: 'var(--ink-faint)',
                letterSpacing: '0.1em',
              }}
            >
              {t('est')}
            </p>
          </div>
          <div>
            <h4>{t('products')}</h4>
            <ul>
              <li><Link href="/tika">Tika</Link></li>
              <li><Link href="/markflow">MarkFlow</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
              <li><Link href="/#enterprise">Enterprise</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t('resources')}</h4>
            <ul>
              <li>
                <a href="https://github.com/claude-code-expert/tika" target="_blank" rel="noopener noreferrer">
                  Tika GitHub
                </a>
              </li>
              <li>
                <a href="https://github.com/claude-code-expert/markflow" target="_blank" rel="noopener noreferrer">
                  MarkFlow GitHub
                </a>
              </li>
              <li><Link href="/#faq">FAQ</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t('contact')}</h4>
            <ul>
              <li><a href="mailto:brewnet.dev@gmail.com">brewnet.dev@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-meta">
          <span>{t('copyright')}</span>
          <span>{t('tagline')}</span>
        </div>
      </div>
    </footer>
  );
}
