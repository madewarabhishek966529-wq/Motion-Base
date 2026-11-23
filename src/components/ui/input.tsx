import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", icon, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none flex items-center">
            {icon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "w-full bg-brand-surface border border-brand-border text-brand-pearl text-sm rounded-xl px-4 py-2.5 placeholder:text-brand-muted/60 transition-colors focus:border-brand-coral focus:ring-1 focus:ring-brand-coral focus:outline-none disabled:opacity-50",
            icon && "pl-10",
            error && "border-brand-coral focus:border-brand-coral focus:ring-brand-coral",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-brand-coral">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
