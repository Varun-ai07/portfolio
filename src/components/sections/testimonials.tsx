import React from 'react';
import Image from 'next/image';

const Testimonials = () => {
  const logos = [
    { name: 'Codify', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/xF67o9KL2pdUNFoIyhGVuR7nzI-16.png' },
    { name: 'Nexus AI', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/7QzAJUIdfcX0NgIDOeWiBZaU1A-17.png' },
    { name: 'Landify', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/4XTnLW7JZjeMcl56gnBMDX20k-18.png' },
    { name: 'Flexify', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/i1HQmHKuaqVIiFDDbnxu3eSvDM-19.png' },
    { name: 'Flowboard', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/A4gp1uK8IPCXRgoVMvD6es6rXc-20.png' },
    { name: 'Agentify', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/af4c35f8-1446-4f5b-bb80-a08d745daef0-nivora-framer-website/assets/images/t2IinwzJVpnMsudq7WYMD5Q-21.png' },
  ];

  const reviews = [
    {
      text: "Nivora transformed my workflow with instant suggestions and real-time collaboration.",
      name: "Emily Carla",
      role: "CEO",
      handle: "@taskify"
    },
    {
      text: "Nivora's efficiency in generating code snippets is unmatched. Seamless integration, time-saving.",
      name: "Sarah Smith",
      role: "CEO",
      handle: "@taskify"
    },
    {
      text: "Incorporating Designor Framer into our web development process has streamlined collaboration.",
      name: "John Smith",
      role: "CEO",
      handle: "@taskify"
    }
  ];

  return (
    <section className="bg-black text-white py-[160px] overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-[80px]">
          <h2 className="text-[clamp(2rem,6vw,4rem)] font-extrabold uppercase tracking-tighter leading-[1.1] mb-4">
            What are they <br /> saying about us?
          </h2>
          <p className="text-[14px] font-medium uppercase tracking-[0.2em] text-[#999999]">
            Used and loved by people at leading companies
          </p>
        </div>

        {/* Logo Marquee */}
        <div className="relative w-full overflow-hidden mb-[120px] py-8 border-y border-[#333333]">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, groupIdx) => (
              <div key={groupIdx} className="flex items-center space-x-16 mx-8">
                {logos.map((logo, idx) => (
                  <div key={`${groupIdx}-${idx}`} className="flex items-center space-x-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <div className="w-6 h-6 relative shrink-0">
                      <Image 
                        src={logo.icon} 
                        alt={logo.name} 
                        fill 
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[18px] font-semibold tracking-tight text-[#FFFFFF]">{logo.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="relative p-8 bg-[#111111] border border-[#333333] flex flex-col justify-between min-h-[320px] group transition-all duration-500 hover:bg-[#151515]"
            >
              {/* Technical Corners (Styling token from high level design) */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/0 group-hover:border-white/40 transition-colors" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/0 group-hover:border-white/40 transition-colors" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/0 group-hover:border-white/40 transition-colors" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/0 group-hover:border-white/40 transition-colors" />

              <div className="mb-8">
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#A3FF00] mb-6 opacity-40">
                  <path d="M11.24 23.32C4.16 23.32 0 18.52 0 12.04C0 4.84 4.88 0.52 11.24 0.52V4.84C7.52 4.84 5.36 6.76 5.36 10.48H11.24V23.32ZM31.48 23.32C24.4 23.32 20.24 18.52 20.24 12.04C20.24 4.84 25.12 0.52 31.48 0.52V4.84C27.76 4.84 25.6 6.76 25.6 10.48H31.48V23.32Z" fill="currentColor"/>
                </svg>
                <p className="text-[20px] font-medium leading-[1.4] text-white tracking-tight">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#333333]/30">
                <div>
                  <h5 className="text-[16px] font-bold uppercase tracking-tight text-white m-0 leading-none">
                    {review.name}
                  </h5>
                  <p className="text-[14px] text-[#999999] mt-1">{review.role}</p>
                </div>
                <div className="text-[14px] font-medium text-[#A3FF00] tracking-tight">
                  {review.handle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;