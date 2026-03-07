"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; // Reverted back to 'Menu' (3 lines)
import Link from "next/link";
import { Playfair_Display, Inter } from 'next/font/google';

// Setup Fonts to ensure consistency
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`${playfair.variable} ${inter.variable} fixed top-0 left-0 w-full z-50 p-6 font-sans border-b border-black bg-black/60 backdrop-blur-md shadow-lg transition-all duration-300`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        
        {/* --- Logo Section --- */}
        <Link href="/" className="text-white z-50 flex items-center gap-4">
          {/* Space for Image Logo */}
          <div className="relative w-10 h-10 md:w-12 md:h-12">
             <img 
               src="/logo-dejustcreatives-removebg-preview.png" 
               alt="Logo" 
               className="object-contain w-full h-full" 
             />
          </div>
          
          {/* Text Logo */}
          <h1 className="text-xl md:text-2xl font-bold font-serif tracking-widest uppercase shadow-black drop-shadow-md leading-tight">
            De-Just Creative <br className="md:hidden"/> Financials
          </h1>
        </Link>

        {/* --- Right Side Controls --- */}
        <div className="flex items-center gap-6 z-[60]">
          {/* Desktop 'Book Consultation' */}
          <Link 
            href="/contact"
            className="hidden md:flex px-6 py-3 border border-[#B59458] text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 hover:bg-[#B59458] hover:text-white hover:-translate-y-1 shadow-lg bg-black/20 backdrop-blur-sm"
          >
            Book Consultation
          </Link>
          
          {/* Hamburger Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 transition duration-300 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              /* SHOW ONLY X WHEN OPEN */
              <X className="w-8 h-8 md:w-10 md:h-10 text-[#B59458] animate-in spin-in-90 duration-300" />
            ) : (
              /* SHOW 3-LINE MENU (Hamburger) WHEN CLOSED */
              <Menu className="w-8 h-8 md:w-10 md:h-10 text-white hover:text-[#B59458] drop-shadow-md transition-colors" />
            )}
          </button>
        </div>

        {/* --- Pop-up Menu Dropdown --- */}
        <div 
          className={`
            absolute top-full right-0 mt-4 w-72 
            bg-[#1a1a1a] border border-[#B59458]/30 shadow-2xl 
            flex flex-col py-6 px-2 rounded-sm 
            transform transition-all duration-300 origin-top-right 
            ${isOpen ? 'scale-100 opacity-100 visible translate-y-0' : 'scale-95 opacity-0 invisible -translate-y-2'}
          `}
        >
          <nav className="flex flex-col space-y-2">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)} 
              className="group flex items-center justify-between px-6 py-3 hover:bg-white/5 transition-colors"
            >
              <span className="text-lg font-serif text-white group-hover:text-[#B59458] transition-colors">Home</span>
            </Link>

            {/* WHO WE ARE - Scrolls to Section */}
            <Link 
              href="/#who-we-are" 
              onClick={() => setIsOpen(false)} 
              className="group flex items-center justify-between px-6 py-3 hover:bg-white/5 transition-colors"
            >
              <span className="text-lg font-serif text-white group-hover:text-[#B59458] transition-colors">Who We Are</span>
            </Link>

            {/* INSIGHTS - Scrolls to Section */}
            <Link 
              href="/#insights" 
              onClick={() => setIsOpen(false)} 
              className="group flex items-center justify-between px-6 py-3 hover:bg-white/5 transition-colors"
            >
              <span className="text-lg font-serif text-white group-hover:text-[#B59458] transition-colors">Insights</span>
            </Link>

            <Link 
              href="/contact" 
              onClick={() => setIsOpen(false)} 
              className="group flex w-full items-center justify-between px-6 py-3 hover:bg-white/5 transition-colors text-left"
            >
              <span className="text-lg font-serif text-white group-hover:text-[#B59458] transition-colors">Contact</span>
            </Link>
          </nav>

          {/* Mobile-Only CTA Button */}
          <div className="md:hidden px-6 pt-6 mt-4 border-t border-white/10">
            <Link 
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 bg-[#B59458] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#967946] transition"
            >
              Book Consultation
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}