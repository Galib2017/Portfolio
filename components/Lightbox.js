'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

// Full-screen preview for photos and videos.
// slides: [{ item, title, color, href?, hrefLabel? }]
export default function Lightbox({ slides, index, onIndex, onClose }) {
  const closeBtn = useRef(null);
  const s = slides[index];
  const n = slides.length;
  const go = (d) => onIndex((index + d + n) % n);

  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const { item } = s;
  const src = item.src;
  let media;
  if (item.type === 'video' && item.youtube) {
    media = <iframe key={index} className="lb-media lb-frame" src={`https://www.youtube.com/embed/${item.youtube}?autoplay=1`} title={s.title} allow="autoplay; fullscreen" allowFullScreen />;
  } else if (item.type === 'video' && src) {
    media = <video key={index} className="lb-media" src={src} controls autoPlay playsInline />;
  } else if (src) {
    media = <img key={index} className="lb-media" src={src} alt={item.caption || s.title} />;
  } else {
    media = <div className="lb-media lb-empty" style={{ '--c': s.color }}>Add a file to /public/work</div>;
  }

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={`${s.title} preview`} onClick={onClose}>
      <button ref={closeBtn} className="lb-btn lb-close" onClick={onClose} aria-label="Close preview">×</button>
      {n > 1 && (
        <>
          <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous">‹</button>
          <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next">›</button>
        </>
      )}
      <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
        {media}
        <div className="lb-bar">
          <span>{s.title}{item.caption ? `: ${item.caption}` : ''}</span>
          <span className="lb-right">
            {s.href && <Link href={s.href}>{s.hrefLabel || 'Open collection'}</Link>}
            <span>{index + 1} / {n}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
