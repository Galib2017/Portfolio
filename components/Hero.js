const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Hero({ profile }) {
  const img = profile.heroImage.startsWith('/') ? BASE + profile.heroImage : profile.heroImage;
  return (
    <header
      className="hero"
      style={{
        '--overlay': profile.heroOverlay ?? 0.45,
        '--hero-img': `url(${img})`,
      }}
    >
      <div className="hero-text">
        <h1>{profile.name}</h1>
        <p>{profile.tagline}</p>
        <a className="open" href="#work">See the work</a>
      </div>
    </header>
  );
}
