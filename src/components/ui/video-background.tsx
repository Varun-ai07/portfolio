import React from 'react';

/**
 * VideoBackground Component
 * 
 * Renders a full-screen background video for mobile devices.
 * Designed to replace heavy 3D Spline backgrounds on phone screens.
 */
const VideoBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 bg-black pointer-events-none overflow-hidden">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(0.4)' }}
            >
                <source src="/world.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Gradient Overlays for readability - matching SplineBackground */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
        </div>
    );
};

export default VideoBackground;
