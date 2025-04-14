import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Kraftodent - AI Automation for Modern Dental Practices",
    description:
        "Transform your dental practice with AI-powered receptionist and CRM automation. Trusted by hundreds of dental practices across India.",
    keywords:
        "dental AI, dental automation, dental practice management, AI receptionist, dental CRM, Pune dental technology",
    authors: [{ name: "Kraftodent" }],
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://kraftodent.com",
        title: "Kraftodent - AI Automation for Modern Dental Practices",
        description:
            "Transform your dental practice with AI-powered receptionist and CRM automation.",
        siteName: "Kraftodent",
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
            </body>
        </html>
    );
}
