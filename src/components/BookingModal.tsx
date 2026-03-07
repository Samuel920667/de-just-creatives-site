"use client";

import { useState } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { sendConsultationEmail } from "@/app/actions";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const result = await sendConsultationEmail(formData);

    setIsSubmitting(false);
    if (result.success) {
      setIsSuccess(true);
    } else {
      alert("Something went wrong. Please check your API Key.");
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 border border-[#C6A87C]/20">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-10">
          {isSuccess ? (
            /* --- Success View --- */
            <div className="text-center py-10">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-20 h-20 text-[#C6A87C]" />
              </div>
              <h3 className="text-3xl font-serif text-[#C6A87C] mb-4">Request Sent</h3>
              <p className="text-slate-500 mb-8">
                We have received your details. Our team will contact you within 24 hours to schedule your session.
              </p>
              <button 
                onClick={onClose}
                className="bg-[#C6A87C] text-white px-8 py-3 rounded text-sm font-bold uppercase tracking-widest hover:bg-[#a38350] transition shadow-lg"
              >
                Close
              </button>
            </div>
          ) : (
            /* --- Form View --- */
            <>
              <h2 className="text-3xl font-serif text-[#C6A87C] mb-2 text-center">Book Consultation</h2>
              <p className="text-slate-400 text-xs mb-8 text-center uppercase tracking-widest">
                Fill out the form below and we'll get back to you
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  name="name" 
                  required 
                  placeholder="Full Name" 
                  className="w-full p-4 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C6A87C] transition placeholder:text-gray-400"
                />
                
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="Email Address" 
                  className="w-full p-4 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C6A87C] transition placeholder:text-gray-400"
                />

                <input 
                  name="phone" 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full p-4 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C6A87C] transition placeholder:text-gray-400"
                />

                <select 
                  name="service" 
                  className="w-full p-4 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C6A87C] transition text-gray-500 bg-white"
                >
                  <option value="General Inquiry">Service of Interest</option>
                  <option value="Tax Planning">Tax Planning</option>
                  <option value="Wealth Management">Wealth Management</option>
                  <option value="Business Development">Business Development</option>
                </select>

                <textarea 
                  name="message" 
                  required 
                  placeholder="How can we help you?" 
                  rows={4}
                  className="w-full p-4 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#C6A87C] transition placeholder:text-gray-400 resize-none"
                ></textarea>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#C6A87C] hover:bg-[#b08d55] text-white py-4 rounded text-sm font-bold uppercase tracking-widest transition shadow-lg flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <>Sending <Loader2 className="w-4 h-4 animate-spin" /></>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}