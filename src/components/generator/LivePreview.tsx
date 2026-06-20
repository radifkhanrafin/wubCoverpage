import React, { useEffect } from 'react';
import { DocumentData, DocumentType } from '../../types';
import { facultyData } from '@/src/data';

interface LivePreviewProps {
  formData: DocumentData;
  activeType: DocumentType;
}

export default function LivePreview({ formData, activeType }: LivePreviewProps) {
  const fontClass =
    formData.fontFamily === 'serif'
      ? 'font-serif'
      : formData.fontFamily === 'mono'
        ? 'font-mono'
        : 'font-sans';

  const themeHex = formData.themeColor || '#7c3aed';

  const isSpecialType = ['lab-report', 'homework', 'seminar-report'].includes(
    activeType?.id
  );

 
const selectedInstructor = facultyData[
  formData.instructorDept
]?.find(
  (teacher) =>
    teacher.name.trim() === formData.instructorName.trim()
)
console.log('Selected Instructor:', selectedInstructor)


  return (
    <div className={`space-y-6 ${fontClass}`}>
      {/* A4 Indicator */}
      <div className="flex items-center justify-between text-xs text-zinc-400 bg-white/5 border border-white/5 rounded-xl px-4 py-2.5">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          A4 Page Simulated Resolution
        </span>
        <span className="font-mono text-[10px]">
          A4 Format • Single / Multi Page Vector
        </span>
      </div>

      {/* Page */}
      <div className="relative z-10 flex flex-col items-center text-center px-10 py-10 bg-white rounded-lg shadow-md">

        {/* UNIVERSITY NAME */}
        <h1
          className="text-2xl font-bold"
          style={{ color: themeHex }}
        >
          {formData.universityName || 'World University of Bangladesh'}
        </h1>

        {/* LOGO */}
        <div className="mt-4">
          <img
            src='https://i.ibb.co.com/CpWYscN8/World-University-of-Bangladesh-logo-removebg-preview.png'
            alt="University Logo"
            className="w-56 h-auto object-contain mx-auto"
          />
        </div>

        {/* TITLE SECTION */}
        <div className="mt-4 space-y-1 text-black">
          <h2 className="text-sm font-bold">
            {activeType.title} : {formData.experimentNumber || '02'}
          </h2>

          <p className="text-sm font-semibold">
            {formData.documentTitle ||
              'Standardization of Hydrochloric Acid with standard sodium hydroxide solution.'}
          </p>
        </div>

        {/* LINE */}
        <div
          className="w-full mt-4 border-t"
          style={{ borderColor: themeHex }}
        />

        {/* COURSE INFO */}
        <div className="w-full text-left mt-5 space-y-1 text-sm text-black">
          <p className="font-bold">
            <span >COURSE TITLE:</span>{' '}
            {formData.courseName || 'Type Your Course Name Here'}
          </p>

          <p className="font-bold">
            <span>COURSE CODE:</span>{' '}
            {formData.courseCode || 'Type Your Course Code Here'}
          </p>
        </div>

        {/* TABLE */}
        <div className="w-full mt-5 border border-black grid grid-cols-2 text-sm">

          {/* LEFT */}
          <div className="border-r border-black ">
            <div className="text-white font-bold py-1" style={{ backgroundColor: themeHex }}>
              Submitted By
            </div>

            <div className="p-3 text-left space-y-2 text-black">
              <p>Name : {formData.studentName || ''}</p>
              <p>Student ID : {formData.studentId || ''}</p>
              <p>Batch : {formData.batch || ''}</p>
              {/* <p>Year : {formData.year || '1st'}</p> */}
              <p>Semester : {formData.semester || ''}</p>
              <p className='capitalize'>{formData.department || ''} , {formData.universityName}</p>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div
              className="text-white font-bold py-1"
              style={{ backgroundColor: themeHex }}
            >
              Submitted To
            </div>

            <div className="p-3 text-left space-y-2 text-black">
              <p>{formData?.instructorName || ''}</p>

              {/* DESIGNATION (FIXED) */}
              <p>{selectedInstructor?.designation || ''}</p>

              <p>{formData.instructorDept || ''}</p>
              <p>{formData.universityName || ''}</p>
            </div>
          </div>
        </div>

        {/* DATE */}
        <div className="mt-8 text-center font-semibold text-black">
          Submission Date : {formData.submissionDate || '04 / 11 / 2024'}
        </div>
      </div>
    </div>
  );
}