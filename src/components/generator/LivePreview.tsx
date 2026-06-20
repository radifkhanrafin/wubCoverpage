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

  const dept = formData?.instructorDept as keyof typeof facultyData;

  const selectedInstructor = facultyData?.[dept]?.find(
    (teacher) =>
      teacher.name.trim() === formData?.instructorName?.trim()
  );


  console.log('Selected Instructor:', selectedInstructor)


  return (
    <div className={`space-y-6 ${fontClass}`}>
      {/* A4 Indicator */}
      <div className="flex items-center justify-between text-xs text-zinc-400 bg-white/5 border border-white/5 rounded-xl px-4 py-2.5">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Download From WUB Cover Page Generator
        </span>
        <span className="font-mono text-[10px]">
          Develop by WUBCS Software Team
        </span>
      </div>

      {/* Page */}
      <div className="w-198.5 h-280.75 relative z-10 flex flex-col items-center text-center bg-white rounded-lg shadow-md p-24">

        {/* UNIVERSITY NAME */}
        <h1
          className="text-3xl font-bold"
          style={{ color: themeHex }}
        >
          {formData.universityName || 'World University of Bangladesh'}
        </h1>

        {/* LOGO */}
        <div className="mt-4">
          <img
            src='../../../assets/wub.png'
            alt="University Logo"
            className="w-60 h-auto object-contain mx-auto my-2"
          />
        </div>

        {/* TITLE SECTION */}
        <div className="mt-4 space-y-1 text-black">
          <h2 className="text-[16px] font-bold">
            {activeType.title} : {formData.experimentNumber || '02'}
          </h2>

          <p className="text-[14px] my-2 font-semibold">
            {formData.documentTitle ||
              'Standardization of Hydrochloric Acid with standard sodium hydroxide solution.'}
          </p>
        </div>

        {/* LINE */}
        <div
          className="w-full mt-4 border-t my-4"
          style={{ borderColor: themeHex }}
        />

        {/* COURSE INFO */}
        <div className="w-full text-left mt-5 space-y-3 text-sm text-black">
          <p className="font-bold">
            <span >COURSE TITLE:</span>{' '}
           <span className='capitalize text-[16px]'> {formData.courseName || 'Type Your Course Name Here'}</span>
          </p>

          <p className="font-bold">
            <span>COURSE CODE:</span>{' '}
           <span className='uppercase text-[16px]'> {formData.courseCode || 'Type Your Course Code Here'}</span>
          </p>
        </div>

        {/* TABLE */}
        <div className="w-full mt-5 border border-black grid grid-cols-2 text-sm min-h-52">

          {/* LEFT */}
          <div className="border-r border-black font-semibold">
            <div className="text-white font-bold py-4 text-[16px]" style={{ backgroundColor: themeHex }}>
              Submitted By
            </div>

            <div className="p-3 pb-6  text-left space-y-3 text-black">
              <p className='text-[16px]'>Name : {formData.studentName || ''}</p>
              <p className='text-[16px]'>Student ID : {formData.studentId || ''}</p>
              <p className='text-[16px]'>Batch : {formData.batch || ''}</p>
              {/* <p>Year : {formData.year || '1st'}</p> */}
              <p className='text-[16px]'>Semester : {formData.semester || ''}</p>
              <p className='capitalize text-[16px]'>Department of {formData.department || ''} {formData.department?' ,':''} </p>
              <p className='capitalize text-[16px]'> {formData.universityName} </p>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div
              className="text-white font-bold py-4 text-[16px]"
              style={{ backgroundColor: themeHex }}
            >
              Submitted To
            </div>

            <div className="p-3 text-left space-y-3 pb-5 text-black font-semibold">
              <p className='text-[16px]'>{formData?.instructorName || ''}</p>
              <p className='text-[16px]'>{selectedInstructor?.designation || ''}</p>
              <p className='text-[16px]'>Department of {formData.instructorDept || ''}{formData.instructorDept?' ,':''} </p>
              <p className='text-[16px]'>{formData.universityName || ''}</p>
            </div>
          </div>
        </div>

        {/* DATE */}
        <div className="mt-12 text-center font-semibold text-black">
          Submission Date : {formData.submissionDate || '04 / 11 / 2024'}
        </div>
      </div>
    </div>
  );
}