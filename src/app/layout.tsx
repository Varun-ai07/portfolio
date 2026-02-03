import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "VARUN P - AI Architect & Quantum Computing Researcher",
  description: "Building next-generation intelligent systems at the intersection of AI, Quantum Computing, and Blockchain Technology. B.Tech AI & Data Science @ Anna University, Coimbatore.",
  keywords: ["Varun P", "AI Architect", "Quantum Computing", "Web3", "Blockchain", "Machine Learning", "Deep Learning"],
  authors: [{ name: "Varun P" }],
  openGraph: {
    title: "VARUN P - AI Architect & Quantum Computing Researcher",
    description: "Building next-generation intelligent systems at the intersection of AI, Quantum Computing, and Blockchain Technology.",
    type: "website",
  },
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
        <ErrorReporter />
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
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
