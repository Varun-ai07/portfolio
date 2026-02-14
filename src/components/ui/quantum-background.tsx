import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { usePerformance } from '@/hooks/use-performance';


const DynamicParticle = ({ smoothX, smoothY }: { smoothX: any; smoothY: any }) => {
    const randomX = React.useMemo(() => Math.random() * 100, []);
    const randomY = React.useMemo(() => Math.random() * 100, []);
    const duration = React.useMemo(() => Math.random() * 20 + 15, []);
    const delay = React.useMemo(() => Math.random() * 10, []);

    // Particle move logic: Drift based on mouse
    const driftX = useTransform(smoothX, [-1, 1], [-50, 50]);
    const driftY = useTransform(smoothY, [-1, 1], [-50, 50]);

    return (
        <motion.div
            style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
                x: driftX,
                y: driftY,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 0.4, 0],
                scale: [0, 1, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
            className="absolute w-1 h-1 bg-[#00F3FF]/40 rounded-full blur-[1px]"
        />
    );
};

const QuantumBackground = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const isLite = usePerformance();
    const { scrollYProgress } = useScroll();

    // Optimized spring config - reduced stiffness for better performance
    // If Lite mode, effectively disable the spring physics by making them instant/static or very simple
    const springConfig = isLite ? { stiffness: 100, damping: 10 } : { stiffness: 30, damping: 20 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);
    const smoothScroll = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

    // Mouse Parallax Transforms
    const sunX = useTransform(smoothX, [-1, 1], [-20, 20]);
    const sunY = useTransform(smoothY, [-1, 1], [-20, 20]);

    // Scroll Parallax Transforms (Vertical Depth)
    const sunScale = useTransform(smoothScroll, [0, 1], [1, 1.2]);
    const sunTranslateY = useTransform(smoothScroll, [0, 1], [0, 100]);
    const ringsOpacity = useTransform(smoothScroll, [0, 0.5, 1], [1, 0.5, 1]);
    const ringsRotateZ = useTransform(smoothScroll, [0, 1], [0, 45]);

    const ring1RotateX = useTransform(smoothY, [-1, 1], [65, 55]);
    const ring1RotateY = useTransform(smoothX, [-1, 1], [-5, 5]);

    const ring2RotateX = useTransform(smoothY, [-1, 1], [-5, 5]);
    const ring2RotateY = useTransform(smoothX, [-1, 1], [65, 55]);

    useEffect(() => {
        setIsMounted(true);
        const mobileCheck = window.matchMedia('(max-width: 768px)');
        setIsMobile(mobileCheck.matches);

        let timeoutId: NodeJS.Timeout;

        // Throttle mouse movement updates for better performance
        const handleMouseMove = (e: MouseEvent) => {
            if (timeoutId) return;

            timeoutId = setTimeout(() => {
                const x = (e.clientX / window.innerWidth) * 2 - 1;
                const y = (e.clientY / window.innerHeight) * 2 - 1;
                mouseX.set(x);
                mouseY.set(y);
                timeoutId = null as any;
            }, 16); // ~60fps
        };

        if (!mobileCheck.matches && !isLite) {
            window.addEventListener('mousemove', handleMouseMove, { passive: true });
        }

        const handleResize = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };

        mobileCheck.addEventListener('change', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            mobileCheck.removeEventListener('change', handleResize);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [mouseX, mouseY]);

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050505] pointer-events-none">
            {/* Ambient Radial Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.05)_0%,transparent_70%)]" />

            {/* Quantum Solar System Container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">

                {/* Quantum Sun (Static Center but moves with parallax) */}
                <motion.div
                    style={{
                        x: sunX,
                        y: sunY,
                        scale: sunScale,
                        translateY: sunTranslateY,
                        willChange: 'transform'
                    }}
                    className="relative w-40 h-40"
                >
                    {/* Outer Glow */}
                    <div className="absolute inset-0 bg-[#00F3FF]/20 blur-[60px] rounded-full animate-pulse" />
                    {/* Inner Core */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00F3FF] to-[#7B1FA2] blur-[10px] rounded-full opacity-80" />
                    <div className="absolute inset-[35%] bg-white blur-[2px] rounded-full shadow-[0_0_40px_#00F3FF]" />
                </motion.div>

                {/* Orbiting Rings */}
                <motion.div
                    style={{
                        opacity: ringsOpacity,
                        rotate: ringsRotateZ,
                        willChange: 'transform, opacity'
                    }}
                    className="absolute inset-0 flex items-center justify-center [perspective:1000px] pointer-events-none"
                >

                    {/* Ring 1 - Vertical Orbit */}
                    <motion.div
                        style={{ rotateX: ring1RotateX, rotateY: ring1RotateY }}
                        className="absolute w-[80vw] h-[80vw] max-w-[400px] max-h-[400px] border border-[#00F3FF]/20 rounded-full"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#00F3FF] rounded-full shadow-[0_0_15px_#00F3FF]"
                        />
                    </motion.div>

                    {/* Ring 2 - Horizontal Orbit */}
                    <motion.div
                        style={{ rotateX: ring2RotateX, rotateY: ring2RotateY }}
                        className="absolute w-[120vw] h-[120vw] max-w-[600px] max-h-[600px] border border-[#7B1FA2]/15 border-dashed rounded-full"
                    >
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#7B1FA2] rounded-full shadow-[0_0_15px_#7B1FA2]"
                        />
                    </motion.div>
                    {/* Ring 3 - Large Static Glow */}
                    <div className="absolute w-[180vw] h-[180vw] max-w-[900px] max-h-[900px] border border-white/[0.03] rounded-full [transform:rotateX(45deg)]" />
                </motion.div>

                {/* Quantum Particles (Floating & Reactive) */}
                <div className="absolute inset-0 pointer-events-none [will-change:transform]">
                    {[...Array(isMobile ? 6 : 20)].map((_, i) => (
                        <DynamicParticle key={i} smoothX={smoothX} smoothY={smoothY} />
                    ))}
                </div>
            </div>
        </div >
    );
};

export default QuantumBackground;
