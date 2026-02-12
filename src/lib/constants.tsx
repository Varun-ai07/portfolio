import React from 'react';
import {
    FaPython,
    FaRobot,
    FaLink,
    FaAtom,
    FaCalculator,
    FaChartLine,
    FaFileContract,
    FaEthereum,
    FaHardHat,
    FaCube,
    FaNodeJs,
    FaReact,
    FaBolt,
    FaWind
} from 'react-icons/fa';
import {
    SiTensorflow,
    SiPytorch
} from 'react-icons/si';
import {
    Github,
    Linkedin,
    Mail,
    Twitter,
    Stethoscope,
    Atom,
    Brain,
    ShieldCheck,
    CloudLightning,
    Cpu
} from 'lucide-react';

export const HERO_DATA = {
    eyebrow: "AI Architect • Quantum Computing • Web3",
    title: "VARUN P",
    education: "B.Tech AI & Data Science @ Anna University, Coimbatore",
    description: {
        prefix: "Building next-generation intelligent systems ",
        highlightPaths: [
            { text: "at the intersection of ", color: "text-white" },
            { text: "Artificial Intelligence", color: "text-[#A3FF00]" },
            { text: ", ", color: "text-white" },
            { text: "Quantum Computing", color: "text-[#A3FF00]" },
            { text: ", and ", color: "text-white" },
            { text: "Blockchain Technology", color: "text-[#A3FF00]" },
            { text: ".", color: "text-white" }
        ]
    }
};

export const ABOUT_DATA = {
    highlightText: "I architect intelligent systems that bridge theoretical research and production deployment. My work spans from optimizing quantum circuits with graph neural networks to building AI-powered platforms with blockchain verification."
};

export interface TechItem {
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    url: string;
}

export interface TechCategory {
    title: string;
    items: TechItem[];
}

export const TECH_STACK: TechCategory[] = [
    {
        title: "Core AI/ML",
        items: [
            { name: "Python", description: "Primary language for AI/ML development", icon: <FaPython size={24} />, color: "#3776AB", url: "https://python.org" },
            { name: "TensorFlow", description: "Deep learning framework", icon: <SiTensorflow size={24} />, color: "#FF6F00", url: "https://tensorflow.org" },
            { name: "PyTorch", description: "Research-focused deep learning", icon: <SiPytorch size={24} />, color: "#EE4C2C", url: "https://pytorch.org" },
            { name: "LangChain", description: "LLM application framework", icon: <FaLink size={24} />, color: "#1C3C3C", url: "https://langchain.com" },
            { name: "OpenAI", description: "GPT models and APIs", icon: <FaRobot size={24} />, color: "#412991", url: "https://openai.com" },
        ]
    },
    {
        title: "Quantum & Advanced Computing",
        items: [
            { name: "Qiskit", description: "Quantum computing framework", icon: <FaAtom size={24} />, color: "#6929C4", url: "https://qiskit.org" },
            { name: "NumPy", description: "Numerical computing", icon: <FaCalculator size={24} />, color: "#013243", url: "https://numpy.org" },
            { name: "SciPy", description: "Scientific computing", icon: <FaChartLine size={24} />, color: "#8CAAE6", url: "https://scipy.org" },
        ]
    },
    {
        title: "Web3 & Blockchain",
        items: [
            { name: "Solidity", description: "Smart contract language", icon: <FaFileContract size={24} />, color: "#363636", url: "https://soliditylang.org" },
            { name: "Ethereum", description: "Blockchain platform", icon: <FaEthereum size={24} />, color: "#3C3C3D", url: "https://ethereum.org" },
            { name: "Hardhat", description: "Ethereum development environment", icon: <FaHardHat size={24} />, color: "#FFF100", url: "https://hardhat.org" },
            { name: "Web3.js", description: "Ethereum JavaScript API", icon: <FaCube size={24} />, color: "#F16822", url: "https://web3js.org" },
        ]
    },
    {
        title: "Full Stack Development",
        items: [
            { name: "Node.js", description: "JavaScript runtime", icon: <FaNodeJs size={24} />, color: "#339933", url: "https://nodejs.org" },
            { name: "React", description: "Frontend library", icon: <FaReact size={24} />, color: "#61DAFB", url: "https://reactjs.org" },
            { name: "FastAPI", description: "Python web framework", icon: <FaBolt size={24} />, color: "#009688", url: "https://fastapi.tiangolo.com" },
            { name: "Tailwind CSS", description: "Utility-first CSS framework", icon: <FaWind size={24} />, color: "#38B2AC", url: "https://tailwindcss.com" },
        ]
    }
];

