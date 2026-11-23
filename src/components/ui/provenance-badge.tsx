import React from "react";
import { ProvenanceType, ConfidenceLevel } from "@/types";
import { cn } from "@/lib/utils";

interface ProvenanceBadgeProps {
  provenance: ProvenanceType;
  confidence?: ConfidenceLevel;
  className?: string;
  showIcon?: boolean;
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({
  provenance,
  confidence,
  className,
  showIcon = true,
}) => {
  const configs: Record<
    ProvenanceType,
    { label: string; bg: string; text: string; border: string; indicator: string }
  > = {
    manually_verified: {
      label: "Verified",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
      indicator: "bg-emerald-400",
    },
    observed: {
      label: "Observed",
      bg: "bg-brand-cyan/10",
      text: "text-brand-cyan",
      border: "border-brand-cyan/30",
      indicator: "bg-brand-cyan",
    },
    extracted: {
      label: "Extracted",
      bg: "bg-brand-violet/10",
      text: "text-[#B0A6FF]",
      border: "border-brand-violet/30",
      indicator: "bg-[#B0A6FF]",
    },
    inferred: {
      label: "AI Inferred",
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/30",
      indicator: "bg-amber-400",
    },
    user_submitted: {
      label: "Community",
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/30",
      indicator: "bg-purple-400",
    },
  };

  const config = configs[provenance] || configs.inferred;

  return (
    <div
      title={
        confidence
          ? `Provenance: ${config.label} | Confidence: ${confidence}`
          : `Provenance: ${config.label}`
      }
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {showIcon && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full", config.indicator)}
          aria-hidden="true"
        />
      )}
      <span>{config.label}</span>
      {confidence && confidence !== "high" && (
        <span className="text-[9px] opacity-75 uppercase tracking-wider">
          ({confidence})
        </span>
      )}
    </div>
  );
};
