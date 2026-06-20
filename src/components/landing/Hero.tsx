import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, FileText, ArrowRight, BookOpen, GraduationCap } from 'lucide-react';

interface HeroProps {
  onStartGenerating: () => void;
  onExploreTemplates: () => void;
}

export default function Hero({ onStartGenerating, onExploreTemplates }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-transparent flex flex-col items-center">
      
      {/* Decorative Grid and Ambient Glow Backgrounds */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/15 via-transparent to-transparent pointer-events-none" />
      
      {/* Laser lines/grids in background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Neon glowing orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] rounded-full bg-indigo-600/10 blur-[90px] pointer-events-none z-0" />

      {/* Hero Core Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
        
        {/* Sparkles pill badging */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800 backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-xs font-mono font-semibold text-zinc-300 tracking-wide flex items-center gap-1">
            Now Powered by Live A4 Vector Rendering 
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </span>
        </motion.div>

        {/* Large Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white leading-[1.1] mb-6 max-w-4xl"
          id="hero_headline"
        >
          Generate University <br />
          <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
            Documents in Seconds
          </span>
        </motion.h1>

        {/* Subheadline description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-zinc-400 text-base sm:text-xl font-normal leading-relaxed max-w-2xl mb-10"
          id="hero_subheadline"
        >
          Instantly create beautifully formatted cover pages, homework sets, lab reports, project write-ups, and internship files meeting strict academic criteria.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full justify-center max-w-md"
        >
          <button
            onClick={onStartGenerating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-sans font-bold shadow-xl shadow-indigo-600/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5"
            id="hero_btn_generate"
          >
            Generate Now <ArrowRight className="w-4 h-4 text-white" />
          </button>
          
          <button
            onClick={onExploreTemplates}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 hover:border-zinc-700 font-sans font-semibold transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5"
            id="hero_btn_explore"
          >
            Explore Templates <FileText className="w-4 h-4 text-zinc-400" />
          </button>
        </motion.div>

        {/* Float design mock preview of the paper inside grid */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.4, ease: 'easeOut' }}
          className="w-full max-w-4xl relative rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 sm:p-6 backdrop-blur-xl shadow-2xl shadow-indigo-500/5"
        >
          {/* Mac toolbar buttons */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-6">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-zinc-500 tracking-wide">unidoc-cover_v2.pdf</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400 font-mono">A4 Preview Mode</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-left">
            
            {/* Visual card content left */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-violet-400 font-mono uppercase tracking-wider font-semibold">Instant Live Rendering</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Real-time vector compilation</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Toggle margins, adjust logo scales, pick fonts from classical serif to technoid mono. What you see is precisely mapped onto A4 dimensions for perfect printing.
                </p>
              </div>
              
              {/* Row points */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-violet-400" />
                  </div>
                  <span className="text-xs text-zinc-300 font-medium font-sans">Official Layouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-xs text-zinc-300 font-medium font-sans">Auto Formatting</span>
                </div>
              </div>
            </div>

            {/* Simulated mini cover page preview right */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-inner space-y-4 h-56 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-violet-500" />
              <div className="space-y-2 text-center">
                <div className="h-2.5 w-24 bg-violet-500/20 rounded mx-auto" />
                <div className="h-1.5 w-32 bg-zinc-800 rounded mx-auto" />
                <div className="h-0.5 w-16 bg-violet-400/30 rounded mx-auto" />
              </div>
              
              <div className="space-y-2 text-center">
                <div className="h-4 w-40 bg-zinc-800 rounded mx-auto" />
                <div className="h-2 w-32 bg-zinc-800/60 rounded mx-auto" />
              </div>

              <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 pt-3 border-t border-zinc-900">
                <div className="space-y-1">
                  <div className="h-1.5 w-12 bg-zinc-800 rounded" />
                  <div className="h-1 w-16 bg-zinc-900 rounded" />
                </div>
                <div className="space-y-1 text-right">
                  <div className="h-1.5 w-12 bg-zinc-800 rounded ml-auto" />
                  <div className="h-1 w-16 bg-zinc-900 rounded ml-auto" />
                </div>
              </div>
              
              {/* Glass shine hover effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
