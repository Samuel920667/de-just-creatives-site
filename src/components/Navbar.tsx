"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <header className={`${playfair.variable} ${inter.variable} fixed top-0 left-0 w-full z-[60] py-4 px-4 md:py-5 md:px-8 font-sans border-b border-white/10 bg-black/80 backdrop-blur-md shadow-lg transition-all duration-300`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          
          {/* --- 1. LOGO SECTION --- */}
          <Link href="/" className="text-white z-[70] flex items-center gap-3">
            {/* Logo Image */}
            <div className="relative w-8 h-8 md:w-12 md:h-12 flex-shrink-0">
               <img 
                 src="/logo-dejustcreatives-removebg-preview.png" 
                 alt="Logo" 
                 className="object-contain w-full h-full" 
               />
            </div>
            
            {/* Logo Text */}
            <div className="flex flex-col justify-center">
              <h1 className="text-[10px] sm:text-xs md:text-xl font-bold font-serif tracking-widest uppercase shadow-black drop-shadow-md whitespace-nowrap leading-tight">
                DE - JUST CREATIVE FINANCIAL
              </h1>
            </div>
          </Link>

          {/* --- 2. CONTROLS --- */}
          <div className="flex items-center gap-6 z-[70]">
            
            {/* Desktop 'Book Consultation' (Hidden on Mobile) */}
            <Link 
              href="/contact#consultation-form" 
              className="hidden md:flex px-6 py-3 border border-[#B59458] text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 hover:bg-[#B59458] hover:text-white hover:-translate-y-1 shadow-lg bg-black/20"
            >
              Book Consultation
            </Link>
            
            {/* --- 3. MENU TOGGLE BUTTON --- */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-white hover:text-[#B59458] transition focus:outline-none flex items-center justify-center group"
            >
               {/* Custom Animated Icon */}
               <div className="w-8 h-8 flex flex-col justify-center items-end gap-1.5">
                  <span className={`h-[2px] bg-current transition-all duration-300 ${isOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8'}`} />
                  <span className={`h-[2px] bg-current transition-all duration-300 ${isOpen ? 'w-0 opacity-0' : 'w-5 group-hover:w-8'}`} />
                  <span className={`h-[2px] bg-current transition-all duration-300 ${isOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-3 group-hover:w-8'}`} />
               </div>
            </button>
          </div>
        </div>
      </header>

      {/* --- 4. FULL SCREEN GLASS MENU OVERLAY --- */}
      <div 
        className={`
          fixed inset-0 z-[50] 
          bg-black/80 backdrop-blur-xl
          flex flex-col items-center
          justify-start pt-32 md:pt-40 overflow-y-auto
          transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95 pointer-events-none'}
        `}
      >
        <nav className="flex flex-col space-y-6 md:space-y-8 text-center pb-10">
          {[
            { name: "Home", href: "/" },
            { name: "Who We Are", href: "/#who-we-are" },
            { name: "What We Offer", href: "/#expertise" },      // Points to Services Section
            { name: "Who We Work For", href: "/#who-we-work-for" }, // Points to Client Section
            { name: "Insights", href: "/#insights" },
            { name: "Contact Us", href: "/contact" },
          ].map((link, idx) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsOpen(false)} 
              className={`
                text-3xl md:text-5xl font-serif text-white hover:text-[#B59458] 
                transition-all duration-500 transform
                ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              `}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Only CTA Button inside Menu */}
          <div 
             className={`md:hidden pt-8 transition-all duration-700 delay-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <Link 
              href="/contact#consultation-form"
              onClick={() => setIsOpen(false)}
              className="px-8 py-4 border border-[#B59458] text-[#B59458] hover:bg-[#B59458] hover:text-white text-sm font-bold uppercase tracking-widest transition-all duration-300"
            >
              Book Consultation
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}