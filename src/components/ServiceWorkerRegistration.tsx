"use client";

import { useEffect } from 'react';

/**
 * ServiceWorkerRegistration Component
 * Registers the service worker for offline-first caching
 * and provides cache management utilities
 */
export default function ServiceWorkerRegistration() {
    useEffect(() => {
        // Only register service worker in production
        if (
            typeof window !== 'undefined' &&
            'serviceWorker' in navigator &&
            process.env.NODE_ENV === 'production'
        ) {
            // Register service worker
            navigator.serviceWorker
                .register('/sw.js', { scope: '/' })
                .then((registration) => {
                    console.log('[SW] Service Worker registered successfully:', registration.scope);

                    // Check for updates every hour
                    setInterval(() => {
                        registration.update();
                    }, 60 * 60 * 1000); // 1 hour

                    // Listen for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    // New service worker available, prompt user to refresh
                                    console.log('[SW] New version available! Refresh to update.');

                                    // Optional: Show a notification to user
                                    // You can dispatch a custom event here to show a toast
                                    if (window.confirm('New version available! Refresh to update?')) {
                                        window.location.reload();
                                    }
                                }
                            });
                        }
                    });
                })
                .catch((error) => {
                    console.error('[SW] Service Worker registration failed:', error);
                });

            // Listen for messages from service worker
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'CACHE_CLEARED') {
                    console.log('[SW] Cache cleared successfully');
                }
            });

            // Handle page visibility for cache updates
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden && navigator.serviceWorker.controller) {
                    // Page became visible, check for updates
                    navigator.serviceWorker.ready.then((registration) => {
                        registration.update();
                    });
                }
            });
        }
    }, []);

    // Expose cache clearing function to window for debugging
    useEffect(() => {
        if (typeof window !== 'undefined') {
            (window as any).clearAppCache = () => {
                if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' });
                    console.log('[SW] Cache clear requested');
                }
            };
        }
    }, []);

    return null;
}
