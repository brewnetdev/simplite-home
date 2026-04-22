import Image from 'next/image';

export default function WindowChrome({
  url,
  imageSrc,
  imageAlt,
}: {
  url: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <div className="win">
      <div className="win-bar">
        <div className="dot-r" />
        <div className="dot-y" />
        <div className="dot-g" />
        <div className="url">{url}</div>
      </div>
      <Image src={imageSrc} alt={imageAlt} width={1200} height={800} style={{ width: '100%', height: 'auto', display: 'block' }} />
    </div>
  );
}
