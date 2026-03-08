import React from 'react';

export const AnimatedGrid: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Grid lines */}
            <div className="absolute inset-0" style={{
                backgroundImage: `
                    linear-gradient(rgba(163, 255, 0, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(163, 255, 0, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                animation: 'gridMove 20s linear infinite'
            }} />
            
            {/* Animated horizontal lines */}
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#A3FF00]/20 to-transparent animate-scan-horizontal" 
                 style={{ top: '20%', animationDelay: '0s' }} />
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#A3FF00]/20 to-transparent animate-scan-horizontal" 
                 style={{ top: '60%', animationDelay: '2s' }} />
            
            {/* Animated vertical lines */}
            <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-[#A3FF00]/20 to-transparent animate-scan-vertical" 
                 style={{ left: '30%', animationDelay: '1s' }} />
            <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-[#A3FF00]/20 to-transparent animate-scan-vertical" 
                 style={{ left: '70%', animationDelay: '3s' }} />

            <style>{`
                @keyframes gridMove {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }
                @keyframes scan-horizontal {
                    0% { opacity: 0; transform: translateX(-100%); }
                    50% { opacity: 1; }
                    100% { opacity: 0; transform: translateX(100%); }
                }
                @keyframes scan-vertical {
                    0% { opacity: 0; transform: translateY(-100%); }
                    50% { opacity: 1; }
                    100% { opacity: 0; transform: translateY(100%); }
                }
                .animate-scan-horizontal {
                    animation: scan-horizontal 4s ease-in-out infinite;
                }
                .animate-scan-vertical {
                    animation: scan-vertical 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};
