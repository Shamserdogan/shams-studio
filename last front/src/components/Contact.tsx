import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  Mail,
  Facebook,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  Globe
} from "lucide-react";
import { api } from "../services/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });

  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  setFormState("submitting");

  try {
    await api.submitContact({
        name: formData.fullName,
        email: formData.email,
        message: `${formData.subject}: ${formData.message}`
    });

    setFormState("success");

    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: ""
    });

  } catch (error) {
    console.log(error);
    setFormState("error");
  }
};
  const contactCards = [
    {
      id: "whatsapp",
      title: "WhatsApp Chat",
      value: "+92 342 9225675",
      desc: "Fast responses & instant updates",
      icon: MessageSquare,
      link: "https://wa.me/923429225675",
      color: "text-emerald-400 border-emerald-500/10 hover:border-emerald-500/30"
    },
    {
      id: "email",
      title: "Direct Email",
      value: "shamserdogan926@gmail.com",
      desc: "Inquiries & corporate proposals",
      icon: Mail,
      link: "mailto:shamserdogan926@gmail.com",
      color: "text-cyan-400 border-cyan-500/10 hover:border-cyan-500/30"
    },
    {
      id: "facebook",
      title: "Facebook Profile",
      value: "Shams Ud Din",
      desc: "Follow creative process & reels",
      icon: Facebook,
      link: "https://www.facebook.com/share/1EJ7rJTfNA/",
      color: "text-blue-400 border-blue-500/10 hover:border-blue-500/30"
    },
  
  ];

  return (
    <section 
  id="contact" 
  className="relative pt-24 sm:pt-32 pb-4 sm:pb-6 bg-[#020617] overflow-hidden border-b border-white/5"
>
      {/* Background Lighting & Radial Mesh Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[30%] left-[-15%] w-[45%] h-[45%] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] right-[-15%] w-[45%] h-[45%] bg-cyan-600/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
        
        {/* Header Block */}
        <div
  className="max-w-4xl mx-auto text-center mb-12 sm:mb-2 relative"
  id="contact-header"
>
  <div className="fixed top-32 left-2 md:left-8 z-50">
  <Link
    to="/"
    className="inline-flex items-center gap-0.5 md:gap-2 px-2 py-1 md:px-5 md:py-2 text-[11px] md:text-sm font-medium rounded-full bg-white md:bg-white/5 border border-gray-300 md:border-white/10 text-gray-900 md:text-gray-300 shadow-sm md:shadow-none hover:bg-gray-100 md:hover:text-cyan-400 md:hover:border-cyan-400 transition-all"
  >
    ← Back Home
  </Link>
</div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center gap-3 mb-2 -mt-8"
          >
            <span className="h-[1px] w-8 bg-cyan-400" />
            <span className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-bold font-display">
              Initiate Contact
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display"
          >
            Let's Engineer Your Vision.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-2 text-lg text-gray-400 leading-relaxed font-sans text-center max-w-3xl mx-auto"
          >
            Looking for AI video ads, custom web platforms, or stateful Cisco network routing models? Leave a message or contact Shams Ud Din directly through the links below.
          </motion.p>
        </div>

        {/* Contact Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start -mt-12" id="contact-grid">
          
          {/* Left Column: Direct contact info cards */}
          <div
  className="lg:col-span-5 space-y-6 lg:pt-12"
  id="contact-info-column"
>
            
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white font-display tracking-tight">Direct Channels</h3>
              <p className="text-xs text-gray-500 font-sans mt-1">Connect instantly with Shams Studio.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactCards.map((card, idx) => {
                const CardIcon = card.icon;
                return (
                  <motion.a
                    key={card.id}
                    href={card.link}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
                    className={`p-5 rounded-2xl bg-white/[0.01] border ${card.color} backdrop-blur-xl flex items-start gap-4 transition-all group shadow-lg`}
                    id={`contact-card-${card.id}`}
                  >
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-all flex items-center justify-center shrink-0">
                      <CardIcon className="w-5 h-5 text-cyan-400" />
                    </div>
                    
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block font-semibold">
                        {card.title}
                      </span>
                      <p className="text-sm font-bold text-white font-sans break-all group-hover:text-cyan-400 transition-colors">
                        {card.value}
                      </p>
                      <span className="text-[11px] text-gray-400 block font-sans">
                        {card.desc}
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Micro details block */}
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center gap-4 text-left">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-mono tracking-wider text-slate-500 block font-bold uppercase">Response Standard</span>
                <span className="text-xs font-semibold text-gray-300">Typically responds within 2 hours</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-end interactive contact form */}
   <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
className="lg:col-span-7 lg:mt-10 lg:-ml-30 max-w-2xl mx-auto rounded-2xl bg-white/[0.02] border border-white/10 p-5 sm:p-6 backdrop-blur-xl relative overflow-hidden shadow-2xl flex flex-col gap-4"
  id="contact-form-panel"
>
            {/* Top accent glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent pointer-events-none" />

            <div className="space-y-6 text-center">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white font-display tracking-tight">Direct Transmission</h3>
                <p className="text-xs text-gray-400 font-sans max-w-md mx-auto">
                  Use the secure channel below to dispatch details regarding your digital concepts.
                </p>
              </div>

              {/* Form implementation */}
<form onSubmit={handleSubmit} className="space-y-3" noValidate>

  {/* Name + Email + Subject */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

    {/* Full Name */}
    <div className="space-y-1 text-left">
      <label
        htmlFor="fullName"
        className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold block"
      >
        Full Name *
      </label>

      <input
        type="text"
        id="fullName"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        disabled={formState === "submitting" || formState === "success"}
        placeholder="e.g. Amanullah Khan"
        className={`w-full bg-slate-900/60 border rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all ${
          errors.fullName ? "border-red-500/50" : "border-white/10"
        }`}
      />

      {errors.fullName && (
        <span className="text-[10px] text-red-400 flex items-center gap-1 font-sans">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {errors.fullName}
        </span>
      )}
    </div>

    {/* Email */}
    <div className="space-y-1 text-left">
      <label
        htmlFor="email"
        className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold block"
      >
        Email Address *
      </label>

      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        disabled={formState === "submitting" || formState === "success"}
        placeholder="e.g. client@domain.com"
        className={`w-full bg-slate-900/60 border rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all ${
          errors.email ? "border-red-500/50" : "border-white/10"
        }`}
      />

      {errors.email && (
        <span className="text-[10px] text-red-400 flex items-center gap-1 font-sans">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {errors.email}
        </span>
      )}
    </div>

    {/* Subject */}
    <div className="space-y-1 text-left">
      <label
        htmlFor="subject"
        className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold block"
      >
        Subject *
      </label>

      <input
        type="text"
        id="subject"
        name="subject"
        value={formData.subject}
        onChange={handleInputChange}
        disabled={formState === "submitting" || formState === "success"}
        placeholder="e.g. AI Video Advertisements Project"
        className={`w-full bg-slate-900/60 border rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all ${
          errors.subject ? "border-red-500/50" : "border-white/10"
        }`}
      />

      {errors.subject && (
        <span className="text-[10px] text-red-400 flex items-center gap-1 font-sans">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {errors.subject}
        </span>
      )}
    </div>

  </div>

  {/* Message */}
  <div className="space-y-1 text-left">
    <label
      htmlFor="message"
      className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold block"
    >
      Your Message *
    </label>

    <textarea
      id="message"
      name="message"
      rows={2}
      value={formData.message}
      onChange={handleInputChange}
      disabled={formState === "submitting" || formState === "success"}
      placeholder="Describe your goals, tech stack, network targets, or commercial objectives..."
      className={`w-full bg-slate-900/60 border rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all resize-none ${
        errors.message ? "border-red-500/50" : "border-white/10"
      }`}
    />

    {errors.message && (
      <span className="text-[10px] text-red-400 flex items-center gap-1 font-sans">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        {errors.message}
      </span>
    )}
  </div>

                {/* Submit button / success feedback toggle */}
                <div className="pt-2">
                  <AnimatePresence mode="wait">
                    {formState === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-sm font-sans"
                        id="form-success-feedback"
                      >
                        <CheckCircle className="w-5 h-5 shrink-0 animate-bounce" />
                        <div className="text-left">
                          <strong className="block font-bold">Transmission Succeeded!</strong>
                          <span>Thank you. Shams Ud Din will get back to you shortly.</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={formState === "submitting"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 rounded-xl bg-white text-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all cursor-pointer disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed"
                        id="form-submit-btn"
                      >
                        {formState === "submitting" ? (
                          <>
                            <Globe className="w-4 h-4 animate-spin" />
                            Transmitting secure packet...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Dispatch Message
                          </>
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
