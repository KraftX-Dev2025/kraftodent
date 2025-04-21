import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Mark component as mounted
        setIsMounted(true);

        // Show button when page is scrolled down
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Add throttling to prevent excessive function calls
        let throttleTimer: ReturnType<typeof setTimeout>;
        const throttle = (callback: Function, time: number) => {
            if (throttleTimer) return;
            throttleTimer = setTimeout(() => {
                callback();
                throttleTimer = undefined as any;
            }, time);
        };

        const handleScroll = () => {
            throttle(toggleVisibility, 200);
        };

        // Set the top of the page
        window.addEventListener("scroll", handleScroll);

        // Initial check
        toggleVisibility();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Only render the button on the client
    if (!isMounted) return null;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 p-2 md:p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none z-50"
                    aria-label="Scroll to top"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ArrowUp className="h-5 w-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
