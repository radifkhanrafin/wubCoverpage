import React from 'react';
import { BookOpen, Sparkles, FileText, ChevronRight } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'generator';
  onNavigate: (view: 'landing' | 'generator') => void;
  activeDocType?: string;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-[#030712]/40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="nav_logo"
        >
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/10 group-hover:scale-105 transition-all duration-200">
            <BookOpen className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <span className="font-sans font-bold tracking-tight text-white flex items-center gap-1.5 text-sm sm:text-base">
              UniDoc <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/10">Generator</span>
            </span>
            <p className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase -mt-0.5">Premium Academic Suite</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <button
            onClick={() => onNavigate('landing')}
            className={`font-medium transition-colors ${currentView === 'landing' ? 'text-violet-400' : 'text-zinc-400 hover:text-white'}`}
          >
            Home Overview
          </button>
          <button
            onClick={() => onNavigate('generator')}
            className={`font-medium transition-colors ${currentView === 'generator' ? 'text-violet-400' : 'text-zinc-400 hover:text-white'}`}
          >
            A4 Studio Editor
          </button>
          <a
            href="#faq_section"
            onClick={() => {
              onNavigate('landing');
              setTimeout(() => {
                document.getElementById('faq_section')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            Frequently Asked
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          {currentView === 'landing' ? (
            <button
              onClick={() => onNavigate('generator')}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-sans text-sm font-semibold shadow-xl shadow-indigo-600/10 transition-all duration-200 hover:shadow-indigo-500/25 cursor-pointer pr-3"
              id="cta_nav_btn"
            >
              A4 Studio
              <ChevronRight className="w-4 h-4 text-white/90" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('landing')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 text-zinc-300 hover:text-white font-sans text-sm font-medium transition-all duration-200 cursor-pointer"
              id="back_home_btn"
            >
              ← Back Home
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
