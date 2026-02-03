"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What services offered?",
    answer: "We design and build modern, high-performing websites using Framer and custom components.",
  },
  {
    question: "Who is this for?",
    answer: "Ideal for startups, agencies, creators, and teams needing professional digital presence.",
  },
  {
    question: "How projects start?",
    answer: "Projects begin with clear requirements, goals, and timelines to ensure smooth execution.",
  },
  {
    question: "How long delivery?",
    answer: "Timelines vary by scope, but most projects are completed within two to four weeks.",
  },
  {
    question: "Is Framer required?",
    answer: "Yes, all templates and builds are optimized specifically for Framer workflows.",
  },
  {
    question: "Can we customize?",
    answer: "Everything is fully customizable, including layout, colors, components, and interactions.",
  },
  {
    question: "Do you offer support?",
    answer: "Yes, we provide guidance, documentation, and support to help you launch confidently.",
  },
  {
    question: "What about updates?",
    answer: "We regularly improve templates with updates, refinements, and new features.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black py-[160px] px-6 md:px-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-10">
        {/* Left Column: Heading */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-white text-[clamp(2rem,6vw,4rem)] font-extrabold uppercase leading-[1.1] tracking-tighter">
              FREQUENTLY ASKED <br /> QUESTIONS
            </h2>
            <p className="text-[#999999] text-[18px] leading-[1.6] max-w-[400px] uppercase font-medium tracking-tight">
              This is different we get that, you may have questions, here are some answers.
            </p>
          </div>
        </div>

        {/* Right Column: Accordion */}
        <div className="flex flex-col border-t border-[#333333]">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-bottom border-[#333333] transition-colors duration-300"
              style={{ borderBottom: "1px solid #333333" }}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <span className="text-white text-[16px] md:text-[20px] font-semibold uppercase tracking-tight transition-colors duration-300 group-hover:text-[#A3FF00]">
                  {item.question}
                </span>
                <div className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-white" />
                  ) : (
                    <Plus className="w-5 h-5 text-white" />
                  )}
                </div>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === index ? "max-height-[500px] pb-8" : "max-height-0 overflow-hidden"
                )}
                style={{
                  maxHeight: openIndex === index ? "500px" : "0px",
                }}
              >
                <p className="text-[#999999] text-[18px] leading-[1.6] max-w-[500px]">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;