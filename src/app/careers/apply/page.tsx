"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // Import this
import { X, CheckCircle, Loader2, UploadCloud, FileText, ChevronDown, RefreshCcw } from 'lucide-react';
import { Playfair_Display, Inter } from 'next/font/google';

// Fonts
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

// --- AVAILABLE JOB ROLES (Must Match the Careers Page List) ---
const JOB_ROLES = [
  "Financial Analyst",
  "Tax Consultant",
  "Business Dev. Officer",
  "Graduate Trainee",
  "Technical Support",
  "Wealth Management Intern",
  "Executive Assistant",
  "Digital Marketing Lead",
  "Other" 
];

function ApplyForm() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCustomPosition, setIsCustomPosition] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    portfolio: "",
    coverMessage: ""
  });

  // PRE-FILL POSITION FROM URL
  useEffect(() => {
    const positionFromUrl = searchParams.get('position');
    if (positionFromUrl) {
      if (JOB_ROLES.includes(positionFromUrl)) {
        setFormData(prev => ({ ...prev, position: positionFromUrl }));
      } else {
        // If it's a custom role or "Other", switch to manual mode
        setIsCustomPosition(true);
        setFormData(prev => ({ ...prev, position: positionFromUrl === "Other" ? "" : positionFromUrl }));
      }
    }
  }, [searchParams]);

  // Handle Text Inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "position" && value === "Other") {
      setIsCustomPosition(true);
      setFormData({ ...formData, position: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleResetPosition = () => {
    setIsCustomPosition(false);
    setFormData({ ...formData, position: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please upload your CV/Resume.");
      return;
    }
    setIsSubmitting(true);

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("position", formData.position);
    data.append("portfolio", formData.portfolio);
    data.append("coverMessage", formData.coverMessage);
    data.append("resume", selectedFile);

    try {
      const response = await fetch('/api/apply', { method: 'POST', body: data });
      if (response.ok) {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("Failed to send application. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white w-full max-w-2xl p-8 md:p-12 rounded-lg shadow-xl border border-white">
      {isSuccess ? (
        <div className="text-center py-12 animate-in zoom-in">
          <div className="flex justify-center mb-6"><CheckCircle className="w-20 h-20 text-green-500" /></div>
          <h2 className="text-3xl font-serif text-[#C6A87C] mb-4">Application Received!</h2>
          <p className="text-slate-600 mb-8 text-lg">We look forward to reviewing your application.</p>
          <Link href="/" className="inline-block bg-[#1a1a1a] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#333] transition">Return to Home</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <input required type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full p-4 border border-gray-300 rounded text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#C6A87C] focus:ring-1 focus:ring-[#C6A87C] transition" />
          <input required type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full p-4 border border-gray-300 rounded text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#C6A87C] focus:ring-1 focus:ring-[#C6A87C] transition" />
          <input required type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-4 border border-gray-300 rounded text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#C6A87C] focus:ring-1 focus:ring-[#C6A87C] transition" />
          
          <div className="relative">
            {isCustomPosition ? (
              <div className="relative">
                <input required autoFocus type="text" name="position" value={formData.position} placeholder="Type your Role (e.g. Senior Manager)" onChange={handleChange} className="w-full p-4 pr-12 border border-gray-300 rounded text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#C6A87C] focus:ring-1 focus:ring-[#C6A87C] transition bg-blue-50/30" />
                <button type="button" onClick={handleResetPosition} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#C6A87C] text-xs font-bold uppercase tracking-wider flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm"><RefreshCcw className="w-3 h-3" /> List</button>
              </div>
            ) : (
              <div className="relative">
                <select required name="position" onChange={handleChange} value={formData.position} className="w-full p-4 border border-gray-300 rounded text-sm text-slate-700 focus:outline-none focus:border-[#C6A87C] focus:ring-1 focus:ring-[#C6A87C] transition appearance-none cursor-pointer bg-white">
                  <option value="" disabled>Select Position Applying For</option>
                  {JOB_ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            )}
          </div>

          <input type="url" name="portfolio" placeholder="Portfolio Link (optional)" onChange={handleChange} className="w-full p-4 border border-gray-300 rounded text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#C6A87C] focus:ring-1 focus:ring-[#C6A87C] transition" />
          <textarea required name="coverMessage" rows={4} placeholder="Short Cover Message" onChange={handleChange} className="w-full p-4 border border-gray-300 rounded text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#C6A87C] focus:ring-1 focus:ring-[#C6A87C] transition resize-none" />
          
          <div className={`border-2 border-dashed rounded-lg p-8 text-center transition cursor-pointer relative ${selectedFile ? 'border-green-500 bg-green-50' : 'border-[#C6A87C]/50 bg-[#C6A87C]/5 hover:bg-[#C6A87C]/10'}`}>
             <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
             <div className="flex flex-col items-center justify-center gap-2">
               {selectedFile ? (
                 <>
                   <FileText className="w-8 h-8 text-green-600" />
                   <p className="font-bold text-green-700 text-sm">{selectedFile.name}</p>
                   <p className="text-[10px] text-green-600 uppercase">Click to change file</p>
                 </>
               ) : (
                 <>
                   <UploadCloud className="w-8 h-8 text-[#C6A87C]" />
                   <p className="font-serif font-bold text-slate-700 text-sm">+ Drag and drop your CV here or <span className="text-[#C6A87C] underline">Browse</span></p>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Upload PDF or DOC (Max 5MB)</p>
                 </>
               )}
             </div>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={isSubmitting} className="w-full bg-[#B59458] hover:bg-[#967946] text-white py-4 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg transition duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? (<>Sending... <Loader2 className="w-4 h-4 animate-spin" /></>) : "Submit Application"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ApplyPage() {
  return (
    <div className={`${playfair.variable} ${inter.variable} min-h-screen font-sans bg-[#e6e6e6] text-slate-800 relative`}>
      <div className="absolute top-0 left-0 w-full h-[100px] bg-[#1a1a1a] z-0 shadow-md" />
      <div className="pt-32 pb-20 px-4 flex flex-col items-center justify-center min-h-screen relative z-10">
        <div className="text-center mb-8 relative w-full max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif text-[#C6A87C] mb-3">Submit Your CV</h1>
          <p className="text-slate-600 font-serif italic text-lg">Fill out the form below and we'll get back to you</p>
          <Link href="/careers" className="absolute top-0 right-0 md:-right-20 text-slate-400 hover:text-red-500 transition"><X className="w-8 h-8" /></Link>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
           <ApplyForm />
        </Suspense>
      </div>
    </div>
  );
}