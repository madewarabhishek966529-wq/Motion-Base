"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { LinearIssue, IssueStatus, IssuePriority, CommentItem } from "../types";
import { StatusIcon } from "../components/status-icon";
import { PriorityIcon } from "../components/priority-icon";
import { MOCK_USERS } from "../mock-data";
import {
  ArrowLeft,
  Share2,
  MoreHorizontal,
  CheckSquare,
  Square,
  MessageSquare,
  Send,
  Sparkles,
  Calendar,
  Layers,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IssueDetailScreenProps {
  issue: LinearIssue;
  onBack: () => void;
  onUpdateIssue: (updated: LinearIssue) => void;
}

export const IssueDetailScreen: React.FC<IssueDetailScreenProps> = ({
  issue,
  onBack,
  onUpdateIssue,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [showCommentDrawer, setShowCommentDrawer] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [priorityMenuOpen, setPriorityMenuOpen] = useState(false);

  const handleStatusChange = (status: IssueStatus) => {
    onUpdateIssue({ ...issue, status, updatedAt: new Date().toISOString() });
    setStatusMenuOpen(false);
  };

  const handlePriorityChange = (priority: IssuePriority) => {
    onUpdateIssue({ ...issue, priority, updatedAt: new Date().toISOString() });
    setPriorityMenuOpen(false);
  };

  const handleToggleSubtask = (subtaskId: string) => {
    const updatedSubtasks = (issue.subtasks || []).map((st) =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );
    onUpdateIssue({ ...issue, subtasks: updatedSubtasks });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: CommentItem = {
      id: `com-${Date.now()}`,
      user: MOCK_USERS.alex,
      body: commentText.trim(),
      timestamp: "Just now",
    };

    onUpdateIssue({
      ...issue,
      comments: [...issue.comments, newComment],
      updatedAt: new Date().toISOString(),
    });

    setCommentText("");
    setShowCommentDrawer(false);
  };

  const statuses: Array<{ id: IssueStatus; label: string }> = [
    { id: "backlog", label: "Backlog" },
    { id: "todo", label: "Todo" },
    { id: "in_progress", label: "In Progress" },
    { id: "done", label: "Done" },
    { id: "canceled", label: "Canceled" },
  ];

  const priorities: Array<{ id: IssuePriority; label: string }> = [
    { id: "urgent", label: "Urgent" },
    { id: "high", label: "High" },
    { id: "medium", label: "Medium" },
    { id: "low", label: "Low" },
    { id: "none", label: "No Priority" },
  ];

  return (
    <div className="relative flex flex-col h-full bg-linear-bg text-linear-text select-none overflow-hidden">
      {/* Top Header Bar */}
      <div className="px-4 py-3 border-b border-linear-border bg-linear-bg/95 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 rounded-lg text-linear-muted hover:text-linear-text transition-colors"
            aria-label="Back to My Issues Inbox"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-mono text-xs font-semibold text-linear-muted">
            {issue.identifier}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-linear-muted">
          <button className="p-1.5 rounded-lg hover:text-linear-text">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:text-linear-text">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-28">
        {/* Title */}
        <h1 className="text-lg font-bold text-linear-text leading-snug tracking-tight">
          {issue.title}
        </h1>

        {/* Property Matrix Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Status Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setStatusMenuOpen(!statusMenuOpen);
                setPriorityMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-linear-surface hover:bg-linear-surfaceHover border border-linear-border font-medium capitalize"
            >
              <StatusIcon status={issue.status} />
              <span>{issue.status.replace("_", " ")}</span>
              <ChevronDown className="w-3 h-3 text-linear-muted" />
            </button>

            {statusMenuOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-40 rounded-xl bg-linear-surface border border-linear-border shadow-2xl p-1 z-30 animate-in fade-in-50 zoom-in-95 duration-100">
                {statuses.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => handleStatusChange(st.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                      issue.status === st.id
                        ? "bg-linear-indigo text-white font-medium"
                        : "text-linear-text hover:bg-linear-surfaceHover"
                    )}
                  >
                    <StatusIcon status={st.id} />
                    <span>{st.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Priority Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setPriorityMenuOpen(!priorityMenuOpen);
                setStatusMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-linear-surface hover:bg-linear-surfaceHover border border-linear-border font-medium capitalize"
            >
              <PriorityIcon priority={issue.priority} />
              <span>{issue.priority}</span>
              <ChevronDown className="w-3 h-3 text-linear-muted" />
            </button>

            {priorityMenuOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-36 rounded-xl bg-linear-surface border border-linear-border shadow-2xl p-1 z-30 animate-in fade-in-50 zoom-in-95 duration-100">
                {priorities.map((pr) => (
                  <button
                    key={pr.id}
                    onClick={() => handlePriorityChange(pr.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                      issue.priority === pr.id
                        ? "bg-linear-indigo text-white font-medium"
                        : "text-linear-text hover:bg-linear-surfaceHover"
                    )}
                  >
                    <PriorityIcon priority={pr.id} />
                    <span>{pr.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Assignee Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-linear-surface border border-linear-border">
            <div className="relative w-4 h-4 rounded-full overflow-hidden">
              <Image
                src={issue.assignee.avatarUrl}
                alt={issue.assignee.name}
                fill
                sizes="16px"
                className="object-cover"
              />
            </div>
            <span>{issue.assignee.name}</span>
          </div>

          {/* Cycle Pill */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-linear-surface border border-linear-border text-linear-muted font-mono text-[11px]">
            <Calendar className="w-3 h-3 text-linear-indigo" />
            <span>Cycle {issue.cycle.number}</span>
          </div>
        </div>

        {/* Description Section */}
        <div className="p-4 rounded-xl bg-linear-surface border border-linear-border/80 space-y-3">
          <h3 className="text-xs font-semibold text-linear-muted uppercase tracking-wider">
            Description
          </h3>
          <div className="text-xs text-linear-text leading-relaxed whitespace-pre-line font-sans">
            {issue.description}
          </div>

          {/* Subtask checklist */}
          {issue.subtasks && issue.subtasks.length > 0 && (
            <div className="pt-2 border-t border-linear-border/60 space-y-2">
              <span className="text-[11px] font-semibold text-linear-muted uppercase">
                Checklist ({issue.subtasks.filter((s) => s.completed).length} /{" "}
                {issue.subtasks.length})
              </span>
              <div className="space-y-1.5">
                {issue.subtasks.map((st) => (
                  <div
                    key={st.id}
                    onClick={() => handleToggleSubtask(st.id)}
                    className="flex items-center gap-2 cursor-pointer text-xs text-linear-text hover:text-white"
                  >
                    {st.completed ? (
                      <CheckSquare className="w-4 h-4 text-linear-indigo shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-linear-muted shrink-0" />
                    )}
                    <span className={cn(st.completed && "line-through text-linear-muted")}>
                      {st.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Activity & Comments Stream */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-linear-muted uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-linear-indigo" />
            Activity & Discussion ({issue.comments.length})
          </h3>

          <div className="space-y-3">
            {issue.comments.map((comment) => (
              <div
                key={comment.id}
                className="p-3.5 rounded-xl bg-linear-surface border border-linear-border space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="relative w-5 h-5 rounded-full overflow-hidden">
                      <Image
                        src={comment.user.avatarUrl}
                        alt={comment.user.name}
                        fill
                        sizes="20px"
                        className="object-cover"
                      />
                    </div>
                    <span className="font-semibold text-linear-text">
                      {comment.user.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-linear-muted font-mono">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-xs text-linear-text/90 leading-relaxed pl-7">
                  {comment.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar: Tap to open Spring Drawer */}
      <div className="absolute bottom-0 inset-x-0 p-3 bg-linear-bg/95 border-t border-linear-border backdrop-blur-md z-20 flex items-center gap-2">
        <button
          onClick={() => setShowCommentDrawer(true)}
          className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-linear-surface hover:bg-linear-surfaceHover border border-linear-border text-xs text-linear-muted transition-colors text-left"
        >
          <MessageSquare className="w-4 h-4 text-linear-indigo" />
          <span>Write a comment or update...</span>
        </button>
      </div>

      {/* Spring Animated Bottom Drawer (320ms, cubic-bezier(0.16, 1, 0.3, 1)) */}
      <AnimatePresence>
        {showCommentDrawer && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCommentDrawer(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />

            {/* Damped Spring Drawer */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0, y: 0 }
                  : { y: "100%", opacity: 0.8 }
              }
              animate={{ y: 0, opacity: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0, y: 0 }
                  : { y: "100%", opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.15 }
                  : {
                      type: "spring",
                      stiffness: 420,
                      damping: 26,
                      mass: 0.85,
                    }
              }
              className="fixed bottom-0 inset-x-0 bg-linear-surface border-t border-linear-border rounded-t-3xl p-5 z-50 shadow-2xl max-w-lg mx-auto space-y-4"
            >
              <div className="w-12 h-1 bg-linear-borderLight rounded-full mx-auto" />
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-semibold text-linear-text">
                  Comment on {issue.identifier}
                </span>
                <span className="text-[10px] font-mono text-linear-indigo">
                  Spring overshoot: 320ms
                </span>
              </div>

              <form onSubmit={handleAddComment} className="space-y-3">
                <textarea
                  autoFocus
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share implementation progress, PR link, or block notes..."
                  className="w-full bg-linear-bg border border-linear-border rounded-xl p-3 text-xs text-linear-text placeholder:text-linear-muted/60 focus:outline-none focus:border-linear-indigo h-24"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-linear-muted font-mono">
                    Markdown supported
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCommentDrawer(false)}
                      className="px-3 py-1.5 rounded-lg text-xs text-linear-muted hover:text-linear-text"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!commentText.trim()}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-linear-indigo hover:bg-[#6E7BF0] text-white text-xs font-medium disabled:opacity-40 shadow-md shadow-linear-indigo/25 transition-all"
                    >
                      <span>Post</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
