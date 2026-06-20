export interface DocumentField {
  id: string;
  label: string;
  placeholder: string;

  type: "text" | "textarea" | "date" | "select";

  options?: string[];

  defaultValue?: string;

  section: "general" | "academic" | "content" | "metadata";
}
export interface DocumentType {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  fields: DocumentField[];
}

export interface DocumentData {
  semester: string;
  batch: string;
  universityName: string;
  department: string;
  courseName: string;
  courseCode: string;
  documentTitle: string;
  subtitle: string;
  studentName: string;
  studentId: string;
  instructorDept: string;
  instructorName: object | string;
  submissionDate: string;

  // Extra fields based on document types
  experimentNumber?: string;
  datePerformed?: string;
  groupMembers?: string;
  objective?: string;
  materials?: string;
  procedure?: string;
  results?: string;
  conclusion?: string;

  companyName?: string;
  companySupervisor?: string;
  internshipDuration?: string;

  homeworkNumber?: string;
  problemsAndSolutions?: string; // string representation or JSON

  presentationSubtitle?: string;
  presenters?: string;

  seminarSpeaker?: string;
  seminarVenue?: string;
  seminarAbstract?: string;

  // Design Customizations
  themeColor: string; // Hex code of active primary
  accentStyle: "classic" | "modern-border" | "minimalist" | "geometric-badge";
  fontFamily: "serif" | "sans" | "mono";
  showBorder: boolean;
  showWatermark: boolean;
  scaleLogo: number;
}
