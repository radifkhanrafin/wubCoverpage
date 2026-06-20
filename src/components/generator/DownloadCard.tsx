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
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const waitForImagesAndFonts = async (container: HTMLElement) => {
    await document.fonts.ready;

    const images = Array.from(container.querySelectorAll("img"));
    await Promise.all(
      images.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            })
      )
    );
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setIsDownloading(true);

    try {
      const element = previewRef.current;
      await waitForImagesAndFonts(element);

      const SCALE = 2;

      const canvas = await html2canvas(element, {
        scale: SCALE,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: 794,          // 🔥 fixed value direct dao, scrollWidth-er upor depend na kore
        height: 1123,
        windowWidth: 794,
        windowHeight: 1123,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const PX_TO_MM = 25.4 / 96;
      const contentWidthMm = (canvas.width / SCALE) * PX_TO_MM;
      const contentHeightMm = (canvas.height / SCALE) * PX_TO_MM;

      const scaleFactor = Math.min(
        pageWidth / contentWidthMm,
        pageHeight / contentHeightMm,
        1
      );

      const renderWidth = contentWidthMm * scaleFactor;
      const renderHeight = contentHeightMm * scaleFactor;

      const marginX = (pageWidth - renderWidth) / 2;
      const marginY = (pageHeight - renderHeight) / 2;

      pdf.addImage(imgData, "PNG", marginX, marginY, renderWidth, renderHeight);
      pdf.save(`${activeType?.title || "document"}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        className="px-5 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 disabled:opacity-50"
      >
        {isDownloading ? "Generating PDF..." : "Download PDF"}
      </button>

      <div
        ref={previewRef}
        style={{
          width: "794px",
          minHeight: "1123px",
          background: "#ffffff",
          position: "fixed",
          top: "-99999px",
          left: "-99999px",
          zIndex: -1,
        }}
        
      >
        <LivePreview formData={formData} activeType={activeType} />
      </div>
    </div>
  );
}