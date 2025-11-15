"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 whitespace-nowrap",
  {
    variants: {
      variant: {
        default: 
          "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 data-[state=on]:bg-gray-200 data-[state=on]:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:data-[state=on]:bg-gray-700 dark:data-[state=on]:text-gray-100",
        outline:
          "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900 data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900 data-[state=on]:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:data-[state=on]:bg-gray-700 dark:data-[state=on]:text-gray-100 dark:data-[state=on]:border-gray-500",
        primary:
          "bg-transparent text-gray-600 hover:bg-blue-100 hover:text-blue-700 data-[state=on]:bg-blue-600 data-[state=on]:text-white dark:text-gray-400 dark:hover:bg-blue-900/50 dark:hover:text-blue-300 dark:data-[state=on]:bg-blue-600 dark:data-[state=on]:text-white",
        destructive:
          "bg-transparent text-gray-600 hover:bg-red-100 hover:text-red-700 data-[state=on]:bg-red-600 data-[state=on]:text-white dark:text-gray-400 dark:hover:bg-red-900/50 dark:hover:text-red-300 dark:data-[state=on]:bg-red-600 dark:data-[state=on]:text-white",
      },
      size: {
        sm: "h-7 px-2 min-w-7 text-xs [&_svg]:size-3",
        default: "h-9 px-3 min-w-9 [&_svg]:size-4",
        lg: "h-11 px-4 min-w-11 text-base [&_svg]:size-5",
        icon: "h-9 w-9 [&_svg]:size-4", // Square icon-only variant
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ToggleProps 
  extends React.ComponentProps<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  asChild?: boolean;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

function Toggle({
  className,
  variant,
  size,
  asChild = false,
  pressed,
  onPressedChange,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      className={cn(
        toggleVariants({ variant, size, className }),
        // Additional focus styles for better accessibility
        "focus-visible:ring-blue-500 focus-visible:ring-offset-1 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-gray-900",
        // Smooth transition for all properties
        "transition-colors duration-150 ease-in-out"
      )}
      asChild={asChild}
      pressed={pressed}
      onPressedChange={onPressedChange}
      {...props}
    />
  );
}

// Composition component for easier usage with icons
interface IconToggleProps extends Omit<ToggleProps, 'children'> {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
}

function IconToggle({ 
  icon, 
  label, 
  children,
  size = "icon",
  ...props 
}: IconToggleProps) {
  return (
    <Toggle size={size} aria-label={label} {...props}>
      {icon}
      {children}
    </Toggle>
  );
}

// Group component for toggle groups
interface ToggleGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

function ToggleGroup({ 
  children, 
  className, 
  orientation = "horizontal" 
}: ToggleGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex rounded-lg border border-gray-200 bg-gray-50/50 p-1 dark:border-gray-700 dark:bg-gray-800/50",
        orientation === "vertical" && "flex-col",
        className
      )}
      role="group"
      aria-orientation={orientation}
    >
      {children}
    </div>
  );
}

export { 
  Toggle, 
  IconToggle,
  ToggleGroup,
  toggleVariants, 
  type ToggleProps,
  type IconToggleProps,
  type ToggleGroupProps 
};