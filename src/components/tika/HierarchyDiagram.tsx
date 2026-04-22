import { useTranslations } from 'next-intl';
import styles from './HierarchyDiagram.module.css';

export default function HierarchyDiagram() {
  const t = useTranslations('tika');
  const rows = [
    { cls: 'g', emoji: '🎯', label: 'Goal', desc: '· Q2 MVP 출시' },
    { cls: 's', emoji: '📘', label: 'Story', desc: '· 사용자 인증' },
    { cls: 'f', emoji: '⚙️', label: 'Feature', desc: '· OAuth 연동' },
    { cls: 't', emoji: '✓', label: 'Task', desc: '· Google 로그인' },
    { cls: 't', emoji: '✓', label: 'Task', desc: '· 세션 관리' },
    { cls: 'f', emoji: '⚙️', label: 'Feature', desc: '· 워크스페이스 온보딩' },
    { cls: 's', emoji: '📘', label: 'Story', desc: '· 팀 협업 흐름' },
  ];

  return (
    <section>
      <div className="container">
        <div className={styles.hier}>
          <div>
            <span className="eyebrow">{t('hier_eyebrow')}</span>
            <h3 style={{ marginTop: 12 }}>
              Goal → Story → Feature → Task<br />
              4단계 <span style={{ color: 'var(--green)' }}>계층형</span> 연결.
            </h3>
            <p>{t('hier_desc')}</p>
          </div>
          <div className={styles.hierVis}>
            {rows.map((r, i) => (
              <div key={i} className={`${styles.hierRow} ${styles[r.cls]}`}>
                <span className={styles.pill}>{r.emoji} {r.label}</span>
                <span className={styles.cnt}>{r.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
