import { useState, useEffect } from 'react';

export const usePerformance = () => {
    const [isLite, setIsLite] = useState(false);

    useEffect(() => {
        const checkPerformance = () => {
            // Check for hardware concurrency (CPU cores)
            // If devices has 4 or fewer cores, it's likely a lower-end or mobile device
            // Most modern high-performance devices have 6+ cores (including performance/efficiency cores)
            const cores = navigator.hardwareConcurrency || 4;

            // Check for save-data preference
            // @ts-ignore
            const saveData = (navigator.connection as any)?.saveData === true;

            // Check for slow connection
            // @ts-ignore
            const isSlowConnection = (navigator.connection as any)?.effectiveType === '2g' || (navigator.connection as any)?.effectiveType === '3g';

            // Enable Lite Mode if:
            // 1. Low CPU core count (<= 4)
            // 2. User requested Data Saver
            // 3. Slow connection
            // 4. Mobile device (optional, but often correlates with lower sustained performance)
            const isMobile = window.matchMedia('(max-width: 768px)').matches;

            // Aggressive optimization for mobile or low-core devices
            if (cores <= 4 || saveData || isSlowConnection || isMobile) {
                setIsLite(true);
            }
        };

        checkPerformance();
    }, []);

    return isLite;
};
