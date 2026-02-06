"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border border-b-2 border-gray-300 bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

interface FloatingInputProps extends React.ComponentProps<"input"> {
  label: string;
  error?: string;
}

function FloatingInput({ className, label, id, error, ...props }: FloatingInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  const isFloating = isFocused || hasValue;

  return (
    <div className={cn("relative", className)}>
      <input
        id={inputId}
        data-slot="input"
        className={cn(
          "peer w-full border-0 border-b border-gray-300 bg-transparent pt-5 pb-2 text-lg transition-colors outline-none",
          "focus:border-b focus:border-gray-400",
          "placeholder:text-transparent",
          error && "border-red-500 focus:border-red-500",
        )}
        placeholder={label}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        {...props}
      />
      <label
        htmlFor={inputId}
        className={cn(
          "pointer-events-none absolute left-0 text-gray-500 transition-all duration-200 ease-out",
          isFloating ? "top-0 text-sm text-gray-500" : "top-5 text-base text-gray-400 md:text-lg",
        )}
      >
        {label}
      </label>
      {error && <span className="absolute top-5 right-0 text-sm text-red-500">{error}</span>}
    </div>
  );
}

export { Input, FloatingInput };
