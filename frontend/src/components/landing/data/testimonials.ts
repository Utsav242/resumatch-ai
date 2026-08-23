export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarInitials: string;
  gradientColors: string;
  matchScore: number;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "testimonial-1",
    quote:
      "Resumiq pinpointed 14 missing keywords in my Senior Frontend Architect resume that ATS filters were silently dropping. Received 4 interview callbacks within 72 hours!",
    name: "Alex Rivera",
    role: "Senior Staff Engineer",
    company: "TechScale Inc.",
    avatarInitials: "AR",
    gradientColors: "from-purple-500 to-indigo-500",
    matchScore: 96,
  },
  {
    id: "testimonial-2",
    quote:
      "The bullet point rewriter transformed generic statements into high-impact metric achievements. Raised my target JD match score from 62% to 94% effortlessly.",
    name: "Sarah Chen",
    role: "Lead Product Manager",
    company: "Apex Solutions",
    avatarInitials: "SC",
    gradientColors: "from-blue-500 to-cyan-500",
    matchScore: 94,
  },
  {
    id: "testimonial-3",
    quote:
      "As a career switcher moving into DevOps, Resumiq highlighted transferable technical skills I would have omitted. Best resume tool on the market today.",
    name: "Marcus Vance",
    role: "DevOps Engineer",
    company: "CloudNative Labs",
    avatarInitials: "MV",
    gradientColors: "from-emerald-500 to-teal-500",
    matchScore: 91,
  },
];
