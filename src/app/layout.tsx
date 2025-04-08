import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClientBody } from "@/app/ClientBody";

const manrope = localFont({
    src: "../../public/fonts/Manrope-VariableFont.ttf",
    variable: "--font-manrope",
    display: "swap",
});

const inter = localFont({
    src: "../../public/fonts/Inter-VariableFont.ttf",
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Kraftodent | Premium Dental Products & Supplies",
    description:
        "Kraftodent offers high-quality dental supplies and products for dental clinics and practitioners across India. Trusted by hundreds of dental professionals nationwide.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
            <ClientBody>{children}</ClientBody>
        </html>
    );
}
