"use client";

import React, { createContext, useContext, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

export interface AccordionContextType {
  openItems: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export interface AccordionProps {
  children: React.ReactNode;
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
}

/**
 * Accordion container component supporting single or multiple expanded sections.
 */
export function Accordion({
  children,
  type = "single",
  defaultValue,
  className,
}: AccordionProps): React.JSX.Element {
  const initialOpen = Array.isArray(defaultValue)
    ? defaultValue
    : defaultValue
    ? [defaultValue]
    : [];

  const [openItems, setOpenItems] = useState<string[]>(initialOpen);

  const toggleItem = (value: string): void => {
    setOpenItems((prev) => {
      if (type === "single") {
        return prev.includes(value) ? [] : [value];
      }
      return prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("space-y-3", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function AccordionItem({
  value,
  children,
  className,
}: AccordionItemProps): React.JSX.Element {
  return (
    <div
      data-value={value}
      className={cn(
        "rounded-2xl border border-border bg-card/60 backdrop-blur-md transition-colors overflow-hidden",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value } as React.Attributes & { value: string });
        }
        return child;
      })}
    </div>
  );
}

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  children: React.ReactNode;
}

export function AccordionTrigger({
  value = "",
  children,
  className,
  ...props
}: AccordionTriggerProps): React.JSX.Element {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionTrigger must be used within an Accordion");
  }

  const isOpen = context.openItems.includes(value);

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${value}`}
      id={`accordion-trigger-${value}`}
      onClick={() => context.toggleItem(value)}
      className={cn(
        "flex w-full items-center justify-between p-5 text-left font-medium text-text-primary transition-all hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl",
        className
      )}
      {...props}
    >
      <span className="text-base font-semibold">{children}</span>
      <ChevronDown
        className={cn(
          "h-5 w-5 shrink-0 text-text-secondary transition-transform duration-300",
          isOpen && "rotate-180 text-primary"
        )}
        aria-hidden="true"
      />
    </button>
  );
}

export interface AccordionContentProps {
  value?: string;
  children: React.ReactNode;
  className?: string;
}

export function AccordionContent({
  value = "",
  children,
  className,
}: AccordionContentProps): React.JSX.Element | null {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionContent must be used within an Accordion");
  }

  const isOpen = context.openItems.includes(value);

  if (!isOpen) return null;

  return (
    <div
      id={`accordion-content-${value}`}
      role="region"
      aria-labelledby={`accordion-trigger-${value}`}
      className={cn(
        "px-5 pb-5 pt-0 text-sm leading-relaxed text-text-secondary animate-in fade-in-50 duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}
