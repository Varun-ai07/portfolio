import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { PROJECTS } from '@/lib/constants';
import { SectionHeader } from '@/components/ui/section-header';
import { usePerformance } from '@/hooks/use-performance';

/**
 * FeaturedGallery Component - Varun's Projects
 * Features project cards with icons, descriptions, and tech tags
 * Includes scroll lock during animation for focused viewing experience
 */

interface Project {
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  techStack: string[];
  status: string;
  statusColor: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isLite = usePerformance();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      clipPath: 'inset(100% 0 0 0)',
      y: 40
    },
    visible: {
      opacity: 1,
      clipPath: 'inset(0% 0 0 0)',
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      className={`group relative border border-[#ffffff08] p-6 sm:p-10 transition-all duration-700 hover:border-[#A3FF00]/30 hover:bg-[#111111]/60 overflow-hidden rounded-[4px] ${isLite
        ? 'bg-[#0D0D0D]' // Opaque background for Lite Mode (no blur cost)
        : 'bg-[#0D0D0D]/40 backdrop-blur-md md:backdrop-blur-xl' // Frosted glass for High Perf
        }`}
    >
      {/* Vertical Left Side Bar (Sequential - Once) with Neon Glow */}
      <div className="absolute left-0 top-0 bottom-0 w-[4px] overflow-hidden">
        {/* Background track */}
        <div className="absolute inset-0 bg-[#ffffff08]" />

        {/* Main gradient fill */}
        <motion.div
          className="absolute left-0 top-0 w-full bg-gradient-to-b from-[#A3FF00] via-[#00F3FF] to-[#A3FF00]"
          initial={{ height: "0%" }}
          whileInView={{
            height: "100%",
            transition: {
              duration: 0.3,
              ease: "easeOut",
              delay: index * 0.2
            }
          }}
          viewport={{ once: false }}
        />

        {/* Animated shine effect */}
        <motion.div
          className="absolute left-0 top-0 w-full h-[50px] bg-gradient-to-b from-white/40 to-transparent"
          initial={{ y: "-50px", opacity: 0 }}
          whileInView={{
            y: "100%",
            opacity: [0, 0.8, 0],
            transition: {
              duration: 0.5,
              ease: "easeInOut",
              delay: index * 0.2 + 0.1
            }
          }}
          viewport={{ once: false }}
        />

        {/* Neon glow effect */}
        <motion.div
          className="absolute left-0 top-0 w-[15px] -translate-x-[5px] blur-lg"
          initial={{ height: "0%", opacity: 0 }}
          whileInView={{
            height: "100%",
            opacity: [0, 1, 0.85],
            transition: {
              duration: 0.3,
              ease: "easeOut",
              delay: index * 0.2
            }
          }}
          viewport={{ once: false }}
          style={{
            background: 'linear-gradient(to bottom, rgba(163, 255, 0, 0.9), rgba(0, 243, 255, 0.7), rgba(163, 255, 0, 0.9))',
            boxShadow: '0 0 25px rgba(163, 255, 0, 0.9), 0 0 45px rgba(163, 255, 0, 0.5)'
          }}
        />

        {/* Pulsing top indicator */}
        <motion.div
          className="absolute left-0 top-0 w-full h-[25px] bg-[#A3FF00]"
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: [0, 1, 1],
            transition: {
              duration: 0.2,
              delay: index * 0.2
            }
          }}
          animate={{
            boxShadow: [
              '0 0 10px rgba(163, 255, 0, 0.8)',
              '0 0 25px rgba(163, 255, 0, 1)',
              '0 0 10px rgba(163, 255, 0, 0.8)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          viewport={{ once: false }}
        />
      </div>

      {/* Diagonal Light Sweep (Left to Bottom) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: [0, 0.6, 0],
          transition: {
            duration: 0.6,
            delay: index * 0.2 + 0.1,
            ease: "easeInOut"
          }
        }}
        viewport={{ once: false }}
        style={{
          background: 'linear-gradient(135deg, rgba(163, 255, 0, 0.15) 0%, rgba(0, 243, 255, 0.1) 50%, transparent 100%)',
          clipPath: 'polygon(0 0, 30% 0, 100% 100%, 0 100%)'
        }}
      />

      {/* Animated Bottom Bar (Scroll Reactive) */}
      <div className="absolute bottom-0 left-0 right-0 h-[4px] overflow-hidden">
        {/* Background track */}
        <div className="absolute inset-0 bg-[#ffffff08]" />

        {/* Animated fill bar with gradient */}
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#A3FF00] to-[#00F3FF]"
          initial={{ width: "0%" }}
          whileInView={{
            width: "100%",
            transition: {
              duration: 0.4,
              ease: "easeOut"
            }
          }}
          viewport={{ once: false, amount: 0.5 }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute left-0 top-0 h-[8px] -translate-y-[2px] blur-sm"
          initial={{ width: "0%", opacity: 0 }}
          whileInView={{
            width: "100%",
            opacity: [0, 0.8, 0.6],
            transition: {
              duration: 0.4,
              ease: "easeOut"
            }
          }}
          viewport={{ once: false, amount: 0.5 }}
          style={{
            background: 'linear-gradient(to right, rgba(163, 255, 0, 0.6), rgba(0, 243, 255, 0.4))',
            boxShadow: '0 0 10px rgba(163, 255, 0, 0.5)'
          }}
        />

        {/* Traveling pulse indicator */}
        <motion.div
          className="absolute left-0 top-0 h-full w-[20px] bg-[#A3FF00]"
          initial={{ x: "-20px", opacity: 0 }}
          whileInView={{
            x: "calc(100% + 20px)",
            opacity: [0, 1, 1, 0],
            transition: {
              duration: 0.4,
              ease: "easeOut",
              times: [0, 0.1, 0.9, 1]
            }
          }}
          style={{
            boxShadow: '0 0 20px rgba(163, 255, 0, 1)'
          }}
          viewport={{ once: false, amount: 0.5 }}
        />
      </div>

      {/* Ambient Interactive Effects */}
      {/* Dim Radial Ambient Glow (Mouse Reactive) */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 30}% ${50 + mousePos.y * 30}%, rgba(163, 255, 0, 0.04) 0%, transparent 60%)`,
        }}
      />

      {/* Floating Ambient Particles - DISABLED IN LITE MODE */}
      {!isLite && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 group-hover:opacity-60 transition-opacity duration-700">
          {[...Array(6)].map((_, i) => {
            // Deterministic positions based on index (no Math.random())
            const startX = (i * 23 + 17) % 100;
            const startY = (i * 37 + 29) % 100;
            const endY = (startY + 40) % 100;
            const duration = 3 + (i % 3) * 0.7;

            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#A3FF00] rounded-full"
                initial={{
                  x: `${startX}%`,
                  y: `${startY}%`,
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0, 1, 0],
                  y: [null, `${endY}%`],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
                style={{
                  filter: 'blur(1px)',
                  boxShadow: '0 0 3px rgba(163, 255, 0, 0.3)'
                }}
              />
            );
          })}
        </div>
      )}

      {/* Corner Accent Lights (Dim) */}
      <div className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[#A3FF00] blur-xl rounded-full" />
      </div>
      <div className="absolute bottom-2 left-2 w-6 h-6 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[#00F3FF] blur-xl rounded-full" />
      </div>

      {/* Deep Stylistic Glow */}
      <div
        className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}
        style={{
          background: 'radial-gradient(circle at center, rgba(163, 255, 0, 0.02) 0%, transparent 70%)',
          animation: isHovered ? 'deep-pulse 4s ease-in-out infinite' : 'none'
        }}
      />

      {/* Dynamic Glow Sweep */}
      <div
        className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        style={{
          background: 'linear-gradient(135deg, transparent 35%, rgba(163, 255, 0, 0.06) 50%, transparent 65%)',
          backgroundSize: '250% 250%',
          animation: isHovered ? 'glow-sweep 3s linear infinite' : 'none'
        }}
      />

      <style>{`
        @keyframes glow-sweep {
          0% { background-position: -200% -200%; }
          100% { background-position: 200% 200%; }
        }
        @keyframes deep-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>

      {/* 2D Magnetic Drift Content */}
      <motion.div
        animate={{
          x: mousePos.x * 12,
          y: mousePos.y * 12,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        {/* Technical Corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/0 group-hover:border-[#A3FF00]/40 transition-all duration-500 transform group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/0 group-hover:border-[#A3FF00]/40 transition-all duration-500 transform group-hover:translate-x-[2px] group-hover:translate-y-[-2px]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/0 group-hover:border-[#A3FF00]/40 transition-all duration-500 transform group-hover:translate-x-[-2px] group-hover:translate-y-[2px]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/0 group-hover:border-[#A3FF00]/40 transition-all duration-500 transform group-hover:translate-x-[2px] group-hover:translate-y-[2px]" />

        {/* Icon */}
        <div className="mb-8 transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(163,255,0,0.3)]">
          {project.icon}
        </div>

        {/* Category */}
        <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#A3FF00]/80 mb-4 block font-unique">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="text-white text-[24px] md:text-[28px] font-bold uppercase tracking-tight mb-5 leading-[1.1] transition-all duration-500 font-unique group-hover:text-[#A3FF00] group-hover:drop-shadow-[0_0_15px_rgba(163,255,0,0.5)]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-white/60 group-hover:text-white/90 text-[15px] md:text-[16px] leading-[1.8] mb-8 min-h-[90px] font-light tracking-wide font-professional transition-all duration-500">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/60 border border-[#ffffff08] bg-[#ffffff03] backdrop-blur-sm font-professional"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center gap-3 pt-5 border-t border-[#ffffff08]">
          <span
            className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
            style={{ backgroundColor: project.statusColor }}
          />
          <span className="text-[12px] text-[#666666] font-medium tracking-tight">
            {project.status}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};



const FeaturedGallery = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  // Lock scroll during bar animation sequence
  // Scroll lock logic removed for smoother user experience


  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="bg-black py-20 md:py-40">
      <div className="container mx-auto px-6 md:px-20">
        {/* Section Header */}
        <SectionHeader
          eyebrow="SELECTED WORKS"
          title="Featured Projects"
          description="Architecting production-grade intelligent systems for real-world impact and complex challenges."
        />

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 xl:gap-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedGallery;
