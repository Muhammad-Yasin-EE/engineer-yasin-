import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Suspense } from "react";
import { CartProvider } from "@/lib/context/CartContext";
import { AppHeader, AppFooter } from "@/components/AppNavigation";
import { Analytics } from "@vercel/analytics/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.engineeryasin.xyz"),
  title: "Engineer Yasin | Premier Armed Forces & Cadet Colleges Portal",
  description: "Official portal of Engineer Yasin Digital Prep Portal. Access premium Pakistan Armed Forces (PMA Long Course, PAF, Navy) initial practice tests, ISSB guidance, and Cadet Colleges preparation.",
  keywords: ["Engineer Yasin", "Engineer Yasin Forces Portal", "Engineer Yasin Prep Hub", "PMA Long Course Preparation", "ISSB Preparation", "PAF GD Pilot Test", "PN Cadet Test", "Cadet Colleges Entry Test", "Forces MCQs Online", "BPSC Quetta", "FPSC", "PPSC"],
  authors: [{ name: "Engineer Yasin" }],
  openGraph: {
    title: "Engineer Yasin | Premier Armed Forces & Cadet Colleges Portal",
    description: "Official portal of Engineer Yasin Digital Prep Portal. Access premium Pakistan Armed Forces (PMA Long Course, PAF, Navy) initial practice tests, ISSB guidance, and Cadet Colleges preparation.",
    url: "https://www.engineeryasin.xyz",
    siteName: "Engineer Yasin Forces Portal",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "/images/hero-illustration.jpg",
        width: 1200,
        height: 630,
        alt: "Engineer Yasin Pakistan Premier Forces & Public Service Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineer Yasin | Premier Armed Forces & Cadet Colleges Portal",
    description: "Access premium Pakistan Armed Forces initial practice tests, ISSB preparation, Public Service job updates and online mock quizzes.",
    images: ["/images/hero-illustration.jpg"],
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
