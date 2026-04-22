export default function SectionHead({
  eyebrow,
  title,
  aside,
  center = false,
  titleClassName,
}: {
  eyebrow: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  center?: boolean;
  titleClassName?: string;
}) {
  return (
    <div
      className="section-head"
      style={center ? { textAlign: 'center', justifyContent: 'center' } : undefined}
    >
      <div className="title" style={center ? { textAlign: 'center' } : undefined}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className={titleClassName || 'kr-h2'} style={{ marginTop: 12 }}>
          {title}
        </h2>
      </div>
      {aside && <div className="aside">{aside}</div>}
    </div>
  );
}
