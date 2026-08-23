export interface FeatureItem {
  id: string;
  iconName: "Sparkles" | "Target" | "Cpu" | "FileCheck" | "Zap" | "ShieldCheck";
  title: string;
  description: string;
  badge?: string;
}

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: "ai-match-engine",
    iconName: "Cpu",
    title: "Deep Vector Match Engine",
    description:
      "Analyzes contextual semantic relevance between your resume and job description using LLM vector embeddings beyond simple keyword counting.",
    badge: "Core AI",
  },
  {
    id: "ats-optimizer",
    iconName: "Target",
    title: "ATS Compliance Scanner",
    description:
      "Detects layout bugs, unreadable fonts, missing sections, and formatting issues that cause major applicant tracking systems to reject candidate profiles.",
    badge: "99.8% Accuracy",
  },
  {
    id: "keyword-targeting",
    iconName: "Sparkles",
    title: "Smart Keyword Injector",
    description:
      "Identifies missing high-impact technical keywords and soft skills, providing context-aware suggestions tailored to the specific role hierarchy.",
  },
  {
    id: "tailored-bullets",
    iconName: "FileCheck",
    title: "Bullet Point Rewriter",
    description:
      "Transforms plain work experience points into quantifiable, action-verb driven achievements using industry-standard STAR methodology.",
  },
  {
    id: "realtime-score",
    iconName: "Zap",
    title: "Real-time Scoring Feedback",
    description:
      "Get instant score updates from 0 to 100% as you edit your resume live in our browser editor, watching your match probability surge.",
  },
  {
    id: "privacy-first",
    iconName: "ShieldCheck",
    title: "Enterprise Data Privacy",
    description:
      "Your uploaded documents and career history are encrypted in transit and at rest. We never sell data or train public LLMs on candidate details.",
  },
];
