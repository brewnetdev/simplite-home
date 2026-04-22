import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Tika — Ticket-based Kanban by Simplite';
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
          padding: '72px 80px',
          backgroundColor: '#f7f9f7',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#6b766f',
            }}
          >
            SIMPLITE / PRODUCTS / TIKA
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
            Plan Simply.{'\n'}Ship Boldly.
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#3d4a42',
              lineHeight: 1.5,
              maxWidth: '700px',
            }}
          >
            {isKo
              ? '목표 중심의 계층형 칸반 · Goal → Story → Feature → Task'
              : 'Hierarchical kanban · Goal → Story → Feature → Task'}
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
            {['Kanban Board', 'Hierarchy', 'Burndown', 'MCP Native'].map((tag) => (
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
