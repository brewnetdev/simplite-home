import { useTranslations } from 'next-intl';
import SectionHead from '@/components/ui/SectionHead';
import styles from './DocumentMap.module.css';

export default function DocumentMap() {
  const t = useTranslations('markflow');

  return (
    <section className="dot-bg">
      <div className="container">
        <SectionHead
          eyebrow={t('map_eyebrow')}
          title={<>문서를 <span style={{ color: 'var(--green)' }}>그래프</span>로 본다는 것.</>}
          aside={t('map_aside')}
        />
        <div className={styles.mapWrap}>
          <svg className={styles.mapSvg} viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path className={styles.edge} d="M 170 190 Q 280 190 400 190" />
              <path className={`${styles.edge} ${styles.edgeNext}`} d="M 400 190 Q 550 100 720 100" />
              <path className={`${styles.edge} ${styles.edgeNext}`} d="M 400 190 Q 550 280 720 280" />
              <path className={styles.edge} d="M 100 110 Q 150 150 170 180" />
              <path className={styles.edge} d="M 100 270 Q 150 230 170 200" />
            </g>
            <g className={styles.node}>
              <rect x="40" y="85" width="130" height="50" rx="8" fill="#fff" stroke="#d6ddd7" />
              <text x="105" y="115" textAnchor="middle" fill="#3d4a42" style={{ fontSize: 13, fontFamily: 'var(--font-sans)' }}>root</text>
            </g>
            <g className={styles.node}>
              <rect x="40" y="245" width="130" height="50" rx="8" fill="#fff" stroke="#d6ddd7" />
              <text x="105" y="268" textAnchor="middle" fill="#3d4a42" style={{ fontSize: 13, fontFamily: 'var(--font-sans)' }}>@AI-Analysis</text>
              <text x="105" y="285" textAnchor="middle" fill="#9ba69f" style={{ fontSize: 10, fontFamily: 'var(--font-mono)' }}>CATEGORY</text>
            </g>
            <g className={styles.node}>
              <rect x="170" y="165" width="130" height="50" rx="8" fill="#eef6f0" stroke="#4a8a6e" />
              <text x="235" y="195" textAnchor="middle" fill="#1a3a2e" style={{ fontSize: 13, fontFamily: 'var(--font-sans)' }}>sample</text>
            </g>
            <g className={`${styles.node} ${styles.current}`}>
              <rect x="330" y="160" width="170" height="60" rx="10" fill="#1a3a2e" stroke="#0f2a20" />
              <text x="415" y="185" textAnchor="middle" fill="#fff" fontWeight="600" style={{ fontSize: 13, fontFamily: 'var(--font-sans)' }}>현재 문서</text>
              <text x="415" y="205" textAnchor="middle" fill="#a8c4b4" style={{ fontSize: 11, fontFamily: 'var(--font-sans)' }}>MarkFlow 에디터 기능</text>
            </g>
            <g className={styles.node}>
              <rect x="590" y="75" width="260" height="50" rx="8" fill="#fff" stroke="#4a8a6e" />
              <text x="610" y="105" fill="#b85c3a" style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>← prev</text>
              <text x="680" y="105" fill="#1a3a2e" style={{ fontSize: 13, fontFamily: 'var(--font-sans)' }}>@markflow/editor</text>
            </g>
            <g className={styles.node}>
              <rect x="590" y="255" width="260" height="50" rx="8" fill="#fff" stroke="#4a8a6e" />
              <text x="610" y="285" fill="#b85c3a" style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>next →</text>
              <text x="680" y="285" fill="#1a3a2e" style={{ fontSize: 13, fontFamily: 'var(--font-sans)' }}>MarkFlow 프로젝트</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
