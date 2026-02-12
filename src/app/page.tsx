"use client";

import Navbar from "@/components/sections/navbar";
import HeroSection from "@/components/sections/hero";
import AboutIntro from "@/components/sections/about-intro";
import Services from "@/components/sections/services";
import FeaturedGallery from "@/components/sections/featured-gallery";
import Footer from "@/components/sections/footer";
import SplineBackground from "@/components/ui/spline-background";
import CustomCursor from "@/components/ui/custom-cursor";
import SmoothScroll from "@/components/ui/smooth-scroll";
import ScrollReveal from "@/components/ui/scroll-reveal";
import ScrollToTop from "@/components/ui/scroll-to-top";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen relative">
        <CustomCursor />
        <SplineBackground />
        <Navbar />
        <main className="relative z-10">
          <ScrollReveal>
            <HeroSection />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <AboutIntro />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Services />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <FeaturedGallery />
          </ScrollReveal>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </SmoothScroll>
  );
}
