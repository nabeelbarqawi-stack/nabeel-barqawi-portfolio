import type { MetadataRoute } from "next";

const BASE = "https://www.nabeelbarqawi.com";
const ROUTES = ["", "about", "services", "speaking", "coaching", "community", "resources", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: path ? `${BASE}/${path}` : BASE,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
