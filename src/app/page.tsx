"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  User, 
  Rocket, 
  Store, 
  TrendingUp, 
  X,
  Asterisk,
  Target,   
  Compass,
  Briefcase,
  PieChart,
  Coins
} from 'lucide-react';
import { Playfair_Display, Inter } from 'next/font/google';

// 1. Setup Fonts
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

// 2. Data for the Services
const servicesList = [
  {
    id: 'tax',
    title: "Tax Planning",
    icon: <Coins className="w-8 h-8 mb-4 text-[#C6A87C]"/>,
    text: "We go beyond simple compliance. Our strategic tax planning involves a deep dive into your financial landscape to identify opportunities for tax savings."
  },
  {
    id: 'wealth',
    title: "Wealth Management",
    icon: <TrendingUp className="w-8 h-8 mb-4 text-[#C6A87C]"/>,
    text: "Your wealth should work as hard as you do. We build personalized investment portfolios tailored to your risk tolerance and long-term goals."
  },
  {
    id: 'business',
    title: "Business Development",
    icon: <Rocket className="w-8 h-8 mb-4 text-[#C6A87C]"/>,
    text: "Scaling a business requires more than just a good product. We help you structure your operations and optimize your financial models."
  },
  {
    id: 'venture',
    title: "Venture Capital",
    icon: <Briefcase className="w-8 h-8 mb-4 text-[#C6A87C]"/>,
    text: "We connect high-potential startups with the capital and mentorship they need to scale. Our network provides the fuel for your business engine."
  },
  {
    id: 'reporting',
    title: "Financial Reporting",
    icon: <PieChart className="w-8 h-8 mb-4 text-[#C6A87C]"/>,
    text: "Transparency is the currency of trust. We prepare accurate, compliant, and insightful financial reports that give stakeholders a clear view."
  }
];

// 3. Slider Images
const insightSlides = ["/hero-2.jpg", "/insight-2.jpeg", "/insight-3.jpeg"];

