"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Mail, 
  Phone, 
  ShieldCheck, 
  X, 
  FileText, 
  ChevronRight, 
  Lock, 
  Globe,
  Instagram,
  Linkedin,
  Twitter 
} from "lucide-react";
import { Playfair_Display, Inter } from 'next/font/google';

// 1. Setup Fonts
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

// --- PROFESSIONAL LEGAL TEXT (NDPR COMPLIANT) ---
const LEGAL_TEXT = {
  privacy: {
    title: "Privacy Policy & NDPR Compliance Statement",
    content: (
      <div className="space-y-6 text-sm text-slate-600 leading-relaxed font-sans">
        <div className="p-4 bg-yellow-50 border-l-4 border-[#C6A87C] text-slate-700 text-xs">
          <strong>Official Notice:</strong> This policy outlines how De Just Creatives handles your data in strict compliance with the <strong>Nigeria Data Protection Regulation (NDPR) 2019</strong>.
        </div>

        <section>
          <h4 className="font-serif font-bold text-slate-900 text-lg mb-2">1. Lawful Data Collection</h4>
          <p>
            By using this website, you grant us <strong><u>explicit consent</u></strong> to collect specific personal information. This includes, but is not limited to, data provided via our <strong>Contact Forms</strong> (Name, Email, Phone Number) and <strong>Career Applications</strong> (Curriculum Vitae, Resumes, and Portfolios). We collect this data solely for the purpose of <u>client communication</u>, <u>service delivery</u>, and <u>recruitment processes</u>.
          </p>
        </section>

        <section>
          <h4 className="font-serif font-bold text-slate-900 text-lg mb-2">2. Data Security & Encryption</h4>
          <p>
            We employ enterprise-grade <strong><u>encryption protocols</u></strong> (SSL/TLS) to protect your data during transmission. Your submission of sensitive documents (such as CVs) is handled with <strong>strict confidentiality</strong>. We guarantee that your personal contact details are <strong><u>never sold, traded, or leased</u></strong> to unauthorized third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h4 className="font-serif font-bold text-slate-900 text-lg mb-2">3. Recruitment Data Handling</h4>
          <p>
            Documents uploaded via our Careers portal are accessed <strong><u>strictly by our HR department</u></strong>. If your application is unsuccessful, your data will be retained for a maximum period of <strong>six (6) months</strong> for future opportunities, after which it is permanently purged from our secure servers, unless otherwise legally required.
          </p>
        </section>

        <section>
          <h4 className="font-serif font-bold text-slate-900 text-lg mb-2">4. Your Rights Under NDPR</h4>
          <p>
            You retain full rights to your data. You may request to <strong><u>access, correct, or delete</u></strong> your personal information from our database at any time by contacting our Data Protection Officer at <span className="text-[#C6A87C] font-bold">info@dejustcreative.com</span>.
          </p>
        </section>
      </div>
    )
  },
  terms: {
    title: "Terms of Service & Disclaimer",
    content: (
      <div className="space-y-6 text-sm text-slate-600 leading-relaxed font-sans">
        <section>
          <h4 className="font-serif font-bold text-slate-900 text-lg mb-2">1. Acceptance of Terms</h4>
          <p>
            By accessing or using the De Just Creatives website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, you must <strong><u>immediately discontinue</u></strong> use of this site.
          </p>
        </section>

        <section>
          <h4 className="font-serif font-bold text-slate-900 text-lg mb-2">2. Financial Advisory Disclaimer</h4>
          <p>
            The content provided on this website is for <strong><u>informational purposes only</u></strong> and does not constitute binding financial, legal, or tax advice. While we strive for accuracy, De Just Creatives assumes <strong><u>no liability</u></strong> for decisions made based solely on the information found on this site. Professional consultation is required for specific financial strategies.
          </p>
        </section>

        <section>
          <h4 className="font-serif font-bold text-slate-900 text-lg mb-2">3. Intellectual Property</h4>
          <p>
            All content, including but not limited to text, graphics, logos, images, and software, is the <strong><u>exclusive property</u></strong> of De Just Creatives and is protected by Nigerian and international copyright laws. Unauthorized reproduction or redistribution is <strong>strictly prohibited</strong>.
          </p>
        </section>

        <section>
          <h4 className="font-serif font-bold text-slate-900 text-lg mb-2">4. Limitation of Liability</h4>
          <p>
            In no event shall De Just Creatives be liable for any direct, indirect, or consequential damages arising from the use or inability to use this website, including <strong><u>data loss</u></strong> or <strong><u>interruption of business</u></strong>.
          </p>
        </section>
      </div>
    )
  }
};

