import React from 'react';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-base font-extrabold text-white tracking-wider">
                SHAMS STUDIO
              </span>
              <p className="text-[10px] text-slate-500">
                Full-Stack Dynamic Portfolio & AI Platform
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 font-medium">
            <a href="#services" className="hover:text-indigo-400 transition-colors">
              Services
            </a>
            <a href="#portfolio" className="hover:text-indigo-400 transition-colors">
              Portfolio
            </a>
            <a href="#blog" className="hover:text-indigo-400 transition-colors">
              Blog CMS
            </a>
            <a href="#contact" className="hover:text-indigo-400 transition-colors">
              Contact Us
            </a>
            <button
              onClick={onOpenAdmin}
              className="text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal API</span>
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} SHAMS STUDIO. All rights reserved. Free Tier Ready (MongoDB Atlas + Cloudinary + Express).
          </div>
          <div className="flex items-center gap-1">
            <span>Architected with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>for Global Digital Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
