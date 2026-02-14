import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    distance?: number;
}

/**
 * ScrollReveal Component
 * 
 * A premium wrapper that adds a coordinated "reveal" effect 
 * as children enter the viewport. Includes subtle parallax.
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    delay = 0,
    direction = 'up',
    distance = 0
}) => {
    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directions[direction],
                scale: 0.95
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1
            }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
                duration: 1,
                delay,
                ease: [0.19, 1, 0.22, 1]
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
