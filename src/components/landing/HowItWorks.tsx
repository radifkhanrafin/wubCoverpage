import React from 'react';
import { motion } from 'motion/react';
import { MousePointerClick, Edit3, Download } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: '01',
      title: 'Select Document Type',
      description: 'Choose from a variety of academic document presets designed specifically around current university layout benchmarks.',
      icon: MousePointerClick,
      color: 'from-violet-500 to-indigo-500',
    },
    {
      id: '02',
      title: 'Fill Professional Details',
      description: 'Input your student logs, courses, grading profiles, and body summaries into the responsive field module.',
      icon: Edit3,
      color: 'from-fuchsia-500 to-pink-500',
    },
    {
      id: '03',
      title: 'Download Vectors',
      description: 'Trigger instant compilation algorithms to fetch native, editable Microsoft Word files or high-precision vector PDFs.',
      icon: Download,
      color: 'from-emerald-500 to-teal-500',
    }
  ];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden border-y border-white/5">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] font-mono font-semibold tracking-wider text-violet-400 uppercase bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
            Streamlined Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-4">
            A Three-Step Formatting Pipeline
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Connector horizontal line for Desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[15%] right-[15%] h-0.5 bg-white/5 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                  className="relative flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                  {/* Glowing bubble circular step icon container */}
                  <div className="w-22 h-22 rounded-2xl glass-panel flex items-center justify-center mb-6 relative group hover:border-violet-500/30 transition-all duration-300">
                    {/* Glowing orb ring detail */}
                    <div className={`absolute inset-0.5 rounded-2xl bg-gradient-to-tr ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <IconComponent className="w-8 h-8 text-zinc-300 group-hover:text-violet-400 transition-colors duration-300" />
                    
                    {/* Floating mini label showing number */}
                    <span className="absolute -top-3.5 -right-3.5 w-8 h-8 rounded-full bg-zinc-950 border border-white/10 text-xs font-mono font-bold text-violet-400 flex items-center justify-center shadow-md shadow-black/80">
                      {step.id}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
