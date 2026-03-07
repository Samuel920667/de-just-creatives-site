import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // <--- Import Footer

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", weight: ["300", "400", "600"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "De Just Creatives",
  description: "Empowering Financial Growth and Building Lasting Wealth.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-slate-50 text-slate-800`}>
        <Navbar />
        {children}
        <Footer /> {/* <--- Footer is now automatic on EVERY page */}
      </body>
    </html>
  );
}