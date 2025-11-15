import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Check if window is available (for SSR)
    if (typeof window === "undefined") return false;
    
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  React.useEffect(() => {
    // Early return if window is not available
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Set initial value
    setIsMobile(mql.matches);
    
    // Add event listener (modern approach)
    mql.addEventListener("change", onChange);

    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, []);

  return isMobile;
}

// Alternative version with more options:
export function useBreakpoint(breakpoint: number = MOBILE_BREAKPOINT) {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    
    const handler = (event: MediaQueryListEvent) => {
      setIsBelowBreakpoint(event.matches);
    };

    setIsBelowBreakpoint(mql.matches);
    mql.addEventListener("change", handler);

    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]); // Re-run effect if breakpoint changes

  return isBelowBreakpoint;
}