"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { LinearIssue } from "../types";
import { StatusIcon } from "./status-icon";
import { PriorityIcon } from "./priority-icon";
import { cn } from "@/lib/utils";
import { Check, UserPlus, MoreHorizontal } from "lucide-react";

interface IssueRowItemProps {
  issue: LinearIssue;
  onSelect: (issue: LinearIssue) => void;
  onStatusToggle?: (issueId: string) => void;
  onDelegate?: (issueId: string) => void;
  size?: "compact" | "expanded";
  isSelected?: boolean;
}

export const IssueRowItem: React.FC<IssueRowItemProps> = ({
  issue,
  onSelect,
  onStatusToggle,
  onDelegate,
  size = "compact",
  isSelected = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [swipeOffset, setSwipeOffset] = useState(0);

  const isDone = issue.status === "done";

  return (
    <motion.div
      layout={!shouldReduceMotion}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.006 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 26,
        mass: 0.85,
      }}
      onClick={() => onSelect(issue)}
      className={cn(
        "group relative flex items-center justify-between p-3.5 bg-linear-surface hover:bg-linear-surfaceHover border rounded-[10px] cursor-pointer transition-colors select-none",
        isSelected
          ? "border-linear-indigo ring-1 ring-linear-indigo/40 bg-linear-surfaceHover"
          : "border-linear-border hover:border-linear-borderLight",
        size === "compact" ? "py-2.5 px-3" : "py-3.5 px-4"
      )}
    >
      {/* Left section: Priority, Status, Identifier, Title */}
      <div className="flex items-center gap-2.5 min-w-0 pr-3">
        {/* Priority Icon */}
        <div className="shrink-0 flex items-center" title={`Priority: ${issue.priority}`}>
          <PriorityIcon priority={issue.priority} />
        </div>

        {/* Status Toggle Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onStatusToggle) onStatusToggle(issue.id);
          }}
          className="shrink-0 transition-transform active:scale-90"
          title={`Status: ${issue.status.replace("_", " ")}`}
        >
          <StatusIcon status={issue.status} />
        </button>

        {/* Identifier Badge */}
        <span className="font-mono text-[11px] font-semibold text-linear-muted shrink-0">
          {issue.identifier}
        </span>

        {/* Title */}
        <span
          className={cn(
            "text-xs font-medium text-linear-text truncate transition-colors",
            isDone && "line-through text-linear-muted opacity-60"
          )}
        >
          {issue.title}
        </span>
      </div>

      {/* Right Section: Labels, Assignee Avatar, Cycle Pill */}
      <div className="flex items-center gap-2 shrink-0">
        {issue.labels.length > 0 && (
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono text-linear-muted bg-linear-bg border border-linear-border">
            {issue.labels[0]}
          </span>
        )}

        <div className="relative w-5 h-5 rounded-full overflow-hidden border border-linear-border shrink-0">
          <Image
            src={issue.assignee.avatarUrl}
            alt={issue.assignee.name}
            fill
            sizes="20px"
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};
