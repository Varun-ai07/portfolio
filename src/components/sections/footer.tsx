import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-black text-white w-full pt-20 pb-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-20 max-w-[1440px]">
        {/* Top Section: Multi-column Contact & Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-32">
          
          {/* Column 1: Email */}
          <div className="flex flex-col gap-4">
            <h5 className="text-[14px] font-medium uppercase tracking-[0.2em] text-[#999999]">
              Email
            </h5>
            <a 
              href="mailto:jp.vxrun@gmail.com" 
              className="text-[18px] font-semibold tracking-tight hover:text-[#A3FF00] transition-colors duration-300"
            >
              jp.vxrun@gmail.com
            </a>
          </div>

          {/* Column 2: Location */}
          <div className="flex flex-col gap-4">
            <h5 className="text-[14px] font-medium uppercase tracking-[0.2em] text-[#999999]">
              Location
            </h5>
            <p className="text-[18px] font-normal leading-[1.4] text-white max-w-[240px] tracking-tight">
              Chennai, India<br />
              Anna University, Coimbatore
            </p>
          </div>

          {/* Column 3: Menu Links */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <h5 className="text-[14px] font-medium uppercase tracking-[0.2em] text-[#999999]">
                Navigate
              </h5>
              <div className="flex flex-col gap-2">
                <a href="#home" className="text-[16px] text-white hover:text-[#A3FF00] transition-colors duration-300">Home</a>
                <a href="#about" className="text-[16px] text-white hover:text-[#A3FF00] transition-colors duration-300">About</a>
                <a href="#tech-stack" className="text-[16px] text-white hover:text-[#A3FF00] transition-colors duration-300">Tech Stack</a>
                <a href="#projects" className="text-[16px] text-white hover:text-[#A3FF00] transition-colors duration-300">Projects</a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h5 className="text-[14px] font-medium uppercase tracking-[0.2em] text-[#999999]">
                Connect
              </h5>
              <div className="flex flex-col gap-2">
                <a href="https://github.com/Varun-ai07" target="_blank" rel="noopener noreferrer" className="text-[16px] text-white hover:text-[#A3FF00] transition-colors duration-300">GitHub</a>
                <a href="https://linkedin.com/in/jp-varun" target="_blank" rel="noopener noreferrer" className="text-[16px] text-white hover:text-[#A3FF00] transition-colors duration-300">LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Column 4: Socials */}
          <div className="flex flex-col gap-4">
            <h5 className="text-[14px] font-medium uppercase tracking-[0.2em] text-[#999999]">
              Socials
            </h5>
            <div className="flex gap-4 items-center">
              <a 
                href="https://github.com/Varun-ai07" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-[#333333] flex items-center justify-center hover:bg-[#A3FF00] hover:border-[#A3FF00] transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-white group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com/in/jp-varun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 border border-[#333333] flex items-center justify-center hover:bg-[#A3FF00] hover:border-[#A3FF00] transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-white group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="mailto:jp.vxrun@gmail.com" 
                className="w-10 h-10 border border-[#333333] flex items-center justify-center hover:bg-[#A3FF00] hover:border-[#A3FF00] transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Large Branding Section */}
        <div className="relative mt-20 pt-10 border-t border-[#333333]">
          <div className="flex flex-col items-center">
            <div className="w-full flex flex-col items-center justify-center overflow-hidden">
               <h1 className="text-[clamp(4rem,22vw,18rem)] leading-[0.75] font-extrabold uppercase tracking-[-0.05em] text-white whitespace-nowrap">
                VARUN P
              </h1>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Credit */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center text-[#999999] text-[14px] border-t border-[#111111] pt-8">
          <div className="mb-4 md:mb-0">
            AI Architect • Quantum Researcher • Web3 Developer
          </div>
          <div className="flex gap-8">
            <span className="text-[#A3FF00]">Architecting the future since 2023</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
