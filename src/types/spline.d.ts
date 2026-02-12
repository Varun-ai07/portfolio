import React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                url?: string;
                'loading-anim-type'?: 'spinner-small-dark' | 'spinner-small-light' | 'spinner-big-dark' | 'spinner-big-light';
                loading?: 'lazy' | 'eager';
                hint?: string;
                'events-target'?: string;
                unloadable?: string;
            }, HTMLElement>;
        }
    }
}
