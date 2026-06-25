import type { ComponentProps } from "react";
import { useId } from "react";
import { cn } from "@/lib/cn";

interface TextareaProps extends Omit<ComponentProps<"textarea">, "id"> {
  label: string;
  error?: string;
}

const fieldClass =
  "border-border bg-surface-2/50 text-foreground placeholder:text-muted/70 text-body w-full resize-y rounded-md border px-4 py-3 outline-none transition focus-visible:border-border-strong";

/** Labelled multiline input with inline error state. */
export function Textarea({ label, error, className, rows = 5, ...props }: TextareaProps) {
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldId} className="text-caption text-muted-foreground">
        {label}
      </label>
      <textarea
        id={fieldId}
        rows={rows}
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
