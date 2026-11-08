/**
 * Static export: `npm run build` creates a plain-HTML site in /out.
 * NEXT_PUBLIC_BASE_PATH is for hosting under a sub-address such as
 * https://username.github.io/repo-name/ (the GitHub workflow sets it for you).
 * Leave it unset for localhost, a custom domain, or a username.github.io repo.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

module.exports = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
};
