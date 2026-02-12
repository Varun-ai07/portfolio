"use client";

import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

export const SplineBackground = () => {
    const viewerRef = useRef<any>(null);

    useEffect(() => {
        const viewer = viewerRef.current;
        if (!viewer) return;

        const hideLogo = () => {
            if (viewer.shadowRoot) {
                const shadow = viewer.shadowRoot;

                // 1. Target all known logo selectors
                const selectors = [
                    '#logo',
                    '.spline-watermark',
                    'a[href*="spline.design"]',
                    '#spline-logo-container',
                    'img[src*="spline"]',
                    '#spline-viewer-logo'
                ];

                selectors.forEach(s => {
                    const el = shadow.querySelector(s);
                    if (el) {
                        (el as HTMLElement).style.display = 'none';
                        (el as HTMLElement).style.opacity = '0';
                    }
                });

                // 2. Target ALL anchor tags as a fallback (usually only logo exists)
                const anchors = shadow.querySelectorAll('a');
                anchors.forEach(a => {
                    if (a.href.includes('spline')) {
                        a.style.display = 'none';
                        a.style.opacity = '0';
                        a.style.pointerEvents = 'none';
                    }
                });

                // 3. Inject global style into shadow DOM for persistent removal
                if (!shadow.querySelector('#spline-no-logo')) {
                    const style = document.createElement('style');
                    style.id = 'spline-no-logo';
                    style.textContent = `
                        #logo, .spline-watermark, a, #spline-logo-container, img[src*="spline"] {
                            display: none !important;
                            opacity: 0 !important;
                            visibility: hidden !important;
                            pointer-events: none !important;
                            width: 0 !important;
                            height: 0 !important;
                        }
                    `;
                    shadow.appendChild(style);
                }
            }
        };

        // Aggressive MutationObserver to catch logo re-injection
        const observer = new MutationObserver(hideLogo);

        const checkInterval = setInterval(() => {
            if (viewer.shadowRoot) {
                observer.observe(viewer.shadowRoot, { childList: true, subtree: true });
                hideLogo();
                clearInterval(checkInterval);
            }
        }, 50);

        return () => {
            observer.disconnect();
            clearInterval(checkInterval);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 bg-black pointer-events-none overflow-hidden">
            <Script
                src="https://unpkg.com/@splinetool/viewer@1.12.52/build/spline-viewer.js"
                type="module"
                strategy="afterInteractive"
            />

            <div
                className="absolute inset-0 z-0 w-full h-full transition-transform duration-1000"
                style={{
                    transform: 'translateX(var(--spline-offset, -15%)) scale(var(--spline-scale, 1))'
                }}
            >
                <style jsx>{`
                    div {
                        --spline-offset: -15%;
                        --spline-scale: 1;
                    }
                    @media (max-width: 768px) {
                        div {
                            --spline-offset: 0%;
                            --spline-scale: 0.8;
                        }
                    }
                `}</style>
                {/* @ts-ignore */}
                <spline-viewer
                    ref={viewerRef}
                    loading-anim-type="spinner-small-light"
                    url="https://prod.spline.design/axMMX-4iP4D60a7z/scene.splinecode"
                    style={{ width: '100%', height: '100%', display: 'block' }}
                ></spline-viewer>
            </div>

            {/* Gradient Overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
        </div>
    );
};

export default SplineBackground;
