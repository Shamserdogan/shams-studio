"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, RefreshCw, Compass, ShieldAlert } from "lucide-react";

export default function NotFound() {
  const handleHomeClick = () => {
    window.location.href = "/";
  };

  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <main 
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white px-6 overflow-hidden select-none"
      id="not-found-page"
    >
      {/* Editorial lighting backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[25%] left-[20%] w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[110px]" />
        <div className="absolute bottom-[25%] right-[20%] w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-15" />
      </div>

      <div className="relative z-10 w-full max-w-lg text-center space-y-10">
        
        {/* Animated Icon Header */}
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl opacity-20 blur-xl animate-pulse" />
            <div className="w-20 h-20 bg-slate-950/80 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl relative">
              <Compass className="w-10 h-10 text-cyan-400 animate-[spin_10s_linear_infinite]" />
              <ShieldAlert className="w-4 h-4 text-rose-500 absolute bottom-3 right-3 animate-bounce" />
            </div>
          </motion.div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase font-bold block">
              System Error
            </span>
            <span className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono block">
              Status Code: 404
            </span>
          </div>
        </div>

        {/* Core Message Box */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl relative overflow-hidden shadow-2xl space-y-4 text-center"
          id="not-found-card"
        >
          {/* Subtle glow edge */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />

          <h2 className="text-3xl font-extrabold tracking-tight text-white font-display">
            Page Not Found.
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed font-sans">
            "The requested digital experience does not exist in this system."
          </p>
          <div className="text-[10px] font-mono text-slate-600 pt-2 border-t border-white/5 uppercase tracking-wider">
            Target Domain: SHAMS-STUDIO.COM
          </div>
        </motion.div>

        {/* Action Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          id="not-found-actions"
        >
          {/* Back Home Button */}
          <motion.button
            onClick={handleHomeClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] transition-all cursor-pointer"
            id="not-found-home-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </motion.button>

          {/* Refresh Action */}
          <motion.button
            onClick={handleRefreshClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/5 hover:border-white/25 transition-all cursor-pointer"
            id="not-found-refresh-btn"
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            Refresh System
          </motion.button>
        </motion.div>

        {/* Brand identifier at the bottom */}
        <div className="text-[9px] font-mono text-slate-600 tracking-[0.2em] uppercase">
          © 2026 SHAMS STUDIO // BY SHAMS UD DIN
        </div>

      </div>
    </main>
  );
}
