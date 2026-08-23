"use client";

import React from "react";
import { Card, CardContent, Typography, Avatar, Rating, Box } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { TestimonialItem } from "@/components/landing/data/testimonials";

export interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps): React.JSX.Element {
  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 1,
        borderRadius: 5,
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "primary.main",
          boxShadow: "0 16px 32px rgba(109, 94, 247, 0.15)",
        },
      }}
    >
      <CardContent sx={{ p: 3, flex: 1, textAlign: "left" }}>
        {/* Rating Stars & Quote Icon */}
        <Box sx={{ display: "flex", alignItems: "center", justifyBetween: "space-between", mb: 2 }}>
          <Rating value={5} readOnly size="small" sx={{ color: "#F59E0B" }} />
          <FormatQuoteIcon sx={{ fontSize: 32, color: "primary.main", opacity: 0.3 }} />
        </Box>

        {/* Quote Content */}
        <Typography variant="body2" sx={{ color: "text.primary", lineHeight: 1.7, fontStyle: "italic", mb: 3 }}>
          &ldquo;{testimonial.quote}&rdquo;
        </Typography>

        {/* Author Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
          <Avatar
            alt={testimonial.name}
            sx={{ width: 44, height: 44, bgcolor: "primary.main", fontWeight: 700 }}
          >
            {testimonial.avatarInitials || testimonial.name.charAt(0)}
          </Avatar>
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "text.primary" }}>
              {testimonial.name}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
              {testimonial.role} • {testimonial.company}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
