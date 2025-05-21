import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script";
import { companyInfo } from "@/lib/constants";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap", // Optimize font loading
});

// Separate viewport configuration from metadata
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export const metadata: Metadata = {
    metadataBase: new URL(companyInfo.url),
    title: {
        template: "%s | Kraftodent - AI Automation for Dental Practices",
        default:
            "Kraftodent - AI Automation for Modern Dental Practices in India",
    },
    description:
        "Transform your dental practice with Kraftodent's AI-powered receptionist and CRM automation. Reduce costs by 40%, save 25+ staff hours weekly, and improve patient experience. Trusted by 100+ dental practices across India.",
    keywords:
        "dental AI, dental automation, dental practice management, AI receptionist, dental CRM, Pune dental technology, virtual dental assistant, dental practice efficiency, dental appointment scheduling, dental AI India",
    authors: [{ name: companyInfo.name, url: companyInfo.url }],
    creator: companyInfo.name,
    publisher: companyInfo.name,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-video-preview": -1,
            "max-snippet": -1,
        },
    },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            {
                url: "/favicon/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                url: "/favicon/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                url: "/favicon/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                url: "/favicon/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
        apple: [
            {
                url: "/favicon/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
        other: [
            {
                rel: "mask-icon",
                url: "/favicon/safari-pinned-tab.svg",
                color: "#2563eb",
            },
        ],
    },
    manifest: "/site.webmanifest",
    alternates: {
        canonical: "/",
        languages: {
            "en-US": "/en-us",
            "hi-IN": "/hi-in",
        },
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        alternateLocale: ["en_US", "hi_IN"],
        url: companyInfo.url,
        title: "Kraftodent - AI Automation for Modern Dental Practices",
        description:
            "Transform your dental practice with AI-powered receptionist and CRM automation. Reduce costs by 40% and improve patient satisfaction by 98%.",
        siteName: companyInfo.name,
        images: [
            {
                url: `${companyInfo.url}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: "Kraftodent AI dental receptionist transforming dental practices in India",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Kraftodent - AI Automation for Modern Dental Practices",
        description:
            "Transform your dental practice with AI-powered receptionist and CRM automation. Reduce costs by 40% and improve patient satisfaction by 98%.",
        images: [`${companyInfo.url}/twitter-image.jpg`],
        creator: "@kraftodent",
        site: "@kraftodent",
    },
    verification: {
        google: "google-site-verification-code",
    },
    category: "technology",
    applicationName: "Kraftodent",
    other: {
        "theme-color": "#2563eb",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                {children}
                <Script
                    id="structured-data-local-business"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "SoftwareApplication",
                            name: "Kraftodent",
                            applicationCategory: "BusinessApplication",
                            operatingSystem: "Cloud-based",
                            offers: {
                                "@type": "Offer",
                                price: "25000.00",
                                priceCurrency: "INR",
                            },
                            aggregateRating: {
                                "@type": "AggregateRating",
                                ratingValue: "4.8",
                                ratingCount: "98",
                            },
                            description:
                                "AI-powered receptionist and CRM automation for dental practices in India",
                            potentialAction: {
                                "@type": "ViewAction",
                                target: `${companyInfo.url}/contact`,
                            },
                        }),
                    }}
                />
                <Script
                    id="structured-data-organization"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: companyInfo.name,
                            url: companyInfo.url,
                            logo: companyInfo.logo,
                            sameAs: [
                                companyInfo.social.facebook,
                                companyInfo.social.twitter,
                                companyInfo.social.instagram,
                                companyInfo.social.linkedin,
                            ],
                            contactPoint: {
                                "@type": "ContactPoint",
                                telephone: companyInfo.contact.phone,
                                contactType: "customer service",
                                email: companyInfo.contact.email,
                                areaServed: "IN",
                                availableLanguage: ["English", "Hindi"],
                            },
                            address: {
                                "@type": "PostalAddress",
                                addressLocality: companyInfo.address.city,
                                addressRegion: companyInfo.address.state,
                                addressCountry: companyInfo.address.country,
                            },
                        }),
                    }}
                />
            </body>
        </html>
    );
}