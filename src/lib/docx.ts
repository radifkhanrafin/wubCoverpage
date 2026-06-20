import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { DocumentData } from "../types";

export function generateAcademicDOCX(data: DocumentData, typeId: string) {
  const primaryColorHex = data.themeColor || "7C3AED"; // base purple
  const cleanColor = primaryColorHex.replace("#", "");

  const titleParagraphs: Paragraph[] = [];

  // Helper to add paragraph with optional size, color, bold alignments
  const addTitlePara = (text: string, size = 12, bold = false, color = "000000", alignment: any = AlignmentType.CENTER, spaceBefore = 0, spaceAfter = 120, italic = false) => {
    return new Paragraph({
      alignment: alignment,
      spacing: { before: spaceBefore, after: spaceAfter },
      children: [
        new TextRun({
          text: text,
          font: data.fontFamily === "serif" ? "Times New Roman" : data.fontFamily === "mono" ? "Courier New" : "Arial",
          size: size * 2, // docx uses half-points
          bold: bold,
          color: color,
          italics: italic,
        })
      ]
    });
  };

  // Build based on Academic Types
  const isCoverOnly = typeId === "assignment" || typeId === "project-report" || typeId === "internship-report" || typeId === "cover-page" || typeId === "presentation-cover";

  if (isCoverOnly) {
    // 1. University Name
    if (data.universityName) {
      titleParagraphs.push(addTitlePara(data.universityName.toUpperCase(), 18, true, cleanColor, AlignmentType.CENTER, 400, 100));
    }

    // 2. Department Name
    if (data.department) {
      titleParagraphs.push(addTitlePara(data.department, 11, false, "666666", AlignmentType.CENTER, 0, 300, true));
    }

    // 3. Spacers & Visual Divider
    titleParagraphs.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [
        new TextRun({
          text: "___________________________________________",
          color: cleanColor,
          bold: true,
        })
      ]
    }));

    // 4. Main Document Title
    titleParagraphs.push(addTitlePara(data.documentTitle || "Academic Document", 24, true, "111111", AlignmentType.CENTER, 400, 120));

    // 5. Subtitle
    if (data.subtitle) {
      titleParagraphs.push(addTitlePara(data.subtitle, 12, false, "444444", AlignmentType.CENTER, 0, 400, true));
    }

    // 6. Course & Code
    if (data.courseName || data.courseCode) {
      const courseStr = [data.courseCode, data.courseName].filter(Boolean).join(" - ");
      titleParagraphs.push(addTitlePara(courseStr, 13, true, "333333", AlignmentType.CENTER, 300, 800));
    }

    // 7. Metadata Table
    // Create a structured table representing Submitted By / To
    const cellBorderDesign = {
      top: { style: BorderStyle.NONE, size: 0, color: "auto" },
      bottom: { style: BorderStyle.NONE, size: 0, color: "auto" },
      left: { style: BorderStyle.NONE, size: 0, color: "auto" },
      right: { style: BorderStyle.NONE, size: 0, color: "auto" }
    };

    const metaTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: cellBorderDesign,
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: "STUDENT DETAILS", bold: true, color: cleanColor, size: 18 }),
                  ],
                  spacing: { after: 120 }
                }),
                new Paragraph({ children: [new TextRun({ text: `Name: ${data.studentName || "N/A"}`, size: 20 })] }),
                new Paragraph({ children: [new TextRun({ text: `ID: ${data.studentId || "N/A"}`, size: 20 })] }),
                new Paragraph({ children: [new TextRun({ text: typeId === "project-report" ? `Team Log: ${data.groupMembers || "N/A"}` : `Dean: ${data.department || "Faculty"}`, size: 18 })] })
              ]
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: cellBorderDesign,
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: "EVALUATION DETAILS", bold: true, color: cleanColor, size: 18 }),
                  ],
                  spacing: { after: 120 }
                }),
                new Paragraph({ children: [new TextRun({ text: `Instructor: ${data.instructorName || "N/A"}`, size: 20 })] }),
                new Paragraph({ children: [new TextRun({ text: `Date: ${data.submissionDate || "N/A"}`, size: 20 })] }),
                new Paragraph({ children: [new TextRun({ text: `Course: ${data.courseCode || "N/A"}`, size: 20 })] })
              ]
            })
          ]
        })
      ]
    });

    titleParagraphs.push(new Paragraph({ spacing: { after: 400 } })); // space before table
    // Push table, but note Word can contain tables via sections
  }

  // Define full sections
  const childrenElements: any[] = [...titleParagraphs];

  if (typeId === "lab-report") {
    // Add Heading
    childrenElements.push(addTitlePara("LAB EXPERIMENT REPORT", 16, true, cleanColor, AlignmentType.LEFT, 400, 200));
    if (data.experimentNumber) {
      childrenElements.push(addTitlePara(`Experiment No: ${data.experimentNumber}`, 12, true, "333333", AlignmentType.LEFT, 0, 100));
    }
    childrenElements.push(addTitlePara(`Course Code: ${data.courseCode || "N/A"} | Date Performed: ${data.datePerformed || "N/A"}`, 10, false, "666666", AlignmentType.LEFT, 0, 300));

    const addSectionContent = (title: string, content: string) => {
      childrenElements.push(new Paragraph({
        spacing: { before: 240, after: 120 },
        children: [
          new TextRun({ text: title.toUpperCase(), bold: true, color: cleanColor, size: 24 })
        ]
      }));
      
      const lines = content.split("\n");
      lines.forEach((line) => {
        childrenElements.push(new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: line, size: 20, font: "Arial" })
          ]
        }));
      });
    };

    if (data.objective) addSectionContent("1. Objective / Scope", data.objective);
    if (data.materials) addSectionContent("2. Materials & Apparatus", data.materials);
    if (data.procedure) addSectionContent("3. Methodology & Step-By-Step Procedure", data.procedure);
    if (data.results) addSectionContent("4. Data Observations & Experimental Readings", data.results);
    if (data.conclusion) addSectionContent("5. Academic Conclusion & Error Analysis", data.conclusion);
  }

  else if (typeId === "homework") {
    childrenElements.push(addTitlePara(data.homeworkNumber || "HOMEWORK ASSIGNMENT", 18, true, cleanColor, AlignmentType.LEFT, 300, 100));
    childrenElements.push(addTitlePara(`Course: ${data.courseCode || "Math"} - ${data.courseName || "Work"} | Student: ${data.studentName || "N/A"}`, 11, false, "666666", AlignmentType.LEFT, 0, 300));
    
    if (data.problemsAndSolutions) {
      const pLines = data.problemsAndSolutions.split("\n");
      pLines.forEach(line => {
        const isProblem = line.trim().toLowerCase().startsWith("problem");
        const isSolution = line.trim().toLowerCase().startsWith("solution");
        childrenElements.push(new Paragraph({
          spacing: { before: isProblem ? 200 : 60, after: 100 },
          children: [
            new TextRun({
              text: line,
              bold: isProblem || isSolution,
              color: isProblem ? cleanColor : isSolution ? "333333" : "555555",
              size: isProblem ? 22 : 20,
              font: data.fontFamily === "mono" ? "Courier New" : "Arial",
            })
          ]
        }));
      });
    }
  }

  else if (typeId === "seminar-report") {
    childrenElements.push(addTitlePara("SEMINAR LOG & COLLOQUIUM RECORD", 16, true, cleanColor, AlignmentType.LEFT, 200, 200));
    childrenElements.push(addTitlePara(`Guest Speaker: ${data.seminarSpeaker || "N/A"}`, 12, true, "222222", AlignmentType.LEFT, 0, 50));
    childrenElements.push(addTitlePara(`Location / Venue: ${data.seminarVenue || "N/A"} | Date: ${data.submissionDate || "N/A"}`, 10, false, "666666", AlignmentType.LEFT, 0, 400));
    
    if (data.seminarAbstract) {
      childrenElements.push(addTitlePara("Report Abstract & Academic Review", 13, true, cleanColor, AlignmentType.LEFT, 200, 100));
      const lines = data.seminarAbstract.split("\n");
      lines.forEach(line => {
        childrenElements.push(new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: line, size: 21, font: "Arial" })
          ]
        }));
      });
    }
  }

  // Create document in docx
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: childrenElements,
      },
    ],
  });

  // Pack document and download in browser
  Packer.toBlob(doc).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${typeId}_${(data.studentName || "academic").toLowerCase().replace(/\s+/g, "_")}.docx`;
    a.click();
    window.URL.revokeObjectURL(url);
  });
}
