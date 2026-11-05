import Showcase from '../components/Showcase';
import Gallery from '../components/Gallery';
import Hero from '../components/Hero';
import { profile } from '../data/work';
import { getCategories } from '../lib/content';

export default function Home() {
  const categories = getCategories();
  return (
    <main>
      <Hero profile={profile} />
      <Showcase categories={categories} />
      <Gallery categories={categories} />
      <footer className="foot">
        <p>{profile.about}</p>
        <p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {profile.links.map((l) => (
            <a key={l.label} href={l.href}>{l.label}</a>
          ))}
        </p>
      </footer>
    </main>
  );
}
