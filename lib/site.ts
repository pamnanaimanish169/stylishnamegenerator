/** Preferred public URL — apex domain, HTTPS, no www. Keep all SEO URLs in sync with this. */
export const SITE_URL = "https://stylishnamegenerator.in";

/** Paths included in sitemap.xml — add new static pages here as they ship. */
export const SITEMAP_PATHS = [
  "/",
  "/bgmi-name-generator",
  "/free-fire-name-generator",
  "/freestyle-nickname-generator",
  "/s-stylish-name",
  "/m-stylish-name",
  "/j-stylish-name",
  "/instagram-stylish-fonts",
  "/facebook-stylish-name-generator",
  "/stylish-marathi-fonts",
  "/hindi-stylish-fonts-generator",
  "/arabic-font-generator",
  "/wavy-text-generator",
  "/bgmi-symbols",
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
