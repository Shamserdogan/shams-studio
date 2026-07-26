import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Video, Code, ShieldCheck, Sparkles, Zap } from 'lucide-react';

interface HeroSectionProps {
  onOpenAdmin: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAdmin }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-24 lg:pb-20 overflow-hidden bg-slate-950 text-white">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-indigo-300 text-xs font-semibold tracking-wide">
              <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Full-Stack AI & Digital Production Studio</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
              Next-Gen <br className="hidden sm:inline" />
              <span className="text-indigo-400">
                AI Video Ads & Web Engineering
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              SHAMS STUDIO powers forward-thinking brands with high-converting AI video advertisements, custom scalable web platforms, human-centered UI/UX design, and zero-trust enterprise network infrastructure.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all"
              >
                <span>View Selected Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800 text-sm font-semibold transition-all"
              >
                <span>Explore Services</span>
              </a>

              <button
                onClick={onOpenAdmin}
                className="text-xs font-semibold text-slate-400 hover:text-indigo-400 underline decoration-indigo-500/50 underline-offset-4 transition-colors"
              >
                Admin Console →
              </button>
            </div>

            {/* Statistics Cards - Matching Sleek Interface Design */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow-sm">
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Active Services</p>
                <p className="text-2xl font-bold text-white">5</p>
                <div className="h-1 w-full bg-slate-800 mt-2.5 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-indigo-500"></div>
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow-sm">
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Total Projects</p>
                <p className="text-2xl font-bold text-white">24</p>
                <div className="h-1 w-full bg-slate-800 mt-2.5 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-emerald-500"></div>
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow-sm">
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Blog Count</p>
                <p className="text-2xl font-bold text-white">12</p>
                <div className="h-1 w-full bg-slate-800 mt-2.5 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-amber-500"></div>
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow-sm">
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Client Messages</p>
                <p className="text-2xl font-bold text-white">156</p>
                <div className="h-1 w-full bg-slate-800 mt-2.5 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-rose-500"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Reel Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
                alt="SHAMS STUDIO AI Showcase"
                className="w-full h-[380px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Floating Media Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured AI Video Ads
                  </span>
                  <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded-full font-semibold">
                    4K Ultra HD
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white">
                  Aetheria Neural Motion Commercial
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1">
                  Synthetic AI cinematography & 3D digital audio composition.
                </p>
              </div>

              {/* Central Play Pulse Button */}
              <a
                href="#portfolio"
                className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 backdrop-blur-sm">
                  <Play className="w-7 h-7 ml-1 fill-white" />
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
