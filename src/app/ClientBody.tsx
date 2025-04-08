"use client";

import { useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

export function ClientBody({ children }: { children: React.ReactNode }) {
    // Remove any extension-added classes during hydration
    useEffect(() => {
        // This runs only on the client after hydration
        document.body.className = "antialiased";
    }, []);

    return (
        <LazyMotion features={domAnimation}>
            <body
                className="antialiased min-h-screen font-manrope bg-kraftodent-blue-50"
                suppressHydrationWarning
            >
                {children}
            </body>
        </LazyMotion>
    );
}
