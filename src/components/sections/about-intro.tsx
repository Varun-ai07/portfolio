import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ABOUT_DATA } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * AboutIntro Component
 * 
 * A text-heavy section with a scroll-linked highlighting effect.
 * The words transition from a muted state to full white as the user scrolls.
 */
const AboutIntro = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const text = ABOUT_DATA.highlightText;

  const words = text.split(" ");

  // Scroll tracking for the high-level highlight effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  return (
    <section
      ref={containerRef}
      style={{ position: 'relative' }}
      id="about"
      className="relative w-full bg-[#000000] py-[120px] md:py-[180px] flex items-center justify-center overflow-hidden"
    >
      <div className="container px-6 md:px-20 max-w-[1440px] mx-auto">
        <SectionHeader
          eyebrow="Mission & Philosophy"
          title="The Architect"
          className="mb-16 md:mb-20"
        />

        <div className="flex flex-col items-start">
          <div className="w-full max-w-[1100px]">
            <p className="flex flex-wrap text-left text-[28px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-[-0.03em] uppercase transition-colors font-unique">
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
    <span className="relative mr-[0.3em] my-[0.1em] perspective-[1000px]">
      <motion.span
        style={{ opacity }}
        className="text-white inline-block cursor-default transition-all duration-300"
        whileHover={{
          opacity: 1,
          scale: 1.1,
          y: -5,
          color: "#A3FF00",
          textShadow: "0 0 20px rgba(163, 255, 0, 0.6)"
        }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default AboutIntro;