"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "./utils";

// Tooltip Provider
function TooltipProvider({
  delayDuration = 150,
  skipDelayDuration = 300,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...props}
    />
  );
}

// Tooltip Root
function Tooltip({
  delayDuration = 150,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipPrimitive.Root 
      data-slot="tooltip" 
      delayDuration={delayDuration}
      {...props} 
    />
  );
}

// Tooltip Trigger
function TooltipTrigger({
  asChild = true,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return (
    <TooltipPrimitive.Trigger 
      data-slot="tooltip-trigger" 
      asChild={asChild}
      {...props} 
    />
  );
}

// Tooltip Content
function TooltipContent({
  className,
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  side = "top",
  avoidCollisions = true,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        side={side}
        avoidCollisions={avoidCollisions}
        className={cn(
          // Base styles
          "z-50 w-fit max-w-xs rounded-md px-3 py-1.5 text-xs text-balance",
          // Background and text colors
          "bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900",
          // Animations
          "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          // Slide animations based on side
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2", 
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          // Shadow
          "shadow-lg",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow 
          className="fill-gray-900 dark:fill-gray-50" 
          width={8}
          height={4}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

// Tooltip composition component for easier usage
interface TooltipComponentProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delayDuration?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
}

function TooltipComponent({
  children,
  content,
  delayDuration = 150,
  side = "top",
  align = "center",
  className,
}: TooltipComponentProps) {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side} align={align} className={className}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

export { 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent, 
  TooltipProvider,
  TooltipComponent 
};