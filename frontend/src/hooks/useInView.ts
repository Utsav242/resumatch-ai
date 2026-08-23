"use client";

import { useEffect, useState, RefObject } from "react";

export const DEFAULT_IN_VIEW_THRESHOLD = 0.15;

/**
 * Custom hook wrapping IntersectionObserver to detect when an element scrolls into view.
 * Unobserves the target immediately after it becomes visible (one-shot trigger).
 * Automatically handles `prefers-reduced-motion: reduce`.
 *
 * @param ref - React ref object referencing the target DOM element.
 * @param threshold - IntersectionObserver visibility ratio threshold (default: 0.15).
 * @returns boolean indicating whether the element is currently in view.
 */
export function useInView(
  ref: RefObject<Element | null>,
  threshold: number = DEFAULT_IN_VIEW_THRESHOLD
): boolean {
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const mediaQuery =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    if (mediaQuery?.matches) {
      setIsInView(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return isInView;
}
