import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  // Basic SEO (Enhanced)
  title: "VARUN P (Varun-ai07) - AI Architect & Quantum Computing Researcher",
  description: "Varun P - AI Architect, Quantum Computing Researcher, and Web3 Developer from Coimbatore, India. Building next-generation intelligent systems with AI, Quantum Computing, and Blockchain. GitHub: Varun-ai07. B.Tech AI & Data Science @ Anna University.",
  keywords: ["Varun P", "Varun-ai07", "AI Architect", "Quantum Computing", "Web3", "Blockchain", "Machine Learning", "Deep Learning", "Coimbatore", "Anna University", "Artificial Intelligence", "Cybersecurity", "Agentic AI"],
  authors: [{ name: "Varun P", url: "https://github.com/Varun-ai07" }],
  robots: "index, follow",
  
  // Google Search Console Verification (from your old index.html)
  verification: {
    google: "-YjMtYwwCmzr4PONWyz3oE7IQ9Bpt1jmS-bL_q8m26k",
  },
  
  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    url: "https://varun-ai07.github.io/",
    title: "Varun P - AI Architect & Quantum Computing Researcher",
    description: "Building next-generation intelligent systems at the intersection of AI, Quantum Computing, and Blockchain Technology.",
    siteName: "Varun P Portfolio",
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@VarunNebula",
    creator: "@VarunNebula",
    title: "Varun P - AI Architect & Quantum Computing Researcher",
    description: "Building next-generation intelligent systems at the intersection of AI, Quantum Computing, and Blockchain Technology.",
  },
  
  // Base URL for relative URLs
  metadataBase: new URL("https://varun-ai07.github.io"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO - JSON-LD (from your old index.html) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Varun P",
              "alternateName": "Varun-ai07",
              "url": "https://varun-ai07.github.io",
              "sameAs": [
                "https://github.com/Varun-ai07",
                "https://linkedin.com/in/jp-varun",
                "https://x.com/VarunNebula"
              ],
              "jobTitle": "AI Architect & Quantum Computing Researcher",
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Anna University"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Coimbatore",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "IN"
              },
              "email": "jp.vxrun@gmail.com",
              "knowsAbout": [
                "Artificial Intelligence",
                "Quantum Computing",
                "Blockchain",
                "Machine Learning",
                "Web3",
                "Cybersecurity",
                "Agentic AI",
                "Deep Learning",
                "RAG Systems"
              ]
            })
          }}
        />
      </head>
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
        {children}
      </body>
    </html>
  );
}