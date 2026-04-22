import { useTranslations } from 'next-intl';
import SectionHead from '@/components/ui/SectionHead';
import styles from './DualEditorDemo.module.css';

export default function DualEditorDemo() {
  const t = useTranslations('markflow');

  return (
    <section id="dual">
      <div className="container">
        <SectionHead
          eyebrow={t('dual_eyebrow')}
          title={<>쓰는 대로 <span style={{ color: 'var(--green)' }}>보이는</span> 마크다운.</>}
          aside={t('dual_aside')}
        />
        <div className={styles.dual}>
          <div className={styles.dualBar}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
            <div className={styles.tabs}>
              <span>H1 H2 H3</span><span>B I</span><span>⟨⟩ Σ</span><span>[ ]</span>
            </div>
          </div>
          <div className={styles.dualGrid}>
            <div className={`${styles.dualCol} ${styles.editor}`}>
              <pre style={{ margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                <span className={styles.mdH}># Simplite 온보딩 가이드</span>{'\n\n'}
                <span className={styles.mdComment}>## 개요</span>{'\n\n'}
                MarkFlow는 <span className={styles.mdB}>**마크다운 기반**</span> 지식 관리{'\n'}
                시스템입니다. 팀의 모든 문서를 하나의{'\n'}
                구조로 연결하세요.{'\n\n'}
                <span className={styles.mdComment}>## 핵심 기능</span>{'\n\n'}
                - <span className={styles.mdLink}>[[듀얼 에디터]]</span> · 실시간 프리뷰{'\n'}
                - 문서 관계 맵 시각화{'\n'}
                - LaTeX 수식: $E = mc^2${'\n'}
                - <span className={styles.mdCode}>`인라인 코드`</span> 하이라이트{'\n\n'}
                <span className={styles.mdComment}>## 연결된 문서</span>{'\n\n'}
                이전 문서 ← <span className={styles.mdLink}>[[설치 가이드]]</span>{'\n'}
                다음 문서 → <span className={styles.mdLink}>[[워크스페이스 설정]]</span>
              </pre>
            </div>
            <div className={`${styles.dualCol} ${styles.preview}`}>
              <h2>Simplite 온보딩 가이드</h2>
              <h3>개요</h3>
              <p>MarkFlow는 <strong>마크다운 기반</strong> 지식 관리 시스템입니다. 팀의 모든 문서를 하나의 구조로 연결하세요.</p>
              <h3>핵심 기능</h3>
              <ul>
                <li><a href="#">듀얼 에디터</a> · 실시간 프리뷰</li>
                <li>문서 관계 맵 시각화</li>
                <li>LaTeX 수식: <span className={styles.math}>E = mc²</span></li>
                <li><code>인라인 코드</code> 하이라이트</li>
              </ul>
              <h3>연결된 문서</h3>
              <p>이전 문서 ← <a href="#">설치 가이드</a><br />다음 문서 → <a href="#">워크스페이스 설정</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
