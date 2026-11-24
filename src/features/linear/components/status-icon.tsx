import React from "react";
import { IssueStatus } from "../types";

export const StatusIcon: React.FC<{ status: IssueStatus; className?: string }> = ({
  status,
  className = "w-3.5 h-3.5",
}) => {
  switch (status) {
    case "done":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-label="Done">
          <circle cx="8" cy="8" r="7" fill="#5E6AD2" />
          <path
            d="M5 8.2L7 10.2L11.2 6"
            stroke="#FFFFFF"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "in_progress":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-label="In Progress">
          <circle cx="8" cy="8" r="6.5" stroke="#F2C94C" strokeWidth="1.5" />
          <path
            d="M8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5V1.5Z"
            fill="#F2C94C"
          />
        </svg>
      );
    case "todo":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-label="Todo">
          <circle cx="8" cy="8" r="6.5" stroke="#8A8F98" strokeWidth="1.5" />
        </svg>
      );
    case "backlog":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-label="Backlog">
          <circle
            cx="8"
            cy="8"
            r="6.5"
            stroke="#8A8F98"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        </svg>
      );
    case "canceled":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className} aria-label="Canceled">
          <circle cx="8" cy="8" r="6.5" stroke="#666970" strokeWidth="1.5" />
          <path d="M5 5L11 11M11 5L5 11" stroke="#666970" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
};
