import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "coral" | "violet" | "cyan" | "muted" | "success" | "warning";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full transition-colors border";

  const variants = {
    default:
      "bg-brand-surface text-brand-pearl border-brand-border",
    outline:
      "bg-transparent text-brand-muted border-brand-border",
    coral:
      "bg-brand-coral/10 text-brand-coral border-brand-coral/30",
    violet:
      "bg-brand-violet/10 text-[#A69BFF] border-brand-violet/30",
    cyan:
      "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30",
    muted:
      "bg-brand-elevated text-brand-muted border-transparent",
    success:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    warning:
      "bg-amber-500/10 text-amber-400 border-amber-500/30",
  };

  const sizes = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
