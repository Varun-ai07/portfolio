import React, { useEffect, useRef, useState } from 'react';

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
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [hasValidSize, setHasValidSize] = useState(false);
    const [isWindowLoaded, setIsWindowLoaded] = useState(document.readyState === 'complete');
    const canMountViewer = hasValidSize && isWindowLoaded;

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const updateMountState = () => {
            const rect = wrapper.getBoundingClientRect();
            if (rect.width > 8 && rect.height > 8) {
                setHasValidSize(true);
            }
        };

        updateMountState();

        const resizeObserver = new ResizeObserver(() => {
            updateMountState();
        });

        resizeObserver.observe(wrapper);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        if (isWindowLoaded) return;

        const onLoad = () => setIsWindowLoaded(true);
        window.addEventListener('load', onLoad, { once: true });

        return () => {
            window.removeEventListener('load', onLoad);
        };
    }, [isWindowLoaded]);

    useEffect(() => {
        if (!canMountViewer) return;

        const viewer = viewerRef.current;
        if (!viewer) return;

        // Track Spline loading with multiple methods
        let loadReported = false;
        const handleLoad = () => {
            if (!loadReported) {
                loadReported = true;
                if (window.loadingProgress) {
                    window.loadingProgress.updateProgress('spline');
                }
            }
        };

        // Try multiple event listeners for better compatibility
        viewer.addEventListener('load', handleLoad);
        viewer.addEventListener('ready', handleLoad);

        // Fallback: Check if Spline is loaded after delay
        const loadCheckInterval = setInterval(() => {
            if (viewer.shadowRoot && !loadReported) {
                const canvas = viewer.shadowRoot.querySelector('canvas');
                if (canvas) {
                    handleLoad();
                    clearInterval(loadCheckInterval);
                }
            }
        }, 500);

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
        const logoCheckInterval = setInterval(() => {
            if (viewer.shadowRoot) {
                observer.observe(viewer.shadowRoot, { childList: true, subtree: true });
                hideLogo();
                clearInterval(logoCheckInterval);
            }
        }, 50);

        return () => {
            viewer.removeEventListener('load', handleLoad);
            viewer.removeEventListener('ready', handleLoad);
            clearInterval(loadCheckInterval);
            observer.disconnect();
            clearInterval(logoCheckInterval);
        };
    }, [canMountViewer]);

    return (
        <div className="absolute inset-0 z-0 bg-black pointer-events-none overflow-hidden">
            <div
                ref={wrapperRef}
                className="absolute inset-0 z-0 w-full h-full transition-transform duration-1000 spline-wrapper"
                style={{
                    transform: 'translateX(var(--spline-offset, 75%)) scale(var(--spline-scale, 1.25))',
                    minWidth: '1px',
                    minHeight: '1px'
                }}
            >
                {canMountViewer ? (
                    <spline-viewer
                        ref={viewerRef}
                        loading-anim-type="spinner-small-light"
                        url="https://prod.spline.design/52QH03t1FrhpuPLA/scene.splinecode"
                        style={{ width: '100%', height: '100%', display: 'block' }}
                    />
                ) : (
                    <div className="w-full h-full" />
                )}
            </div>

            {/* Gradient Overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
        </div>
    );
};

export default SplineBackground;
