import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * AboutIntro Component
 * 
 * A text-heavy section with a scroll-linked highlighting effect.
 * The words transition from a muted state to full white as the user scrolls.
 */
const AboutIntro = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const text =
    "I architect intelligent systems that bridge theoretical research and production deployment. My work spans from optimizing quantum circuits with graph neural networks to building AI-powered platforms with blockchain verification.";

  const words = text.split(" ");

  // Scroll tracking for the high-level highlight effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full bg-[#000000] py-[160px] flex items-center justify-center overflow-hidden"
    >
      <div className="container px-6 md:px-20 max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[1100px]">
            <p className="flex flex-wrap text-left text-[32px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] tracking-[-0.03em] uppercase transition-colors">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                  <Word key={i} range={[start, end]} progress={scrollYProgress}>
                    {word}
                  </Word>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

interface WordProps {
  children: string;
  range: [number, number];
  progress: any;
}

const Word: React.FC<WordProps> = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <span className="relative mr-[0.3em] my-[0.1em]">
      <motion.span
        style={{ opacity }}
        className="text-white inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default AboutIntro;