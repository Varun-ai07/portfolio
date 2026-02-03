import React from 'react';

const steps = [
  {
    index: "01",
    title: "Idea",
    description: "We meet with your team to learn more about your project idea and goals."
  },
  {
    index: "02",
    title: "Design",
    description: "We will design a mockup or prototype of your website and present."
  },
  {
    index: "03",
    title: "Web dev",
    description: "We develop websites using the best practices and standards"
  },
  {
    index: "04",
    title: "Launch",
    description: "When the project is completed, we will schedule a 2hr training."
  }
];

export default function ProcessSection() {
  return (
    <section className="bg-black py-[160px] md:py-[180px] lg:py-[200px]" id="process">
      <div className="container">
        <div className="flex flex-col gap-12 lg:gap-20">
          {/* Header */}
          <div className="flex flex-col gap-6 max-w-[800px]">
            <p className="font-eyebrow text-[#A3FF00] tracking-[0.2em] font-medium text-[14px] uppercase mb-[-10px]">
              How it works
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-8">
              <h2 className="text-white text-[clamp(40px,6vw,64px)] font-bold uppercase leading-[1.1] tracking-tighter">
                From Idea to Launch
              </h2>
              <p className="text-[#999999] text-[18px] leading-[1.6] max-w-[340px] font-normal">
                Crafting Your Next-Gen Digital Success Path
              </p>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mt-12">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col group relative">
                {/* Connector line for large screens */}
                {idx !== steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[45px] left-[60%] right-[-40%] h-[1px] bg-[#333333]" />
                )}
                
                {/* Number */}
                <div className="mb-8 relative z-10">
                  <span className="text-[clamp(60px,8vw,120px)] font-extrabold text-transparent stroke-1 [-webkit-text-stroke:1px_#333333] leading-none select-none transition-colors duration-500 group-hover:[-webkit-text-stroke:1px_#A3FF00]">
                    {step.index}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-white text-[24px] font-bold uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <div className="w-8 h-[2px] bg-[#A3FF00]" />
                  <p className="text-[#999999] text-[16px] leading-[1.6] max-w-[240px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}