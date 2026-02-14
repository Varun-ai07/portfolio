import React, { useEffect, useRef } from 'react';

declare global {
    namespace React {
        namespace JSX {
            interface IntrinsicElements {
                'spline-viewer': any;
            }
        }
    }
}

export const SplineBackground = () => {
    const viewerRef = useRef<any>(null);

    useEffect(() => {
        const viewer = viewerRef.current;
        if (!viewer) return;

        const hideLogo = () => {
            if (viewer.shadowRoot) {
                const shadow = viewer.shadowRoot;
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
                    if (el) (el as HTMLElement).style.display = 'none';
                });

                // Persistent removal style
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
            <div
                className="absolute inset-0 z-0 w-full h-full transition-transform duration-1000 spline-wrapper"
                style={{
                    transform: 'translateX(var(--spline-offset, -15%)) scale(var(--spline-scale, 1))'
                }}
            >
                <spline-viewer
                    ref={viewerRef}
                    loading-anim-type="spinner-small-light"
                    url="https://prod.spline.design/axMMX-4iP4D60a7z/scene.splinecode"
                    style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>

            {/* Gradient Overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
        </div>
    );
};

export default SplineBackground;
