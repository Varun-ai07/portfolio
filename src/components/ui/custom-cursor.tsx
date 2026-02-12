"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Optimized springs for better performance
    const springConfig = { stiffness: 400, damping: 35 }; // Reduced from 800
    const trailConfig = { stiffness: 250, damping: 30 }; // Reduced from 500

    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    const trailX = useSpring(cursorX, trailConfig);
    const trailY = useSpring(cursorY, trailConfig);

    // Echo trail springs
    const echoX = useSpring(cursorX, { stiffness: 150, damping: 25 }); // Reduced from 200
    const echoY = useSpring(cursorY, { stiffness: 150, damping: 25 });

    useEffect(() => {
        // Detect if the device has a fine pointer (mouse/trackpad)
        const pointerFine = window.matchMedia('(pointer: fine)');
        setIsTouchDevice(!pointerFine.matches);
        setIsMounted(true);

        let timeoutId: NodeJS.Timeout;

        // Throttle cursor updates for better performance
        const moveCursor = (e: MouseEvent) => {
            if (timeoutId) return;

            timeoutId = setTimeout(() => {
                cursorX.set(e.clientX);
                cursorY.set(e.clientY);
                if (!isVisible) setIsVisible(true);
                timeoutId = null as any;
            }, 16); // ~60fps
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        if (pointerFine.matches) {
            window.addEventListener('mousemove', moveCursor, { passive: true });
            window.addEventListener('mouseover', handleMouseOver, { passive: true });
        }

        const handlePointerChange = (e: MediaQueryListEvent) => {
            setIsTouchDevice(!e.matches);
        };
        pointerFine.addEventListener('change', handlePointerChange);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            pointerFine.removeEventListener('change', handlePointerChange);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isMounted || isTouchDevice) return null;

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
            {/* Primary Outer Circle */}
            <motion.div
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 2.5 : 1,
                    opacity: isVisible ? 1 : 0
                }}
                className="w-8 h-8 border border-[#A3FF00]/40 rounded-full flex items-center justify-center transition-transform duration-300"
            >
                {/* Rapid inner ring for hover state */}
                {isHovering && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-full h-full border border-[#A3FF00]/20 rounded-full animate-ping"
                    />
                )}
            </motion.div>

            {/* Trailing Dot */}
            <motion.div
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isVisible ? 1 : 0
                }}
                className="absolute w-1.5 h-1.5 bg-[#A3FF00] rounded-full shadow-[0_0_10px_#A3FF00]"
            />

            {/* Secondary Trailing Echo */}
            <motion.div
                style={{
                    x: echoX,
                    y: echoY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    opacity: (isVisible && !isHovering) ? 0.3 : 0
                }}
                className="absolute w-1 h-1 bg-[#00F3FF] rounded-full"
            />
        </div>
    );
};

export default CustomCursor;
