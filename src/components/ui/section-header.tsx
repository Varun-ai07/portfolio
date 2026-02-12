"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
    eyebrow: string;
    title: string;
    description?: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
    showScanningEffect?: boolean;
}

export const ScanningTitle = ({ title, className = "", showEffect = true }: { title: string; className?: string; showEffect?: boolean }) => {
    return (
        <div className={`relative inline-block overflow-hidden ${className}`}>
            <motion.span
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{
                    y: 0,
                    opacity: showEffect ? [0, 1, 0.8, 1] : 1,
                    textShadow: showEffect ? [
                        "0 0 0px transparent",
                        "0 0 20px rgba(163, 255, 0, 0.4)",
                        "0 0 10px rgba(163, 255, 0, 0.2)",
                        "0 0 30px rgba(163, 255, 0, 0.6)"
                    ] : "none"
                }}
                viewport={{ once: false }}
                transition={{
                    duration: 1,
                    ease: [0.19, 1, 0.22, 1]
                }}
                className="relative z-10 block"
            >
                {title}
            </motion.span>
            {showEffect && (
                <motion.div
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "100%" }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
                    className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-[#A3FF00]/40 to-transparent z-20 pointer-events-none"
                />
            )}
        </div>
    );
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    eyebrow,
    title,
    description,
    align = 'left',
    className = "",
    showScanningEffect = true
}) => {
    const alignmentClass = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end'
    }[align];

    return (
        <div className={`flex flex-col ${alignmentClass} mb-24 ${className}`}>
            {/* Eyebrow */}
            <motion.span
                initial={{ opacity: 0, x: align === 'left' ? -10 : align === 'right' ? 10 : 0, letterSpacing: "0.2em" }}
                whileInView={{ opacity: 1, x: 0, letterSpacing: "0.4em" }}
                viewport={{ once: false }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="font-eyebrow mb-6 block text-[12px] text-[#A3FF00] uppercase"
            >
                {eyebrow}
            </motion.span>

            {/* Main Title */}
            <h2 className="text-white text-[clamp(2.5rem,8vw,5rem)] leading-none tracking-tighter uppercase font-bold mb-8 font-unique text-glow-neon">
                <ScanningTitle title={title} showEffect={showScanningEffect} />
            </h2>

            {/* Description */}
            {description && (
                <motion.div
                    className="max-w-2xl text-[#888888] text-[18px] md:text-[20px] leading-relaxed font-light font-professional"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } }
                    }}
                >
                    {description.split(" ").map((word, i) => (
                        <motion.span
                            key={i}
                            className="inline-block mr-[0.25em]"
                            variants={{
                                hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
                                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } }
                            }}
                            whileHover={{
                                color: "#A3FF00",
                                scale: 1.1,
                                transition: { duration: 0.2 }
                            }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.div>
            )}
        </div>
    );
};
