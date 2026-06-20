import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { DOCUMENT_TYPES } from '../../data/templates';
import { ArrowUpRight } from 'lucide-react';

interface DocTypesProps {
  onSelectType: (id: string) => void;
}

export default function DocTypes({ onSelectType }: DocTypesProps) {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden" id="explore_section">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 right-10 w-[20rem] h-[20rem] rounded-full bg-indigo-600/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[24rem] h-[24rem] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono font-semibold tracking-wider text-violet-400 uppercase bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
            A4 Specialized Formatters
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-white tracking-tight mt-4 mb-4">
            Curated Formats for Every Academic Frontier
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Select an A4 template matched to university guidelines. All formats compile into dual vector formats immediately.
          </p>
        </div>

        {/* Categories Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCUMENT_TYPES.map((doc, idx) => {
            // Dynamically lookup the Lucide icon matching the template's configuration
            const LucideIcon = (Icons as any)[doc.icon] || Icons.FileText;

            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
                id={`card_doc_type_${doc.id}`}
                className="group relative rounded-2xl glass-panel hover:bg-zinc-900/60 p-6 cursor-pointer hover:border-violet-500/30 transition-all duration-300 shadow-xl flex flex-col justify-between"
                onClick={() => onSelectType(doc.id)}
              >
                {/* Glow bar border top on cover hover */}
                <div className={`absolute top-0 left-0 right-0 h-10 rounded-t-2xl bg-gradient-to-b ${doc.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />

                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${doc.color} p-2.5 shadow-xl shadow-indigo-500/5 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}>
                    <LucideIcon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-violet-400 transition-colors duration-200">
                    {doc.title}
                  </h3>
                  
                  <p className="text-xs text-zinc-400 leading-relaxed mt-2.5">
                    {doc.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300 mt-6 pt-3 border-t border-zinc-900">
                  <span>Enter Editor</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
