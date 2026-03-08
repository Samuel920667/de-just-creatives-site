import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop"; // Ensure you created this file from previous step

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "De-Just Creative Financials",
  description: "Empowering smart investments and sustainable business growth.",
};

// 🔴 THIS FIXES THE ZOOM ISSUE
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents accidental zoom-in on inputs
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/*  overflow-x-hidden FIXES THE HORIZONTAL SCROLL BUG */}
      <body 
        className={`${inter.variable} ${playfair.variable} font-sans bg-white text-slate-800 antialiased overflow-x-hidden`}
      >
        <ScrollToTop />
        <Navbar />
        <main className="min-h-screen relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}