export default function Home() {
  const [activeService, setActiveService] = useState<typeof servicesList[0] | null>(null);
  
  // --- STATES FOR SCROLL & SLIDER ---
  const [currentInsightSlide, setCurrentInsightSlide] = useState(0);
  
  // Services Scroll State
  const servicesRef = useRef<HTMLDivElement>(null);
  const [serviceIndex, setServiceIndex] = useState(0);

  // --- 1. INSTAGRAM-STYLE SCROLL LOGIC ---
  const handleServiceScroll = () => {
    if (servicesRef.current) {
      const { scrollLeft } = servicesRef.current;
      const index = Math.round(scrollLeft / 360); 
      setServiceIndex(index);
    }
  };

  const scrollToService = (index: number) => {
    if (servicesRef.current) {
      const scrollAmount = index * 374; 
      servicesRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setServiceIndex(index);
    }
  };

  // --- 2. INSIGHTS CINEMATIC AUTO-FADE ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentInsightSlide((prev) => (prev + 1) % insightSlides.length);
    }, 5000); // Switch every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`${playfair.variable} ${inter.variable} min-h-screen font-sans bg-white text-slate-800`}>
      
      <Navbar />

      {/* --- POP-UP MODAL FOR SERVICES --- */}
      {activeService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          {/* UPDATED: 'border-4' applies to all sides now */}
          <div className="bg-white p-8 md:p-12 max-w-lg w-full rounded shadow-2xl relative animate-in zoom-in-95 duration-200 border-4 border-[#C6A87C]">
            <button 
              onClick={() => setActiveService(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="mb-4">{activeService.icon}</div>
            <h3 className="text-3xl font-serif text-slate-900 mb-4">{activeService.title}</h3>
            <p className="text-slate-600 leading-relaxed text-lg mb-8">
              {activeService.text}
            </p>
            <button 
              onClick={() => setActiveService(null)}
              className="bg-[#C6A87C] text-white px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-[#a38350] transition"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section className="relative h-[750px] w-full bg-black overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/80 z-10" />

        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center pt-20">
          <div className="inline-block mb-6">
            <h1 className="text-5xl md:text-8xl font-bold text-white font-serif tracking-tighter drop-shadow-2xl">
              DE-JUST <span className="text-gray-200">KREATIV</span>
            </h1>
            <div className="h-[2px] w-full bg-gradient-to-r from-[#C6A87C] via-[#C6A87C]/50 to-transparent mt-2" />
          </div>
          <p className="text-white text-lg md:text-xl tracking-[0.3em] uppercase font-light drop-shadow-md border-l-4 border-[#C6A87C] pl-4 mb-10">
            We Build Businesses. And Bring Stories to Life.
          </p>
        </div>
      </section>

      {/* --- WHO WE ARE SECTION --- */}
      <section id="who-we-are" className="relative py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center relative">
            
            {/* Left: Dark Content Box */}
            <div className="bg-[#545454] text-white p-10 md:p-16 md:w-[48%] z-10 shadow-2xl md:-mr-20">
              <h2 className="text-4xl font-serif mb-8 border-l-2 border-[#C6A87C] pl-4">Who We Are</h2>
              <p className="text-sm leading-8 text-gray-300 mb-10 font-light">
                De Just Creatives is a financial advisory and business development firm dedicated to helping individuals and businesses make informed financial decisions. We advise clients on smart investment strategies, effective wealth management, and practical approaches to developing and growing sustainable businesses.
              </p>
              
              <div className="space-y-4 font-serif text-lg">
                <div onClick={() => document.getElementById('expertise')?.scrollIntoView({behavior: 'smooth'})} className="group flex justify-between items-center border-b border-gray-400 pb-3 cursor-pointer hover:border-[#C6A87C] transition">
                    <span className="group-hover:text-[#C6A87C] transition">What We Offer</span>
                    <ArrowRight className="w-5 h-5 group-hover:text-[#C6A87C] transition" />
                </div>

                <Link href="/contact" className="group flex justify-between items-center border-b border-gray-400 pb-3 hover:border-[#C6A87C] transition">
                    <span className="group-hover:text-[#C6A87C] transition">Contact Us</span>
                    <ArrowRight className="w-5 h-5 group-hover:text-[#C6A87C] transition" />
                </Link>
              </div>
            </div>
            
            {/* Right: Office Image */}
            <div className="w-full md:w-[62%] min-h-[500px] bg-cover bg-center rounded-sm shadow-lg mt-8 md:mt-0"
     style={{ backgroundImage: "url('https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=2070&auto=format&fit=crop')"}}>   
</div>
          </div>
        </div>
      </section>

      {/* --- SERVICES (INSTAGRAM STYLE SCROLL) --- */}
      <section className="py-24 bg-slate-50 border-y border-slate-200" id="expertise">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-serif text-slate-900 mb-2 border-l-4 border-[#C6A87C] pl-6">What We Offer</h2>
                <p className="text-slate-500 pl-7 text-sm">Professional solutions for your growth.</p>
              </div>
          </div>

          {/* SCROLL CONTAINER */}
          <div 
            ref={servicesRef}
            onScroll={handleServiceScroll}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
          >
            {servicesList.map((service) => (
               <div 
                 key={service.id} 
                 className="min-w-[300px] md:min-w-[350px] bg-white p-8 rounded shadow-md border border-slate-100 hover:border-[#C6A87C] transition duration-500 snap-center flex flex-col justify-between group hover:-translate-y-1"
               >
                  <div>
                    <div className="bg-slate-50 p-4 rounded-full w-fit mb-6 group-hover:bg-[#C6A87C]/10 transition">
                       {service.icon}
                    </div>
                    <h3 className="font-bold text-2xl mb-3 font-serif text-slate-800 group-hover:text-[#C6A87C] transition">
                       {service.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-4">
                       {service.text}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => setActiveService(service)}
                    className="mt-8 flex items-center gap-2 text-[#C6A87C] text-xs font-bold uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
            ))}
            
            <div className="min-w-[20px]" />
          </div>

          {/* TINY DOT INDICATORS */}
          <div className="flex justify-center gap-2 mt-4">
             {servicesList.map((_, idx) => (
               <button 
                 key={idx}
                 onClick={() => scrollToService(idx)}
                 className={`rounded-full transition-all duration-300 ${idx === serviceIndex ? 'bg-[#C6A87C] w-6 h-2' : 'bg-slate-300 w-2 h-2 hover:bg-slate-400'}`}
               />
             ))}
          </div>

        </div>
      </section>

      {/* --- WHO WE WORK WITH --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif text-slate-900 mb-2">Who We Work For</h2>
          <p className="text-[#C6A87C] font-serif italic mb-16 text-lg">How We Help</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: User, label: 'Individuals', sub: 'Smart investment and wealth management.' },
              { icon: Rocket, label: 'Startups', sub: 'Financial foundation and growth advice.' },
              { icon: Store, label: 'SMEs', sub: 'Scaling operations and tax management.' },
              { icon: TrendingUp, label: 'Enterprises', sub: 'Strategic structures for long term success.' },
            ].map((card, idx) => (
              <div key={idx} className="bg-[#545454] text-white rounded-sm p-8 flex flex-col items-center justify-center shadow-xl hover:-translate-y-2 transition duration-500 min-h-[220px] group border border-white/10">
                <card.icon className="w-8 h-8 text-[#C6A87C] mb-6 group-hover:scale-110 transition" />
                <h3 className="font-bold mb-3 font-serif tracking-wide text-lg">{card.label}</h3>
                <p className="text-xs text-gray-300 leading-relaxed px-2">{card.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INSIGHTS (NO CONTROLS - PURE AUTO FADE) --- */}
      <section id="insights" className="max-w-7xl mx-auto md:py-24 py-12 px-6 md:px-0">
         <div className="flex flex-col md:flex-row shadow-2xl border border-gray-100">
           
           {/* Left: Text */}
           <div className="bg-[#545454] text-white p-12 md:p-16 md:w-1/2 flex flex-col justify-center min-h-[600px]">
              <h2 className="text-5xl font-serif mb-3 font-bold">Insights</h2>
              <p className="text-[#C6A87C] mb-12 font-serif italic text-2xl">Learn, Grow & Succeed</p>
              
              <ul className="space-y-8">
                {[
                  'Learn how to invest wisely.', 
                  'Understand business finances.', 
                  'Build sustainable wealth.'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                      <Asterisk className="w-6 h-6 text-[#C6A87C] flex-shrink-0 mt-1" />
                      <span className="text-xl font-medium text-white tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
           </div>
           
           {/* Right: LARGE IMAGE FADER (No buttons, no dots) */}
           <div className="md:w-1/2 relative bg-gray-900 min-h-[600px] overflow-hidden group">
              {/* Stacked Images for Smooth Fade */}
              {insightSlides.map((img, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out
                    ${idx === currentInsightSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  style={{ backgroundImage: `url('${img}')` }}
                />
              ))}
           </div>

         </div>
      </section>

      {/* --- VISION & MISSION --- */}
      <section className="py-24 px-6 bg-[#1a1a1a] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          
          {/* Vision */}
          <div className="bg-[#2a2a2a] p-10 rounded-sm border-l-4 border-[#C6A87C] shadow-xl hover:-translate-y-2 transition duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#C6A87C]/10 rounded-full">
                 <Target className="w-8 h-8 text-[#C6A87C]" />
              </div>
              <h2 className="text-3xl font-serif font-bold">Our Vision</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg font-light">
              To stand as the premier Financial and Media Organization in Africa and by extension the world, driving global economic growth through innovation and integrity.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-[#2a2a2a] p-10 rounded-sm border-l-4 border-[#C6A87C] shadow-xl hover:-translate-y-2 transition duration-500">
              <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#C6A87C]/10 rounded-full">
                 <Compass className="w-8 h-8 text-[#C6A87C]" />
              </div>
              <h2 className="text-3xl font-serif font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg font-light">
              Helping SMEs and business owners across the globe to maximize their full potential through Kreative Financial education to help upscale their value chain, positioning them for dominance in the modern business world.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}