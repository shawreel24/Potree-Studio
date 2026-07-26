/**
 * Returns the correct URL for public assets, accounting for the Vite base path.
 * Properly handles full HTTP/HTTPS URLs (from Supabase Storage) without modifying them.
 * Also neutralizes double base prefixes or missing leading slashes for local assets.
 */
export const assetUrl = (path) => {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const assetsIndex = path.indexOf('assets/');
  const cleanPath = assetsIndex !== -1 ? path.slice(assetsIndex) : path.replace(/^\//, '');
  return `${base}${cleanPath}`;
};
