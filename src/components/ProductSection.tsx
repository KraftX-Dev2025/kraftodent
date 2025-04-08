"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ProductSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <section id="product" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                        OUR PRODUCTS
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Your complete dental solution{" "}
                        <span className="text-gray-500">
                            for modern practices.
                        </span>
                    </h2>
                    <p className="text-gray-500">
                        Superior Quality. Better Results.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Feature Card 1 */}
                    <motion.div
                        className="bg-kraftodent-blue-50 rounded-xl p-6 shadow-sm"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/images/play-button.svg"
                                alt="Icon"
                                width={24}
                                height={24}
                                className="text-kraftodent-accent"
                            />
                            <h3 className="font-semibold text-xl">
                                Premium Composite
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            High-quality dental composite for lasting
                            restorations.
                        </p>
                        <div className="rounded-lg bg-white p-2 h-40 relative">
                            <Image
                                src="/images/product-image-01.webp"
                                alt="Premium Composite"
                                fill
                                className="object-contain rounded-lg"
                            />
                        </div>
                    </motion.div>

                    {/* Feature Card 2 */}
                    <motion.div
                        className="bg-kraftodent-blue-50 rounded-xl p-6 shadow-sm"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/images/play-button.svg"
                                alt="Icon"
                                width={24}
                                height={24}
                                className="text-kraftodent-accent"
                            />
                            <h3 className="font-semibold text-xl">
                                Advanced Bonding Agents
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Superior adhesion technology for long-lasting
                            results.
                        </p>
                        <div className="rounded-lg bg-white p-2 h-40 relative">
                            <Image
                                src="/images/product-image-02.webp"
                                alt="Bonding Agents"
                                fill
                                className="object-contain rounded-lg"
                            />
                        </div>
                    </motion.div>

                    {/* Feature Card 3 */}
                    <motion.div
                        className="bg-kraftodent-blue-50 rounded-xl p-6 shadow-sm"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/images/play-button.svg"
                                alt="Icon"
                                width={24}
                                height={24}
                                className="text-kraftodent-accent"
                            />
                            <h3 className="font-semibold text-xl">
                                Whitening Systems
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Professional whitening solutions for your practice.
                        </p>
                        <div className="rounded-lg bg-white p-2 h-40 relative">
                            <Image
                                src="/images/product-image-03.webp"
                                alt="Whitening Systems"
                                fill
                                className="object-contain rounded-lg"
                            />
                        </div>
                    </motion.div>

                    {/* Feature Card 4 */}
                    <motion.div
                        className="bg-kraftodent-blue-50 rounded-xl p-6 shadow-sm"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/images/play-button.svg"
                                alt="Icon"
                                width={24}
                                height={24}
                                className="text-kraftodent-accent"
                            />
                            <h3 className="font-semibold text-xl">
                                Impression Materials
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Precise impression materials for perfect-fit
                            restorations.
                        </p>
                        <div className="rounded-lg bg-white p-2 h-40 relative">
                            <Image
                                src="/images/product-image-04.webp"
                                alt="Impression Materials"
                                fill
                                className="object-contain rounded-lg"
                            />
                        </div>
                    </motion.div>

                    {/* Feature Card 5 */}
                    <motion.div
                        className="bg-kraftodent-blue-50 rounded-xl p-6 shadow-sm"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/images/play-button.svg"
                                alt="Icon"
                                width={24}
                                height={24}
                                className="text-kraftodent-accent"
                            />
                            <h3 className="font-semibold text-xl">
                                Infection Control
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Comprehensive solutions for practice disinfection
                            and safety.
                        </p>
                        <div className="rounded-lg bg-white p-2 h-40 relative">
                            <Image
                                src="/images/product-image-05.webp"
                                alt="Infection Control"
                                fill
                                className="object-contain rounded-lg"
                            />
                        </div>
                    </motion.div>

                    {/* Feature Card 6 */}
                    <motion.div
                        className="bg-kraftodent-blue-50 rounded-xl p-6 shadow-sm"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/images/play-button.svg"
                                alt="Icon"
                                width={24}
                                height={24}
                                className="text-kraftodent-accent"
                            />
                            <h3 className="font-semibold text-xl">
                                Cements & Liners
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Reliable dental cements for secure restorations.
                        </p>
                        <div className="rounded-lg bg-white p-2 h-40 relative">
                            <Image
                                src="/images/product-image-06.webp"
                                alt="Cements & Liners"
                                fill
                                className="object-contain rounded-lg"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductSection;
