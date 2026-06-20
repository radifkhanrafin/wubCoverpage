import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Is this formatting tool completely free to use?',
      a: 'Yes, UniDoc Generator is 100% free and runs directly inside your web browser. There are no limits on A4 compilations and no commercial advertisements.'
    },
    {
      q: 'How does the primary color customizer work?',
      a: 'We use CSS custom properties linked to our styling modules. Toggling the theme colors on the builder page will immediately apply custom accents, border lines, and highlight seals to your simulated document, which will be exported natively.'
    },
    {
      q: 'Do you store or save my submitted academic data?',
      a: 'Absolutely not. This is a frontend-only application. All student profiles, course names, and homework answers are rendered entirely in sandboxed client memory. No servers receive your personal files.'
    },
    {
      q: 'How do I print the generated PDF perfectly on standard paper?',
      a: 'Our PDF export utilizes exact vector calculations matching A4 dimensions in pt (595.28 x 841.89). When opening the printed PDF, check that your system print sizing ratio is set to "Actual Size" or "100%", with margins set to "Default" for flawless borders.'
    },
    {
      q: 'Can I open and modify the exported DOCX files in Microsoft Word?',
      a: 'Yes! The downloaded .docx file uses standard Microsoft XML structures. You can open and edit the document inside MS Word, Apple Pages, LibreOffice, or import it straight into Google Docs.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-transparent relative overflow-hidden" id="faq_section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <HelpCircle className="w-10 h-10 text-violet-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Answers to common questions regarding formatting, printing, and file privacy.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel overflow-hidden transition-all duration-305"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 font-sans font-semibold text-white hover:bg-white/5 transition-colors duration-200"
                >
                  <span className="text-sm sm:text-base leading-snug">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="p-6 sm:p-8 pt-0 text-zinc-400 text-xs sm:text-sm leading-relaxed border-t border-white/5 bg-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
