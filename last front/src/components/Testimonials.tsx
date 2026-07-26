import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  Quote,
  BrainCircuit,
  MonitorCheck,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Database
} from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stats = [
    { 
      label: "AI Projects Created", 
      count: "15+", 
      desc: "Custom neural video generation & LLM solutions", 
      icon: BrainCircuit 
    },
    { 
      label: "Websites Developed", 
      count: "10+", 
      desc: "Highly optimized React and Next.js platforms", 
      icon: MonitorCheck 
    },
    { 
      label: "Creative Designs", 
      count: "25+", 
      desc: "Premium vector branding & poster designs", 
      icon: Sparkles 
    },
    { 
      label: "Digital Solutions", 
      count: "40+", 
      desc: "Total digital integrations delivered globally", 
      icon: ShieldCheck 
    }
];

  const clientReviews = [
  {
    id: "review-1",
    name: "Muhammad Usman",
    role: "Business Owner",
    company: "Digital Client",
    text: "Shams Ud Din provided excellent digital solutions with professional communication and high-quality results. His AI and creative services helped improve our online presence.",
    rating: 5,
    initials: "MU"
  },
  {
    id: "review-2",
    name: "Ahmad Khan",
    role: "Project Manager",
    company: "Technology Sector",
    text: "The website development and digital design work was impressive. Shams delivered a modern solution with great attention to detail and professional standards.",
    rating: 5,
    initials: "AK"
  },
  {
    id: "review-3",
    name: "Sajid Ali",
    role: "Business Consultant",
    company: "Digital Services",
    text: "A great experience working with SHAMS STUDIO. Creative ideas, AI solutions, and technical skills were outstanding.",
    rating: 5,
    initials: "SA"
  }
];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % clientReviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + clientReviews.length) % clientReviews.length);
  };

  return (
    <section 
      id="testimonials" 
      className="relative min-h-screen py-24 sm:py-32 bg-[#030712] overflow-hidden border-b border-white/5"
    >
      {/* Editorial lighting backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[30%] right-[-10%] w-[35%] h-[35%] bg-blue-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[25%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/5 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
        
        {/* Header Block */}
        <div 
  className="max-w-4xl mx-auto mb-12 sm:mb-16 text-center relative" 
  id="testimonials-header"
>
  <div className="fixed top-26 left-2 md:left-8 z-50">
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
            className="flex justify-center items-center gap-3 mb-4"
          >
            <span className="h-[1px] w-8 bg-cyan-400" />
            <span className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-bold font-display">
              Trust & Authority
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-display"
          >
            Sustained Client Success.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg text-gray-400 leading-relaxed font-sans"
          >
            Our commitment is to deliver clean code, secure frameworks, and exceptional design aesthetics. Here is how clients describe their collaborations with Shams Ud Din and SHAMS STUDIO.
          </motion.p>
        </div>

        {/* Part 1: Interactive Testimonial Slider */}
        <div
className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start -mt-12 mb-24"
 id="testimonials-slider-section">
          
          {/* Left Block: Quotes & Navigation */}
          <div className="lg:col-span-4 space-y-6 -mt-0">
            <div className="inline-flex p-3 rounded-xl bg-white/[0.02] border border-white/5 text-cyan-400">
              <Quote className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white font-display tracking-tight">Client Endorsements</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                Real feedback from industry professionals, directors, and collaborative project managers.
              </p>
            </div>

            {/* Micro Navigation Controls */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-cyan-400 bg-white/[0.02] hover:bg-white/5 text-white hover:text-cyan-400 transition-all cursor-pointer flex items-center justify-center"
                aria-label="Previous testimonial"
                id="testimonial-prev-btn"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-cyan-400 bg-white/[0.02] hover:bg-white/5 text-white hover:text-cyan-400 transition-all cursor-pointer flex items-center justify-center"
                aria-label="Next testimonial"
                id="testimonial-next-btn"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Block: Active Testimonial Card */}
          <div className="lg:col-span-8 relative min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full p-8 sm:p-12 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl"
                id={`testimonial-card-${currentIndex}`}
              >
                {/* Back glow decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-8 relative z-10">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: clientReviews[currentIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                    ))}
                  </div>

                  {/* Testimonial Core Copy */}
                  <blockquote className="text-lg sm:text-xl text-gray-300 font-sans leading-relaxed italic">
                    "{clientReviews[currentIndex].text}"
                  </blockquote>

                  <hr className="border-white/5" />

                  {/* Client Author Block */}
                  <div className="flex items-center gap-4">
                    {/* Circle Avatar with custom initials styling */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-black text-sm tracking-wider font-display shrink-0">
                      {clientReviews[currentIndex].initials}
                    </div>

                    <div className="text-left space-y-0.5">
                      <h4 className="text-base font-bold text-white font-sans">{clientReviews[currentIndex].name}</h4>
                      <p className="text-xs text-gray-400">
                        {clientReviews[currentIndex].role} &mdash; <span className="text-cyan-400 font-semibold">{clientReviews[currentIndex].company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Part 2: Premium Trust Stats Cards */}
        <div className="pt-12" id="testimonials-stats-section">
          <div className="mb-10 text-center lg:text-left">
            <span className="text-xs font-mono tracking-[0.2em] text-slate-500 uppercase block mb-2 font-bold">Metrics</span>
            <h3 className="text-2xl font-bold text-white font-display">Performance Highlights</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-xl bg-white/[0.01] border border-white/5 backdrop-blur-md flex flex-col justify-between group overflow-hidden relative"
                  id={`stat-card-${idx}`}
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all">
                      <StatIcon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-3xl font-extrabold text-white font-display tracking-tight block">
                        {stat.count}
                      </span>
                      <span className="text-xs font-semibold text-gray-300 font-sans block">
                        {stat.label}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                      {stat.desc}
                    </p>
                  </div>

                  {/* Micro gradient bar at bottom of each card */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
