'use client';
import { useEffect, useState } from 'react';
import Lightbox from './Lightbox';

// Cell shapes: c = columns, r = rows. Add or remove shapes to change the mix.
const SHAPES = [
  { c: 2, r: 2 }, { c: 3, r: 2 }, { c: 1, r: 2 }, { c: 2, r: 1 },
  { c: 3, r: 3 }, { c: 1, r: 1 }, { c: 1, r: 1 }, { c: 2, r: 3 },
];

const shuffle = (a) => {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
};

function Tile({ t, onOpen }) {
  const { item, cat, col } = t;
  const src = item.src;
  let inner;
  if (item.type === 'video' && src) {
    inner = <video src={src} autoPlay muted loop playsInline preload="metadata" />;
  } else if (item.type === 'video' && item.youtube) {
    inner = <img src={`https://img.youtube.com/vi/${item.youtube}/hqdefault.jpg`} alt={col.title} loading="lazy" />;
  } else if (src) {
    inner = <img src={src} alt={item.caption || col.title} loading="lazy" />;
  } else {
    inner = <div className="g-empty" style={{ '--c': cat.color }} />;
  }
  return (
    <button
      className="g-tile"
      onClick={onOpen}
      aria-label={`Preview ${col.title}, ${cat.title}`}
      style={{ gridColumn: `span ${t.shape.c}`, gridRow: `span ${t.shape.r}` }}
    >
      {inner}
      {item.type === 'video' && <span className="play" aria-hidden="true">▶</span>}
      <span className="g-label">{col.title}<small>{cat.title}</small></span>
    </button>
  );
}

export default function Gallery({ categories }) {
  const build = (random) => {
    const all = categories.flatMap((cat) => cat.collections.flatMap((col) => col.items.map((item) => ({ item, cat, col }))));
    const items = random ? shuffle(all) : all;
    const shapes = random ? shuffle(SHAPES) : SHAPES;
    return items.slice(0, 12).map((t, i) => ({ ...t, shape: shapes[i % shapes.length] }));
  };

  // First render is fixed (so the static HTML matches); random order starts after load.
  const [tiles, setTiles] = useState(() => build(false));
  const [open, setOpen] = useState(null);
  useEffect(() => setTiles(build(true)), []);

  const slides = tiles.map((t) => ({
    item: t.item,
    title: t.col.title,
    color: t.cat.color,
    href: `/work/${t.cat.slug}/${t.col.slug}/`,
    hrefLabel: 'Open collection',
  }));

  return (
    <section className="gallery" id="gallery">
      <div className="panel-head">
        <div>
          <h2>Gallery</h2>
          <p>A random mix from every collection. Select a tile to preview it.</p>
        </div>
        <button className="open" onClick={() => { setOpen(null); setTiles(build(true)); }}>Shuffle</button>
      </div>
      <div className="g-grid">
        {tiles.map((t, i) => <Tile key={i} t={t} onOpen={() => setOpen(i)} />)}
      </div>
      {open !== null && <Lightbox slides={slides} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}
