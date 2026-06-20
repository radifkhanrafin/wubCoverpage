import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/shared/Navbar';
import Hero from './components/landing/Hero';
import DocTypes from './components/landing/DocTypes';
import HowItWorks from './components/landing/HowItWorks';
import Features from './components/landing/Features';
import Faq from './components/landing/Faq';
import Footer from './components/landing/Footer';

// Generator components
import DynamicForm from './components/generator/DynamicForm';
import LivePreview from './components/generator/LivePreview';
import DownloadCard from './components/generator/DownloadCard';

import { DOCUMENT_TYPES } from './data/templates';
import { DocumentData } from './types';
import { Sparkles, ArrowLeft, Layers, Heart, FileText } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'generator'>('landing');
  const [selectedTypeId, setSelectedTypeId] = useState<string>('assignment');

  // Initialize with 'assignment' defaults
  const [formData, setFormData] = useState<DocumentData>(() => ({
    universityName: '',
    department: '',
    courseName: '',
    courseCode: '',
    documentTitle: '',
    subtitle: '',
    studentName: '',
    studentId: '',
    instructorDept: '',
    instructorName: '',
    submissionDate: '',
    themeColor: '#a855f7',
    accentStyle: 'classic',
    fontFamily: 'sans',
    showBorder: true,
    showWatermark: false,
    scaleLogo: 1,
  }));

  const handleSelectDocType = (id: string) => {
    setSelectedTypeId(id);
    // const defaults = INITIAL_VALUES_BY_TYPE[id] || INITIAL_VALUES_BY_TYPE['assignment'];
    // setFormData({
    //   ...(defaults as DocumentData)
    // });
    setCurrentView('generator');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...(prev || {}),
      [fieldId]: value
    }));
  };

  const handleResetToDefaults = () => {
    // const defaults = INITIAL_VALUES_BY_TYPE[selectedTypeId];
    // if (defaults) {
    //   setFormData({
    //     ...(defaults as DocumentData)
    //   });
    // }
  };

  const activeType = DOCUMENT_TYPES.find(d => d.id === selectedTypeId) || DOCUMENT_TYPES[0];

  return (
    <div className="min-h-screen bg-grid text-zinc-100 flex flex-col relative selection:bg-violet-600/30 selection:text-violet-200 overflow-x-hidden">
      {/* Immersive UI ambient glowing blobs in background */}
      <div className="glow top-[-100px] right-[-100px] md:top-[-50px] md:right-[-50px]" />
      <div className="glow bottom-[-150px] left-[-100px] md:bottom-[-100px] md:left-[-50px] opacity-75" />
      <div className="glow top-1/2 left-1/3 opacity-40 blur-3xl pointer-events-none" />

      {/* Top Glass Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Container with transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === 'landing' ? (
            <motion.div
              key="landing_view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-0"
            >
              {/* Landing Sub-sections */}
              <Hero
                onStartGenerating={() => handleSelectDocType('assignment')}
                onExploreTemplates={() => {
                  document.getElementById('explore_section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
              <DocTypes onSelectType={handleSelectDocType} />
              <HowItWorks />
              <Features />
              <Faq />
            </motion.div>
          ) : (
            <motion.div
              key="generator_view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              id="generator_studio_panel"
            >
              {/* Back Button and Sub-Heading header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <button
                    onClick={() => {
                      setCurrentView('landing');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="group inline-flex items-center gap-1.5 text-zinc-400 hover:text-white text-xs font-semibold uppercase tracking-wider mb-2 cursor-pointer transition-colors duration-200"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    Back to Catalog
                  </button>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    A4 Studio Workspace
                    <span className="text-xs font-mono font-medium bg-indigo-500/10 text-indigo-400 px-2.5 py-0.5 rounded-full border border-indigo-500/15">
                      Live Compiling
                    </span>
                  </h2>
                </div>

                {/* Horizontal Quick Switch presets */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mr-2 shrink-0">Switch Layout:</span>
                  <div className="flex gap-1">
                    {DOCUMENT_TYPES.map((type) => {
                      const isCurrent = type.id === selectedTypeId;
                      return (
                        <button
                          key={type.id}
                          onClick={() => handleSelectDocType(type.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors shrink-0 ${isCurrent
                            ? 'bg-zinc-900 border border-zinc-800 text-violet-400 font-bold'
                            : 'bg-zinc-950 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 border border-transparent'
                            }`}
                        >
                          {type.title.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Workspace Main Side-by-Side Area */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT */}
                <div className="lg:col-span-4 space-y-6  h-[115vh] overflow-scroll">
                  <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-md">
                    <DynamicForm
                      activeType={activeType}
                      formData={formData}
                      onFieldChange={handleFieldChange}
                      onResetToDefaults={handleResetToDefaults}
                    />
                  </div>

                  <DownloadCard
                    formData={formData}
                    activeType={activeType}
                  />
                </div>

                {/* RIGHT */}
                <div className="lg:col-span-8 self-start">
                  <div className="sticky top-24">
                    {/* <div className="bg-white/95 p-2 rounded-3xl border border-zinc-900/60"> */}
                      <LivePreview
                        formData={formData}
                        activeType={activeType}
                      />
                    {/* </div> */}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

<div className=' ml-20'>
 <LivePreview
        formData={formData}
        activeType={activeType}
      />
</div>
     


      {/* Modern Footer */}
      <Footer />
    </div>
  );
}
