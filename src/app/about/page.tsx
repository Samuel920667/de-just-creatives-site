"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Added Footer for completeness
import Link from "next/link";
import { 
  Target, 
  Flag, 
  FileText, 
  TrendingUp, 
  FileBarChart, 
  Building2
} from 'lucide-react';
import { Playfair_Display, Inter } from 'next/font/google';

// Fonts
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-sans' });

export default function About() {
  return (
    <div className={`${playfair.variable} ${inter.variable} min-h-screen font-sans bg-slate-50 text-slate-800`}>
      
      {/* Navigation */}
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#4a4a4a] text-white pt-32 pb-20 md:pt-40 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          {/* Left Text */}
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
              Empowering Financial Growth, <br />
              Building Lasting Wealth.
            </h1>
            <p className="text-gray-200 text-sm md:text-base mb-8 leading-relaxed max-w-lg">
              At De Just Creatives, we help individuals and businesses make smarter financial decisions, grow sustainable wealth, and build stronger enterprises across Nigeria and beyond.
            </p>
            
            {/* LINKED BUTTON */}
            <Link 
              href="/contact"
              className="inline-block bg-[#B59458] hover:bg-[#967946] text-white px-8 py-3 rounded text-sm font-bold uppercase tracking-widest transition shadow-lg"
            >
              Get Started
            </Link>
          </div>

          {/* Right Image (Nigerian Empowerment Context) */}
          <div className="md:w-1/2 w-full relative">
            <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-white/10">
               {/* IMAGE CHOICE: African professionals collaborating. 
                  Represents: Partnership, Growth, Nigerian Business Context.
               */}
               <div 
                 className="h-[300px] md:h-[400px] w-full bg-cover bg-center hover:scale-105 transition duration-700"
                 style={{ backgroundImage: "url('/download.jpg')" }}
               />
            </div>
          </div>
        </div>
      </section>

      {/* --- WHO WE ARE --- */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-[#B59458] mb-8">Who We Are</h2>
        <p className="text-slate-600 leading-relaxed md:text-lg">
          De Just Creatives is a financial advisory and business development firm dedicated to helping individuals and businesses make informed financial decisions. We advise clients on smart investment strategies, effective wealth management, and practical approaches to developing and growing sustainable businesses. We specialize in tax planning, wealth management, financial reporting preparation, and business development strategies tailored to meet modern financial realities. Our goal is to provide clear guidance, strategic insight, and long-term value tailored to each client's ambition.
        </p>
      </section>

      {/* --- MISSION & VISION CARDS --- */}
      <section className="pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white p-10 rounded-lg shadow-lg flex gap-6 items-start border-l-4 border-[#B59458] hover:-translate-y-1 transition duration-300">
            <Target className="w-12 h-12 text-[#B59458] flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-serif font-bold text-slate-800 mb-3">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To provide strategic financial guidance that empowers individuals and businesses to grow confidently, manage wealth effectively, and secure their future.
              </p>
            </div>
          </div>
          
          {/* Vision */}
          <div className="bg-white p-10 rounded-lg shadow-lg flex gap-6 items-start border-l-4 border-[#B59458] hover:-translate-y-1 transition duration-300">
            <Flag className="w-12 h-12 text-[#B59458] flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-serif font-bold text-slate-800 mb-3">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To become a trusted financial advisory brand known for integrity, excellence, and measurable results across Nigeria and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR CORE SERVICES --- */}
      <section className="py-20 bg-slate-100 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-[#B59458] mb-16 text-center">Our Core Services</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-white p-6 rounded shadow-md hover:-translate-y-2 transition duration-300 border-b-2 border-transparent hover:border-[#B59458]">
               <FileText className="w-10 h-10 text-[#B59458] mb-4" />
               <h3 className="font-serif font-bold text-lg mb-3">Tax Planning</h3>
               <p className="text-xs text-slate-500 leading-relaxed">
                 We help you legally minimize tax liabilities while maximizing financial efficiency.
               </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-6 rounded shadow-md hover:-translate-y-2 transition duration-300 border-b-2 border-transparent hover:border-[#B59458]">
               <TrendingUp className="w-10 h-10 text-[#B59458] mb-4" />
               <h3 className="font-serif font-bold text-lg mb-3">Wealth Management</h3>
               <p className="text-xs text-slate-500 leading-relaxed">
                 Strategic planning and advisory to grow, protect, and sustain your assets.
               </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-6 rounded shadow-md hover:-translate-y-2 transition duration-300 border-b-2 border-transparent hover:border-[#B59458]">
               <FileBarChart className="w-10 h-10 text-[#B59458] mb-4" />
               <h3 className="font-serif font-bold text-lg mb-3">Financial Reporting</h3>
               <p className="text-xs text-slate-500 leading-relaxed">
                 Accurate, compliant, and professional financial reports for individuals and businesses.
               </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-6 rounded shadow-md hover:-translate-y-2 transition duration-300 border-b-2 border-transparent hover:border-[#B59458]">
               <Building2 className="w-10 h-10 text-[#B59458] mb-4" />
               <h3 className="font-serif font-bold text-lg mb-3">Business Development</h3>
               <p className="text-xs text-slate-500 leading-relaxed">
                 Helping businesses scale, structure operations, and increase profitability systematically.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Dark Strip) --- */}
      <section className="bg-[#545454] py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Left Text */}
          <div className="md:w-1/2">
             <h2 className="text-3xl font-serif text-white mb-2">Why Choose Us?</h2>
             <p className="text-gray-300 mb-8 italic">Let's build something sustainable together.</p>
             
             {/* LINKED BUTTON */}
             <Link 
               href="/contact"
               className="inline-block bg-white/10 hover:bg-white/20 border border-white text-white px-6 py-3 rounded text-sm font-bold uppercase tracking-widest transition"
             >
               Schedule a Consultation
             </Link>
          </div>

          {/* Right List */}
          <div className="md:w-1/2 space-y-4">
             {['Personalized Financial Strategies', 'Expert Financial Insight', 'Transparent and ethical advisory', 'Long-term partnership approach'].map((item) => (
               <div key={item} className="flex items-center gap-3 text-white">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#B59458]"></div>
                 <span className="text-sm md:text-base font-light tracking-wide">{item}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

     

    </div>
  );
}