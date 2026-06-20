import React from 'react';
import { DocumentType, DocumentData, DocumentField } from '../../types';
import { Palette, Type, FileText, Check } from 'lucide-react';
import { facultyData } from '@/src/data';

interface DynamicFormProps {
  activeType: DocumentType;
  formData: DocumentData;
  onFieldChange: (fieldId: string, value: any) => void;
  onResetToDefaults: () => void;
}

const PREMIUM_COLORS = [
  { name: 'Amethyst', hex: '#a855f7' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Cobalt', hex: '#3b82f6' },
  { name: 'Amber Glow', hex: '#f59e0b' },
  { name: 'Crimson', hex: '#ef4444' },
  { name: 'Fuchsia', hex: '#df14ee' },
  { name: 'Aero Sky', hex: '#0ea5e9' },
  { name: 'Rosewood', hex: '#ec4899' },
];

export default function DynamicForm({
  activeType,
  formData,
  onFieldChange,
  onResetToDefaults
}: DynamicFormProps) {

  if (!activeType) return null;

  const groupedFields = (activeType.fields || []).reduce((acc: any, field: DocumentField) => {
    const key = field.section || 'general';
    if (!acc[key]) acc[key] = [];
    acc[key].push(field);
    return acc;
  }, {});

  const sectionTitles: any = {
    general: "1. General Institution",
    academic: "2. Course Details",
    content: "3. Report & Written Topics",
    metadata: "4. Submission Logs"
  };

  const isMissing = (field: DocumentField) =>
    (field as any).required && !formData?.[field.id as keyof DocumentData];

  // ================= FIELD RENDER =================
  const renderField = (field: DocumentField) => {
    const value = formData?.[field.id as keyof DocumentData] || '';
    const missing = isMissing(field);

    // ================= SELECT FIELD =================
    if (field.type === 'select') {

      let options: any[] = field.options || [];

      // 🔥 DEPENDENT DROPDOWN LOGIC
      if (field.id === 'instructorName') {
        const dept = formData?.instructorDept;
        const selectedInstructor = facultyData[
          formData.instructorDept
        ]?.find((t) => t.name === formData.instructorName);

        const instructorDesignation = selectedInstructor?.designation;
        options = dept
          ? facultyData[dept]?.map((t: any) => ({
            label: `${t.name} (${t.designation})`,
            value: `${t.name} `
          })) || []
          : [];

      }

      return (
        <div key={field.id} className="space-y-1.5">

          <label className={`block text-xs font-semibold tracking-wide ${missing ? 'text-red-400' : 'text-zinc-400'
            }`}>
            {field.label}
          </label>

          <select
            value={value}
            disabled={field.id === 'instructorName' && !formData?.instructorDept}
            onChange={(e) => {
              const val = e.target.value;

              if (field.id === 'instructorDept') {
                onFieldChange('instructorDept', val);
                onFieldChange('instructorName', '');
                return;
              }

              onFieldChange(field.id, val);
            }}
            className={`w-full text-xs sm:text-sm  bg-white/5 border rounded-xl pl-3 pr-5 py-2.5 outline-none transition-all ${missing
                ? 'border-red-500 focus:border-red-500'
                : 'border-white/10 focus:border-violet-500'
              }`}
          >
            <option className='text-white bg-black' value="">{field.placeholder}</option>

            {options.map((opt: any) => (
              <option
                className='text-white bg-black'
                key={typeof opt === 'string' ? opt : opt.value}
                value={typeof opt === 'string' ? opt : opt.value}
              >
                {typeof opt === 'string' ? opt : opt.label}
              </option>
            ))}
          </select>

        </div>
      );
    }

    // ================= INPUT FIELD =================
    return (
      <div key={field.id} className="space-y-1.5">

        <label className={`block text-xs font-semibold tracking-wide ${missing ? 'text-red-400' : 'text-zinc-400'
          }`}>
          {field.label}
        </label>

        <input
          type={field.type === 'date' ? 'date' : 'text'}
          value={value}
          onChange={(e) => onFieldChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          className={`w-full text-xs sm:text-sm bg-white/5 border rounded-xl px-4 py-2.5 outline-none transition-all ${missing
              ? 'border-red-500 focus:border-red-500'
              : 'border-white/10 focus:border-violet-500'
            }`}
        />
      </div>
    );
  };


  return (
    <div className="space-y-8 pb-10">

      {/* HEADER */}
      <div className="p-5 rounded-2xl flex items-center justify-between bg-white/5 border border-white/10">
        <div>
          <span className="text-[10px] text-zinc-500 uppercase">Active Template</span>
          <h4 className="text-sm font-bold text-white flex items-center gap-2 mt-1">
            <FileText className="w-4 h-4 text-violet-400" />
            {activeType.title}
          </h4>
        </div>

        <button
          onClick={onResetToDefaults}
          className="text-xs px-3 py-1.5 rounded-lg bg-violet-600/10 text-violet-300 hover:bg-violet-600/20"
        >
          Reset
        </button>
      </div>

      {/* STYLE PANEL */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">

        <div className="grid grid-cols-4 gap-2">
          {PREMIUM_COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => onFieldChange('themeColor', c.hex)}
              className="aspect-square rounded-lg border"
              style={{ backgroundColor: c.hex }}
            >
              {formData.themeColor === c.hex && (
                <Check className="w-4 h-4 text-white mx-auto" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {['serif', 'sans', 'mono'].map((f) => (
            <button
              key={f}
              onClick={() => onFieldChange('fontFamily', f)}
              className={`p-2 rounded-lg border text-xs ${formData.fontFamily === f
                ? 'border-violet-500 text-white'
                : 'border-white/10 text-zinc-400'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 DEPT + INSTRUCTOR SIDE BY SIDE (IMPORTANT FIX) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activeType.fields
          .filter(f => f.id === 'instructorDept' || f.id === 'instructorName')
          .map(renderField)}
      </div>

      {/* REST FIELDS */}
      <div className="space-y-6">

        {Object.keys(groupedFields).map((key) => (
          <div key={key} className="space-y-4">

            <h5 className="text-xs font-bold uppercase text-violet-400 border-b border-white/10 pb-1">
              {sectionTitles[key] || key}
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {groupedFields[key]
                .filter((f: DocumentField) => f.id !== 'instructorDept' && f.id !== 'instructorName')
                .map(renderField)}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}