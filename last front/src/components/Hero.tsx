import { motion } from "motion/react";
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

export default function Hero() {
  const whatsappUrl = "https://wa.me/923429225675";

  // Animated floating dots behind everything (No Math.random() for SSR safety)
  const backgroundParticles = Array.from({ length: 12 });

  return (
  <section
  id="home"
  className="relative pt-20 sm:pt-24 lg:pt-16 pb-0 bg-[#030712] overflow-x-hidden min-h-max"
>
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Editorial Blur Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[150px]" />
        
        {/* Radial Micro Dotted Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {backgroundParticles.map((_, i) => {
          const size = 3 + (i % 3) * 2;
          const leftPosition = (i * 8.3) % 100;
          const topPosition = (i * 11.7) % 100;
          const duration = 5 + (i % 3) * 2;
          const delay = (i % 4) * 0.5;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-500/20"
              style={{
                width: size,
                height: size,
                left: `${leftPosition}%`,
                top: `${topPosition}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
              }}
            />
          );
        })}
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full pb-10 sm:pb-16 overflow-hidden">
        
        {/* Left Side Container (Handles all Mobile customized alignments) */}
        <div className="col-span-1 lg:col-span-7 space-y-6 sm:space-y-8 flex flex-col w-full" id="hero-left-container">
          
          {/* 1. TOP CENTER Tagline (Two-line stacked + centered on Mobile, unchanged single-line left-aligned on Desktop) */}
          <div className="w-full flex justify-center lg:justify-start">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-left gap-1 lg:gap-3"
              id="hero-tagline-tag"
            >
              <span className="h-[1px] w-6 bg-cyan-400 hidden lg:inline-block" />
              <span className="text-cyan-400 uppercase tracking-[0.25em] text-[10px] sm:text-xs font-bold font-display leading-snug">
                {/* Mobile: stacked two-line version */}
                <span className="block lg:hidden">
                  The Future of
                  <br />
                  Digital Intelligence
                </span>
                {/* Desktop: original single-line version, untouched */}
                <span className="hidden lg:inline">
                  The Future of Digital Intelligence
                </span>
              </span>
            </motion.div>
          </div>

          {/* 2. HEADING & SMALL PICTURE SIDE-BY-SIDE (On Mobile) */}
          <div className="w-full flex items-center justify-between gap-3 sm:gap-4 lg:grid lg:grid-cols-12">
            
            {/* Heading on Left */}
            <div className="flex-1 lg:col-span-12 text-left">
             <motion.h1
  className="font-display text-xl sm:text-5xl lg:text-7xl font-extrabold leading-tight lg:leading-[1.05] tracking-tight"
>
  <motion.span
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500"
  >
    Engineering Futures.
  </motion.span>

  <motion.span
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    className="block"
  >
    <span className="text-cyan-400">Designing</span>{" "}
    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">
      Intelligence.
    </span>
  </motion.span>
</motion.h1>
            </div>

           

          </div>

          {/* 3. DESCRIPTION Below Heading (Left-aligned, wraps naturally) */}
          <div className="w-full text-left">
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xs sm:text-base lg:text-lg text-gray-400 max-w-full sm:max-w-[95%] lg:max-w-lg leading-relaxed font-sans"
              id="hero-subtext"
            >
              I am <span className="text-white font-medium">Shams Ud Din</span>, founder of SHAMS STUDIO. I create AI-powered videos, modern digital experiences, and intelligent web solutions tailored for the next generation of business.
            </motion.p>
            
          </div>

          {/* 4. 5 BUTTONS (Centered on Mobile in 2 Rows, Inline on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-6 gap-2 sm:gap-3 w-full max-w-sm sm:max-w-md mx-auto lg:flex lg:flex-wrap lg:gap-4 lg:max-w-none lg:mx-0"
            id="hero-buttons"
          >
            {/* Row 1 (3 Buttons on Mobile: col-span-2 each) */}
            <motion.a
  href={whatsappUrl}
  target="_blank"
  rel="noreferrer"
  whileHover={{ 
    scale: 1.05,
    y: -4,
    boxShadow: "0 0 35px rgba(6,182,212,0.7)"
  }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.3 }}
  className="col-span-2 lg:w-auto px-2 py-3 lg:px-8 lg:py-4 
  bg-gradient-to-r from-cyan-400 to-blue-500 
  text-black font-bold rounded-full 
  transition-all duration-500 
  flex items-center justify-center gap-1 cursor-pointer 
  text-[10px] sm:text-xs lg:text-sm
  shadow-[0_0_20px_rgba(6,182,212,0.35)]"
>
  START PROJECT
</motion.a>

            <motion.a
  href="#services"
  whileHover={{ 
    scale: 1.05,
    y: -4,
    boxShadow: "0 0 35px rgba(6,182,212,0.5)"
  }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.3 }}
  className="col-span-2 lg:w-auto px-2 py-3 lg:px-8 lg:py-4 
  bg-white/5 
  border border-cyan-400/20 
  text-white font-bold 
  rounded-full 
  backdrop-blur-sm
  transition-all duration-500
  hover:bg-cyan-500/10
  hover:border-cyan-400/70
  hover:text-cyan-300
  flex items-center justify-center 
  cursor-pointer 
  text-[10px] sm:text-xs lg:text-sm
  shadow-[0_0_15px_rgba(6,182,212,0.15)]"
