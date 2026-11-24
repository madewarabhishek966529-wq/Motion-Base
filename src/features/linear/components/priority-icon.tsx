import React from "react";
import { IssuePriority } from "../types";

export const PriorityIcon: React.FC<{ priority: IssuePriority; className?: string }> = ({
  priority,
  className = "w-3.5 h-3.5",
}) => {
  switch (priority) {
    case "urgent":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-label="Urgent Priority">
          <rect x="2" y="2" width="12" height="12" rx="2" fill="#EB5757" />
          <path
            d="M8 4.5V8.5M8 11.5H8.01"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "high":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-label="High Priority">
          <rect x="2" y="10" width="3" height="4" rx="1" fill="#F2994A" />
          <rect x="6.5" y="6" width="3" height="8" rx="1" fill="#F2994A" />
          <rect x="11" y="2" width="3" height="12" rx="1" fill="#F2994A" />
        </svg>
      );
    case "medium":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-label="Medium Priority">
          <rect x="2" y="10" width="3" height="4" rx="1" fill="#F2C94C" />
          <rect x="6.5" y="6" width="3" height="8" rx="1" fill="#F2C94C" />
          <rect x="11" y="2" width="3" height="12" rx="1" fill="#4B4E58" />
        </svg>
      );
    case "low":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-label="Low Priority">
          <rect x="2" y="10" width="3" height="4" rx="1" fill="#5E6AD2" />
          <rect x="6.5" y="6" width="3" height="8" rx="1" fill="#4B4E58" />
          <rect x="11" y="2" width="3" height="12" rx="1" fill="#4B4E58" />
        </svg>
      );
    case "none":
    default:
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-label="No Priority">
          <rect x="2" y="7" width="12" height="2" rx="1" fill="#4B4E58" />
        </svg>
      );
  }
};
