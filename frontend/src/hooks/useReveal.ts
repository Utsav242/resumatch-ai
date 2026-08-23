"use client";

import { useEffect, useRef, useState } from "react";

export const DEFAULT_REVEAL_THRESHOLD = 0.15;

export interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export interface UseRevealReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
}

/**
 * Custom hook to detect when an element scrolls into view using IntersectionObserver.
 * Automatically checks for `prefers-reduced-motion` and renders as visible immediately if set.
 *
 * @param options - Configuration options for IntersectionObserver.
 * @returns Object containing the React ref to attach and `isVisible` state boolean.
 */
export function useReveal(options: UseRevealOptions = {}): UseRevealReturn {
  const {
    threshold = DEFAULT_REVEAL_THRESHOLD,
    rootMargin = "0px",
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;

    if (mediaQuery?.matches) {
      setIsVisible(true);
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
