"use client";

import Navbar from "@/components/sections/navbar";
import HeroSection from "@/components/sections/hero";
import AboutIntro from "@/components/sections/about-intro";
import Services from "@/components/sections/services";
import FeaturedGallery from "@/components/sections/featured-gallery";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main>
        <HeroSection />
        <AboutIntro />
        <Services />
        <FeaturedGallery />
      </main>
      <Footer />
    </div>
  );
}
