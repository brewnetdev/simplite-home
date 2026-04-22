import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import SectionHead from '@/components/ui/SectionHead';
import styles from './ProductShowcase.module.css';

export default function ProductShowcase() {
  const t = useTranslations('products');

  return (
    <section id="products" style={{ paddingTop: 40 }}>
      <div className="container">
        <SectionHead
          eyebrow={t('eyebrow')}
          title={<>{t.rich('title', { accent: (chunks) => <span style={{ color: 'var(--green)' }}>{chunks}</span> })}<br />{t('titleSuffix')}</>}
          aside={t('aside')}
        />

        {/* TIKA */}
        <div className={styles.product}>
          <div className={styles.productCopy}>
            <div className={styles.productMark}>
              <div className={`${styles.glyph} ${styles.glyphTika}`}>T</div>
              <div>
                <div className={styles.name}>Tika<span style={{ color: 'var(--rust)' }}>.</span> <span className={styles.nameSub}>Ticket Based Kanbanboard</span></div>
                <div className={styles.tag}>{t('tika.tag')}</div>
              </div>
            </div>
            <div className={styles.ptitle}>
              {t.rich('tika.title', { em: (chunks) => <em>{chunks}</em> })}
            </div>
            <p className={styles.pdesc}>{t('tika.desc')}</p>
            <ul className={styles.plist}>
              {(['board', 'hierarchy', 'team', 'notify', 'auth'] as const).map((key) => (
                <li key={key}>
                  <span className={styles.k}>{key.toUpperCase()}</span>
                  <span><strong>{t(`tika.${key}`)}</strong> · {t(`tika.${key}Desc`)}</span>
                </li>
              ))}
            </ul>
            <div className={styles.pcta}>
              <Link href="/tika" className="btn btn-primary">{t('tika.cta')}</Link>
              <a href="https://github.com/claude-code-expert/tika" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">GitHub</a>
            </div>
          </div>
          <div className={styles.productVisual}>
            <div className={styles.accent} />
            <div className="win" style={{ transform: 'rotate(-1deg)', transition: 'transform .4s' }}>
              <div className="win-bar">
                <div className="dot-r" /><div className="dot-y" /><div className="dot-g" />
                <div className="url">tika-app.vercel.app</div>
              </div>
              <Image src="/assets/tika-board.png" alt="Tika Kanban Board" width={1200} height={800} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </div>

        {/* MARKFLOW */}
        <div className={`${styles.product} ${styles.reverse}`} style={{ marginTop: 120 }}>
          <div className={styles.productCopy}>
            <div className={styles.productMark}>
              <div className={`${styles.glyph} ${styles.glyphMark}`}>M</div>
              <div>
                <div className={styles.name}>MarkFlow<span style={{ color: 'var(--rust)' }}>.</span> <span className={styles.nameSub}>Markdown Knowledge System</span></div>
                <div className={styles.tag}>{t('markflow.tag')}</div>
              </div>
            </div>
            <div className={styles.ptitle}>
              {t.rich('markflow.title', { em: (chunks) => <em>{chunks}</em> })}
            </div>
            <p className={styles.pdesc}>{t('markflow.desc')}</p>
            <ul className={styles.plist}>
              {(['editor', 'convert', 'graph', 'publish', 'ai'] as const).map((key) => (
                <li key={key}>
                  <span className={styles.k}>{key.toUpperCase()}</span>
                  <span><strong>{t(`markflow.${key}`)}</strong> · {t(`markflow.${key}Desc`)}</span>
                </li>
              ))}
            </ul>
            <div className={styles.pcta}>
              <Link href="/markflow" className="btn btn-primary">{t('markflow.cta')}</Link>
              <a href="https://github.com/claude-code-expert/markflow" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">GitHub</a>
            </div>
          </div>
          <div className={styles.productVisual}>
            <div className={`${styles.accent} ${styles.accentReverse}`} />
            <div className="win" style={{ transform: 'rotate(1deg)', transition: 'transform .4s' }}>
              <div className="win-bar">
                <div className="dot-r" /><div className="dot-y" /><div className="dot-g" />
                <div className="url">localhost</div>
              </div>
              <Image src="/assets/mark-write.png" alt="MarkFlow Editor" width={1200} height={800} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
