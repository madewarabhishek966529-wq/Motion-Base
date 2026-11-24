"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LinearIssue, IssuePriority } from "../types";
import { IssueRowItem } from "../components/issue-row-item";
import {
  Search,
  Filter,
  Plus,
  Bell,
  ChevronDown,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InboxScreenProps {
  issues: LinearIssue[];
  onOpenIssue: (issue: LinearIssue) => void;
  onStatusToggle: (issueId: string) => void;
  onNavigateToCycle: () => void;
  onNewIssueClick?: () => void;
}

export const InboxScreen: React.FC<InboxScreenProps> = ({
  issues,
  onOpenIssue,
  onStatusToggle,
  onNavigateToCycle,
  onNewIssueClick,
}) => {
  const [activeTab, setActiveTab] = useState<"assigned" | "created" | "subscribed">("assigned");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const createdCount = issues.filter((i) => i.creator.id === "usr-1").length;
  const subscribedCount = issues.filter(
    (i) => i.labels.includes("p0") || i.labels.includes("security")
  ).length;

  // Filter issues
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.identifier.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === "created") return issue.creator.id === "usr-1";
    if (activeTab === "subscribed") return issue.labels.includes("p0") || issue.labels.includes("security");
    return true;
  });

  // Group by priority
  const priorityGroups: Array<{ id: IssuePriority; label: string; color: string }> = [
    { id: "urgent", label: "Urgent", color: "#EB5757" },
    { id: "high", label: "High", color: "#F2994A" },
    { id: "medium", label: "Medium", color: "#F2C94C" },
    { id: "low", label: "Low", color: "#5E6AD2" },
  ];

  return (
    <div className="flex flex-col h-full bg-linear-bg text-linear-text select-none overflow-hidden">
      {/* Top Mobile App Bar */}
      <div className="px-4 pt-3 pb-2 border-b border-linear-border/80 bg-linear-bg/95 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-linear-indigo flex items-center justify-center font-bold text-xs text-white shadow-md shadow-linear-indigo/30">
              L
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-sm font-semibold text-linear-text tracking-tight">
                Engineering
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-linear-muted" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToCycle}
              className="p-1.5 rounded-lg bg-linear-surface hover:bg-linear-surfaceHover text-linear-indigo border border-linear-border transition-colors flex items-center gap-1 text-[11px] font-mono px-2"
              title="Swipe to Cycle 42 Velocity Burndown"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Cycle 42</span>
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 rounded-lg text-linear-muted hover:text-linear-text cursor-pointer"
                aria-label="Toggle notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-linear-indigo" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-60 rounded-xl bg-linear-surface border border-linear-border shadow-2xl p-3 z-40 text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-linear-border pb-1.5">
                    <span className="font-semibold text-linear-text">Notifications</span>
                    <button
                      type="button"
                      onClick={() => setShowNotifications(false)}
                      className="text-[10px] text-linear-indigo hover:underline"
                    >
                      Close
                    </button>
                  </div>
                  <p className="text-[11px] text-linear-muted leading-snug">
                    <strong className="text-linear-text">Elena</strong> commented on ENG-402: &ldquo;Make sure this integrates cleanly...&rdquo;
                  </p>
                  <p className="text-[11px] text-linear-muted leading-snug">
                    <strong className="text-linear-text">Cycle 42</strong> is 67% complete with 4 days remaining.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-2">
          <Search className="w-3.5 h-3.5 text-linear-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search issues, identifier (e.g. ENG-402)..."
            className="w-full bg-linear-surface border border-linear-border rounded-xl pl-9 pr-4 py-2 text-xs text-linear-text placeholder:text-linear-muted/60 focus:outline-none focus:border-linear-indigo/70"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pt-1">
          {[
            { id: "assigned", label: "Assigned to me", count: issues.length },
            { id: "created", label: "Created by me", count: createdCount },
            { id: "subscribed", label: "Subscribed", count: subscribedCount },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
                  isSelected
                    ? "bg-linear-surface text-linear-text border border-linear-border font-semibold shadow-sm"
                    : "text-linear-muted hover:text-linear-text"
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "text-[10px] font-mono px-1.5 py-0.2 rounded-full",
                    isSelected ? "bg-linear-border text-linear-text" : "text-linear-muted/60"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Issue List Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-5 pb-20">
        {priorityGroups.map((group) => {
          const groupIssues = filteredIssues.filter((i) => i.priority === group.id);
          if (groupIssues.length === 0) return null;

          return (
            <div key={group.id} className="space-y-2">
              {/* Group Section Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: group.color }}
                  />
                  <h3 className="text-xs font-semibold text-linear-muted uppercase tracking-wider">
                    {group.label}
                  </h3>
                  <span className="text-[11px] font-mono text-linear-muted/70">
                    {groupIssues.length}
                  </span>
                </div>
              </div>

              {/* Group Issue Rows */}
              <div className="space-y-1.5">
                {groupIssues.map((issue) => (
                  <IssueRowItem
                    key={issue.id}
                    issue={issue}
                    onSelect={onOpenIssue}
                    onStatusToggle={onStatusToggle}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {filteredIssues.length === 0 && (
          <div className="py-16 text-center text-xs text-linear-muted space-y-2">
            <p>No matching issues in this triage inbox view.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-linear-indigo hover:underline text-[11px]"
            >
              Clear search query
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-5 right-5 z-20">
        <button
          onClick={onNewIssueClick}
          className="p-3.5 rounded-full bg-linear-indigo hover:bg-[#6E7BF0] text-white shadow-xl shadow-linear-indigo/40 active:scale-95 transition-all flex items-center justify-center border border-white/20"
          title="Create New Issue"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
