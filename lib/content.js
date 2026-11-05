// Reads /public/work at build time (server only). Do not import this file from a client component.
//
//   public/work/<Collection Name>/
//       photography        <- extensionless file; its NAME is the category
//       01.jpg 02.jpg ...  <- images and videos (shown in natural order)
//       cover.jpg          <- optional card cover (not repeated in the collection)
//       about.txt          <- optional description
//       youtube.txt        <- optional, one YouTube link or ID per line
import fs from 'fs';
import path from 'path';
import { categories as defs } from '../data/work';

const ROOT = path.join(process.cwd(), 'public', 'work');
const IMG = /\.(jpe?g|png|webp|gif|avif|svg)$/i;
const VID = /\.(mp4|webm|mov|m4v)$/i;

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'untitled';
const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
const ytId = (s) => {
  s = s.trim();
  const m = s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : /^[\w-]{11}$/.test(s) ? s : null;
};

function readCollection(folder) {
  const dir = path.join(ROOT, folder);
  const files = fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && !e.name.startsWith('.'))
    .map((e) => e.name)
    .sort(natural);
  const url = (f) => `/work/${encodeURIComponent(folder)}/${encodeURIComponent(f)}`;
  const label = files.find((f) => !f.includes('.'));

  let cover = '';
  const items = [];
  for (const f of files) {
    if (/^cover\./i.test(f) && IMG.test(f)) cover = url(f);
    else if (IMG.test(f)) items.push({ type: 'image', src: url(f) });
    else if (VID.test(f)) items.push({ type: 'video', src: url(f) });
  }
  const read = (name) => {
    const f = files.find((x) => x.toLowerCase() === name);
    return f ? fs.readFileSync(path.join(dir, f), 'utf8') : '';
  };
  for (const line of read('youtube.txt').split(/\r?\n/)) {
    const id = ytId(line);
    if (id) items.push({ type: 'video', youtube: id });
  }
  return {
    label,
    col: { slug: slugify(folder), title: folder.replace(/_/g, ' '), blurb: read('about.txt').trim(), cover, items },
  };
}

export function getCategories() {
  if (!fs.existsSync(ROOT)) return [];
  const folders = fs.readdirSync(ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
    .map((e) => e.name)
    .sort(natural);

  const cats = new Map(defs.map((d) => [d.slug, { ...d, collections: [] }]));
  const usedSlugs = new Set();

  for (const folder of folders) {
    const { label, col } = readCollection(folder);
    if (!col.items.length && !col.cover) {
      console.warn(`[portfolio] "${folder}" has no images or videos, skipped.`);
      continue;
    }
    let slug = col.slug, n = 2;
    while (usedSlugs.has(slug)) slug = `${col.slug}-${n++}`;
    col.slug = slug;
    usedSlugs.add(slug);

    let def = label && defs.find((d) => norm(d.slug) === norm(label) || norm(d.title) === norm(label));
    if (!def) {
      if (label) {
        // A category name you haven't listed in data/work.js: created automatically.
        def = { slug: slugify(label), title: label.replace(/[-_]/g, ' '), tool: '', color: '#5B606B', blurb: '' };
      } else {
        console.warn(`[portfolio] "${folder}" has no category file (an extensionless file such as "photography"). Filed under "Other".`);
        def = { slug: 'other', title: 'Other', tool: '', color: '#5B606B', blurb: '' };
      }
    }
    if (!cats.has(def.slug)) cats.set(def.slug, { ...def, collections: [] });
    cats.get(def.slug).collections.push(col);
  }
  return [...cats.values()].filter((c) => c.collections.length);
}
