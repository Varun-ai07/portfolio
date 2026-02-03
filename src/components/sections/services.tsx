import React from 'react';

/**
 * Services Component for Nivora Portfolio
 * Clones the Services section featuring clean typography and bulleted lists.
 * Adheres to dark theme using tokens from globals.css.
 */

interface ServiceItemProps {
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
}

const ServiceItem = ({ eyebrow, title, description, features }: ServiceItemProps) => {
  return (
    <div className="flex flex-col md:flex-row border-b border-[#333333] py-16 md:py-24 last:border-b-0">
      {/* Left Column: Eyebrow and Title */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <span className="font-eyebrow mb-6 block" style={{ fontSize: '14px', letterSpacing: '0.2em' }}>
          {eyebrow}
        </span>
        <h2 className="text-white font-display font-bold uppercase tracking-tighter" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', lineHeight: '1.1' }}>
          {title}
        </h2>
      </div>

      {/* Right Column: Description and Features */}
      <div className="w-full md:w-1/2 md:pl-20">
        <p className="font-body text-[#999999] mb-12 max-w-xl" style={{ fontSize: '18px', lineHeight: '1.6' }}>
          {description}
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-white text-[16px]">
              <span className="w-1.5 h-1.5 bg-[#A3FF00] rounded-full mr-3 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Services = () => {
  const serviceData: ServiceItemProps[] = [
    {
      eyebrow: "Expertise",
      title: "Artificial Intelligence",
      description: "Building intelligent systems using deep learning, LLMs, and computer vision. Specializing in RAG systems, agentic AI, and production-grade ML pipelines.",
      features: [
        "Deep Learning & NLP",
        "LLM Integration",
        "RAG Systems",
        "Computer Vision"
      ]
    },
    {
      eyebrow: "Expertise",
      title: "Quantum Computing",
      description: "Research focused on quantum circuit optimization using Graph Neural Networks and Bayesian methods for improved performance on real quantum hardware.",
      features: [
        "Circuit Optimization",
        "GNN Applications",
        "Qiskit Development",
        "Bayesian Methods"
      ]
    },
    {
      eyebrow: "Expertise",
      title: "Blockchain & Web3",
      description: "Developing decentralized applications and smart contracts. Building secure, transparent systems with blockchain verification and Web3 integration.",
      features: [
        "Smart Contracts",
        "Solidity & Ethereum",
        "DApp Development",
        "Web3 Integration"
      ]
    }
  ];

  return (
    <section id="tech-stack" className="bg-black py-20 md:py-32">
      <div className="container">
        <div className="mb-16">
          <span className="font-eyebrow mb-4 block">Expertise Domains</span>
          <h2 className="text-white">Tech Arsenal</h2>
        </div>
        <div className="flex flex-col">
          {serviceData.map((service, index) => (
            <ServiceItem
              key={index}
              eyebrow={service.eyebrow}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;