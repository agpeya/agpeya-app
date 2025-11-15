"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label@2.1.2";
import { Slot } from "@radix-ui/react-slot@1.1.2";

import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form@7.55.0";

import { cn } from "./utils";
import { Label } from "./label";

// -----------------------------------------------------------------------------
// Form Root
// -----------------------------------------------------------------------------

export const Form = FormProvider;

// -----------------------------------------------------------------------------
// Contexts
// -----------------------------------------------------------------------------

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
  null,
);

function useFormFieldContext() {
  const ctx = React.useContext(FormFieldContext);
  if (!ctx) throw new Error("useFormField must be inside <FormField />");
  return ctx;
}

type FormItemContextValue = { id: string };

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

function useFormItemContext() {
  const ctx = React.useContext(FormItemContext);
  if (!ctx) throw new Error("Form components must be inside <FormItem />");
  return ctx;
}

// -----------------------------------------------------------------------------
// FormField
// -----------------------------------------------------------------------------

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

// -----------------------------------------------------------------------------
// Hook: useFormField
// -----------------------------------------------------------------------------

export function useFormField() {
  const fieldCtx = useFormFieldContext();
  const itemCtx = useFormItemContext();
  const form = useFormContext();
  const formState = useFormState({ name: fieldCtx.name });
  const fieldState = form.getFieldState(fieldCtx.name, formState);

  return {
    id: itemCtx.id,
    name: fieldCtx.name,
    formItemId: `${itemCtx.id}-form-item`,
    formDescriptionId: `${itemCtx.id}-form-description`,
    formMessageId: `${itemCtx.id}-form-message`,
    ...fieldState,
  };
}

// -----------------------------------------------------------------------------
// FormItem
// -----------------------------------------------------------------------------

export function FormItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn("grid gap-2", className)} {...props} />
    </FormItemContext.Provider>
  );
}

// -----------------------------------------------------------------------------
// FormLabel
// -----------------------------------------------------------------------------

export function FormLabel(
  { className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>,
) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      htmlFor={formItemId}
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      {...props}
    />
  );
}

// -----------------------------------------------------------------------------
// FormControl
// -----------------------------------------------------------------------------

export function FormControl(props: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      id={formItemId}
      data-slot="form-control"
      aria-invalid={!!error}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
      }
      {...props}
    />
  );
}

// -----------------------------------------------------------------------------
// FormDescription
// -----------------------------------------------------------------------------

export function FormDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      id={formDescriptionId}
      data-slot="form-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

// -----------------------------------------------------------------------------
// FormMessage
// -----------------------------------------------------------------------------

export function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const message = error ? String(error?.message ?? "") : children;

  if (!message) return null;

  return (
    <p
      id={formMessageId}
      data-slot="form-message"
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {message}
    </p>
  );
}
