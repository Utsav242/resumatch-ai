"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  className?: string;
}

/**
 * Accessible Sheet (mobile drawer overlay) component using React Portals to break out of
 * header stacking contexts. Renders directly onto document.body with z-[100] layering
 * and a 100% solid, non-transparent drawer panel.
 */
export function Sheet({
  open,
  onOpenChange,
  title = "Navigation Menu",
  children,
  side = "right",
  className,
}: SheetProps): React.JSX.Element | null {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && open) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open || !mounted) return null;

  const content = (
    <div
      className="fixed inset-0 z-[100] flex overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => onOpenChange(false)}
        data-testid="sheet-backdrop"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={cn(
          "fixed top-0 bottom-0 right-0 z-[100] flex h-full w-[85%] sm:w-4/5 max-w-sm flex-col border-l border-border bg-bg-elevated p-6 shadow-2xl transition-all duration-300 text-text-primary opacity-100",
          side === "left" && "right-auto left-0 border-l-0 border-r",
          side === "top" && "left-0 right-0 bottom-auto w-full max-w-none border-l-0 border-b max-h-[80vh]",
          side === "bottom" && "left-0 right-0 top-auto w-full max-w-none border-l-0 border-t max-h-[80vh]",
          className
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border shrink-0">
          <h2 className="text-lg font-bold font-heading">{title}</h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close menu"
            className="rounded-lg p-2 text-text-secondary hover:bg-card hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">{children}</div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
