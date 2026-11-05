'use client';
import dynamic from 'next/dynamic';
const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false });

export default function Hero({ profile }) {
  return (
    <header className="hero">
      <div className="hero-3d"><Hero3D /></div>
      <div className="hero-text">
        <h1>{profile.name}</h1>
        <p>{profile.tagline}</p>
        <a className="open" href="#work">See the work</a>
      </div>
    </header>
  );
}
