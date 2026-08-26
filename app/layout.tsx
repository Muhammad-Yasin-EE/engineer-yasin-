import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { CartProvider } from "@/lib/context/CartContext";
import { AppHeader, AppFooter } from "@/components/AppNavigation";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0A192F",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.engineeryasin.xyz"),
  title: "Engineer Yasin Forces Academy | Pakistan's #1 Armed Forces & ISSB Preparation Portal",
  description: "Official online portal of Engineer Yasin Forces Academy. Free authentic mock tests for Pakistan Army (PMA Long Course, TCC, LCC, AFNS), Pak Air Force (GD Pilot, Aeronautical), Pak Navy (PN Cadet, SSC), and ISSB comprehensive training.",
  keywords: [
    "Engineer Yasin", "Engineer Yasin Forces Academy", "PMA Long Course Preparation", 
    "ISSB Preparation", "PAF GD Pilot Test", "PN Cadet Test", "Cadet Colleges Entry Test", 
    "Armed Forces MCQs Online", "Pakistan Army Initial Test", "Join Pak Army", "Join PAF", "Join Pak Navy",
    "AFNS Preparation", "TCC Technical Cadet Course", "LCC Lady Cadet Course", "ISSB WAT Test",
    "ISSB TAT Story Writing", "GTO Tasks Pakistan", "Verbal Non Verbal Intelligence Tests", "BPSC Quetta"
  ],
  authors: [{ name: "Engineer Yasin" }],
  openGraph: {
    title: "Engineer Yasin Forces Academy | Premier Armed Forces & ISSB Portal",
    description: "Prepare for PMA Long Course, PAF GD Pilot, PN Cadet, and ISSB with Pakistan's premier online timed mock test engine and study resources.",
    url: "https://www.engineeryasin.xyz",
    siteName: "Engineer Yasin Forces Academy",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Engineer Yasin Forces Academy Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineer Yasin Forces Academy | Premier Armed Forces & ISSB Portal",
    description: "Free official initial tests, ISSB coaching, solved notes, and public service job updates.",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-[#B8212E] selection:text-white antialiased">
        <CartProvider>
          <Suspense fallback={<div className="h-16 bg-white border-b border-slate-200" />}>
            <AppHeader />
          </Suspense>
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <AppFooter />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
