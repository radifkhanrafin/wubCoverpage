import React, { useState } from 'react';
import { FileDown, FileText, CheckCircle, Flame, ArrowUpRight } from 'lucide-react';
import { generateAcademicPDF } from '../../lib/pdf';
import { generateAcademicDOCX } from '../../lib/docx';
import { DocumentData, DocumentType } from '../../types';

interface DownloadCardProps {
  formData: DocumentData;
  activeType: DocumentType;
}

export default function DownloadCard({ formData, activeType }: DownloadCardProps) {
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [isDocxLoading, setIsDocxLoading] = useState(false);
  const [showPdfSuccess, setShowPdfSuccess] = useState(false);
  const [showDocxSuccess, setShowDocxSuccess] = useState(false);

  const handleDownloadPDF = () => {
    setIsPdfLoading(true);
    setShowPdfSuccess(false);
    
    // Simulate compilation delay for high-fidelity micro-interactions
    setTimeout(() => {
      try {
        generateAcademicPDF(formData, activeType.id);
        setIsPdfLoading(false);
        setShowPdfSuccess(true);
        setTimeout(() => setShowPdfSuccess(false), 2400);
      } catch (err) {
        setIsPdfLoading(false);
        console.error("PDF download failed", err);
      }
    }, 1100);
  };

  const handleDownloadDOCX = () => {
    setIsDocxLoading(true);
    setShowDocxSuccess(false);

    // Simulate compilation delay for high-fidelity micro-interactions
    setTimeout(() => {
      try {
        generateAcademicDOCX(formData, activeType.id);
        setIsDocxLoading(false);
        setShowDocxSuccess(true);
        setTimeout(() => setShowDocxSuccess(false), 2400);
      } catch (err) {
        setIsDocxLoading(false);
        console.error("DOCX download failed", err);
      }
    }, 1200);
  };

  return (
    <div className="p-6 rounded-2xl glass-panel space-y-6" id="download_actions_card">
      <div>
        <span className="text-[9px] font-mono text-violet-400 uppercase tracking-widest font-bold">Execution Zone</span>
        <h4 className="text-sm font-bold text-white tracking-tight mt-0.5">Dual-Channel Compilation Output</h4>
        <p className="text-xs text-zinc-400 leading-normal mt-1.5">
          Select your target document channel below. Files are compiled natively inside your local environment sandbox.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* PDF Exporter Button */}
        <button
          onClick={handleDownloadPDF}
          disabled={isPdfLoading}
          className={`group flex flex-col justify-between items-start p-5 rounded-2xl border text-left cursor-pointer transition-all ${
            showPdfSuccess
              ? 'border-emerald-500 bg-emerald-500/5 text-white'
              : 'border-white/5 hover:border-violet-500/30 bg-white/5 hover:bg-white/10 text-zinc-300'
          }`}
          id="btn_download_pdf"
        >
          <div className="flex items-center justify-between w-full">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${showPdfSuccess ? 'bg-emerald-500/20' : 'bg-rose-500/10'}`}>
              <FileDown className={`w-4.5 h-4.5 ${showPdfSuccess ? 'text-emerald-400' : 'text-rose-450'}`} />
            </div>
            
            {/* Download Status Spinner */}
            {isPdfLoading && (
              <div className="w-4 h-4 border-2 border-t-transparent border-violet-500 rounded-full animate-spin" />
            )}
            
            {showPdfSuccess && (
              <CheckCircle className="w-4 h-4 text-emerald-400 animate-bounce" />
            )}

            {!isPdfLoading && !showPdfSuccess && (
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            )}
          </div>

          <div className="mt-6 space-y-1">
            <p className="text-xs font-bold text-white tracking-tight">
              {isPdfLoading ? 'Compiling vector matrices...' : showPdfSuccess ? 'Successfully Exported!' : 'Export Vector A4 PDF'}
            </p>
            <p className="text-[10px] text-zinc-500">
              {isPdfLoading ? 'Assembling lines and sealing...' : 'High quality for presentation'}
            </p>
          </div>
        </button>

        {/* DOCX Exporter Button */}
        <button
          onClick={handleDownloadDOCX}
          disabled={isDocxLoading}
          className={`group flex flex-col justify-between items-start p-5 rounded-2xl border text-left cursor-pointer transition-all ${
            showDocxSuccess
              ? 'border-emerald-500 bg-emerald-500/5 text-white'
              : 'border-white/5 hover:border-violet-500/30 bg-white/5 hover:bg-white/10 text-zinc-300'
          }`}
          id="btn_download_docx"
        >
          <div className="flex items-center justify-between w-full">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${showDocxSuccess ? 'bg-emerald-500/20' : 'bg-blue-500/10'}`}>
              <FileText className={`w-4.5 h-4.5 ${showDocxSuccess ? 'text-emerald-400' : 'text-blue-450'}`} />
            </div>

            {/* Download Status Spinner */}
            {isDocxLoading && (
              <div className="w-4 h-4 border-2 border-t-transparent border-violet-500 rounded-full animate-spin" />
            )}

            {showDocxSuccess && (
              <CheckCircle className="w-4 h-4 text-emerald-400 animate-bounce" />
            )}

            {!isDocxLoading && !showDocxSuccess && (
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            )}
          </div>

          <div className="mt-6 space-y-1">
            <p className="text-xs font-bold text-white tracking-tight">
              {isDocxLoading ? 'Bundling XML elements...' : showDocxSuccess ? 'Successfully Exported!' : 'Export Microsoft Word'}
            </p>
            <p className="text-[10px] text-zinc-500">
              {isDocxLoading ? 'Generating sections...' : 'Fully editable text structure'}
            </p>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/5 text-zinc-400 text-[10px] leading-relaxed">
        <Flame className="w-4.5 h-4.5 text-amber-550 shrink-0" />
        <p>
          Need to add more pages or custom appendix text? Double check your inputs in Section 3 of the dynamic form controller.
        </p>
      </div>
    </div>
  );
}
