import type { MetadataRoute } from "next";
import { SITE_URL, SITEMAP_PATHS, withTrailingSlash } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_PATHS.map((path) => ({
    url: `${SITE_URL}${withTrailingSlash(path)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
