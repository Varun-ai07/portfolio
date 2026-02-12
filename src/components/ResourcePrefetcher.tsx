"use client";

import { useEffect } from 'react';

/**
 * ResourcePrefetcher Component
 * Intelligently prefetches resources based on user behavior
 * to minimize HTTP requests on subsequent interactions
 */
export default function ResourcePrefetcher() {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Prefetch links on hover with delay
        const prefetchedLinks = new Set<string>();
        let prefetchTimeout: NodeJS.Timeout;

        const handleLinkHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (link && link.href && !prefetchedLinks.has(link.href)) {
                prefetchTimeout = setTimeout(() => {
                    prefetchLink(link.href);
                    prefetchedLinks.add(link.href);
                }, 200); // Delay to avoid prefetching on quick mouse movements
            }
        };

        const handleLinkLeave = () => {
            if (prefetchTimeout) {
                clearTimeout(prefetchTimeout);
            }
        };

        const prefetchLink = (href: string) => {
            try {
                const url = new URL(href);
                // Only prefetch same-origin links
                if (url.origin === window.location.origin) {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = href;
                    link.as = 'document';
                    document.head.appendChild(link);
                    console.log('[Prefetch] Prefetching:', href);
                }
            } catch (err) {
                // Invalid URL, skip
            }
        };

        // Prefetch images when they enter viewport (with margin)
        const imageObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target as HTMLImageElement;
                        if (img.dataset.src && !img.src) {
                            img.src = img.dataset.src;
                            imageObserver.unobserve(img);
                        }
                    }
                });
            },
            {
                rootMargin: '50px', // Start loading 50px before entering viewport
            }
        );

        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach((img) => {
            imageObserver.observe(img);
        });

        // Prefetch critical resources on idle
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                prefetchCriticalResources();
            });
        } else {
            setTimeout(prefetchCriticalResources, 1000);
        }

        // Add hover listeners to all links
        document.addEventListener('mouseover', handleLinkHover, { passive: true });
        document.addEventListener('mouseleave', handleLinkLeave, { passive: true });

        return () => {
            document.removeEventListener('mouseover', handleLinkHover);
            document.removeEventListener('mouseleave', handleLinkLeave);
            imageObserver.disconnect();
            if (prefetchTimeout) clearTimeout(prefetchTimeout);
        };
    }, []);

    return null;
}

// Prefetch critical resources that are likely to be needed
function prefetchCriticalResources() {
    const criticalResources: string[] = [
        // Add paths to critical resources here
        // Example: '/api/data', '/images/hero.jpg'
    ];

    criticalResources.forEach((resource) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
    });

    console.log('[Prefetch] Critical resources prefetched');
}
