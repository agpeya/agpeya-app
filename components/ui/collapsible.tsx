"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

/* ---------------------------------------
   Root
---------------------------------------- */
export function Collapsible(
  props: React.ComponentProps<typeof CollapsiblePrimitive.Root>
) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      {...props}
    />
  );
}

/* ---------------------------------------
   Trigger
---------------------------------------- */
export function CollapsibleTrigger(
  props: React.ComponentProps<
    typeof CollapsiblePrimitive.CollapsibleTrigger
  >
) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

/* ---------------------------------------
   Content
---------------------------------------- */
export function CollapsibleContent(
  props: React.ComponentProps<
    typeof CollapsiblePrimitive.CollapsibleContent
  >
) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}
