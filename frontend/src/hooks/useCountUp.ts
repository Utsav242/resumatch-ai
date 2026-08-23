"use client";

import { useEffect, useState } from "react";

export const DEFAULT_COUNTUP_DURATION_MS = 900;

export interface UseCountUpOptions {
  target?: number;
  end?: number;
  start?: number;
  durationMs?: number;
  shouldStart?: boolean;
  delayMs?: number;
}

/**
 * Custom hook to smoothly animate a numeric count-up from start to target/end value using requestAnimationFrame.
 * Supports both `target` and `end` option names for backward compatibility.
 * Immediately sets the target value if `prefers-reduced-motion` is active.
 * Properly cleans up animation frame loops and timeouts on unmount.
 *
 * @param options - Configuration options for count-up duration, target/end value, trigger state, and delay.
 * @returns Current animated integer value.
 */
export function useCountUp(options: UseCountUpOptions): number {
  const {
    target: rawTarget,
    end: rawEnd,
    start = 0,
    durationMs = DEFAULT_COUNTUP_DURATION_MS,
    shouldStart = true,
    delayMs = 0,
  } = options;

  const target = rawTarget ?? rawEnd ?? 0;

  const [count, setCount] = useState<number>(start);

  useEffect(() => {
    if (!shouldStart) {
      setCount(start);
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    let animationFrameId: number;

    const timeoutId = setTimeout(() => {
      let startTime: number | null = null;

      const updateCounter = (timestamp: number): void => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / durationMs, 1);

        // Quad ease-out formula for smooth decelerating count animation
        const easedProgress = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(start + (target - start) * easedProgress);

        setCount(currentVal);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCounter);
        } else {
          setCount(target);
        }
      };

      animationFrameId = requestAnimationFrame(updateCounter);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, start, durationMs, shouldStart, delayMs]);

  return count;
}
