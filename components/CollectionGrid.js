'use client';
import { useState } from 'react';
import Media from './Media';
import Lightbox from './Lightbox';

export default function CollectionGrid({ col, color }) {
  const [open, setOpen] = useState(null);
  const slides = col.items.map((item) => ({ item, title: col.title, color }));
  return (
    <>
      <div className="masonry">
        {col.items.map((item, i) => (
          <figure key={i} className="card m-item">
            <button className="m-open" onClick={() => setOpen(i)} aria-label={`Preview ${col.title} item ${i + 1}`}>
              <Media item={item} color={color} title={col.title} thumb />
              {item.type === 'video' && <span className="play" aria-hidden="true">▶</span>}
            </button>
            {item.caption && <figcaption><span>{item.caption}</span></figcaption>}
          </figure>
        ))}
      </div>
      {open !== null && <Lightbox slides={slides} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}
