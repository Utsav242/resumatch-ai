"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { FAQ_DATA as defaultFaqItems, FaqItem } from "@/components/landing/data/faq";
import { useReveal } from "@/hooks/useReveal";

export interface FAQAccordionProps {
  items?: FaqItem[];
}

export function FAQAccordion({ items = defaultFaqItems }: FAQAccordionProps): React.JSX.Element {
  const [expanded, setExpanded] = useState<string | false>("faq-0");
  const { ref: sectionRef, isVisible } = useReveal({ threshold: 0.1 });

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      ref={sectionRef}
      id="faq"
      component="section"
      sx={{
        py: { xs: 8, md: 14 },
        backgroundColor: "background.paper",
        position: "relative",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      <Container maxWidth="md">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Chip
            icon={<HelpOutlinedIcon sx={{ fontSize: 16, color: "primary.main" }} />}
            label="Got Questions? We Have Answers."
            sx={{
              mb: 2,
              py: 2,
              px: 1,
              fontSize: "0.875rem",
              fontWeight: 700,
              backgroundColor: "background.default",
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
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.125rem" }}>
            Everything you need to know about vector matching, privacy, and ATS optimization.
          </Typography>
        </Box>

        {/* MUI Accordion List */}
        <Box sx={{ spaceY: 2 }}>
          {items.map((item, index) => {
            const panelId = `faq-${index}`;
            return (
              <Accordion
                key={item.id || index}
                expanded={expanded === panelId}
                onChange={handleChange(panelId)}
                elevation={0}
                sx={{
                  backgroundColor: "background.default",
                  border: "1px solid",
                  borderColor: expanded === panelId ? "primary.main" : "divider",
                  borderRadius: "16px !important",
                  mb: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
                  aria-controls={`${panelId}-content`}
                  id={`${panelId}-header`}
                  sx={{ py: 1.5, px: 3 }}
                >
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 700, fontSize: "1.125rem", color: "text.primary" }}>
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3, pt: 0, textAlign: "left" }}>
                  <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
