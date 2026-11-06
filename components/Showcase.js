'use client';
import { useState } from 'react';
import Link from 'next/link';
import CollectionCard from './CollectionCard';
import Carousel from './Carousel';

export default function Showcase({ categories }) {
  const [active, setActive] = useState(categories[0]?.slug);
  const cat = categories.find((c) => c.slug === active) || categories[0];
  if (!cat) return <section id="work" className="showcase"><p>Add a folder to public/work to see your collections here.</p></section>;

  return (
    <section id="work" className="showcase" style={{ '--accent': cat.color }}>
      <div role="tablist" aria-label="Work categories" className="tabs">
        {categories.map((c) => (
          <button
            key={c.slug}
            role="tab"
            aria-selected={c.slug === active}
            className={c.slug === active ? 'tab on' : 'tab'}
            style={{ '--tc': c.color }}
            onClick={() => setActive(c.slug)}
          >
            {c.title}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="panel" key={cat.slug}>
        <div className="panel-head">
          <div>
            <h2>{cat.title}</h2>
            <p>{cat.blurb}</p>
          </div>
          <Link className="open" href={`/work/${cat.slug}/`}>Open the {cat.title} page</Link>
        </div>
        <Carousel label={`${cat.title} collections`}>
          {cat.collections.map((col) => (
            <CollectionCard key={col.slug} cat={cat} col={col} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
