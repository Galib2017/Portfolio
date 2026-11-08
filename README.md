# Portfolio (Next.js, static)

1. `npm install`
2. `npm run dev`   -> http://localhost:3000 (restart it after adding new folders)
3. `npm run build` -> static site in `out/` (upload to Netlify, Vercel, GitHub Pages, Cloudflare Pages)

## Adding work (no code needed)
Make one folder per collection inside `public/work/`. The folder name is the collection name.

    public/work/
      Lakkatora Travel/
        photography.txt      <- NAME = category, CONTENTS = collection description
        01.jpg  02.jpg  clip.mp4 ...
        cover.jpg            (optional) card cover, not repeated inside the collection
        youtube.txt          (optional) one YouTube link or ID per line
      Event Name/
        videography.txt
        reel.mp4

- The `.txt` file name is the category, and the text inside it is shown as the description on the collection page. It can be empty.
- The category name can match the slug or title, any case: `photography.txt`, `Photography.txt`, `davinci-resolve.txt`, `DaVinci Resolve.txt`.
- `youtube.txt` is special: it lists videos and is not treated as a category.
- A file with no extension (e.g. `photography`) still works as the category, without a description.
- A category name not listed in `data/work.js` is created automatically (grey colour).
- A folder with no category file goes under "Other" (a warning is printed in the build log).
- Folders with no images or videos are skipped.
- Files show in natural order (`2.jpg` before `10.jpg`).
- Supported: jpg, jpeg, png, webp, gif, avif, svg, mp4, webm, mov, m4v. Use mp4 (H.264) for videos; .mov often will not play in Chrome.
- Delete the sample folders "Lakkatora Travel" and "Logo Sketches" before publishing.

## Hero image
Save your image as `public/hero.jpg` (or change `heroImage` in `data/work.js`). Use a wide landscape image, about 2400px across, under 1 MB (jpg or webp). Until it exists the hero shows a blue gradient. `heroOverlay` darkens the image so the centred text stays readable.

## Tab colours, names, order
Edit `categories` in `data/work.js`. Your name, tagline and links are in the same file.

## Complex visuals (3D)
The hero is now an image, so the 3D libraries were removed to keep installs fast and error-free. To add a react-three-fiber (WebGL) scene anywhere: `npm i three @react-three/fiber @react-three/drei`, write a client component with a `<Canvas>`, and load it with `dynamic(() => import('./MyScene'), { ssr: false })`. Blender exports (.glb) load with drei's `useGLTF`.
