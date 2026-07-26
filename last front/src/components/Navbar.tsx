import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
const MotionLink = motion(Link);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuItems = [
    { name: "Home", path: "/", id: "home" },
    { name: "About", path: "/about", id: "about" },
    { name: "Services", path: "/services", id: "services" },
    { name: "Portfolio", path: "/portfolio", id: "portfolio" },
    { name: "Blog", path: "/blog", id: "blog" },
    { name: "Testimonials", path: "/testimonials", id: "testimonials" },
    { name: "Contact", path: "/contact", id: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const scrollPosition = window.scrollY + 200;
      for (const item of menuItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b ${scrolled
        ? "backdrop-blur-2xl bg-slate-950/70 border-cyan-500/10 shadow-[0_10px_40px_rgba(6,182,212,0.12)] py-4"
        : "backdrop-blur-xl bg-black/20 border-white/5 py-5"
        }`}
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-3 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            id="nav-logo"
            onClick={() => setActiveSection("home")}
          >
            <div className="relative w-11 h-11 flex items-center justify-center">

              {/* Animated Glow Ring */}
              <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-md group-hover:bg-cyan-400/40 transition-all duration-500"></div>

              {/* Main Logo */}
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-300 via-cyan-400 to-blue-600 border border-cyan-300/30 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.45)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_55px_rgba(6,182,212,0.85)]">

                <span className="text-black font-black text-lg tracking-tight">
                  S
                </span>

              </div>

            </div>
            <div className="flex flex-col">

              <span className="text-[22px] font-black tracking-tight uppercase bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent transition-all duration-500 group-hover:tracking-wide">
                SHAMS STUDIO
              </span>

              <span className="text-[10px] font-medium tracking-[0.28em] text-slate-400 uppercase mt-0.5 transition-all duration-300 group-hover:text-cyan-300">
                AI • DESIGN • DEVELOPMENT
              </span>

            </div>
          </motion.a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8" id="nav-links">
            {menuItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <motion.a
  key={item.id}
  href={item.path}
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.05 }}
  onClick={() => setActiveSection(item.id)}
                  className={`relative text-xs uppercase tracking-widest font-semibold transition-all py-2 cursor-pointer ${isActive ? "text-cyan-400" : "text-gray-400 hover:text-white"
                    }`}
                  id={`nav-link-${item.id}`}
                >
                  {item.name}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.a>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block" id="nav-cta">
           <motion.a
  href="https://wa.me/923429225675"
  target="_blank"
  rel="noreferrer"
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.96 }}
  className="relative overflow-hidden px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-500 hover:shadow-[0_0_45px_rgba(6,182,212,0.7)] group"
  id="nav-cta-btn"
>
  <span className="relative z-10">Let's Chat</span>

  <span className="absolute inset-y-0 -left-20 w-16 bg-white/40 blur-md rotate-12 transition-all duration-700 group-hover:left-[120%]" />
</motion.a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center" id="nav-mobile-toggle">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors focus:outline-none relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle Menu"
              id="mobile-menu-btn"
            >
              <div className="flex flex-col gap-1.5 w-6 items-end justify-center">
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "w-0 opacity-0" : "w-4"}`} />
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5"}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-xl absolute top-full left-0 right-0 shadow-2xl overflow-hidden"
            id="mobile-nav-drawer"
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {menuItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <MotionLink
  key={item.id}
  to={item.path}
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: index * 0.04 }}
  onClick={() => {
    setActiveSection(item.id);
    setIsOpen(false);
  }}
  className={`text-base uppercase tracking-widest font-bold py-3 border-b border-white/5 last:border-0 transition-all ${
    isActive ? "text-cyan-400 pl-2" : "text-slate-300 hover:text-white"
  }`}
  id={`mobile-link-${item.id}`}
>
  {item.name}
</MotionLink>
                );
              })}
              <motion.a
                href="https://wa.me/923429225675"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex items-center justify-center gap-2 w-full mt-4 px-6 py-3 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
                id="mobile-cta-btn"
              >
                <MessageSquare className="w-4 h-4" />
                Start Project
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
