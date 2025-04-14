"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Features from "@/components/sections/Features";
import Product from "@/components/sections/Product";
import Analytics from "@/components/sections/Analytics";
import CaseStudies from "@/components/sections/CaseStudies";
import Benefits from "@/components/sections/Benefits";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
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

    return (
        <ThemeProvider defaultTheme="light">
            <main className="min-h-screen bg-white">
                <Navbar />
                <Hero />
                <Features />
                <Product />
                <Analytics />
                <CaseStudies />
                <Benefits />
                <Contact />
                <Footer />
                <ScrollToTop />
            </main>
        </ThemeProvider>
    );
}
