"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "./utils";

// -----------------------------
// Root
// -----------------------------
export const Drawer = (props: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root data-slot="drawer" {...props} />
);

// -----------------------------
// Trigger
// -----------------------------
export const DrawerTrigger = (
  props: React.ComponentProps<typeof DrawerPrimitive.Trigger>
) => <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;

// -----------------------------
// Portal
// -----------------------------
export const DrawerPortal = (
  props: React.ComponentProps<typeof DrawerPrimitive.Portal>
) => <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;

// -----------------------------
// Close
// -----------------------------
export const DrawerClose = (
  props: React.ComponentProps<typeof DrawerPrimitive.Close>
) => <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;

// -----------------------------
// Overlay
// -----------------------------
export const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentProps<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    data-slot="drawer-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-black/50",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

// -----------------------------
// Content
// -----------------------------
export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentProps<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      data-slot="drawer-content"
      className={cn(
        "group/drawer-content fixed z-50 flex flex-col bg-background h-auto",
        // top
        "data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:inset-x-0",
        "data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
        // bottom
        "data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:inset-x-0",
        "data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
        // right
        "data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l sm:data-[vaul-drawer-direction=right]:max-w-sm",
        // left
        "data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r sm:data-[vaul-drawer-direction=left]:max-w-sm",
        className
      )}
      {...props}
    >
      {/* Grab handle (only for bottom drawers) */}
      <div className="mx-auto mt-4 hidden h-2 w-[100px] rounded-full bg-muted shrink-0 group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

// -----------------------------
// Header
// -----------------------------
export const DrawerHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    data-slot="drawer-header"
    className={cn("flex flex-col gap-1.5 p-4", className)}
    {...props}
  />
);

// -----------------------------
// Footer
// -----------------------------
export const DrawerFooter = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    data-slot="drawer-footer"
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);

// -----------------------------
// Title
// -----------------------------
export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentProps<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    data-slot="drawer-title"
    className={cn("font-semibold text-foreground", className)}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

// -----------------------------
// Description
// -----------------------------
export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentProps<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    data-slot="drawer-description"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";