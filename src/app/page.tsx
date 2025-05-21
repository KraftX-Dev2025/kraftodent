"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import Features from "@/components/sections/Features";
import Product from "@/components/sections/Product";
import MissedCalls from "@/components/sections/MissedCalls";
import CaseStudies from "@/components/sections/CaseStudies";
import Benefits from "@/components/sections/Benefits";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Example from "@/components/sections/Example";
import Pricing from "@/components/sections/Pricing";
import ScrollToTop from "@/components/ui/ScrollToTop";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";
import { ThemeProvider } from "@/components/ThemeProvider";

// Dynamically import the Hero component with client-side only
const Hero = dynamic(() => import("@/components/sections/Hero"), {
    ssr: false,
});

export default function Home() {
    // Initialize smooth scrolling for anchor links - only runs on client
    useEffect(() => {
        // Check if we're in the browser environment
        if (typeof window === "undefined") return;

        // Smooth scroll function for anchor links
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest("a");

            if (
                anchor &&
                anchor.hash &&
                anchor.hash.startsWith("#") &&
                anchor.href.includes(window.location.pathname)
            ) {
                e.preventDefault();

                const targetElement = document.querySelector(anchor.hash);
                if (targetElement) {
                    window.scrollTo({
                        top:
                            targetElement.getBoundingClientRect().top +
                            window.scrollY -
                            100, // Offset for fixed header
                        behavior: "smooth",
                    });

                    // Update URL without causing a page jump
                    window.history.pushState(null, "", anchor.hash);
                }
            }
        };

        document.addEventListener("click", handleAnchorClick);

        return () => {
            document.removeEventListener("click", handleAnchorClick);
        };
    }, []);

    // Add structured data for the homepage
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Kraftodent - AI Automation for Dental Practices",
        url: "https://kraftodent.com",
        potentialAction: {
            "@type": "SearchAction",
            target: "https://kraftodent.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
        },
        description:
            "Kraftodent provides AI-powered receptionist and practice management solutions for dental practices in India. Reduce staff workload and improve patient satisfaction.",
        inLanguage: "en-IN",
        author: {
            "@type": "Organization",
            name: "Kraftodent",
            url: "https://kraftodent.com",
        },
    };

    return (
        <ThemeProvider defaultTheme="light">
            {/* Structured Data for Homepage */}
            <Script
                id="structured-data-homepage"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />

            <main className="min-h-screen bg-white">
                <Navbar />
                <Hero />
                <Example />
                <Features />
                <Product />
                <MissedCalls />
                <Benefits />
                <CaseStudies />
                <Pricing />
                <CTABanner />
                <FAQ />
                <Contact />
                <Footer />
                <ScrollToTop />
            </main>
        </ThemeProvider>
    );
}