export const SOCIAL_LINKS = [
    { name: "Email", icon: <Mail className="w-6 h-6" />, href: "mailto:jp.vxrun@gmail.com" },
    { name: "GitHub", icon: <Github className="w-6 h-6" />, href: "https://github.com/Varun-ai07" },
    { name: "LinkedIn", icon: <Linkedin className="w-6 h-6" />, href: "https://linkedin.com/in/jp-varun" },
    { name: "Twitter", icon: <Twitter className="w-6 h-6" />, href: "https://x.com/VarunNebula" }
];

export const FOOTER_DATA = {
    eyebrow: "Let's Connect",
    copyright: "AI Architect • Quantum Researcher • Web3 Developer",
    subtext: "Architecting the future since 2023"
};

export interface Project {
    title: string;
    description: string;
    category: string;
    icon: React.ReactNode;
    techStack: string[];
    status: string;
    statusColor: string;
}

export const PROJECTS: Project[] = [
    {
        title: "Medical Consent AI",
        description: "AI-powered medical consent platform that explains complex procedures in plain language with blockchain verification and doctor approval workflows.",
        category: "Healthcare AI",
        icon: <Stethoscope size={40} className="text-[#A3FF00]" />,
        techStack: ["React", "FastAPI", "LLMs", "Solidity"],
        status: "Private Repository",
        statusColor: "#A3FF00"
    },
    {
        title: "QuantaBO",
        description: "Quantum circuit optimization using Graph Neural Networks and Bayesian optimization for improved performance on real quantum hardware.",
        category: "Quantum Computing",
        icon: <Atom size={40} className="text-[#00D4FF]" />,
        techStack: ["Qiskit", "PyTorch", "GNN", "Bayesian"],
        status: "Active Development",
        statusColor: "#00D4FF"
    },
    {
        title: "NeuroChain Auth",
        description: "Decentralized biometric authentication system using brainwave patterns (EEG) and zero-knowledge proofs for military-grade security.",
        category: "Security & Web3",
        icon: <Brain size={40} className="text-[#FF00EA]" />,
        techStack: ["Python", "Solidity", "ZK-Proofs", "Next.js"],
        status: "Research Phase",
        statusColor: "#FF00EA"
    },
    {
        title: "HyperLedger AI",
        description: "Autonomous agent network that optimizes supply chain logistics in real-time using reinforcement learning and Hyperledger Fabric.",
        category: "Enterprise AI",
        icon: <ShieldCheck size={40} className="text-[#A3FF00]" />,
        techStack: ["Node.js", "Go", "RLlib", "Docker"],
        status: "Beta Testing",
        statusColor: "#A3FF00"
    },
    {
        title: "Nebula Protocol",
        description: "Cross-chain liquidity aggregator that uses AI to predict slippage and gas fees, ensuring optimal trades across 15+ DeFi protocols.",
        category: "Finance & AI",
        icon: <CloudLightning size={40} className="text-[#00F3FF]" />,
        techStack: ["Solidity", "Python", "The Graph", "Chainlink"],
        status: "Mainnet Live",
        statusColor: "#00F3FF"
    },
    {
        title: "Quantum Sentinel",
        description: "Post-quantum cryptographic library that implements lattice-based encryption resistant to quantum computer attacks.",
        category: "Cryptography",
        icon: <Cpu size={40} className="text-[#A3FF00]" />,
        techStack: ["Rust", "C++", "NIST PQC", "OpenSSL"],
        status: "Production Ready",
        statusColor: "#A3FF00"
    }
];
