/** Preferred public URL — apex domain, HTTPS, no www. Keep all SEO URLs in sync with this. */
export const SITE_URL = "https://stylishnamegenerator.in";

/** Paths included in sitemap.xml — add new static pages here as they ship. */
export const SITEMAP_PATHS = [
  "/",
  "/bgmi-name-generator",
  "/free-fire-name-generator",
  "/instagram-stylish-fonts",
  "/about-us",
  "/contact-us",
  "/privacy-policy",
  "/disclaimer",
] as const;

/** Normalize a path for sitemap/canonical URLs (matches trailingSlash: true). */
export function withTrailingSlash(path: string): string {
  if (path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}
