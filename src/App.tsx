import React, { useEffect } from 'react';
import Navbar from '@/components/sections/navbar';
import HeroSection from '@/components/sections/hero';
import AboutIntro from '@/components/sections/about-intro';
import Services from '@/components/sections/services';
import FeaturedGallery from '@/components/sections/featured-gallery';
import Footer from '@/components/sections/footer';
import CustomCursor from '@/components/ui/custom-cursor';
import SplineBackground from '@/components/ui/spline-background';
import VideoBackground from '@/components/ui/video-background';
import SmoothScroll from '@/components/ui/smooth-scroll';
import ScrollReveal from '@/components/ui/scroll-reveal';
import ScrollToTop from '@/components/ui/scroll-to-top';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import ResourcePrefetcher from '@/components/ResourcePrefetcher';
import { Toaster } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';

export default function App() {
    const isMobile = useIsMobile();

    useEffect(() => {
        // Console error filter (migrated from Next.js layout inline script)
        const _error = console.error;
        console.error = function (...args: any[]) {
            const msg = args.join(' ');
            if (msg.includes('110504') || msg.includes('SubdivGeometry')) return;
            _error.apply(console, args);
        };
    }, []);

    return (
        <>
            <ServiceWorkerRegistration />
            <ResourcePrefetcher />
            <Toaster />
            <SmoothScroll>
                <div className="min-h-screen bg-black text-white selection:bg-[#A3FF00] selection:text-black">
                    <div className="fixed inset-0 z-0 pointer-events-none">
                        {isMobile ? <VideoBackground /> : <SplineBackground />}
                    </div>
                    <div className="fixed inset-0 z-[1] pointer-events-none bg-black/45" />
                    <CustomCursor />
                    <Navbar />
                    <main className="relative z-10 w-full overflow-hidden">
                        <ScrollReveal>
                            <HeroSection />
                        </ScrollReveal>

                        <ScrollReveal>
                            <AboutIntro />
                        </ScrollReveal>

                        <ScrollReveal>
                            <Services />
                        </ScrollReveal>

                        <ScrollReveal>
                            <FeaturedGallery />
                        </ScrollReveal>
                    </main>
                    <Footer />
                    <ScrollToTop />
                </div>
            </SmoothScroll>
        </>
    );
}
