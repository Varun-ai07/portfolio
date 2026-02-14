import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
    text: string;
    delay?: number;
    speed?: number;
    deleteSpeed?: number;
    pauseBeforeDelete?: number;
    className?: string;
    highlightWords?: string[];
    highlightColor?: string;
}

export const Typewriter = ({
    text,
    delay = 800,
    speed = 50,
    deleteSpeed = 30,
    pauseBeforeDelete = 2000,
    className = "",
    highlightWords = [],
    highlightColor = "text-[#A3FF00]"
}: TypewriterProps) => {
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const animate = () => {
            if (!isDeleting && displayText.length < text.length) {
                // Typing forward - type 4 chars at once for speed
                timeout = setTimeout(() => {
                    setDisplayText(text.slice(0, Math.min(text.length, displayText.length + 4)));
                }, speed);
            } else if (!isDeleting && displayText.length === text.length) {
                // Finished typing, pause before deleting
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, pauseBeforeDelete);
            } else if (isDeleting && displayText.length > 0) {
                // Deleting backward - delete 4 chars at once
                timeout = setTimeout(() => {
                    setDisplayText(text.slice(0, Math.max(0, displayText.length - 4)));
                }, deleteSpeed);
            } else if (isDeleting && displayText.length === 0) {
                // Finished deleting
                setIsComplete(true);
            }
        };

        const initialTimeout = setTimeout(animate, delay);

        return () => {
            clearTimeout(timeout);
            clearTimeout(initialTimeout);
        };
    }, [displayText, isDeleting, text, delay, speed, deleteSpeed, pauseBeforeDelete]);

    // Function to highlight specific words/phrases with character-level granularity
    const renderTextWithHighlights = () => {
        if (!text) return null;

        // 1. Map out which indices should be highlighted
        const highlightIndices = new Set<number>();
        highlightWords.forEach(word => {
            let startIndex = 0;
            while ((startIndex = text.indexOf(word, startIndex)) !== -1) {
                for (let i = startIndex; i < startIndex + word.length; i++) {
                    highlightIndices.add(i);
                }
                startIndex += word.length;
            }
        });

        // 2. Render characters with correct styling
        const characters = displayText.split('');
        return characters.map((char, index) => {
            const isHighlighted = highlightIndices.has(index);
            return (
                <span
                    key={index}
                    className={`${isHighlighted ? highlightColor : ""} animate-in fade-in zoom-in-95 duration-100 fill-mode-forwards`}
                >
                    {char}
                </span>
            );
        });
    };

    return (
        <span className={className}>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {renderTextWithHighlights()}
            </motion.span>
            {!isComplete && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className={`inline-block ml-1 ${highlightColor}`}
                >
                    |
                </motion.span>
            )}
        </span>
    );
};
