import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Code,
  Cpu,
  Palette,
  Video,
  Terminal,
  Network,
  Brain,
  ArrowUpRight,
  Globe,
  ArrowRight,
  MousePointerClick
} from "lucide-react";
import BlogSection from "../components/BlogSection";

export default function Hero() {
  const whatsappUrl = "https://wa.me/923429225675";

  // Animated floating dots behind everything
  const backgroundParticles = Array.from({ length: 15 });

  return (
    <>
 <section
  id="home"
  className="relative pt-20 sm:pt-24 lg:pt-16 pb-0 bg-[#030712]"
>
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Editorial Blur Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[150px]" />

        {/* Radial Micro Dotted Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {backgroundParticles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-500/20"
            style={{
              width: Math.random() * 5 + 2,
              height: Math.random() * 5 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>


      {/* Main Container */}
<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
  <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 items-center">

        {/* Left Side: Headline and copy */}
        <div
  className="lg:col-span-7 space-y-6 lg:space-y-5 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
  id="hero-left-container"
>

          {/* Editorial Tagline Indicator */}
          <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="flex items-center justify-center lg:justify-start flex-wrap gap-2 sm:gap-3 mt-2 lg:mt-10 w-full px-2 lg:px-0 order-1 lg:order-none"
  id="hero-tagline-tag"
>
            <span className="h-[1px] w-6 sm:w-8 bg-cyan-400 hidden lg:inline-block" />
            <span className="text-cyan-400 uppercase tracking-[0.15em] lg:tracking-[0.35em] text-[9px] sm:text-xs lg:text-sm font-bold font-display text-center">
              {/* Mobile: Two-line version */}
              <span className="block lg:hidden leading-snug">
                The Future of
                <br />
                Digital Intelligence
              </span>
              {/* Desktop: Single-line version */}
              <span className="hidden lg:inline">
                The Future of Digital Intelligence
              </span>
            </span>
          </motion.div>

          {/* Main Title */}
          <div className="space-y-2 lg:-mt-4 w-full order-2 lg:order-none" id="hero-main-title">

  {/* Mobile Layout: heading centered */}
  <div className="flex lg:hidden flex-col items-center w-full px-2">

    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: [1, 1.02, 1],
      }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="font-display text-[26px] sm:text-[36px] font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 text-center w-full"
    >
      Engineering Futures.<br />
      <span className="text-cyan-400">Designing</span> Intelligence.
    </motion.h1>

  </div>

  {/* Desktop Layout: heading only (portrait image lives in the right column) */}
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{
      opacity: 1,
      y: 0,
      scale: [1, 1.02, 1],
    }}
    transition={{ duration: 0.8, delay: 0.1 }}
    className="hidden lg:block font-display text-[56px] font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500"
  >
    Engineering Futures.<br />
    <span className="text-cyan-400">Designing</span> Intelligence.
  </motion.h1>

  {/* Description */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-[90%] sm:max-w-md lg:max-w-lg leading-relaxed font-sans text-center lg:text-left mx-auto lg:mx-0 px-1 lg:px-0"
  >
    I am <span className="text-white font-medium">Shams Ud Din</span>, founder of SHAMS STUDIO. I create AI-powered videos, modern digital experiences, and intelligent web solutions tailored for the next generation of business.
  </motion.p>

</div>
          {/* Main Page Navigation Buttons */}
          <motion.div
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="grid grid-cols-6 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 w-full lg:max-w-2xl order-3 lg:order-none"
>
            {/* Row 1: 3 buttons (col-span-2 each) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="col-span-2 lg:w-auto relative overflow-hidden px-2 py-2.5 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-cyan-500 text-black font-bold text-center text-[10px] sm:text-sm transition-all duration-500 ease-out hover:bg-cyan-400 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(6,182,212,0.45)] group"
            >
              <span className="relative z-10">START PROJECT</span>
              <span className="absolute inset-y-0 -left-20 w-16 bg-white/40 blur-md rotate-12 transition-all duration-700 group-hover:left-[120%]" />
            </a>

            <Link
              to="/services"
              className="col-span-2 lg:w-auto relative overflow-hidden px-2 py-2.5 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-center text-[10px] sm:text-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:bg-cyan-500/10 hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] group"
            >
              <span className="relative z-10">SERVICES</span>
              <span className="absolute inset-y-0 -left-20 w-16 bg-white/20 blur-md rotate-12 transition-all duration-700 group-hover:left-[120%]" />
            </Link>

            <Link
              to="/portfolio"
              className="col-span-2 lg:w-auto relative overflow-hidden px-2 py-2.5 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-center text-[10px] sm:text-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:bg-cyan-500/10 hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] group"
            >
              <span className="relative z-10">PORTFOLIO</span>
              <span className="absolute inset-y-0 -left-20 w-16 bg-white/20 blur-md rotate-12 transition-all duration-700 group-hover:left-[120%]" />
            </Link>

            {/* Row 2: 2 buttons (col-span-3 each) */}
            <Link
              to="/about"
              className="col-span-2 lg:w-auto relative overflow-hidden px-2 py-2.5 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-cyan-500/5 backdrop-blur-xl border border-cyan-400/20 text-white font-semibold text-center text-[10px] sm:text-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:bg-cyan-500/15 hover:border-cyan-400/70 hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] group"
            >
              <span className="relative z-10">ABOUT ME</span>
              <span className="absolute inset-y-0 -left-20 w-16 bg-white/20 blur-md rotate-12 transition-all duration-700 group-hover:left-[120%]" />
            </Link>

            <Link
              to="/contact"
              className="col-span-2 lg:w-auto relative overflow-hidden px-2 py-2.5 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-center text-[10px] sm:text-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:bg-cyan-500/10 hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] group"
            >
              <span className="relative z-10">CONTACT</span>
              <span className="absolute inset-y-0 -left-20 w-16 bg-white/20 blur-md rotate-12 transition-all duration-700 group-hover:left-[120%]" />
            </Link>
            <Link
  to="/testimonials"
  className="col-span-2 lg:w-auto relative overflow-hidden px-2 py-2.5 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-center text-[10px] sm:text-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:bg-cyan-500/10 hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] group"
>
  <span className="relative z-10">TESTIMONIALS</span>
  <span className="absolute inset-y-0 -left-20 w-16 bg-white/20 blur-md rotate-12 transition-all duration-700 group-hover:left-[120%]" />
</Link>
          </motion.div>

          {/* Skill Badges Block */}
          <div className="space-y-3 mt-2 lg:mt-1 mb-16 -mt-10 lg:mt-0 w-full text-center lg:text-center order-4 lg:order-none"
           id="hero-badges-container">
           <span className="text-sm sm:text-base font-mono tracking-[0.25em] text-cyan-400 uppercase block font-bold text-center lg:text-center">
  CORE DISCIPLINES
</span>

            {/* MOBILE: 3+2 grid layout */}
            <div className="grid grid-cols-6 gap-2 w-full max-w-sm mx-auto lg:hidden">
              {/* Row 1: 3 badges (col-span-2 each) */}
              <span className="col-span-2 flex items-center justify-center px-2.5 py-1.5 bg-cyan-950/30 border border-cyan-500/20 rounded-md text-[9px] font-bold text-cyan-400 uppercase tracking-wider backdrop-blur-sm transition-all hover:border-cyan-500/40 whitespace-nowrap">
                AI Creator
              </span>
              <span className="col-span-2 flex items-center justify-center px-2.5 py-1.5 bg-blue-950/30 border border-blue-500/20 rounded-md text-[9px] font-bold text-blue-400 uppercase tracking-wider backdrop-blur-sm transition-all hover:border-blue-500/40 whitespace-nowrap">
                Designer
              </span>
              <span className="col-span-2 flex items-center justify-center px-2.5 py-1.5 bg-indigo-950/30 border border-indigo-500/20 rounded-md text-[9px] font-bold text-indigo-400 uppercase tracking-wider backdrop-blur-sm transition-all hover:border-indigo-500/40 whitespace-nowrap">
                Web Developer
              </span>

              {/* Row 2: 2 badges (col-span-3 each) */}
              <span className="col-span-3 flex items-center justify-center px-2.5 py-1.5 bg-slate-900 border border-white/10 rounded-md text-[9px] font-bold text-gray-400 uppercase tracking-wider backdrop-blur-sm transition-all hover:border-white/20 whitespace-nowrap">
                Network Engineer
              </span>
              <span className="col-span-3 flex items-center justify-center px-2.5 py-1.5 bg-purple-950/30 border border-purple-500/20 rounded-md text-[9px] font-bold text-purple-400 uppercase tracking-wider backdrop-blur-sm transition-all hover:border-purple-500/40 whitespace-nowrap">
                Prompt Engineer
              </span>
            </div>

            {/* DESKTOP: flex-wrap layout */}
            <div className="hidden lg:flex lg:flex-wrap lg:justify-start gap-1.5 sm:gap-3">
              <span className="px-2.5 py-1.5 bg-cyan-950/30 border border-cyan-500/20 rounded-md text-[10px] font-bold text-cyan-400 uppercase tracking-wider backdrop-blur-sm transition-all hover:border-cyan-500/40 whitespace-nowrap">
                AI Creator
              </span>
              <span className="px-2.5 py-1.5 bg-blue-950/30 border border-blue-500/20 rounded-md text-[10px] font-bold text-blue-400 uppercase tracking-wider backdrop-blur-sm transition-all hover:border-blue-500/40 whitespace-nowrap">
                Designer
              </span>
              <span className="px-2.5 py-1.5 bg-indigo-950/30 border border-indigo-500/20 rounded-md text-[10px] font-bold text-indigo-400 uppercase tracking-wider backdrop-blur-sm transition-all hover:border-indigo-500/40 whitespace-nowrap">
                Web Developer
              </span>
              <span className="px-2.5 py-1.5 bg-slate-900 border border-white/10 rounded-md text-[10px] font-bold text-gray-400 uppercase tracking-wider backdrop-blur-sm transition-all hover:border-white/20 whitespace-nowrap">
                Network Engineer
              </span>
              <span className="px-2.5 py-1.5 bg-purple-950/30 border border-purple-500/20 rounded-md text-[10px] font-bold text-purple-400 uppercase tracking-wider backdrop-blur-sm transition-all hover:border-purple-500/40 whitespace-nowrap">
                Prompt Engineer
              </span>
            </div>
          </div>

          {/* 6. MOBILE PROFILE IMAGE (Below Core Disciplines, centered) */}
          <div className="flex justify-center lg:hidden pt-8 sm:pt-9 md:pt-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-[90px] h-[90px] sm:w-[105px] sm:h-[105px] md:w-[120px] md:h-[120px] rounded-full p-1 bg-gradient-to-tr from-cyan-500 via-blue-600 to-transparent shadow-lg"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0a] border border-black relative">
                <img
                  src="/images/shams-profile.jpg"
                  alt="Shams Ud Din"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

        </div>

        {/* Right Side: Portrait Image inside Futuristic Frame (DESKTOP ONLY) */}
