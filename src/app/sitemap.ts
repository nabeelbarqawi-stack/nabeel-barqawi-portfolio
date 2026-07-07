import type { MetadataRoute } from "next";
import { PROGRAM_SLUGS } from "@/lib/programs";

const BASE_URL = "https://www.nabeelbarqawi.com";
const PAGES = ["/", "/work", "/approach", "/services", "/programs", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = PAGES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const programPages: MetadataRoute.Sitemap = PROGRAM_SLUGS.map((slug) => ({
    url: `${BASE_URL}/programs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...programPages];
}
