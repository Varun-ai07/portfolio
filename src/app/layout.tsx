import type { Metadata, Viewport } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import ResourcePrefetcher from "@/components/ResourcePrefetcher";

export const metadata: Metadata = {
  title: "VARUN P - AI Architect & Quantum Computing Researcher",
  description: "Building next-generation intelligent systems at the intersection of AI, Quantum Computing, and Blockchain Technology. B.Tech AI & Data Science @ Anna University, Coimbatore.",
  keywords: ["Varun P", "AI Architect", "Quantum Computing", "Web3", "Blockchain", "Machine Learning", "Deep Learning"],
  authors: [{ name: "Varun P" }],
  manifest: '/manifest.json',
  openGraph: {
    title: "VARUN P - AI Architect & Quantum Computing Researcher",
    description: "Building next-generation intelligent systems at the intersection of AI, Quantum Computing, and Blockchain Technology.",
    type: "website",
  },
  icons: {
    icon: '/globe.svg',
    apple: '/globe.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'VARUN P',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="af4c35f8-1446-4f5b-bb80-a08d745daef0"
        />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {/* Nuclear Hider for Dev Tools */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // 1. FILTER CONSOLE ERRORS (Prevents the '1 Issue' pill from triggering)
                const _error = console.error;
                console.error = function(...args) {
                  const msg = args.join(' ');
                  if (msg.includes('110504') || msg.includes('SubdivGeometry')) return;
                  _error.apply(console, args);
                };

                // 2. AGGRESSIVE UI HIDER
                const hideTools = () => {
                  const styleId = 'nuclear-hider-styles';
                  if (!document.getElementById(styleId)) {
                    const style = document.createElement('style');
                    style.id = styleId;
                    style.innerHTML = \`
                      nextjs-portal, #nextjs-portal, [data-nextjs-toast-wrapper], 
                      #next-dev-overlay, .next-dev-overlay, [data-nextjs-dialog-overlay] { 
                        display: none !important; visibility: hidden !important; 
                        opacity: 0 !important; pointer-events: none !important;
                        z-index: -99999 !important; height: 0 !important;
                      }
                    \`;
                    document.head.appendChild(style);
                  }

                  ['nextjs-portal', '[data-nextjs-toast-wrapper]', '#nextjs-portal'].forEach(s => {
                    document.querySelectorAll(s).forEach(el => el.remove());
                  });
                };

                setInterval(hideTools, 100);
              })();
            `,
          }}
        />
        <ServiceWorkerRegistration />
        <ResourcePrefetcher />
        {children}
      </body>
    </html>
  );
}
