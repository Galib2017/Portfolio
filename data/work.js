// SITE SETTINGS. Your work itself is NOT listed here: it is read automatically from /public/work.
//
// public/work/<Collection Name>/   one folder per collection
//     photography.txt              named after the category; its text is the collection description
//     01.jpg, clip.mp4, ...        the media
//
// The `categories` below only style the tabs (colour, short text, order).
// A category name that is not listed here is created automatically.
// The file name can be the slug or the title (case and spaces ignored):
// "photography.txt", "Photography.txt", "davinci-resolve.txt", "DaVinci Resolve.txt" all work.

export const profile = {
  name: 'Galib',
  // Hero background: put your image in /public (e.g. public/hero.jpg) and set the path here.
  heroImage: '/hero.jpg',
  heroOverlay: 0.45, // 0 = no darkening, 1 = black. Raise it if the text is hard to read.
  tagline: 'Photographer, filmmaker and designer.',
  about:
    'I make pictures, films, posters and 3D worlds. Pick a tab to see the collections, or open a page for the full set.',
  email: 'you@example.com',
  links: [
    { label: 'Instagram', href: '#' },
    { label: 'Behance', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
};

export const categories = [
  { slug: 'photography', title: 'Photography', tool: 'Camera and Lightroom', color: '#E8B923', blurb: 'Travel, events and portraits.' },
  { slug: 'videography', title: 'Videography', tool: 'Shooting and directing', color: '#E5484D', blurb: 'Event films, reels and b-roll.' },
  { slug: 'blender', title: 'Blender', tool: '3D modelling and rendering', color: '#FF7A1A', blurb: '3D scenes, product renders and animation.' },
  { slug: 'davinci-resolve', title: 'DaVinci Resolve', tool: 'Editing and colour grading', color: '#2BA9FF', blurb: 'Edits, grades and short films.' },
  { slug: 'posters', title: 'Posters', tool: 'Poster and print design', color: '#7B5CFF', blurb: 'Event, film and typographic posters.' },
  { slug: 'logos', title: 'Logo art', tool: 'Brand marks and identity', color: '#19B58A', blurb: 'Logos and small identity systems.' },
];

// The item shown on a collection's card.
export const coverOf = (col) =>
  col.cover ? { type: 'image', src: col.cover } : col.items[0] || {};
