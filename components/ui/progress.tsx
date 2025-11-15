"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "./utils";

export interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  /**
   * Progress value in percent (0..100). If undefined, treated as 0.
   */
  value?: number | null;
}

/**
 * Progress — accessible, forwardRef-compatible progress bar.
 */
export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, ...props }, ref) => {
  // ensure value is a number between 0 and 100
  const pct = Number.isFinite(Number(value)) ? Number(value) : 0;
  const clamped = Math.max(0, Math.min(100, pct));

  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn("relative w-full overflow-hidden rounded-full bg-primary/20 h-2", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full bg-primary transition-all"
        style={{ width: `${clamped}%` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = "Progress";