>
  SERVICES
</motion.a>

            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="col-span-2 lg:w-auto px-2 py-3 lg:px-8 lg:py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center cursor-pointer text-[10px] sm:text-xs lg:text-sm"
            >
              PORTFOLIO
            </motion.a>

            {/* Row 2 (2 Buttons on Mobile: col-span-3 each) */}
            <motion.a
              href="#about"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="col-span-2 lg:w-auto px-2 py-3 lg:px-8 lg:py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center cursor-pointer text-[10px] sm:text-xs lg:text-sm"
            >
              ABOUT ME
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="col-span-2 lg:w-auto px-2 py-3 lg:px-8 lg:py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center cursor-pointer text-[10px] sm:text-xs lg:text-sm"
            >
              CONTACT
            </motion.a>
    <motion.a
  href="/testimonials"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="col-span-2 lg:w-auto px-2 py-3 lg:px-8 lg:py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center cursor-pointer text-[10px] sm:text-xs lg:text-sm"
>
  TESTIMONIALS
</motion.a>
          </motion.div>

          {/* 5. CORE DISCIPLINES Title & Badges */}
          <div className="space-y-3 pt-4 sm:pt-6 w-full text-center lg:text-left" id="hero-badges-container">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-slate-500 uppercase block font-semibold">
              CORE DISCIPLINES
            </span>

            {/* MOBILE ONLY: explicit 3+2 grid, includes Prompt Engineer badge */}
            <div className="grid grid-cols-6 gap-2 w-full max-w-sm mx-auto lg:hidden">
              {/* Row 1 (3 badges: col-span-2 each) */}
              <span className="col-span-2 flex items-center justify-center px-2.5 py-1.5 bg-cyan-950/30 border border-cyan-500/20 rounded-md text-[9px] font-bold text-cyan-400 uppercase tracking-wider backdrop-blur-sm transition-all hover:border-cyan-500/40 whitespace-nowrap">
                AI Creator
              </span>
              <span className="col-span-2 flex items-center justify-center px-2.5 py-1.5 bg-blue-950/30 border border-blue-500/20 rounded-md text-[9px] font-bold text-blue-400 uppercase tracking-wider backdrop-blur-sm transition-all hover:border-blue-500/40 whitespace-nowrap">
                Designer
              </span>
              <span className="col-span-2 flex items-center justify-center px-2.5 py-1.5 bg-indigo-950/30 border border-indigo-500/20 rounded-md text-[9px] font-bold text-indigo-400 uppercase tracking-wider backdrop-blur-sm transition-all hover:border-indigo-500/40 whitespace-nowrap">
                Web Developer
              </span>

              {/* Row 2 (2 badges: col-span-3 each) */}
              <span className="col-span-3 flex items-center justify-center px-2.5 py-1.5 bg-slate-900 border border-white/10 rounded-md text-[9px] font-bold text-gray-400 uppercase tracking-wider backdrop-blur-sm transition-all hover:border-white/20 whitespace-nowrap">
                Network Engineer
              </span>
              <span className="col-span-3 flex items-center justify-center px-2.5 py-1.5 bg-slate-900 border border-white/10 rounded-md text-[9px] font-bold text-gray-400 uppercase tracking-wider backdrop-blur-sm transition-all hover:border-white/20 whitespace-nowrap">
                Prompt Engineer
              </span>
            </div>

            {/* DESKTOP ONLY: original 4-badge flex-wrap, byte-for-byte unchanged from source */}
            <div className="hidden lg:flex lg:flex-wrap lg:justify-start gap-2">
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
            </div>
          </div>

        </div>

        {/* Right Side: LARGE PICTURE (Visible ONLY on Desktop/Large Screens) */}
        <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative w-full" id="hero-right-container">
          
          {/* Decorative rotating back circles */}
          <div className="absolute w-full h-full flex justify-center items-center pointer-events-none z-0">
            <div className="w-[440px] h-[440px] rounded-full border border-cyan-500/10 animate-pulse" />
            <div className="absolute w-[380px] h-[380px] rounded-full border border-blue-500/20" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/10 blur-xl rounded-full" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-600/10 blur-2xl rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative z-10"
            id="hero-portrait-frame-wrapper"
          >
            {/* Main Circle Image Container */}
            <div className="w-[400px] h-[400px] rounded-full p-2 bg-gradient-to-tr from-cyan-500 via-blue-600 to-transparent shadow-[0_0_50px_rgba(6,182,212,0.2)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0a] border-2 border-black relative">
                {/* Professional Portrait of Shams Ud Din */}
                <img
                  src="/images/shams-profile.png"
                  alt="Shams Ud Din - AI Creator & Web Developer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
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

      {/* Editorial Status Bar */}
      <div 
        className="absolute bottom-8 w-full left-0 px-10 flex justify-between items-end text-[10px] text-gray-500 tracking-[0.2em] uppercase font-bold pointer-events-none hidden md:flex" 
        id="editorial-status-bar"
      >
        <div>Est. 2024 / Islamabad</div>
        <div className="flex gap-6">
          <span>Scroll To Explore</span>
          <span className="text-cyan-500">Next Gen Portfolio</span>
        </div>
      </div>
    </section>
  );
}
