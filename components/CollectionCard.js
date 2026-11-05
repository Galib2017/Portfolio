import Link from 'next/link';
import Media from './Media';
import { coverOf } from '../data/work';

export default function CollectionCard({ cat, col }) {
  return (
    <Link href={`/work/${cat.slug}/${col.slug}/`} className="card col-card">
      <Media item={coverOf(col)} color={cat.color} title={col.title} thumb />
      <div className="col-meta">
        <strong>{col.title}</strong>
        <span>{col.year || ""}</span>
        <p>{col.items.length} {col.items.length === 1 ? 'item' : 'items'}</p>
      </div>
    </Link>
  );
}
