import Link from 'next/link';
import { notFound } from 'next/navigation';
import CollectionGrid from '../../../../components/CollectionGrid';
import { getCategories } from '../../../../lib/content';

export function generateStaticParams() {
  const params = getCategories().flatMap((c) => c.collections.map((col) => ({ slug: c.slug, collection: col.slug })));
  return params.length ? params : [{ slug: '_none', collection: '_none' }]; // export needs at least one
}

export default function CollectionPage({ params }) {
  const cat = getCategories().find((c) => c.slug === params.slug);
  const col = cat?.collections.find((x) => x.slug === params.collection);
  if (!col) notFound();
  return (
    <main className="page" style={{ '--accent': cat.color }}>
      <nav className="crumbs">
        <Link href="/">Home</Link>
        <Link href={`/work/${cat.slug}/`}>{cat.title}</Link>
      </nav>
      <h1>{col.title}</h1>
      <p className="lede">{col.blurb || cat.title}</p>
      <CollectionGrid col={col} color={cat.color} />
    </main>
  );
}
