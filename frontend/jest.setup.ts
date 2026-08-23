import "@testing-library/jest-dom";
import React from "react";

// Mock matchMedia for window
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(private callback: IntersectionObserverCallback) {}

  observe(target: Element): void {
    // Instantly invoke callback as intersecting for testing
    this.callback(
      [
        {
          isIntersecting: true,
          target,
          intersectionRatio: 1,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
          time: Date.now(),
        },
      ],
      this
    );
  }

  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock requestAnimationFrame & cancelAnimationFrame
global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return setTimeout(() => callback(performance.now()), 16) as unknown as number;
};

global.cancelAnimationFrame = (id: number): void => {
  clearTimeout(id);
};

// Global Mock for Clerk Authentication
jest.mock("@clerk/nextjs", () => ({
  ClerkProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", null, children),
  SignedIn: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", { "data-testid": "signed-in" }, children),
  SignedOut: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", { "data-testid": "signed-out" }, children),
  UserButton: () => React.createElement("div", { "data-testid": "user-button" }, "UserButton"),
  SignIn: () => React.createElement("div", { "data-testid": "clerk-sign-in" }, "SignIn Component"),
  SignUp: () => React.createElement("div", { "data-testid": "clerk-sign-up" }, "SignUp Component"),
  useUser: () => ({
    isLoaded: true,
    isSignedIn: true,
    user: {
      firstName: "Test",
      primaryEmailAddress: { emailAddress: "candidate@example.com" },
    },
  }),
}));
