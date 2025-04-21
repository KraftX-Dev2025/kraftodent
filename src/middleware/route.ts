import { NextRequest, NextResponse } from "next/server";

const createRobotsTxt = (hostname: string): string => {
    return `# www.robotstxt.org/

# Allow crawling of all content
User-agent: *
Allow: /

# Disallow crawling of error pages
Disallow: /404
Disallow: /500

# Sitemap locations
Sitemap: https://${hostname}/sitemap.xml
Sitemap: https://${hostname}/server-sitemap.xml
`;
};

export async function GET(request: NextRequest) {
    // Get the hostname from the request
    const hostname = request.headers.get("host") || "kraftodent.com";

    // Generate robots.txt content
    const robotsTxt = createRobotsTxt(hostname);

    // Return the content with the correct content type
    return new NextResponse(robotsTxt, {
        status: 200,
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=3600",
        },
    });
}

export const config = {
    matcher: "/robots.txt",
};
