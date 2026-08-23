export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-1",
    question: "How does Resumiq calculate the ATS match score?",
    answer:
      "Our core AI engine converts both your resume and target job posting into high-dimensional vector embeddings using fine-tuned transformer models. It compares semantic similarity across hard technical skills, experience depth, leadership scope, and ATS formatting compliance, yielding a precise 0-100% score readout.",
    category: "Scoring Methodology",
  },
  {
    id: "faq-2",
    question: "Will my optimized resume bypass major ATS systems like Workday and Greenhouse?",
    answer:
      "Yes. Our format generator creates clean, ATS-parsed structure without hidden tables, text boxes, non-standard headers, or incompatible fonts that trigger parsing failures in systems like Workday, Greenhouse, Lever, and Taleo.",
    category: "ATS Compatibility",
  },
  {
    id: "faq-3",
    question: "Is my personal career data safe and confidential?",
    answer:
      "Absolutely. We utilize enterprise-grade AES-256 encryption for data at rest and TLS 1.3 in transit. Candidate resume data is never retained for public AI model training or shared with external recruiters without explicit consent.",
    category: "Privacy & Security",
  },
  {
    id: "faq-4",
    question: "Can I customize bullet points for different roles?",
    answer:
      "Yes. The real-time AI editor allows you to generate multiple variation options for any experience section, tailored specifically to target managerial, staff-level, or specialized individual contributor requirements.",
    category: "Features & Usage",
  },
  {
    id: "faq-5",
    question: "What file formats are supported for import and export?",
    answer:
      "You can import PDF, DOCX, and TXT files. Optimized resumes can be exported as recruiter-approved PDFs or formatted Microsoft Word documents with preserved styling.",
    category: "File Formats",
  },
];
