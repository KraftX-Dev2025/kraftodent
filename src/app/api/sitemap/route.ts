import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const hostname = request.headers.get("host") || "kraftodent.com";
    const baseUrl = `https://${hostname}`;

    // Get the current date in the YYYY-MM-DD format
    const currentDate = new Date().toISOString().split("T")[0];

    // Define the static routes
    const routes = [
        {
            url: "/",
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 1.0,
        },
        {
            url: "/features",
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: "/case-studies",
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: "/benefits",
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: "/contact",
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: "/privacy-policy",
            lastModified: currentDate,
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: "/terms-of-service",
            lastModified: currentDate,
            changeFrequency: "yearly",
            priority: 0.5,
        },
    ];

    // Generate the XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
      .map((route) => {
          return `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
      })
      .join("")}
</urlset>`;

    // Return the XML sitemap
    return new NextResponse(sitemap, {
        status: 200,
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