export default function Footer() {
  // --- STATE FOR PRIVACY POPUP ---
  const [showConsent, setShowConsent] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);
  
  // Interaction Tracker for the "Nag" feature
  const [interactionCount, setInteractionCount] = useState(0);
  const [isNagging, setIsNagging] = useState(false);

  // 1. INITIAL LOAD CHECK
  useEffect(() => {
    const hasAccepted = localStorage.getItem("djc_consent_accepted");
    if (!hasAccepted) {
      setTimeout(() => setShowConsent(true), 1500); // Slight delay for UX
    }
  }, []);

  // 2. INTERACTION LISTENER (The "Nag" Feature)
  useEffect(() => {
    if (isNagging && !showConsent) {
      const handleInteraction = () => {
        setInteractionCount((prev) => {
          const newCount = prev + 1;
          // If user clicks 2 times after closing, show it again
          if (newCount >= 2) {
            setShowConsent(true); 
            setIsNagging(false); 
            return 0;
          }
          return newCount;
        });
      };

      window.addEventListener('click', handleInteraction);
      return () => window.removeEventListener('click', handleInteraction);
    }
  }, [isNagging, showConsent]);

  const handleAccept = () => {
    localStorage.setItem("djc_consent_accepted", "true");
    setShowConsent(false);
    setIsNagging(false);
  };

  const handleCloseWithoutAccepting = () => {
    setShowConsent(false);
    setIsNagging(true); 
    setInteractionCount(0);
  };

  return (
    <footer className={`${playfair.variable} ${inter.variable} relative bg-[#1a1a1a] font-sans border-t border-[#C6A87C]/20`}>
      
      {/* --- MAIN FOOTER CONTENT --- */}
      <div className="text-white pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pt-20">
          
          {/* Column 1: Brand, Socials & Contact Info */}
          <div className="md:pr-8">
            <h3 className="text-[#C6A87C] font-serif text-2xl mb-4 font-bold tracking-wider">DE-JUST KЯEATIV</h3>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed font-light">
              Empowering smart investments <br /> and sustainable business growth.
            </p>

            {/* --- SOCIAL ICONS (UPDATED LINKS) --- */}
            <div className="flex gap-3 mb-8">
               <a href="https://www.instagram.com/dejust_creative_financials?igsh=azB1NGY3azV4aDEw" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#C6A87C] hover:text-white text-gray-400 transition-all duration-300 group shadow-md border border-white/5 hover:border-[#C6A87C]">
                  <Instagram className="w-4 h-4" />
               </a>
               <a href="https://www.linkedin.com/company/dejust-creative-media-finance/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#C6A87C] hover:text-white text-gray-400 transition-all duration-300 group shadow-md border border-white/5 hover:border-[#C6A87C]">
                  <Linkedin className="w-4 h-4" />
               </a>
               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#C6A87C] hover:text-white text-gray-400 transition-all duration-300 group shadow-md border border-white/5 hover:border-[#C6A87C]">
                  <Twitter className="w-4 h-4" />
               </a>
            </div>

            <div className="space-y-6 text-xs text-gray-400 font-light">
               
               {/* Nigeria Office (UPDATED: Removed "Head Office", Added 2 Numbers) */}
               <div className="group">
                 <div className="flex items-start gap-3 mb-2">
                    <MapPin className="w-4 h-4 text-[#C6A87C] mt-1 flex-shrink-0 group-hover:scale-110 transition" /> 
                    <div>
                        <span className="block text-[#C6A87C] font-bold mb-1">Nigeria</span>
                        <span className="block leading-relaxed">8 Akintola Crescent,<br/> Along Ikorodu Road, Lagos.</span>
                    </div>
                 </div>
                 <div className="pl-7 space-y-1">
                   <a href="tel:+2349112810287" className="flex items-center gap-3 hover:text-[#C6A87C] transition">
                     <Phone className="w-3 h-3 text-[#C6A87C]" /> 
                     <span>+234 911 281 0287</span>
                   </a>
                   <a href="tel:+2347088798551" className="flex items-center gap-3 hover:text-[#C6A87C] transition">
                     <Phone className="w-3 h-3 text-[#C6A87C]" /> 
                     <span>+234 708 879 8551</span>
                   </a>
                 </div>
               </div>

               {/* UK Office */}
               <div className="group">
                 <div className="flex items-start gap-3 mb-2">
                    <Globe className="w-4 h-4 text-[#C6A87C] mt-1 flex-shrink-0 group-hover:scale-110 transition" /> 
                    <div>
                        <span className="block text-[#C6A87C] font-bold mb-1">United Kingdom (Diaspora)</span>
                        <span className="block leading-relaxed">41 Warwick Gardens,<br/> Worthing, BN11 1PF.</span>
                    </div>
                 </div>
                 <a href="tel:+447474350779" className="flex items-center gap-3 pl-7 hover:text-[#C6A87C] transition">
                   <Phone className="w-3 h-3 text-[#C6A87C]" /> 
                   <span>+44 7474 350779</span>
                 </a>
               </div>

               {/* Email */}
               <div className="pt-2 border-t border-white/5">
                 <a href="mailto:info@dejustcreative.com" className="flex items-center gap-3 hover:text-[#C6A87C] transition group pt-2">
                   <Mail className="w-4 h-4 text-[#C6A87C] group-hover:scale-110 transition" /> 
                   <span>info@dejustcreative.com</span>
                 </a>
               </div>

            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-[#C6A87C] font-serif text-lg mb-6">Our Services</h4>
            <ul className="space-y-4 text-xs text-gray-300 font-light">
              {['Financial Reporting', 'Wealth Management', 'Venture Capital', 'Tax Planning', 'Business Development'].map(item => (
                <li key={item} className="flex items-center gap-2 group">
                   <span className="w-1 h-1 bg-white rounded-full group-hover:bg-[#C6A87C] transition"></span>
                   <span className="cursor-pointer hover:text-[#C6A87C] transition hover:translate-x-1 duration-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links (UPDATED) */}
          <div>
             <h4 className="text-white font-serif text-lg mb-6">Quick Links</h4>
             <ul className="space-y-4 text-xs text-[#C6A87C] font-light">
               <li className="group flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#C6A87C] rounded-full"></span>
                  <Link href="/" className="hover:text-white transition hover:translate-x-1 duration-300">Home</Link>
               </li>
               <li className="group flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#C6A87C] rounded-full"></span>
                  <Link href="/#who-we-are" className="hover:text-white transition hover:translate-x-1 duration-300">Who We Are</Link>
               </li>
               <li className="group flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#C6A87C] rounded-full"></span>
                  <Link href="/#expertise" className="hover:text-white transition hover:translate-x-1 duration-300">What We Offer</Link>
               </li>
               <li className="group flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#C6A87C] rounded-full"></span>
                  <Link href="/#who-we-work-for" className="hover:text-white transition hover:translate-x-1 duration-300">Who We Work For</Link>
               </li>
               <li className="group flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#C6A87C] rounded-full"></span>
                  <Link href="/#insights" className="hover:text-white transition hover:translate-x-1 duration-300">Insights</Link>
               </li>
               <li className="group flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#C6A87C] rounded-full"></span>
                  <Link href="/contact" className="hover:text-white transition hover:translate-x-1 duration-300">Contact Us</Link>
               </li>
             </ul>
          </div>

          {/* Column 4: CTA */}
          <div>
            <h4 className="text-white font-serif text-sm font-bold mb-2 tracking-wide">Ready to grow financially?</h4>
            <p className="text-[11px] text-[#C6A87C] mb-6 font-light leading-relaxed">
               Book a consultation and start <br/> your journey today.
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-[#C6A87C] hover:bg-[#b08d55] text-white px-8 py-3 rounded text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* --- Copyright Section --- */}
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-6">
          <p className="text-[10px] text-gray-500 font-light tracking-wider">
             © 2026 De-Just Creative. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] text-gray-400 font-light">
             <button onClick={() => setActiveModal('privacy')} className="hover:text-[#C6A87C] transition relative after:content-['|'] after:absolute after:-right-3 after:text-gray-600 last:after:hidden">Privacy Policy</button>
             <button onClick={() => setActiveModal('terms')} className="hover:text-[#C6A87C] transition">Terms & Conditions</button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* === PRIVACY CONSENT POPUP (Slide Up) === */}
      {/* ========================================================= */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-white z-[90] shadow-[0_-5px_30px_rgba(0,0,0,0.3)] transform transition-transform duration-700 ease-in-out px-6 py-8 border-t-4 border-[#C6A87C] ${showConsent ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex-1">
             <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-6 h-6 text-[#C6A87C]" />
                <h4 className="font-serif font-bold text-slate-900 text-xl">Your Data is Protected</h4>
             </div>
             <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-3xl">
               We use cookies and monitor user activity to ensure <strong>security</strong> and improve your experience. 
               In compliance with the <strong>Nigeria Data Protection Regulation (NDPR)</strong>, your personal data (including contact forms and CV uploads) is <strong>encrypted and safe-kept</strong>. 
               By continuing, you agree to our 
               <button onClick={() => setActiveModal('privacy')} className="text-[#C6A87C] font-bold hover:underline mx-1">Privacy Policy</button> 
               and 
               <button onClick={() => setActiveModal('terms')} className="text-[#C6A87C] font-bold hover:underline mx-1">Terms of Service</button>.
             </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
             <button 
               onClick={handleCloseWithoutAccepting}
               className="text-slate-400 hover:text-red-500 transition text-xs font-bold uppercase tracking-widest px-4"
             >
               Decline
             </button>
             <button 
               onClick={handleAccept}
               className="bg-[#1a1a1a] hover:bg-[#C6A87C] text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
             >
               Accept & Continue <ChevronRight className="w-3 h-3" />
             </button>
          </div>

          {/* Close X (Triggers the Nag Logic) */}
          <button 
            onClick={handleCloseWithoutAccepting}
            className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* === LEGAL TEXT MODALS (Privacy / Terms) === */}
      {/* ========================================================= */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-white max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded shadow-2xl relative animate-in zoom-in-95 duration-300 flex flex-col">
             
             {/* Header */}
             <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10 shadow-sm">
                <div className="flex items-center gap-3">
                   {activeModal === 'privacy' ? <Lock className="w-6 h-6 text-[#C6A87C]" /> : <FileText className="w-6 h-6 text-[#C6A87C]" />}
                   <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-800">{LEGAL_TEXT[activeModal].title}</h3>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-500 transition">
                   <X className="w-5 h-5" />
                </button>
             </div>

             {/* Content (Scrollable) */}
             <div className="p-8 md:p-10">
                {LEGAL_TEXT[activeModal].content}
             </div>

             {/* Footer */}
             <div className="sticky bottom-0 bg-gray-50 p-6 border-t border-gray-100 text-center z-10">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="bg-[#C6A87C] text-white px-10 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#b08d55] transition shadow-md"
                >
                  I Acknowledge
                </button>
             </div>

           </div>
        </div>
      )}

    </footer>
  );
}