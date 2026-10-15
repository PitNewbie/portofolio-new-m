import React from 'react';
import { Mail, Sparkles } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#07080c]/85 border-b border-white/[0.08] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-white hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
          <span>StarPit</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#companion"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            3D Companion
          </a>
          <a
            href="#projects"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Website Buatanku
          </a>
          <a
            href="#contributions"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Kontribusi AI
          </a>
          <a
            href="#about"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Tentang
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onContactClick}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Hubungi Saya</span>
          </button>
        </div>
      </div>
    </header>
  );
};
