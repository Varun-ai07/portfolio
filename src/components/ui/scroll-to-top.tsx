"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScroll();
    const { scrollYProgress } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        const isScrollingUp = latest < previous;
        const isFarDown = latest > 400;

        if (isScrollingUp && isFarDown) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    });

    // Smooth the scroll progress for the circle stroke
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-10 z-[100] cursor-pointer group"
                >
                    <div className="relative w-14 h-14 flex items-center justify-center">
                        {/* Circular Progress Background */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                                cx="28"
                                cy="28"
                                r="24"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.1)"
                                strokeWidth="4"
                            />
                            <motion.circle
                                cx="28"
                                cy="28"
                                r="24"
                                fill="none"
                                stroke="#A3FF00"
                                strokeWidth="4"
                                strokeDasharray="1"
                                style={{ pathLength: scrollYProgress }}
                                className="transition-all duration-200"
                            />
                        </svg>

                        {/* Centered Arrow */}
                        <div className="relative z-10 w-10 h-10 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover:border-[#A3FF00]/50 transition-colors">
                            <ArrowUp className="w-5 h-5 text-white group-hover:text-[#A3FF00] transition-colors" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
