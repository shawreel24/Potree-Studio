/**
 * Returns the correct URL for public assets, accounting for the Vite base path.
 * In development: /assets/images/xxx.png
 * In production (GitHub Pages): /Potree-Studio/assets/images/xxx.png
 */
export const assetUrl = (path) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.replace(/^\//, '');
  return `${base}${cleanPath}`;
};