<div
  className="hidden lg:flex lg:col-span-5 lg:order-2 items-center justify-center lg:justify-end relative lg:-mt-4"
  id="hero-right-container"
>
          {/* Decorative rotating back circles */}
          <div className="absolute w-full h-full flex justify-center items-center pointer-events-none">
            <div className="w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] rounded-full border border-cyan-500/10 animate-pulse" />
            <div className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] rounded-full border border-blue-500/20" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/10 blur-xl rounded-full" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-600/10 blur-2xl rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 1 },
              y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="relative z-10 hidden lg:block"
            id="hero-portrait-frame-wrapper"
          >
            {/* Main Circle Image Container */}
            <div className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] rounded-full p-[3px] bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-600 shadow-[0_0_80px_rgba(6,182,212,0.35)] transition-all duration-700 hover:shadow-[0_0_120px_rgba(6,182,212,0.65)] hover:scale-[1.02]">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0a] border border-cyan-400/20 relative">
                {/* Professional Portrait of Shams Ud Din */}
                <img
                  src="/images/shams-profile.jpg"
                  alt="Shams Ud Din - AI Creator & Web Developer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                  id="portrait-img"
                />

                {/* Overlay/Glass Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />

                {/* Glassmorphic Badge inside circular frame */}
                <div className="absolute bottom-8 left-0 right-0 text-center z-20">
                  <p className="text-xs font-bold tracking-[0.2em] text-cyan-400 drop-shadow-md uppercase">
                    Visionary Director
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Tech Elements (Abstract) */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-black/40 border border-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center shadow-lg transform rotate-12" id="floating-square-decoration">
              <div className="w-6 h-6 border-2 border-cyan-400 rounded-sm opacity-50" />
            </div>

            <div className="absolute bottom-10 -left-6 w-14 h-14 bg-black/40 border border-white/10 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg" id="floating-circle-decoration">
              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
              <div className="absolute w-8 h-8 border border-cyan-500/30 rounded-full animate-ping" />
            </div>

          </motion.div>

        </div>
         </div>

      </div>

      {/* Editorial Status Bar */}
           <div
          className="relative mt-0 mb-0 w-full px-10 hidden md:flex justify-between items-end text-[10px] text-gray-500 tracking-[0.2em] uppercase font-bold pointer-events-none"
          id="editorial-status-bar"
        >
          <div>Est. 2024 / Based in Dera Ismail Khan, Pakistan</div>
          <div className="flex gap-6">
            <span>Scroll To Explore</span>
            <span className="text-cyan-500">Next Gen Portfolio</span>
          </div>
        </div>
    </section>

    {/* Blog Section - Added before Footer */}
    <BlogSection limit={3} showTitle={true} />
    </>
  );
}
