"use client";

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

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
  const [splineLoaded, setSplineLoaded] = useState(false);

  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* 3D Spline Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Script 
          type="module" 
          src="https://unpkg.com/@splinetool/viewer@1.12.48/build/spline-viewer.js"
          onLoad={() => setSplineLoaded(true)}
        />
        {splineLoaded && (
          <spline-viewer 
            url="https://prod.spline.design/axMMX-4iP4D60a7z/scene.splinecode"
            style={{ 
              width: '100%', 
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        )}
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10 pointer-events-none" />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 w-full max-w-[1440px] px-6 md:px-20 pt-20 md:pt-0 flex flex-col items-center md:items-start text-center md:text-left">
        {/* Eyebrow */}
        <div className="mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="font-eyebrow text-[#A3FF00] text-[14px]">
            AI Architect • Quantum Computing • Web3
          </span>
        </div>

        {/* Main Heading */}
        <div className="mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <h1 className="text-white drop-shadow-2xl">
            VARUN P
          </h1>
        </div>

        {/* Description */}
        <div className="mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300 max-w-[700px]">
          <p className="text-[16px] md:text-[20px] leading-[1.6] text-white/90 font-normal">
            Building next-generation intelligent systems at the intersection of 
            <span className="text-[#A3FF00]"> Artificial Intelligence</span>, 
            <span className="text-[#A3FF00]"> Quantum Computing</span>, and 
            <span className="text-[#A3FF00]"> Blockchain Technology</span>.
          </p>
        </div>

        {/* Education Tag */}
        <div className="mb-10 md:mb-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-350">
          <p className="text-[14px] uppercase tracking-[0.15em] text-white/60 font-medium font-mono">
            B.Tech AI & Data Science @ Anna University, Coimbatore
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
          <a
            href="#tech-stack"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#A3FF00] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            <span className="relative z-10 text-[14px] font-bold uppercase tracking-widest text-black transition-colors duration-300">
              Tech Arsenal
            </span>
          </a>
          
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center px-8 py-4 border border-white bg-transparent transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            <span className="relative z-10 text-[14px] font-bold uppercase tracking-widest text-white group-hover:text-black transition-colors duration-300">
              Explore Projects
            </span>
          </a>
        </div>

        {/* Code Block Visual */}
        <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
          <div className="bg-[#0B0B0B]/90 border border-[#333333] p-6 backdrop-blur-sm max-w-[400px]">
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
        </div>
      </div>

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

// Extend JSX intrinsic elements for spline-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        url?: string;
      }, HTMLElement>;
    }
  }
}

export default HeroSection;
