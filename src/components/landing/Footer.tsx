import React from 'react';
import { BookOpen, Github, MessageSquare, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/5 py-12 relative z-10 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo and tag */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-sans font-bold text-white tracking-tight">UniDoc Generator</span>
            <p className="text-[10px] text-zinc-500 font-mono -mt-0.5">EST. 2026 • PRIVATE CONTEXT CLIENT DEVICE</p>
          </div>
        </div>

        {/* Center links */}
        <div className="flex items-center gap-6 text-zinc-500">
          <a href="#explore_section" className="hover:text-zinc-300 transition-colors">Templates</a>
          <a href="#faq_section" className="hover:text-zinc-300 transition-colors">Privacy</a>
          <span className="text-zinc-800/40">|</span>
          <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 shadow-sm shadow-emerald-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Systems Operational
          </span>
        </div>

        {/* Copy */}
        <div className="text-center md:text-right text-zinc-600 text-xs">
          <p>© 2026 UniDoc Generator. Built for academics worldwide. No cookies.</p>
        </div>

      </div>
    </footer>
  );
}
