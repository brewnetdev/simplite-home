import { useTranslations } from 'next-intl';

export default function LogoStrip() {
  const t = useTranslations('logoStrip');
  const items: string[] = t.raw('items');

  return (
    <div className="container">
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '32px 0', gap: 40, flexWrap: 'wrap' as const,
        borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)',
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)',
        letterSpacing: '0.1em', textTransform: 'uppercase' as const,
      }}>
        {items.map((item, i) => (
          <span key={i}>{i === 0 ? `● ${item}` : item}</span>
        ))}
      </div>
    </div>
  );
}
