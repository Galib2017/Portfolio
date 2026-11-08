/**
 * Static export: `npm run build` creates a plain-HTML site in /out.
 *
 * Base path (needed when the site lives at https://username.github.io/Repo-Name/):
 *  - On GitHub Actions it is worked out from the repository name automatically,
 *    whichever workflow file you use. A repo called "username.github.io" gets none.
 *  - Locally it is empty, so localhost:3000 stays at "/".
 *  - To override (e.g. a custom domain on a normally named repo), set the
 *    NEXT_PUBLIC_BASE_PATH environment variable; an empty value means "no base path".
 */
const repo = (process.env.GITHUB_REPOSITORY || '').split('/')[1] || '';
const onPages = process.env.GITHUB_ACTIONS === 'true' && repo && !repo.endsWith('.github.io');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (onPages ? `/${repo}` : '');

module.exports = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(basePath ? { basePath } : {}),
};
