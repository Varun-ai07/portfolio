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
                    transform: 'translateX(var(--spline-offset, 75%)) scale(var(--spline-scale, 1.25))'
                }}
            >
                <spline-viewer
                    ref={viewerRef}
                    loading-anim-type="spinner-small-light"
                    url="https://prod.spline.design/52QH03t1FrhpuPLA/scene.splinecode"
                    style={{ width: '100%', height: '100%', display: 'block' }}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAxCAYAAAAsoQwQAAAJfklEQVR4AdSaCXbjSBJD9X3/I/a+d9cdSqOfaZDBZJKmbFe9N34FAQEgg5Q48vT28uXLl3vw33//3YN///33/s8//zT8/fff97/++uv+559/Nvzxxx938fvvv9+D33777S4yh+2JnA27ryK+bF+4w53i119/vYtffvnlfgRzYV94XrirwmsE1Y/2zIhk4ZyX6/uI1hfpu8978v68/59//vn+008/Nfz444/3H374oeHlNvm53+8T99iq/arriSO/dr6VHq/tHFy9pv2r3Wd6497lgYxBlo5+5pHTl5ON2jmwU1F9tZksosPxnIWziB65Zuoz5OysU7NRj3M9X7Pqz/SLZZEwWhb6slCL6LDeCDOhXzlaf0Syke1VL1pfOM+QTBZ25BnMRM2cxehlnmXVG7XzCHphZcHoikSXNG1a39E8rB51c4VycI1e0YfnT/y3W0m1IGzyCzXuepk1Ru18wjPBWabX1kJZENZHOkxcw7qmZlnXnHUiT/jr1+/3sSYzbyxk2vP/NG7Mrsvvar1xlmvoubLN6SaR+Urfu08o4+uf7SjfuhqYTc8auegXkstksnjrCeqf6TtieRhvStYHkh9I0cHn13+2Xtyj2H3X9H23sL43sZ5PF+vO2YfmZcH8pEl3+qsb1rU/ZllYSaLUc9mvfci13jv+SvnXryIuFJ+pnO28yybXcN+YB494zF3DuxHz/itb8XsjN5be+2coZ7/Nt+Qx99Ynt3ARzJvXrhDDuqs/n+E7+W7PBAvdPUDOurqi+ypWi+zfAR7H4W7P7rj7Px3eSBnN/BW5gcg0lMLZznILH8E9ddW1dk585KN/Ew3Z7/LAxlvbJxzM/JZZh74IKLlcdZ7C16rIn29mY43cu2PmbN5hd4Rpn9j6GEPhI908rC9YOYlO+LZmZl3dF7/7MHUXVV7Tsy8+GbCWUSH4zkH8eQK89msv3xDHEQtRseXhX5YLZwr9ITeEZsFdj4D7hv36Al9WaiFWqhFtCz0Rsz8q1522Q/iycsDcRCWwmqRWRbVUwv9Cj2hd8RmQe2oRc3qrP/WnM7Y0xf6Qi3U4kibBbXzrJe+7B6hDpZfWTEqj+WaqZOH9YKZl+yMPRfUnt4zs93xjF5wltm5mtfekXZfhT0RL1o+fSA5IFuWRdXOn4GznWfZZ1z7W+549t4vP5B600Adb7CdN+EnDLDfD1sPtrOXhb2n/xmAvhs6uxP2GlbPjoC9py9e4DiENYNVe1DA6sFWQ5+hs/0zwHkPWI5D7wLtfwxAy4BlBprnC7DzAaNDwHEO+wz23uHyRwBM76l9Q2ANH91WlAMgcsmge9DZArDkmWUBSId5Cx8vQOtA54e1/IHVA3Y+nHs5APve1Qy2Zz0Hq+ccwNxPXhl6tz2QWQC9ACvDqj0D6wxdx4c+A+0Djh8GlC2DVTezvABLB65rV8C+ry+gZ2oB6wyrHrNxBrSm92gATDPAeMkcgFv7lQXsgtvjB3i83lp2e/2BrQd9NgaWLuw1rJ79CqCNQNsBb/PLy8tNwNp1DmD1gc3+NkxeoPeMgOm9zDK9EcBobWZYc+h680BsA7ubqH70yLA9lxxQt0pFF/Bknl5cH4lDLb81j136QzFkdVp9h7NU5OjzuiX/E9pOpR5xltZte2Kzq2RzP3ggzoS//DwAA//9OM4ZnAAAABklEQVQDAD0lNQe28JgMAAAAAElFTkSuQmCC" alt="Spline preview" style={{ width: '100%', height: '100%' }} />
                </spline-viewer>
            </div>

            {/* Gradient Overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
        </div>
    );
};

export default SplineBackground;
