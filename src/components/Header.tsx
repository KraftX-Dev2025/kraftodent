"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
    return (
        <motion.header
            className="bg-white py-4 sticky top-0 z-50 shadow-sm"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
                <Link href="/#hero" className="flex items-center">
                    <motion.div
                        className="relative h-8 w-24"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Image
                            src="/images/kraftodent-logo.svg"
                            alt="Kraftodent logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                </Link>

                {/* Mobile menu */}
                <div className="block md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <nav className="flex flex-col space-y-6 pt-12">
                                <Link
                                    href="/#hero"
                                    className="text-kraftodent-blue hover:text-kraftodent-accent font-medium"
                                >
                                    Our Story
                                </Link>
                                <Link
                                    href="/#product"
                                    className="text-kraftodent-blue hover:text-kraftodent-accent font-medium"
                                >
                                    Products
                                </Link>
                                <Link
                                    href="/#case-studies"
                                    className="text-kraftodent-blue hover:text-kraftodent-accent font-medium"
                                >
                                    Case Studies
                                </Link>
                                <Link
                                    href="/#analytics"
                                    className="text-kraftodent-blue hover:text-kraftodent-accent font-medium"
                                >
                                    Research
                                </Link>
                                <Link
                                    href="/#contact"
                                    className="text-kraftodent-blue hover:text-kraftodent-accent font-medium"
                                >
                                    Contact
                                </Link>
                                <div className="pt-4">
                                    <Button
                                        asChild
                                        className="w-full bg-kraftodent-blue text-white hover:bg-kraftodent-blue/90"
                                    >
                                        <Link href="/request-quote">
                                            Request Quote
                                        </Link>
                                    </Button>
                                </div>
                                <div className="pt-2">
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full border-kraftodent-blue text-kraftodent-blue"
                                    >
                                        <Link href="https://portal.kraftodent.com/">
                                            Distributor Login
                                        </Link>
                                    </Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop menu */}
                <nav className="hidden md:flex items-center space-x-8">
                    <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Link
                            href="/#hero"
                            className="text-kraftodent-blue hover:text-kraftodent-accent font-medium"
                        >
                            Our Story
                        </Link>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Link
                            href="/#product"
                            className="text-kraftodent-blue hover:text-kraftodent-accent font-medium"
                        >
                            Products
                        </Link>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Link
                            href="/#case-studies"
                            className="text-kraftodent-blue hover:text-kraftodent-accent font-medium"
                        >
                            Case Studies
                        </Link>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Link
                            href="/#analytics"
                            className="text-kraftodent-blue hover:text-kraftodent-accent font-medium"
                        >
                            Research
                        </Link>
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Link
                            href="/#contact"
                            className="text-kraftodent-blue hover:text-kraftodent-accent font-medium"
                        >
                            Contact
                        </Link>
                    </motion.div>
                </nav>

                <div className="hidden md:flex items-center space-x-4">
                    <Link
                        href="https://portal.kraftodent.com/"
                        className="text-kraftodent-blue hover:text-kraftodent-accent font-medium"
                    >
                        Distributor Login
                    </Link>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            asChild
                            className="bg-kraftodent-blue text-white hover:bg-kraftodent-blue/90"
                        >
                            <Link href="/request-quote">Request Quote</Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
