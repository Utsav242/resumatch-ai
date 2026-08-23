"use client";

import React from "react";
import { Container, Box, Typography, Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { TESTIMONIALS_DATA as defaultTestimonials, TestimonialItem } from "@/components/landing/data/testimonials";
import { TestimonialCard } from "@/components/landing/TestimonialCard";
import { useReveal } from "@/hooks/useReveal";

export interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

export function TestimonialsSection({ testimonials = defaultTestimonials }: TestimonialsSectionProps): React.JSX.Element {
  const { ref: sectionRef, isVisible } = useReveal({ threshold: 0.1 });

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: { xs: 8, md: 14 },
        backgroundColor: "background.default",
        position: "relative",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", maxWidth: 720, mx: "auto", mb: { xs: 6, md: 9 } }}>
          <Chip
            icon={<StarIcon sx={{ fontSize: 16, color: "#F59E0B" }} />}
            label="Verified Candidate Success Stories"
            sx={{
              mb: 2,
              py: 2,
              px: 1,
              fontSize: "0.875rem",
              fontWeight: 700,
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.75rem", md: "3.5rem" },
              fontWeight: 800,
              letterSpacing: "-0.02em",
              mb: 2,
              color: "text.primary",
            }}
          >
            Loved by Job Seekers at Top Tech Companies
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.125rem" }}>
            See how candidates landed offers at Google, Meta, Amazon, and breakout AI startups.
          </Typography>
        </Box>

        {/* Testimonials Grid Container */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
            gap: 3.5,
          }}
        >
          {testimonials.map((testimonial) => (
            <Box key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
