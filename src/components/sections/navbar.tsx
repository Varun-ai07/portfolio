"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [time, setTime] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#tech-stack", label: "Tech Stack" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Connect" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 h-[68px] flex items-center justify-between px-6 md:px-10 bg-black/80 backdrop-blur-md border-b border-[#333333]/50">
        {/* Left: Dynamic Time */}
        <div className="flex-1 hidden md:flex">
          <div className="text-[12px] font-sans font-normal text-white tabular-nums opacity-80">
            {time}
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex-1 flex justify-start md:justify-center">
          <a
            href="#home"
            className="text-[24px] font-bold tracking-tight text-white font-sans transition-all hover:text-[#A3FF00]"
          >
            VARUN P
          </a>
        </div>

        {/* Right: Navigation Links (Desktop) */}
        <div className="flex-1 hidden md:flex justify-end gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12px] font-medium uppercase tracking-[0.15em] text-white/80 hover:text-[#A3FF00] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Hamburger Menu (Mobile) */}
        <div className="flex-1 flex justify-end md:hidden">
          <button
            className="group relative w-9 h-9 flex items-center justify-center focus:outline-none"
            aria-label="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-[10px] flex flex-col justify-between">
              <div className={`flex justify-between w-full h-[2px] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}`}>
                <span className={`bg-white h-full transition-all duration-300 ${isMenuOpen ? 'w-full' : 'w-[12px] group-hover:w-full'}`}></span>
                <span className={`bg-white h-full transition-all duration-300 ${isMenuOpen ? 'w-0' : 'w-[10px] group-hover:w-0'}`}></span>
              </div>
              <div className={`h-[2px] bg-white self-end transition-all duration-300 ${isMenuOpen ? 'w-full -rotate-45 -translate-y-[4px]' : 'w-[20px] group-hover:w-full'}`}></div>
            </div>
          </button>
        </div>

        {/* Mobile specific time */}
        <div className="md:hidden absolute left-6 top-[22px] pointer-events-none">
          <div className="text-[10px] font-sans font-normal text-white/60 tabular-nums">
            {time.split(",")[1]?.trim()}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-lg transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-[24px] font-bold uppercase tracking-[0.1em] text-white hover:text-[#A3FF00] transition-all duration-300"
              style={{ 
                transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms',
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMenuOpen ? 1 : 0
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}