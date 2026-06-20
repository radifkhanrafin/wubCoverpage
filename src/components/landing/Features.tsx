import React from 'react';
import { motion } from 'motion/react';
import { Cpu, FileText, Smartphone, Eye, Zap, FileSpreadsheet, Sparkles } from 'lucide-react';

export default function Features() {
  const featList = [
    {
      title: 'A4 Live Simulation',
      desc: 'Watch text wrap, margins align, and academic seals scale dynamically as you edit.',
      icon: Eye,
      size: 'lg', // spanned bento block
      color: 'from-violet-600 to-indigo-600'
    },
    {
      title: 'Vector PDF Channel',
      desc: 'Prints crisp vector texts. Perfect for digital submissions and physical print outs.',
      icon: FileText,
      size: 'sm',
      color: 'from-purple-500 to-fuchsia-500'
    },
    {
      title: 'Editable DOCX Bundler',
      desc: 'Exports fully native Word files with compatible structures, headings, and tables.',
      icon: FileSpreadsheet,
      size: 'sm',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'No Sign-ups Required',
      desc: 'Absolute convenience. Build, preview, and extract your documents offline.',
      icon: Zap,
      size: 'sm',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Responsive Builder',
      desc: 'Fully calibrated for touch screens. Edit data on tablets or write essays on smartphones.',
      icon: Smartphone,
      size: 'lg',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      
      {/* Glow ambient background blur */}
      <div className="absolute top-2/3 right-1/4 w-[28rem] h-[28rem] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-mono font-semibold tracking-wider text-violet-400 uppercase bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
            Advanced Capability
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-4">
            Custom Calibrated for Students
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            No mock overlays. Real engineering supporting pristine typography and formatting standards.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featList.map((feat, idx) => {
            const Icon = feat.icon;
            const isLarge = feat.size === 'lg';

            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                className={`relative overflow-hidden rounded-2xl glass-panel hover:border-violet-500/30 p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between ${
                  isLarge ? 'md:col-span-2' : 'md:col-span-1'
                }`}
              >
                {/* Visual Accent */}
                <div className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-gradient-to-br ${feat.color} opacity-5 blur-2xl`} />

                <div>
                  <div className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6`}>
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                    {feat.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md">
                    {feat.desc}
                  </p>
                </div>

                {isLarge && (
                  <div className="mt-8 flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-white/5 w-fit px-3 py-1.5 rounded-lg border border-white/5">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-spin-slow" />
                    <span>Real-time Sync Enabled</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
