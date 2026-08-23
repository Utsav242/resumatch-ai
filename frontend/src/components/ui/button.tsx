import * as React from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

/**
 * Reusable Button component styled with Tailwind CSS variables and support for size/variant variants.
 * Accessible with clear focus-visible outlines.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", type = "button", ...props },
    ref
  ) => {
    const variants = {
      default:
        "bg-primary hover:opacity-90 text-white shadow-lg shadow-primary/25 font-semibold",
      secondary:
        "bg-accent hover:opacity-90 text-white font-semibold shadow-md shadow-accent/20",
      outline:
        "border border-border bg-transparent hover:bg-card text-text-primary",
      ghost:
        "hover:bg-card hover:text-text-primary text-text-secondary border border-transparent",
      destructive:
        "bg-red-600 hover:bg-red-500 text-white shadow-sm font-semibold",
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10 p-0 flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
