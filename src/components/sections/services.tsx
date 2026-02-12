"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Brain,
  Cpu,
  Database,
  Globe,
  Layers,
  Link as LinkIcon,
  Zap,
  Atom,
  Calculator,
  FileCode,
  Box,
  FastForward,
  Wind,
  Terminal,
  Code2
} from 'lucide-react';
import { TECH_STACK } from '@/lib/constants';
import { SectionHeader } from '@/components/ui/section-header';

interface TechItem {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  url: string;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}
const ParticleField = ({ color }: { color: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0.5],
            x: (Math.random() - 0.5) * 150,
            y: (Math.random() - 0.5) * 150,
            rotate: [0, 180],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeOut"
          }}
          className="absolute top-1/2 left-1/2 w-1 h-1 rounded-sm"
          style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }}
        />
      ))}
    </div>
  );
};

const GlitchText = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
  if (!isHovered) return <>{text}</>;
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{text}</span>
      <motion.span
        animate={{
          x: [0, -2, 2, -1, 0],
          opacity: [0, 0.5, 0.3, 0.6, 0],
        }}
        transition={{ duration: 0.2, repeat: Infinity }}
        className="absolute inset-0 z-0 text-[#ff00ea] mix-blend-screen"
      >
        {text}
      </motion.span>
      <motion.span
        animate={{
          x: [0, 2, -2, 1, 0],
          opacity: [0, 0.5, 0.3, 0.6, 0],
        }}
        transition={{ duration: 0.2, repeat: Infinity, delay: 0.1 }}
        className="absolute inset-0 z-0 text-[#00f3ff] mix-blend-screen"
      >
        {text}
      </motion.span>
    </span>
  );
};

const ScanningCategoryTitle = ({ title, index }: { title: string; index: number }) => {
  return (
    <div className="relative inline-block overflow-hidden">
      <motion.span
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: [0, 1, 0.8, 1],
          textShadow: [
            "0 0 0px transparent",
            "0 0 15px rgba(163, 255, 0, 0.3)",
            "0 0 5px rgba(163, 255, 0, 0.1)",
            "0 0 20px rgba(163, 255, 0, 0.5)"
          ]
        }}
        viewport={{ once: false }}
        transition={{
          duration: 0.8,
          ease: [0.19, 1, 0.22, 1],
          delay: index * 0.1
        }}
        className="relative z-10 block"
      >
        {title}
      </motion.span>
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: false }}
        transition={{ duration: 1.2, delay: 0.5 + index * 0.1, ease: "easeInOut" }}
        className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-[#A3FF00]/30 to-transparent z-20 pointer-events-none"
      />
    </div>
  );
};

const TechBadge = ({ item, index }: { item: TechItem; index: number }) => {
  const badgeRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);

    // Set CSS variables for holographic glow
    badgeRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
    badgeRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      ref={badgeRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{
        opacity: 0,
        rotateX: -90,
        y: 100,
        z: -100,
        perspective: 2000
      }}
      whileInView={{
        opacity: 1,
        rotateX: 0,
        y: 0,
        z: 0
      }}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.08,
      }}
      className="group relative flex items-center gap-4 sm:gap-5 p-4 sm:p-6 bg-[#0D0D0D]/40 backdrop-blur-2xl border border-white/5 hover:border-[#A3FF00]/40 transition-all duration-500 rounded-[4px] overflow-hidden"
    >
      {/* 3D Content Container */}
      <div className="flex items-center gap-5 relative z-10 w-full" style={{ transform: "translateZ(50px)" }}>
        {/* Icon Wrapper with Magnetic Effect */}
        <motion.div
          style={{
            x: useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], [-12, 12]),
          }}
          className="w-14 h-14 flex items-center justify-center rounded-[4px] flex-shrink-0 relative"
        >
          {/* Base Icon Background */}
          <div
            className="absolute inset-0 rounded-[4px] transition-all duration-500 group-hover:scale-110"
            style={{
              backgroundColor: item.color,
              boxShadow: `0 0 30px ${item.color}55`
            }}
          />

          {/* Icon Terminal/Symbol */}
          <div className={`relative z-10 text-white ${item.name === "Hardhat" || item.name === "React" ? "text-black" : ""}`}>
            {item.icon}
          </div>

          {/* Pulsing Aura */}
          <div className="absolute inset-0 rounded-[4px] border border-white/20 animate-pulse pointer-events-none" />
        </motion.div>

        {/* Text Content */}
        <div className="flex flex-col">
          <span className="text-white text-[16px] font-bold uppercase tracking-tight group-hover:text-[#A3FF00] transition-colors font-unique relative">
            <span className="relative z-10">
              <GlitchText text={item.name} isHovered={isHovered} />
            </span>
            {isHovered && <span className="absolute inset-0 text-shimmer z-0">{item.name}</span>}
          </span>
          <span className="text-[#666666] text-[12px] leading-tight font-medium tracking-wide group-hover:text-[#999999] transition-colors font-professional">
            {item.description}
          </span>
        </div>
      </div>

      {/* Particle Field on Hover */}
      {isHovered && <ParticleField color={item.color} />}

      {/* Pro Effects Layers */}

      {/* 1. Dynamic Brand Aura */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.12] transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)`
        }}
      />

      {/* 2. Holographic Glint Sweep */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: ['-150%', '300%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          className="absolute top-0 bottom-0 w-[60%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>

      {/* 3. Mouse-Following Glow (Interactive) */}
      <motion.div
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${item.color}15, transparent 40%)`,
        }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
      />

      {/* 4. Glass Edge Shine */}
      <div className="absolute inset-0 border border-white/5 group-hover:border-[#A3FF00]/20 rounded-[4px] transition-colors duration-500 pointer-events-none" />

      {/* 5. Corner Accents */}
      <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-[#A3FF00]/0 group-hover:border-[#A3FF00]/60 transition-all duration-300" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-[#A3FF00]/0 group-hover:border-[#A3FF00]/60 transition-all duration-300" />
    </motion.a>
  );
};

const TechArsenal = () => {
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="tech-stack" className="bg-black py-24 md:py-40 overflow-hidden">
      <div className="container mx-auto px-6 md:px-20 max-w-[1440px]">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Technical Proficiency"
          title="Tech Arsenal"
          description="Architecting the future with a production-grade stack across AI synthesis, quantum theory, and decentralized protocols."
        />

        {/* Categories Grid */}
        <div ref={containerRef} className="space-y-16 md:space-y-24">
          {TECH_STACK.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={isContainerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: catIndex * 0.2 }}
            >
              <h3 className="text-white text-[24px] md:text-[32px] font-bold uppercase tracking-tight mb-10 pb-4 border-b border-[#ffffff08] flex items-center justify-between font-unique relative group">
                <span className="relative">
                  <ScanningCategoryTitle title={category.title} index={catIndex} />
                  <span className="absolute inset-0 text-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {category.title}
                  </span>
                </span>
                <span className="text-[12px] text-[#444444] font-mono">0{catIndex + 1}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.items.map((item, itemIndex) => (
                  <TechBadge key={itemIndex} item={item} index={itemIndex} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        #tech-stack {
          position: relative;
        }
        #tech-stack::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #222, transparent);
        }
      `}</style>
    </section>
  );
};

export default TechArsenal;
