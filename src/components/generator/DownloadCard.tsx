import React, { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import LivePreview from "./LivePreview";
import { DocumentData, DocumentType } from "../../types";

interface Props {
  formData: DocumentData;
  activeType: DocumentType;
}

export default function PreviewWithDownload({
  formData,
  activeType,
}: Props) {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // ✅ wait for fonts + images
  const waitForAssets = async (container: HTMLElement) => {
    await document.fonts.ready;

    const images = Array.from(container.querySelectorAll("img"));

    await Promise.all(
      images.map(
        (img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((res) => {
                img.onload = res;
                img.onerror = res;
              })
      )
    );
  };

  const handleDownload = async () => {
    if (!pdfRef.current) return;

    setIsDownloading(true);

    try {
      const element = pdfRef.current;

      await waitForAssets(element);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",

        // 🔥 CRITICAL FIX (mobile/desktop same output)
        width: 794,
        height: 1123,
        windowWidth: 794,
        windowHeight: 1123,
        scrollX: 0,
        scrollY: 0,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210; // A4 mm
      const pageHeight = 297;

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

      pdf.save(`${activeType?.title || "document"}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4">

      {/* DOWNLOAD BUTTON */}
      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        className="px-5 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 disabled:opacity-50"
      >
        {isDownloading ? "Generating PDF..." : "Download PDF"}
      </button>

      {/* 👇 IMPORTANT: ONLY FOR USER PREVIEW (responsive allowed) */}
      <div className="overflow-auto">
        <LivePreview formData={formData} activeType={activeType} />
      </div>

      {/* 👇 FIXED A4 RENDER (NO RESPONSIVE, NO MOBILE EFFECT) */}
      <div
        ref={pdfRef}
        style={{
          position: "fixed",
          left: "-99999px",
          top: 0,

          width: "794px",
          height: "1123px",

          background: "#ffffff",
          overflow: "hidden",
        }}
      >
        <LivePreview formData={formData} activeType={activeType} />
      </div>

    </div>
  );
}