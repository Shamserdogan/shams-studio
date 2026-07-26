import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Terminal } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const logs = [
    "INITIALIZING SHAMS STUDIO NEURAL CORE...",
    "CONNECTING TO ISLAMABAD SATELLITE WAN... [OK]",
    "ESTABLISHING OSPF AREA 0 STATEFUL TRUNK... [OK]",
    "COMPILING REACT & TYPESCRIPT ENGINE LATTICE... [OK]",
    "SYNTHESIZING GEN-AI VIDEO CINEMATIC PIPELINES... [OK]",
    "AUTHENTICATING SECURED PORTAL PROTOCOLS... [OK]",
    "DEPLOYS READY. COMMENCING DECRYPT..."
  ];

  useEffect(() => {
    // Increment progress bar
   const progressInterval = setInterval(() => {
  setProgress((prev) => {
    if (prev >= 100) {
      clearInterval(progressInterval);
      return 100;
    }

    const increment = Math.floor(Math.random() * 12) + 4;
    return Math.min(prev + increment, 100);
  });
}, 150);
    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Transition logs as progress goes up
    const logsInterval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < logs.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 320);

    return () => clearInterval(logsInterval);
  }, [logs.length]);

  useEffect(() => {
    if (progress === 100) {
      const exitTimeout = setTimeout(() => {
        setIsExiting(true);
        const completeTimeout = setTimeout(() => {
          onComplete();
        }, 800); // Allow fade out animation to finish
        return () => clearTimeout(completeTimeout);
      }, 600);
      return () => clearTimeout(exitTimeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] text-white select-none px-6"
          id="loading-screen"
        >
          {/* Futuristic ambient backing lights */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[35%] left-[25%] w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[35%] right-[25%] w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 w-full max-w-lg space-y-12">
            {/* Branding Core Area */}
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                {/* Glowing ring */}
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 opacity-20 blur-xl animate-pulse" />
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                  <span className="font-bold text-black text-2xl italic font-display">S</span>
                </div>
              </motion.div>

              <div className="text-center space-y-1">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-2xl font-bold tracking-widest font-display uppercase"
                >
                  SHAMS <span className="text-cyan-400">STUDIO</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400"
                >
                  Engineering Futures. Designing Intelligence.
                </motion.p>
              </div>
            </div>

            {/* Terminal Log Console */}
            <div 
              className="p-5 rounded-xl bg-slate-950/80 border border-white/5 font-mono text-[11px] text-gray-400 min-h-[105px] flex flex-col justify-end text-left space-y-2 relative shadow-2xl"
              id="loading-terminal"
            >
              <div className="absolute top-3 right-4 flex items-center gap-1.5 text-[9px] font-semibold text-cyan-400">
                <Terminal className="w-3.5 h-3.5 animate-pulse" />
                <span>SECURE BOOT</span>
              </div>
              <div className="space-y-1.5 select-text opacity-90">
                {logs.slice(Math.max(0, logIndex - 2), logIndex + 1).map((log, i) => (
                  <motion.p
                    key={log}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: i === 2 || logIndex < 2 ? 1 : 0.4, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`${i === 2 || logIndex < 2 ? "text-cyan-400 font-semibold" : "text-gray-500"}`}
                  >
                    &gt; {log}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Custom High-End Progress Bar */}
            <div className="space-y-3" id="loading-progress-container">
              <div className="flex justify-between items-center text-[11px] font-mono font-bold text-gray-400">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
                  INITIALIZING RESOURCES
                </span>
                <span className="text-cyan-400">{progress}%</span>
              </div>

              {/* Progress Track */}
              <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5 relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
              
              <div className="flex justify-between text-[9px] font-mono text-slate-600">
                <span>FOUNDER // SHAMS UD DIN</span>
                <span>UTC+5:00 // PAKISTAN</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
