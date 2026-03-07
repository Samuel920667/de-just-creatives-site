"use client"; 

import { useState, useRef, useEffect } from "react"; // Added hooks for scroll logic
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import Link from "next/link"; 
import { 
  ArrowRight, 
  Briefcase, 
  Users, 
  MapPin, 
  Clock, 
  FileText,
  MessageSquare,
  Award,
  CheckCircle
} from 'lucide-react';
import { Playfair_Display, Inter } from 'next/font/google';

// Fonts
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-sans' });

// --- EXPANDED JOB LIST ---
const OPEN_POSITIONS = [
  { 
    title: 'Financial Analyst', 
    loc: 'Lagos, Nigeria', 
    type: 'Full-Time', 
    desc: 'Analyze financial data, create reports and support strategic decision making for our clients.' 
  },
  { 
    title: 'Tax Consultant', 
    loc: 'Lagos, Nigeria', 
    type: 'Full-Time', 
    desc: 'Provide expert tax advisory services to individuals and SMEs, ensuring compliance and optimizing strategies.' 
  },
  { 
    title: 'Business Dev. Officer', 
    loc: 'Lagos, Nigeria', 
    type: 'Full-Time', 
    desc: 'Drive growth initiatives, build client relationships, and expand our service offerings across Nigeria.' 
  },
  { 
    title: 'Graduate Trainee', 
    loc: 'Lagos, Nigeria', 
    type: 'Internship', 
    desc: 'A structured program for fresh graduates to learn financial advisory, tax planning, and wealth management.' 
  },
  { 
    title: 'Technical Support', 
    loc: 'Remote / Hybrid', 
    type: 'Contract', 
    desc: 'Manage internal IT infrastructure, secure client data, and provide technical assistance to the advisory team.' 
  },
  { 
    title: 'Wealth Management Intern', 
    loc: 'Abuja, Nigeria', 
    type: 'Internship', 
    desc: 'Assist senior portfolio managers in research, client reporting, and market analysis.' 
  },
  { 
    title: 'Executive Assistant', 
    loc: 'Lagos, Nigeria', 
    type: 'Full-Time', 
    desc: 'Provide high-level administrative support to the executive team and manage daily operational workflows.' 
  },
  { 
    title: 'Digital Marketing Lead', 
    loc: 'Remote', 
    type: 'Part-Time', 
    desc: 'Manage our brand presence, execute social media strategies, and drive digital client acquisition.' 
  }
];

