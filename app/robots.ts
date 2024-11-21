import { publicRoutes } from "@/lib/types/types";

export default function robots() {
  const filteredPublicRoutes = publicRoutes.slice(0, -2);
  const excludedRoutes = publicRoutes.slice(-2);

  return {
    rules: [
      {
        userAgent: "*",
        allow: filteredPublicRoutes,
        disallow: [
          "/admin",
          "/api",
          "/perfil",
          "/dashboard",
          "/dashboard/*",
          ...excludedRoutes,
        ],
      },
    ],
    sitemap: "https://www.saborcircular.com.ar/sitemap.xml",
  };
}
