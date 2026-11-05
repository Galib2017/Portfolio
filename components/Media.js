// One picture or video. `thumb` = small card version (no player controls, no embed).
export default function Media({ item, color, title = '', thumb = false }) {
  const src = item.src || item.cover;
  if (item.type === 'video' && item.youtube) {
    return thumb
      ? <img className="media" src={`https://img.youtube.com/vi/${item.youtube}/hqdefault.jpg`} alt={title} loading="lazy" />
      : <iframe className="media" src={`https://www.youtube.com/embed/${item.youtube}`} title={title} allowFullScreen loading="lazy" />;
  }
  if (item.type === 'video' && src) {
    return thumb
      ? <video className="media" src={src} muted playsInline preload="metadata" />
      : <video className="media" src={src} controls preload="metadata" />;
  }
  if (src) return <img className="media" src={src} alt={item.caption || title} loading="lazy" />;
  return <div className="media empty" style={{ '--c': color }}><span>Add a file to /public/work</span></div>;
}
