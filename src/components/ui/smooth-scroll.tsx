"use client";

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { usePerformance } from '@/hooks/use-performance';

/**
 * SmoothScroll Component
 * 
 * Integrates Lenis for high-performance smooth scrolling.
 * Wraps the application content to provide a luxurious, weighted scroll feel.
 */
const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isLite = usePerformance();

    useEffect(() => {
        // If Lite mode is active, we might want to disable Lenis entirely or run it in a very lightweight config
        // For now, we'll keep it but with very performant settings
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        const lenis = new Lenis({
            duration: isLite ? 0.5 : (isMobile ? 0.6 : 0.8), // Faster/Native-like scroll on Lite
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: !isLite, // Disable smooth wheel interpolation on weak devices
            wheelMultiplier: isLite || isMobile ? 1 : 0.8, // Default feel on mobile/lite
            touchMultiplier: isMobile ? 1.5 : 1.5,
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, [isLite]);

    return <div className="relative">{children}</div>;
};

export default SmoothScroll;
