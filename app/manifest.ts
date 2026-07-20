import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Atlas Engineering OS",
    short_name: "Atlas",
    description: "Mobile-first personal engineering workspace.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#08111f",
    theme_color: "#08111f"
  };
}
