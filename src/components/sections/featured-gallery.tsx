import React from 'react';

/**
 * FeaturedGallery Component - Varun's Projects
 * Features project cards with icons, descriptions, and tech tags
 */

interface Project {
  title: string;
  description: string;
  category: string;
  icon: string;
  techStack: string[];
  status: string;
  statusColor: string;
}

const FeaturedGallery = () => {
  const projects: Project[] = [
    {
      title: "Medical Consent AI",
      description: "AI-powered medical consent platform that explains complex procedures in plain language with blockchain verification and doctor approval workflows.",
      category: "Healthcare AI",
      icon: "🏥",
      techStack: ["React", "FastAPI", "LLMs", "Solidity"],
      status: "Private Repository",
      statusColor: "#A3FF00"
    },
    {
      title: "QuantaBO",
      description: "Quantum circuit optimization using Graph Neural Networks and Bayesian optimization for improved performance on real quantum hardware.",
      category: "Quantum Computing",
      icon: "⚛️",
      techStack: ["Qiskit", "PyTorch", "GNN", "Bayesian"],
      status: "Active Development",
      statusColor: "#00D4FF"
    },
    {
      title: "Brain Tumor Detection",
      description: "Hybrid CNN+Vision Transformer architecture for MRI-based tumor classification with clinical-grade accuracy.",
      category: "Medical AI",
      icon: "🧠",
      techStack: ["TensorFlow", "ViT", "CNN", "Medical AI"],
      status: "Research Phase",
      statusColor: "#FF6B6B"
    },
    {
      title: "Quasar Security AI",
      description: "Universal cybersecurity assistant with RAG-powered documentation analysis across 50+ security tools and multi-agent workflows.",
      category: "Cybersecurity",
      icon: "🛡️",
      techStack: ["RAG", "Multi-Agent", "LangChain", "Security"],
      status: "Private Repository",
      statusColor: "#A3FF00"
    },
    {
      title: "WeatherGuard AI",
      description: "AI-powered disaster response system with real-time weather monitoring, predictive analytics, and automated alerts.",
      category: "Climate Tech",
      icon: "🌦️",
      techStack: ["Python", "ML", "APIs", "Analytics"],
      status: "Production",
      statusColor: "#27CA40"
    },
    {
      title: "AI Agent Suite",
      description: "Collection of intelligent agents including voice AI, Telegram bot, and documentation crawlers powered by LLMs and RAG systems.",
      category: "Agentic AI",
      icon: "🤖",
      techStack: ["LLMs", "RAG", "Voice AI", "Agents"],
      status: "Multiple Repos",
      statusColor: "#FF9F43"
    }
  ];

  return (
    <section id="projects" className="bg-black py-20 md:py-40">
      <div className="container mx-auto px-6 md:px-20">
        {/* Section Header */}
        <div className="mb-20">
          <span className="font-eyebrow mb-4 block">Portfolio</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-white">Featured Projects</h2>
            <p className="text-[#999999] text-[18px] leading-[1.6] max-w-[400px]">
              Production-grade intelligent systems built for real-world impact
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group relative bg-[#0B0B0B] border border-[#333333] p-8 transition-all duration-500 hover:border-[#A3FF00]/50 hover:bg-[#111111]"
            >
              {/* Technical Corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/0 group-hover:border-[#A3FF00]/60 transition-colors duration-300" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/0 group-hover:border-[#A3FF00]/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/0 group-hover:border-[#A3FF00]/60 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/0 group-hover:border-[#A3FF00]/60 transition-colors duration-300" />

              {/* Icon */}
              <div className="text-[48px] mb-6 transition-transform duration-300 group-hover:scale-110">
                {project.icon}
              </div>

              {/* Category */}
              <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#A3FF00] mb-3 block">
                {project.category}
              </span>

              {/* Title */}
              <h3 className="text-white text-[24px] font-bold uppercase tracking-tight mb-4 leading-[1.2]">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-[#999999] text-[16px] leading-[1.6] mb-6 min-h-[80px]">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 text-[12px] font-medium uppercase tracking-wider text-white/80 border border-[#333333] bg-[#111111]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 pt-4 border-t border-[#333333]/50">
                <span 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: project.statusColor }}
                />
                <span className="text-[14px] text-[#999999]">
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGallery;
