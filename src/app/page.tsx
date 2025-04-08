"use client";

import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import BattleTestedSection from "@/components/BattleTestedSection";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <AnimatePresence mode="wait">
            <motion.main
                className="flex min-h-screen flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Header />
                <HeroSection />
                <ProductSection />
                <BattleTestedSection />
                <Footer />
            </motion.main>
        </AnimatePresence>
    );
}
