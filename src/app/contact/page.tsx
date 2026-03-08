"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle, 
  Loader2, 
  ChevronDown, 
  Lock,
  ArrowRight,
  Briefcase,
  Clock,
  Globe,
  X 
} from 'lucide-react';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const COUNTRY_CODES = [
  { code: "+234", country: "NG", flag: "🇳🇬" },
  { code: "+1",   country: "US", flag: "🇺🇸" },
  { code: "+44",  country: "UK", flag: "🇬🇧" },
  { code: "+233", country: "GH", flag: "🇬🇭" },
  { code: "+27",  country: "ZA", flag: "🇿🇦" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
];

const SERVICES = [
  "Financial Reporting",
  "Wealth Management",
  "Venture Capital",
  "Tax Planning",
  "Business Development",
  "Other"
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [isSessionLocked, setIsSessionLocked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [statusText, setStatusText] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneCode: "+234",
    phone: "",
    service: "", 
    customSubject: "", 
    message: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    setMounted(true);
    const lastSubmission = localStorage.getItem('djc_last_submission_time');
    if (lastSubmission) {
      const lastTime = parseInt(lastSubmission);
      const now = Date.now();
      if ((now - lastTime) / (1000 * 60 * 60) < 24) {
        setIsSessionLocked(true);
        setIsSubmitted(true);
      } else {
        localStorage.removeItem('djc_last_submission_time');
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const checkStatus = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { timeZone: 'Africa/Lagos', weekday: 'short', hour: 'numeric', hour12: false };
      const formatter = new Intl.DateTimeFormat('en-GB', options);
      const parts = formatter.formatToParts(now);
      const day = parts.find(p => p.type === 'weekday')?.value; 
      const hour = parseInt(parts.find(p => p.type === 'hour')?.value || "0");
      const isWeekend = day === 'Sat' || day === 'Sun';
      const isWorkHours = hour >= 9 && hour < 17;

      if (!isWeekend && isWorkHours) {
        setIsOpen(true);
        setStatusText("Open Now");
      } else {
        setIsOpen(false);
        setStatusText("Closed");
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, [mounted]);

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required.";
    if (!formData.service) newErrors.service = "Please select a service.";
    if (formData.service === "Other" && !formData.customSubject.trim()) newErrors.customSubject = "Please specify the subject.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const finalSubject = formData.service === "Other" ? formData.customSubject : formData.service;
    const payload = { ...formData, subject: finalSubject };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setIsSessionLocked(true);
        localStorage.setItem('djc_last_submission_time', Date.now().toString());
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!mounted) return null;

  return (
    <div className={`${playfair.variable} ${inter.variable} min-h-screen font-sans bg-[#f4f4f4] text-slate-800`}>
      
      {/* HEADER SECTION */}
      <section className="relative h-[400px] bg-black flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('/hero-2.jpg')" }} 
        />
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* 🔴 SIMPLIFIED X BUTTON (NO BORDER, NO ANIMATION) */}
        <Link 
          href="/" 
          className="absolute top-28 right-6 md:top-32 md:right-12 z-40 text-white hover:text-[#C6A87C] transition-colors"
          aria-label="Return to Home"
        >
          <X className="w-8 h-8" />
        </Link>
        
        <div className="relative z-20 text-center px-6 mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-6xl font-serif text-white font-bold mb-4 tracking-tight">Contact Us</h1>
          <div className="h-1 w-24 bg-[#C6A87C] mx-auto mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
             Connect with our team for strategic financial advice and business growth solutions.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 -mt-10 relative z-30">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded shadow-xl border-t-4 border-[#C6A87C] overflow-hidden">
               <div className="p-6 border-b border-gray-100">
                  <h3 className="text-slate-800 font-serif font-bold text-xl">Our Offices</h3>
               </div>
               
               {/* Nigeria */}
               <div className="p-6 border-b border-gray-100 hover:bg-slate-50 transition group">
                  <div className="flex items-center gap-3 mb-2">
                     <MapPin className="w-5 h-5 text-[#C6A87C]" />
                     <span className="font-bold text-slate-800">Lagos, Nigeria</span>
                     <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase font-bold">HQ</span>
                  </div>
                  <p className="text-sm text-slate-600 pl-8 leading-relaxed mb-3">
                    8 Akintola Crescent,<br/> Along Ikorodu Road.
                  </p>
                  <a href="tel:+2348069010564" className="text-sm font-bold text-slate-700 hover:text-[#C6A87C] pl-8 flex items-center gap-2 transition">
                    <Phone className="w-3 h-3" /> +234 806 901 0564
                  </a>
               </div>

               {/* UK */}
               <div className="p-6 hover:bg-slate-50 transition group">
                  <div className="flex items-center gap-3 mb-2">
                     <Globe className="w-5 h-5 text-[#C6A87C]" />
                     <span className="font-bold text-slate-800">Worthing, UK</span>
                     <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase font-bold">Diaspora</span>
                  </div>
                  <p className="text-sm text-slate-600 pl-8 leading-relaxed mb-3">
                    41 Warwick Gardens,<br/> Worthing, BN11 1PF.
                  </p>
                  <a href="tel:+447474350779" className="text-sm font-bold text-slate-700 hover:text-[#C6A87C] pl-8 flex items-center gap-2 transition">
                    <Phone className="w-3 h-3" /> +44 7474 350779
                  </a>
               </div>

               {/* Business Hours */}
               <div className="p-6 bg-slate-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3 text-slate-600">
                        <Clock className="w-5 h-5 text-[#C6A87C]" />
                        <span className="text-sm font-medium">Mon - Fri: 09:00 - 17:00</span>
                     </div>
                     <span className={`text-xs font-bold px-2 py-1 rounded ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {statusText}
                     </span>
                  </div>
               </div>
            </div>

            <div className="bg-[#1a1a1a] text-white p-6 rounded shadow-lg flex items-center justify-between hover:bg-[#C6A87C] transition cursor-pointer group">
               <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 group-hover:scale-110 transition" />
                  <div>
                    <p className="text-xs font-bold uppercase opacity-60">Email Us</p>
                    <p className="font-serif text-lg">info@dejustcreative.com</p>
                  </div>
               </div>
               <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          {/* RIGHT COLUMN (Form) */}
          <div id="consultation-form" className="lg:col-span-7 scroll-mt-32">
             <div className="bg-white rounded shadow-2xl p-8 md:p-10 relative">
                {isSessionLocked ? (
                  <div className="text-center py-16 animate-in zoom-in">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                       {isSubmitted ? <CheckCircle className="w-10 h-10 text-green-500" /> : <Lock className="w-10 h-10 text-slate-400" />}
                    </div>
                    <h2 className="text-3xl font-serif text-[#C6A87C] mb-4">
                      {isSubmitted ? "Message Received" : "Submission Limit"}
                    </h2>
                    <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                      Our team has received your message.
                    </p>
                    <Link href="/" className="inline-block bg-[#1a1a1a] text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-[#C6A87C] transition">
                      Return to Home
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-serif text-slate-800 mb-6 border-b border-gray-100 pb-4">Schedule a Consultation</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className={`w-full p-4 border rounded text-sm focus:outline-none focus:ring-1 transition ${errors.fullName ? 'border-red-500 ring-red-500' : 'border-gray-200 focus:border-[#C6A87C] focus:ring-[#C6A87C]'}`} />
                        {errors.fullName && <span className="text-xs text-red-500 mt-1 block">{errors.fullName}</span>}
                      </div>
                      <div>
                        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={`w-full p-4 border rounded text-sm focus:outline-none focus:ring-1 transition ${errors.email ? 'border-red-500 ring-red-500' : 'border-gray-200 focus:border-[#C6A87C] focus:ring-[#C6A87C]'}`} />
                        {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>}
                      </div>
                    </div>

                    <div>
                      <div className={`flex w-full border rounded text-sm transition focus-within:ring-1 focus-within:ring-[#C6A87C] focus-within:border-[#C6A87C] ${errors.phone ? 'border-red-500 ring-red-500' : 'border-gray-200'}`}>
                        <div className="relative border-r border-gray-200 bg-gray-50">
                          <select name="phoneCode" value={formData.phoneCode} onChange={handleChange} className="h-full pl-3 pr-8 bg-transparent appearance-none outline-none cursor-pointer font-medium text-slate-700 w-[90px]">
                            {COUNTRY_CODES.map((item) => (<option key={item.code} value={item.code}>{item.flag} {item.code}</option>))}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="flex-1 p-4 outline-none bg-transparent" />
                      </div>
                      {errors.phone && <span className="text-xs text-red-500 mt-1 block">{errors.phone}</span>}
                    </div>

                    <div>
                      <div className="relative">
                        <select name="service" value={formData.service} onChange={handleChange} className={`w-full p-4 border rounded text-sm appearance-none outline-none focus:ring-1 transition cursor-pointer bg-white ${errors.service ? 'border-red-500 ring-red-500' : 'border-gray-200 focus:border-[#C6A87C] focus:ring-[#C6A87C]'}`}>
                          <option value="" disabled>Select Consultation Topic</option>
                          {SERVICES.map(service => (<option key={service} value={service}>{service}</option>))}
                        </select>
                        <Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                      {errors.service && <span className="text-xs text-red-500 mt-1 block">{errors.service}</span>}
                    </div>

                    {formData.service === "Other" && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <input type="text" name="customSubject" placeholder="Please specify your request" value={formData.customSubject} onChange={handleChange} className={`w-full p-4 border rounded text-sm focus:outline-none focus:border-[#C6A87C] focus:ring-1 focus:ring-[#C6A87C] transition ${errors.customSubject ? 'border-red-500' : 'border-gray-200'}`} />
                        {errors.customSubject && <span className="text-xs text-red-500 mt-1 block">{errors.customSubject}</span>}
                      </div>
                    )}

                    <div>
                      <textarea rows={5} name="message" placeholder="How can we help you?" value={formData.message} onChange={handleChange} className={`w-full p-4 border rounded text-sm focus:outline-none focus:ring-1 transition resize-none ${errors.message ? 'border-red-500 ring-red-500' : 'border-gray-200 focus:border-[#C6A87C] focus:ring-[#C6A87C]'}`}></textarea>
                      {errors.message && <span className="text-xs text-red-500 mt-1 block">{errors.message}</span>}
                    </div>

                    <div className="pt-2">
                      <button type="submit" disabled={isSubmitting} className="w-full bg-[#B59458] hover:bg-[#967946] text-white py-4 rounded text-lg font-bold shadow-md transition duration-300 font-serif flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                        {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : "Submit Inquiry"}
                      </button>
                    </div>
                  </form>
                )}
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}