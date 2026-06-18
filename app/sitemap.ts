import type { MetadataRoute } from "next";
import { SITE_URL, SITEMAP_PATHS, withTrailingSlash } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_PATHS.map((path) => ({
    url: `${SITE_URL}${withTrailingSlash(path)}`,
    lastModified: new Date(),
    priority:
      path === "/"
        ? 1
        : path === "/about-us" ||
            path === "/contact-us" ||
            path === "/privacy-policy" ||
            path === "/disclaimer"
          ? 0.4
          : 0.8,
    changeFrequency:
      path === "/about-us" ||
      path === "/contact-us" ||
      path === "/privacy-policy" ||
      path === "/disclaimer"
        ? "monthly"
        : "weekly",
  }));
}
