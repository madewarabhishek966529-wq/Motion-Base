"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LinearIssue, IssuePriority } from "./types";
import { MOCK_ISSUES, MOCK_CYCLE_42, MOCK_USERS } from "./mock-data";
import { InboxScreen } from "./screens/inbox-screen";
import { IssueDetailScreen } from "./screens/issue-detail-screen";
import { CycleScreen } from "./screens/cycle-screen";
import {
  Smartphone,
  Minimize2,
  RotateCcw,
  Accessibility,
  Wifi,
  Battery,
  Layers,
  Inbox,
  TrendingUp,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ActiveScreen = "inbox" | "detail" | "cycle";

export const LinearMobileShell: React.FC = () => {
  const [issues, setIssues] = useState<LinearIssue[]>(MOCK_ISSUES);
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>("inbox");
  const [selectedIssueId, setSelectedIssueId] = useState<string>("iss-1");
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // New Issue Spring Sheet State
  const [showNewIssueDrawer, setShowNewIssueDrawer] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<IssuePriority>("high");

  const selectedIssue = issues.find((i) => i.id === selectedIssueId) || issues[0];

  const handleOpenIssue = (issue: LinearIssue) => {
    setSelectedIssueId(issue.id);
    setActiveScreen("detail");
  };

  const handleStatusToggle = (issueId: string) => {
    setIssues((prev) =>
      prev.map((i) => {
        if (i.id !== issueId) return i;
        const nextStatus =
          i.status === "done"
            ? "todo"
            : i.status === "todo"
            ? "in_progress"
            : "done";
        return { ...i, status: nextStatus, updatedAt: new Date().toISOString() };
      })
    );
  };

  const handleUpdateIssue = (updated: LinearIssue) => {
    setIssues((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
  };

  const handleCreateIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const nextNumber = 412 + issues.length;
    const created: LinearIssue = {
      id: `iss-${Date.now()}`,
      identifier: `ENG-${nextNumber}`,
      title: newTitle.trim(),
      description: "Created from Linear Mobile quick triage sheet.",
      priority: newPriority,
      status: "todo",
      assignee: MOCK_USERS.alex,
      creator: MOCK_USERS.alex,
      cycle: { number: 42, name: "Cycle 42" },
      labels: ["triage"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activity: [
        {
          id: `act-${Date.now()}`,
          user: MOCK_USERS.alex,
          action: "created issue via mobile FAB",
          timestamp: "Just now",
        },
      ],
      comments: [],
    };
    setIssues((prev) => [created, ...prev]);
    setNewTitle("");
    setShowNewIssueDrawer(false);
  };

  const handleReset = () => {
    setIssues(MOCK_ISSUES);
    setActiveScreen("inbox");
    setSelectedIssueId("iss-1");
    setShowNewIssueDrawer(false);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
      {/* Shell Mode Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-brand-surface border border-brand-border rounded-2xl w-full max-w-4xl text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-linear-indigo animate-pulse" />
          <span className="font-semibold text-brand-pearl">
            Linear Mobile Recreation (iOS)
          </span>
          <span className="hidden sm:inline text-brand-muted/70 font-mono text-[11px]">
            • Spring k:420 c:26
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-colors",
              reducedMotion
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-brand-elevated text-brand-muted border-brand-border hover:text-brand-pearl"
            )}
            title="Toggle reduced motion simulation"
          >
            <Accessibility className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reduced Motion</span>
          </button>

          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-elevated text-brand-muted border border-brand-border hover:text-brand-pearl transition-colors"
          >
            {isPhoneFrame ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Expand Viewport</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Phone Frame</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-brand-elevated text-brand-muted hover:text-brand-pearl border border-brand-border"
            title="Reset to initial state"
            aria-label="Reset Linear Mobile state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Viewport Frame */}
      <div
        className={cn(
          "relative overflow-hidden transition-all duration-300 shadow-2xl bg-linear-bg border-linear-border",
          isPhoneFrame
            ? "w-full max-w-[390px] h-[760px] rounded-[48px] border-[10px] border-[#20232B] shadow-black/80 ring-1 ring-white/10"
            : "w-full max-w-2xl h-[700px] rounded-2xl border"
        )}
      >
        {/* Authentic iPhone Dynamic Island & Status Bar */}
        {isPhoneFrame && (
          <div className="absolute top-0 inset-x-0 h-11 bg-transparent z-40 flex items-center justify-between px-7 text-white text-[12px] font-semibold tracking-tight pointer-events-none">
            <span>9:41</span>

            <div className="w-24 h-6 bg-black rounded-full shadow-inner flex items-center justify-end pr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#111115] border border-white/10" />
            </div>

            <div className="flex items-center gap-1.5 text-white/90">
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Screen Switcher Container */}
        <div className={cn("h-full w-full flex flex-col relative", isPhoneFrame && "pt-10")}>
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeScreen === "inbox" && (
                <motion.div
                  key="inbox"
                  initial={reducedMotion ? { opacity: 0 } : { x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { x: -30, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 26,
                    mass: 0.85,
                  }}
                  className="h-full w-full"
                >
                  <InboxScreen
                    issues={issues}
                    onOpenIssue={handleOpenIssue}
                    onStatusToggle={handleStatusToggle}
                    onNavigateToCycle={() => setActiveScreen("cycle")}
                    onNewIssueClick={() => setShowNewIssueDrawer(true)}
                  />
                </motion.div>
              )}

              {activeScreen === "detail" && (
                <motion.div
                  key="detail"
                  initial={reducedMotion ? { opacity: 0 } : { x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { x: 40, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 26,
                    mass: 0.85,
                  }}
                  className="h-full w-full"
                >
                  <IssueDetailScreen
                    issue={selectedIssue}
                    onBack={() => setActiveScreen("inbox")}
                    onUpdateIssue={handleUpdateIssue}
                  />
                </motion.div>
              )}

              {activeScreen === "cycle" && (
                <motion.div
                  key="cycle"
                  initial={reducedMotion ? { opacity: 0 } : { x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { x: 40, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 26,
                    mass: 0.85,
                  }}
                  className="h-full w-full"
                >
                  <CycleScreen
                    cycleData={MOCK_CYCLE_42}
                    onBack={() => setActiveScreen("inbox")}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* New Issue Spring Bottom Sheet (contained inside phone viewport) */}
            <AnimatePresence>
              {showNewIssueDrawer && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowNewIssueDrawer(false)}
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm z-40"
                  />
                  <motion.div
                    initial={reducedMotion ? { opacity: 0 } : { y: "100%", opacity: 0.8 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reducedMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
                    transition={
                      reducedMotion
                        ? { duration: 0.15 }
                        : { type: "spring", stiffness: 420, damping: 26, mass: 0.85 }
                    }
                    className="absolute bottom-0 inset-x-0 bg-linear-surface border-t border-linear-border rounded-t-3xl p-5 z-50 shadow-2xl space-y-4"
                  >
                    <div className="w-12 h-1 bg-linear-borderLight rounded-full mx-auto" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-linear-text">
                        New Engineering Issue
                      </span>
                      <span className="text-[10px] font-mono text-linear-indigo">
                        Cycle 42
                      </span>
                    </div>

                    <form onSubmit={handleCreateIssue} className="space-y-3">
                      <input
                        autoFocus
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Issue title (e.g. Fix spring drawer clipping)..."
                        className="w-full bg-linear-bg border border-linear-border rounded-xl px-3.5 py-2.5 text-xs text-linear-text placeholder:text-linear-muted/60 focus:outline-none focus:border-linear-indigo"
                      />

                      <div className="flex items-center justify-between gap-2">
                        <select
                          value={newPriority}
                          onChange={(e) => setNewPriority(e.target.value as IssuePriority)}
                          className="bg-linear-bg border border-linear-border rounded-xl px-3 py-1.5 text-xs text-linear-text focus:outline-none"
                        >
                          <option value="urgent">Urgent Priority</option>
                          <option value="high">High Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="low">Low Priority</option>
                        </select>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowNewIssueDrawer(false)}
                            className="px-3 py-1.5 rounded-lg text-xs text-linear-muted hover:text-linear-text"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-linear-indigo hover:bg-[#6E7BF0] text-white text-xs font-medium shadow-md shadow-linear-indigo/25"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Create</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Tab Bar (iOS Capsule) */}
          <div className="h-14 border-t border-linear-border/90 bg-linear-surface/95 backdrop-blur-md flex items-center justify-around px-4 z-30 shrink-0">
            <button
              onClick={() => setActiveScreen("inbox")}
              className={cn(
                "flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors",
                activeScreen === "inbox"
                  ? "text-linear-indigo font-bold"
                  : "text-linear-muted hover:text-linear-text"
              )}
            >
              <Inbox className="w-4 h-4" />
              <span>Inbox</span>
            </button>

            <button
              onClick={() => setActiveScreen("cycle")}
              className={cn(
                "flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors",
                activeScreen === "cycle"
                  ? "text-linear-indigo font-bold"
                  : "text-linear-muted hover:text-linear-text"
              )}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Cycle 42</span>
            </button>

            <button
              onClick={() => {
                setSelectedIssueId("iss-1");
                setActiveScreen("detail");
              }}
              className={cn(
                "flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors",
                activeScreen === "detail"
                  ? "text-linear-indigo font-bold"
                  : "text-linear-muted hover:text-linear-text"
              )}
            >
              <Layers className="w-4 h-4" />
              <span>Inspector</span>
            </button>
          </div>

          {/* iOS Bottom Home Bar */}
          {isPhoneFrame && (
            <div className="h-4 bg-linear-surface flex items-center justify-center pb-1">
              <div className="w-32 h-1 bg-white/30 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
