"use client";

import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { StatsSection } from "@/components/landing/StatsSection";
import { LivePreview } from "@/components/landing/LivePreview";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQAccordion } from "@/components/landing/FAQAccordion";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

/**
 * Main Landing Page composing all sections in order:
 * Header -> Hero -> FeaturesSection -> HowItWorks -> StatsSection ->
 * LivePreview -> TestimonialsSection -> FAQAccordion -> FinalCTA -> Footer.
 */
export default function Home(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-bg text-text-primary selection:bg-primary selection:text-white">
      <Header />
      <main>
        <Hero />
        <FeaturesSection />
        <HowItWorks />
        <StatsSection />
        <LivePreview />
        <TestimonialsSection />
        <FAQAccordion />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