export default function Careers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to handle "View Open Positions" scroll (Vertical Page Scroll)
  const scrollToPositionsSection = () => {
    const section = document.getElementById('open-positions');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 1. Handle Horizontal Scroll to update Dots
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Calculate which item is mostly visible
      // We assume card width + gap is roughly 350px + 24px, but using ratio is safer
      const index = Math.round(scrollLeft / (320)); // 320 is approx card width
      setActiveIndex(index);
    }
  };

  // 2. Click Dot to Scroll to Item
  const scrollToItem = (index: number) => {
    if (scrollRef.current) {
      // 320px is the min-width of card + 24px gap
      const scrollAmount = index * 324; 
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className={`${playfair.variable} ${inter.variable} min-h-screen font-sans bg-slate-50 text-slate-800`}>
      
      {/* Navbar */}
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] w-full bg-gray-900 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />

        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center pt-20">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight">
              Build Your Career With <span className="text-[#B59458]">Purpose.</span><br />
              Grow With <span className="text-[#B59458]">Excellence.</span>
            </h1>
            <p className="text-gray-200 text-sm md:text-lg mb-10 font-light max-w-2xl leading-relaxed">
              Join a team dedicated to financial innovation, integrity, and helping businesses thrive. At De Just Creatives, you don't just work—you grow.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
               <button 
                 onClick={scrollToPositionsSection}
                 className="px-8 py-4 bg-[#B59458] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#967946] transition shadow-lg"
               >
                 View Open Positions
               </button>
               
               <Link 
                 href="/careers/apply"
                 className="px-8 py-4 border border-white text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition flex items-center justify-center"
               >
                 Submit Your CV
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY JOIN US --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-[#B59458] mb-4">Why Join De Just Creatives?</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We are building a team of forward-thinking professionals passionate about finance, strategy, and impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-10 shadow-xl border-t-4 border-[#B59458] flex gap-6 items-start hover:-translate-y-1 transition duration-300">
            <div className="p-4 bg-[#B59458]/10 rounded-full">
               <Users className="w-8 h-8 text-[#B59458]" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold mb-3 text-slate-800">Growth & Mentorship</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                We invest in your development through continuous learning, certifications, and direct mentorship from industry experts.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-10 shadow-xl border-t-4 border-[#B59458] flex gap-6 items-start hover:-translate-y-1 transition duration-300">
             <div className="p-4 bg-[#B59458]/10 rounded-full">
               <Award className="w-8 h-8 text-[#B59458]" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold mb-3 text-slate-800">Performance Rewards</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Your hard work is rewarded with competitive compensation, performance bonuses, and clear career progression paths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CURRENT OPPORTUNITIES (IG STYLE CAROUSEL) --- */}
      <section id="open-positions" className="bg-slate-50 py-24 px-6 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-serif text-[#B59458] mb-4">Current Opportunities</h2>
             <p className="text-slate-500 text-sm">Swipe to explore roles that match your ambition.</p>
           </div>
           
           {/* 1. SCROLL CONTAINER */}
           {/* Added 'no-scrollbar' to hide the gray bar (works in most modern browsers with Tailwind plugin or custom CSS) */}
           <div 
             ref={scrollRef}
             onScroll={handleScroll}
             className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scroll-smooth"
             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Inline style to ensure scrollbar is hidden
           >
             {OPEN_POSITIONS.map((job, i) => (
               <div 
                 key={i} 
                 className="
                   min-w-[300px] md:min-w-[350px] 
                   snap-center 
                   bg-white p-8 border border-slate-100 shadow-md 
                   hover:shadow-2xl hover:border-[#B59458] 
                   transition duration-300 group flex flex-col h-auto rounded-sm
                 "
               >
                  <div className="flex items-center gap-2 mb-4">
                     <Briefcase className="w-5 h-5 text-[#B59458]" />
                     <h3 className="font-serif font-bold text-lg">{job.title}</h3>
                  </div>
                  <div className="flex gap-4 text-[10px] text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-4">
                     <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.loc}</span>
                     <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.type}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">{job.desc}</p>
                  
                  {/* Link Pre-fills Form */}
                  <Link 
                    href={`/careers/apply?position=${encodeURIComponent(job.title)}`}
                    className="text-[#B59458] text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all mt-auto"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>
             ))}
           </div>

           {/* 2. PAGINATION DOTS (IG Style) */}
           <div className="flex justify-center gap-2 mt-4">
             {OPEN_POSITIONS.map((_, i) => (
               <button
                 key={i}
                 onClick={() => scrollToItem(i)}
                 className={`
                   rounded-full transition-all duration-300 
                   ${activeIndex === i ? 'w-3 h-3 bg-[#B59458] scale-110' : 'w-2 h-2 bg-slate-300 hover:bg-[#B59458]/50'}
                 `}
                 aria-label={`Go to slide ${i + 1}`}
               />
             ))}
           </div>
           
           <div className="text-center mt-8 text-slate-400 text-xs italic">
             Don't see your role? <Link href="/careers/apply?position=Other" className="text-[#B59458] underline">Submit a General Application</Link>
           </div>
        </div>
      </section>

      {/* --- HIRING PROCESS --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-white">
         <h2 className="text-3xl md:text-4xl font-serif text-[#B59458] mb-16 text-center">Our Hiring Process</h2>
         <div className="grid md:grid-cols-3 gap-12 relative">
           <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-0"></div>
           {/* Step 1 */}
           <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 border-4 border-[#B59458]">
                 <FileText className="w-10 h-10 text-slate-700" />
              </div>
              <h3 className="font-serif text-[#B59458] text-sm uppercase tracking-widest mb-2">Step 01</h3>
              <h4 className="font-bold text-xl mb-3">Apply</h4>
              <p className="text-xs text-slate-500 max-w-xs">Submit your application through our portal.</p>
           </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 border-4 border-[#B59458]">
                 <MessageSquare className="w-10 h-10 text-slate-700" />
              </div>
              <h3 className="font-serif text-[#B59458] text-sm uppercase tracking-widest mb-2">Step 02</h3>
              <h4 className="font-bold text-xl mb-3">Interview</h4>
              <p className="text-xs text-slate-500 max-w-xs">Meet our team to discuss your experience and skills.</p>
           </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 border-4 border-[#B59458]">
                 <CheckCircle className="w-10 h-10 text-slate-700" />
              </div>
              <h3 className="font-serif text-[#B59458] text-sm uppercase tracking-widest mb-2">Step 03</h3>
              <h4 className="font-bold text-xl mb-3">Offer</h4>
              <p className="text-xs text-slate-500 max-w-xs">Receive a job offer if you are the right match.</p>
           </div>
         </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="bg-slate-900 py-16 text-center">
         <h2 className="text-3xl font-serif text-white mb-6">Ready to join De Just Creatives?</h2>
         <Link 
           href="/careers/apply"
           className="inline-block bg-[#B59458] text-white px-10 py-4 rounded shadow-xl font-bold uppercase tracking-widest hover:bg-white hover:text-[#B59458] transition duration-300"
         >
           Apply Now
         </Link>
      </section>

    </div>
  );
}