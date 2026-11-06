'use client';
import { useRef } from 'react';

// Simple horizontal carousel: swipe, scroll, or use the arrow buttons.
export default function Carousel({ label, children }) {
  const track = useRef(null);
  const scroll = (dir) => {
    const el = track.current;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };
  return (
    <div className="carousel">
      <button className="car-btn car-prev" onClick={() => scroll(-1)} aria-label="Scroll left">‹</button>
      <div className="car-track" ref={track} role="group" aria-label={label} tabIndex={0}>
        {children}
      </div>
      <button className="car-btn car-next" onClick={() => scroll(1)} aria-label="Scroll right">›</button>
    </div>
  );
}
