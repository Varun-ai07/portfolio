import React from 'react';

export const GradientMesh: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Gradient blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#A3FF00]/10 rounded-full blur-3xl animate-blob" 
                 style={{ animationDelay: '0s' }} />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#7acc00]/10 rounded-full blur-3xl animate-blob" 
                 style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#A3FF00]/10 rounded-full blur-3xl animate-blob" 
                 style={{ animationDelay: '4s' }} />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7acc00]/10 rounded-full blur-3xl animate-blob" 
                 style={{ animationDelay: '6s' }} />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -20px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(20px, 20px) scale(1.05); }
                }
                .animate-blob {
                    animation: blob 8s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};
