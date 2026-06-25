import type { ComponentProps } from "react";
import { useId } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends Omit<ComponentProps<"input">, "id"> {
  label: string;
  error?: string;
}

const fieldClass =
  "border-border bg-surface-2/50 text-foreground placeholder:text-muted/70 text-body h-11 w-full rounded-md border px-4 outline-none transition focus-visible:border-border-strong";

/** Labelled text input with inline error state. */
export function Input({ label, error, className, ...props }: InputProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-caption text-muted-foreground">
        {label}
      </label>
      <input
        id={inputId}
        className={cn(fieldClass, error && "border-danger/60", className)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error ? (
        <span id={errorId} className="text-caption text-danger">
          {error}
        </span>
      ) : null}
    </div>
  );
}
