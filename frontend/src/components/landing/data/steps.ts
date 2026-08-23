export interface StepItem {
  stepNumber: number;
  id: string;
  title: string;
  description: string;
  badge: string;
  highlightText: string;
}

export const STEPS_DATA: StepItem[] = [
  {
    stepNumber: 1,
    id: "step-upload",
    title: "Upload Your Resume",
    description:
      "Drag and drop your PDF, DOCX, or plain text resume. Our multi-format parser extracts structure, skills, work history, and contact details seamlessly.",
    badge: "Step 01",
    highlightText: "PDF & DOCX Support",
  },
  {
    stepNumber: 2,
    id: "step-target",
    title: "Paste Target Job Details",
    description:
      "Paste the job title and posting description from LinkedIn, Indeed, or company career portals to establish candidate evaluation parameters.",
    badge: "Step 02",
    highlightText: "Instant Extraction",
  },
  {
    stepNumber: 3,
    id: "step-analyze",
    title: "Execute AI Vector Analysis",
    description:
      "Resumiq compares domain vector embeddings, calculating hard skill alignment, experience depth, ATS formatting compliance, and impact score.",
    badge: "Step 03",
    highlightText: "Neural AI Scan",
  },
  {
    stepNumber: 4,
    id: "step-optimize",
    title: "Apply Recommendations & Export",
    description:
      "Review automated inline rewriters and bullet point enhancers, then download your recruiter-ready PDF with a verified 90%+ match score.",
    badge: "Step 04",
    highlightText: "Recruiter Ready",
  },
];
