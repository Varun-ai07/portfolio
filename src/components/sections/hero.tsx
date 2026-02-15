import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useAnimate, stagger, useInView } from 'framer-motion';
import { HERO_DATA } from '@/lib/constants';
import { ScanningTitle } from '@/components/ui/section-header';
import { usePerformance } from '@/hooks/use-performance';
import SplineBackground from '@/components/ui/spline-background';

const MagneticButton = ({ children, href, variant = 'primary', className = "" }: { children: React.ReactNode, href: string, variant?: 'primary' | 'secondary', className?: string }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={`group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden transition-all duration-300 rounded-[4px] ${variant === 'primary'
        ? 'bg-[#A3FF00] text-black'
        : 'bg-transparent border border-white/20 text-white hover:border-white'
        } ${className}`}
    >
      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
      <span className="relative z-10 text-[14px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-black">
        {children}
      </span>
    </motion.a>
  );
};

import { useIsMobile } from '@/hooks/use-mobile';
import VideoBackground from '@/components/ui/video-background';

/**
 * Hero Section for Varun P Portfolio
 * 
 * Features:
 * - 3D Spline viewer as background
 * - Large bold typography with Varun's info
 * - CTA buttons
 * - Responsive layout
 */
const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const [splineLoaded, setSplineLoaded] = useState(false);
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 800], [1, 1.15]); // Slightly reduced scale for performance
  const [scope, animate] = useAnimate();
  const isLite = usePerformance();
  const isMobile = useIsMobile();

  useEffect(() => {
    const sequence = async () => {
      // 1. Initial Fade Print
      await animate(".word", { opacity: 1, y: 0 }, {
        duration: 0.3,
        delay: stagger(0.045, { startDelay: 0.8 }),
        ease: "easeOut"
      });

      // 2. Wait 1s (Pauses exactly at 'Technology.')
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 3. Return (Reverse) from 'Technology.' backwards to 'systems'
      await animate(".word", { opacity: 0, y: 5 }, {
        duration: 0.25,
        delay: stagger(0.035, { from: "last" }),
        ease: "easeIn"
      });

      // 4. Come Again
      await animate(".word", { opacity: 1, y: 0 }, {
        duration: 0.4,
        delay: stagger(0.045),
        ease: "easeOut"
      });
    };

    sequence();
  }, [animate]);


  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Background is now local to this section to stay on the first page */}
      {isMobile ? <VideoBackground /> : <SplineBackground />}



      {/* Content Layer */}
      <motion.div
        className="relative z-20 w-full max-w-[1440px] px-6 md:px-20 pt-32 pb-20 md:pt-0 md:pb-0 flex flex-col items-center md:items-start text-center md:text-left [will-change:transform,opacity]"
        initial={{ scale: 1.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ scale }}
      >
        {/* Eyebrow */}
        <div className="mb-4 md:mb-8 animate-in fade-in slide-in-from-left-4 duration-1000">
          <span className="font-eyebrow !font-sans text-[#A3FF00] text-[12px] md:text-[14px]">
            {HERO_DATA.eyebrow}
          </span>
        </div>

        {/* Main Heading */}
        <div className="mb-6 md:mb-8 animate-in fade-in slide-in-from-left-8 duration-1000 w-full">
          <h1 className="text-white drop-shadow-2xl">
            <ScanningTitle title={HERO_DATA.title} showEffect={false} />
          </h1>
        </div>

        {/* Description with Character Typewriter Effect */}
        <div className="mb-8 md:mb-12 max-w-[800px]" ref={scope}>
          <p className="text-[14px] md:text-[22px] leading-[1.6] text-white/90 font-light tracking-wide flex flex-wrap justify-center md:justify-start">
            {[...HERO_DATA.description.prefix.trim().split(" "), ...HERO_DATA.description.highlightPaths.flatMap(p => p.text.split(" ").filter(w => w !== ""))].map((word, wordIndex) => {
              // Determine color for the word
              let color = "text-white";
              HERO_DATA.description.highlightPaths.forEach(path => {
                if (path.text.includes(word)) color = path.color;
              });

              return (
                <span
                  key={wordIndex}
                  className={`word inline-block mr-[0.25em] opacity-0 translate-y-[5px] ${color}`}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>

        {/* Education Tag */}
        <div className="mb-10 md:mb-12 animate-in fade-in slide-in-from-left-10 duration-1000">
          <p className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-white/40 font-bold font-mono">
            {HERO_DATA.education}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 animate-in fade-in slide-in-from-left-12 duration-1000 w-full sm:w-auto">
          <MagneticButton href="#tech-stack" className="w-full sm:w-auto">
            Tech Arsenal
          </MagneticButton>

          <MagneticButton href="#projects" variant="secondary" className="w-full sm:w-auto">
            Explore Projects
          </MagneticButton>
        </div>

        {/* Code Block Visual with White Side Glow */}
        <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2">
          <motion.div
            className="relative bg-[#0B0B0B]/90 border border-[#333333] p-6 backdrop-blur-sm max-w-[400px] overflow-hidden"
            initial={{ scale: 1.5, opacity: 0, x: 50 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              boxShadow: 'rgba(255, 255, 255, 0.15) -20px 0px 60px -10px, rgba(255, 255, 255, 0.15) 20px 0px 60px -10px',
              willChange: 'transform, opacity'
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: 'rgba(255, 255, 255, 0.25) -25px 0px 75px -10px, rgba(255, 255, 255, 0.25) 25px 0px 75px -10px',
              borderColor: 'rgba(255, 255, 255, 0.4)'
            }}
          >
            <div className="relative z-10">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27CA40]" />
              </div>
              <pre className="text-[12px] font-mono leading-[1.8]">
                <code>
                  <span className="text-[#FF79C6]">class</span> <span className="text-[#A3FF00]">QuantumArchitect</span>:
                  {'\n'}  <span className="text-[#FF79C6]">def</span> <span className="text-[#8BE9FD]">__init__</span>(self):
                  {'\n'}    self.name = <span className="text-[#F1FA8C]">"VARUN P"</span>
                  {'\n'}    self.domain = <span className="text-[#F1FA8C]">"AI × Quantum × Web3"</span>
                  {'\n'}    self.skills = [
                  {'\n'}      <span className="text-[#F1FA8C]">"Agentic AI Systems"</span>,
                  {'\n'}      <span className="text-[#F1FA8C]">"Quantum Optimization"</span>,
                  {'\n'}      <span className="text-[#F1FA8C]">"Blockchain Integration"</span>
                  {'\n'}    ]
                  {'\n'}
                  {'\n'}  <span className="text-[#FF79C6]">def</span> <span className="text-[#8BE9FD]">build_future</span>(self):
                  {'\n'}    <span className="text-[#FF79C6]">return</span> <span className="text-[#F1FA8C]">"Intelligent Systems"</span>
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Viewfinder Decorative Corners */}
      <div className="absolute bottom-10 left-6 md:left-20 pointer-events-none hidden md:block z-20">
        <div className="relative w-8 h-8">
          <div className="viewfinder-corner viewfinder-bl border-[#A3FF00]/40" />
        </div>
      </div>
      <div className="absolute bottom-10 right-6 md:right-20 pointer-events-none hidden md:block z-20">
        <div className="relative w-8 h-8">
          <div className="viewfinder-corner viewfinder-br border-[#A3FF00]/40" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#A3FF00] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
