import { ImageResponse } from 'next/og';
import { SIMPLITE_LOGO_DATA_URL, SIMPLITE_LOGO_WIDTH, SIMPLITE_LOGO_HEIGHT } from '@/lib/og-logo';

export const alt = 'MarkFlow — Markdown Editor · Markdown Knowledge Management System';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isKo = locale === 'ko';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          backgroundColor: '#f7f9f7',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <img
            src={SIMPLITE_LOGO_DATA_URL}
            alt="Simplite"
            width={SIMPLITE_LOGO_WIDTH / 2}
            height={SIMPLITE_LOGO_HEIGHT / 2}
            style={{ display: 'block' }}
          />
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#6b766f',
            }}
          >
            SIMPLITE / PRODUCTS / MARKFLOW
          </div>
          <div
            style={{
              fontSize: '58px',
              fontWeight: 700,
              color: '#1a3a2e',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Write in Markdown.{'\n'}Think in Context.
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#3d4a42',
              lineHeight: 1.5,
              maxWidth: '760px',
            }}
          >
            {isKo
              ? '마크다운 에디터 · 마크다운 지식관리 시스템 · 문서 관계맵 · 듀얼 에디터'
              : 'Markdown Editor · Knowledge Management System · Doc Relation Map · Dual Editor'}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            {['Dual Editor', 'Doc Map', 'Convert', 'Publish'].map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#1a3a2e',
                  backgroundColor: '#e8f0ea',
                  padding: '6px 14px',
                  borderRadius: '4px',
                  letterSpacing: '0.04em',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#1a3a2e',
              letterSpacing: '-0.01em',
            }}
          >
            simplite.net
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
