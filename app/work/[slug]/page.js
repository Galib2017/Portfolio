import Link from 'next/link';
import { notFound } from 'next/navigation';
import CollectionCard from '../../../components/CollectionCard';
import { getCategories } from '../../../lib/content';

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export default function CategoryPage({ params }) {
  const categories = getCategories();
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat) notFound();
  return (
    <main className="page" style={{ '--accent': cat.color }}>
      <nav className="crumbs">
        <Link href="/">Home</Link>
        {categories.filter((c) => c.slug !== cat.slug).map((c) => (
          <Link key={c.slug} href={`/work/${c.slug}/`}>{c.title}</Link>
        ))}
      </nav>
      <h1>{cat.title}</h1>
      <p className="lede">{[cat.tool, cat.blurb].filter(Boolean).join('. ')}</p>
      <div className="grid wide">
        {cat.collections.map((col) => <CollectionCard key={col.slug} cat={cat} col={col} />)}
      </div>
    </main>
  );
}
