import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function MouseGlow() {
  const [isMobile, setIsMobile] = useState(true);

  // Use motion values for ultra-smooth GPU-accelerated cursor following
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth out coordinate translation
  const springConfig = { damping: 40, stiffness: 350, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Media query check to disable cursor effects on mobile devices / touch screens
    const checkDevice = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsMobile(hasTouch || window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        // Center the glow orb onto the cursor tip
        mouseX.set(e.clientX - 150);
        mouseY.set(e.clientY - 150);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", checkDevice);
      };
    }

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <motion.div
      style={{
        left: glowX,
        top: glowY,
      }}
      className="fixed w-[300px] h-[300px] pointer-events-none z-30 rounded-full bg-gradient-to-tr from-cyan-500/8 to-blue-600/8 blur-[90px]"
      id="mouse-ambient-glow"
    />
  );
}
