"use client";

import React, { useEffect } from "react";
import { motion } from "motion/react";
import { RefreshCw, ShieldAlert, Terminal, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console or error-tracking telemetry
    console.error("System Runtime Exception:", error);
  }, [error]);

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  return (
    <main 
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white px-6 overflow-hidden select-none"
      id="error-boundary-page"
    >
      {/* Premium lighting backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[25%] w-[350px] h-[350px] bg-rose-950/15 rounded-full blur-[110px]" />
        <div className="absolute bottom-[20%] left-[25%] w-[350px] h-[350px] bg-cyan-950/15 rounded-full blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-10" />
      </div>

      <div className="relative z-10 w-full max-w-lg text-center space-y-10">
        
        {/* Animated Warning Icon */}
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: 15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-rose-500 to-amber-600 rounded-2xl opacity-25 blur-xl animate-pulse" />
            <div className="w-20 h-20 bg-slate-950/90 border border-rose-500/30 rounded-2xl flex items-center justify-center shadow-2xl">
              <ShieldAlert className="w-10 h-10 text-rose-500 animate-pulse" />
            </div>
          </motion.div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.4em] text-rose-400 uppercase font-bold block">
              DIAGNOSTIC CRASH
            </span>
            <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase font-mono block">
              RUNTIME EXCEPTION CATCHED
            </span>
          </div>
        </div>

        {/* Diagnostic Panel Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="p-6 rounded-2xl bg-slate-950/90 border border-white/5 backdrop-blur-3xl relative overflow-hidden shadow-2xl space-y-5 text-left"
          id="diagnostic-card"
        >
          {/* Subtle line indicator */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-rose-500/40 to-transparent pointer-events-none" />

          {/* Terminal Title */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
              <Terminal className="w-4 h-4 text-rose-500" />
              <span>STACK_TRACE.LOG</span>
            </div>
            <div className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
          </div>

          <div className="space-y-3 font-mono text-[11px]">
            <p className="text-gray-300 leading-relaxed font-semibold">
              An unexpected process compilation or execution error has halted the digital landscape rendering.
            </p>
            <div className="p-3 bg-black/60 rounded-lg border border-rose-500/10 text-rose-400 overflow-x-auto break-all max-h-[80px]">
              {error?.message || "TypeError: Failed to execute render on app structure."}
            </div>
            {error?.digest && (
              <p className="text-slate-500 text-[9px] uppercase tracking-wide">
                Digest Code: <span className="text-slate-400">{error.digest}</span>
              </p>
            )}
          </div>
        </motion.div>

        {/* Action Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          id="error-actions"
        >
          {/* Attempt Recovery / Reset */}
          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 hover:shadow-[0_0_20px_rgba(239,68,68,0.35)] transition-all cursor-pointer"
            id="error-reset-btn"
          >
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
            Restore Workspace
          </motion.button>

          {/* Fallback Home Button */}
          <motion.button
            onClick={handleHomeClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/5 hover:border-white/25 transition-all cursor-pointer"
            id="error-home-btn"
          >
            <Home className="w-4 h-4 text-cyan-400" />
            Home Directory
          </motion.button>
        </motion.div>

        {/* Footer info */}
        <div className="text-[9px] font-mono text-slate-600 tracking-[0.2em] uppercase">
          TELEMETRY // SHAMS STUDIO INTERCEPT
        </div>

      </div>
    </main>
  );
}
