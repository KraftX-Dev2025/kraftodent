import Head from "next/head";
import { useRouter } from "next/router";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogType?: string;
    canonicalUrl?: string;
}

// Company information - keep consistent with layout.tsx
const companyInfo = {
    name: "Kraftodent",
    domain: "kraftodent.com",
    url: "https://kraftodent.com",
};

export default function SEO({
    title = "AI Automation for Modern Dental Practices in India",
    description = "Transform your dental practice with Kraftodent's AI-powered receptionist and CRM automation. Reduce costs by 40%, save 25+ staff hours weekly, and improve patient experience.",
    keywords = "dental AI, dental automation, dental practice management, AI receptionist, dental CRM, Pune dental technology",
    ogImage = "/og-image.jpg",
    ogType = "website",
    canonicalUrl,
}: SEOProps) {
    const router = useRouter();
    const fullTitle = `${title} | Kraftodent`;
    const currentUrl = canonicalUrl || `${companyInfo.url}${router.asPath}`;

    return (
        <Head>
            {/* Standard SEO tags that will merge with metadata in layout.tsx */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={currentUrl} />
            <meta
                property="og:image"
                content={`${companyInfo.url}${ogImage}`}
            />
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content={companyInfo.name} />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta
                name="twitter:image"
                content={`${companyInfo.url}${ogImage}`}
            />
            <meta name="twitter:site" content="@kraftodent" />

            {/* Canonical URL */}
            <link rel="canonical" href={currentUrl} />

            {/* Alternative languages - add when available */}
            <link rel="alternate" href={currentUrl} hrefLang="en-IN" />
            <link rel="alternate" href={currentUrl} hrefLang="x-default" />
        </Head>
    );
}
