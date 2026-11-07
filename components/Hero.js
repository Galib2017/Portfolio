export default function Hero({ profile }) {
  return (
    <header
      className="hero"
      style={{
        '--overlay': profile.heroOverlay ?? 0.45,
        '--hero-img': `url(${profile.heroImage})`,
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
