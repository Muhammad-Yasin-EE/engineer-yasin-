import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Suspense } from "react";
import { CartProvider } from "@/lib/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialFloatingBar from "@/components/SocialFloatingBar";
import { Analytics } from "@vercel/analytics/next";
import WhatsappPopup from "@/components/WhatsappPopup";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Engineer Yasin | Premier Armed Forces & Cadet Colleges Portal",
  description: "Official portal of Engineer Yasin Forces Academy. Access premium Pakistan Armed Forces (PMA Long Course, PAF, Navy) initial practice tests, ISSB guidance, and Cadet Colleges preparation.",
  keywords: ["Engineer Yasin", "Engineer Yasin Forces Academy", "Engineer Yasin Prep Hub", "PMA Long Course Preparation", "ISSB Preparation", "PAF GD Pilot Test", "PN Cadet Test", "Cadet Colleges Entry Test", "Forces MCQs Online"],
  authors: [{ name: "Engineer Yasin" }],
  openGraph: {
    title: "Engineer Yasin | Premier Armed Forces & Cadet Colleges Portal",
    description: "Official portal of Engineer Yasin Forces Academy. Access premium Pakistan Armed Forces (PMA Long Course, PAF, Navy) initial practice tests, ISSB guidance, and Cadet Colleges preparation.",
    url: "https://www.engineeryasin.xyz",
    siteName: "Engineer Yasin Forces Portal",
    locale: "en_PK",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full overflow-x-hidden">
      <body className="min-h-full flex flex-col bg-white text-[#222222] selection:bg-[#B8212E]/10 selection:text-[#B8212E] antialiased overflow-x-hidden">
        <CartProvider>
          <Suspense fallback={<div className="h-16 bg-white border-b border-gray-100" />}>
            <Navbar />
          </Suspense>
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
          <SocialFloatingBar />
          <WhatsappPopup />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
