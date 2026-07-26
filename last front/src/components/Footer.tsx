import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Mail,
  Facebook,
  ArrowUp,
  Sparkles,
  Github,
  ArrowUpRight
} from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact", path: "/contact" }
];

  const servicesLinks = [
  { name: "AI Solutions", path: "/services" },
  { name: "Web Development", path: "/services" },
  { name: "UI/UX Design", path: "/services" },
  { name: "Networking Solutions", path: "/services" },
  { name: "Content Creation", path: "/services" }
];

  const socialLinks = [
    {
      name: "WhatsApp",
      href: "https://wa.me/923429225675",
      icon: MessageSquare,
      color: "hover:text-emerald-400 hover:border-emerald-500/20"
    },
    {
      name: "Email",
      href: "mailto:shamserdogan926@gmail.com",
      icon: Mail,
      color: "hover:text-cyan-400 hover:border-cyan-500/20"
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/1EJ7rJTfNA/",
      icon: Facebook,
      color: "hover:text-blue-500 hover:border-blue-500/20"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative bg-[#020617] border-t border-white/5 pt-20 pb-10 overflow-hidden"
      id="footer"
    >
      {/* Premium Gradient Top Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80"></div>
      {/* Editorial subtle light glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 right-[15%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[140px]" />
        <div className="absolute top-0 left-[15%] w-[35%] h-[35%] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">

        {/* Main Grid: Info, Quick Links, Services, Top Action */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/5">

          {/* Logo, Tagline & Mission (Col: 5) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-4">

  <div className="relative w-11 h-11 flex items-center justify-center">

    <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-md"></div>

    <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-300 via-cyan-400 to-blue-600 border border-cyan-300/30 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.45)]">

      <span className="text-black font-black text-lg">
        S
      </span>

    </div>

  </div>

  <div className="flex flex-col">

    <span className="text-[22px] font-black tracking-tight uppercase bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
      SHAMS STUDIO
    </span>

    <span className="text-[10px] font-medium tracking-[0.28em] text-slate-400 uppercase">
      AI • DESIGN • DEVELOPMENT
    </span>

  </div>

</div>

            <p className="text-xs uppercase tracking-[0.2em] font-bold text-cyan-400 font-mono">
              "Engineering Futures. Designing Intelligence."
            </p>

            <p className="text-sm text-gray-400 leading-relaxed font-sans max-w-sm">
              AI solutions, modern web experiences, creative digital systems, and technology-driven innovations designed by Shams Ud Din to help brands scale.
            </p>

            {/* Social Links Row */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-11 h-11 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.04)] hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] ${social.color}`}
                    id={`footer-social-${social.name.toLowerCase()}`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column (Col: 3) */}
          <div className="lg:col-span-3 text-left space-y-5">
            <h4 className="text-xs font-mono font-bold tracking-[0.2em] text-slate-400 uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5 font-sans">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
  to={link.path}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5 group"
                    id={`footer-nav-${link.name.toLowerCase()}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/20 group-hover:bg-cyan-400 transition-colors shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column (Col: 4) */}
          <div className="lg:col-span-4 text-left space-y-5">
            <h4 className="text-xs font-mono font-bold tracking-[0.2em] text-slate-400 uppercase">
              Bespoke Solutions
            </h4>
            <ul className="space-y-2.5 font-sans">
              {servicesLinks.map((service) => (
                <li key={service.name}>
                  <Link
  to={service.path}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors flex items-center justify-between group"
                    id={`footer-service-${service.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-white/35 group-hover:bg-cyan-400 transition-colors shrink-0" />
                      {service.name}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1 font-sans">
            <p className="text-xs text-gray-500">
              &copy; {currentYear} <span className="text-white font-semibold">SHAMS STUDIO</span>. All Rights Reserved.
            </p>
            <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
              Engineered by Shams Ud Din
            </p>
          </div>

          {/* Scroll to Top Trigger */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-4 py-2.5 rounded-xl bg-white/[0.01] border border-white/5 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white hover:border-cyan-400/30 hover:bg-white/5 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            aria-label="Scroll to top of the page"
            id="scroll-to-top-btn"
          >
            <span>Top</span>
            <ArrowUp className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors group-hover:animate-bounce" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
