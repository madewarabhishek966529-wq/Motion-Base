"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { DemoAppItem, DemoPartId } from "../types";
import {
  Play,
  Pause,
  Wallet,
  PieChart,
  CreditCard,
  Sliders,
  Plus,
  Search,
  Bell,
  ChevronDown,
  Inbox,
  TrendingUp,
  User,
  Activity,
  Flame,
  Heart,
  Sparkles,
  ArrowUp,
  Mic,
  ShoppingBag,
  Music,
  Home,
  Disc,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoVideoPreviewProps {
  app: DemoAppItem;
  compact?: boolean;
  activePart?: DemoPartId | null;
  onSelectPart?: (part: DemoPartId) => void;
  controlledPlaying?: boolean;
  onPlayingChange?: (playing: boolean) => void;
  controlledSceneIndex?: number;
  onSceneChange?: (idx: number) => void;
}

export const DemoVideoPreview: React.FC<DemoVideoPreviewProps> = ({
  app,
  compact = false,
  activePart = null,
  onSelectPart,
  controlledPlaying,
  onPlayingChange,
  controlledSceneIndex,
  onSceneChange,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [internalPlaying, setInternalPlaying] = useState(!shouldReduceMotion);
  const [internalSceneIdx, setInternalSceneIdx] = useState(0);
  const [activeBottomTab, setActiveBottomTab] = useState(0);

  const isPlaying =
    controlledPlaying !== undefined ? controlledPlaying : internalPlaying;
  const sceneIdx =
    controlledSceneIndex !== undefined ? controlledSceneIndex : internalSceneIdx;

  const setPlaying = (val: boolean) => {
    setInternalPlaying(val);
    onPlayingChange?.(val);
  };

  const setSceneIdx = (val: number) => {
    setInternalSceneIdx(val);
    onSceneChange?.(val);
  };

  // Pause offscreen animations via IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance scenes like a video walkthrough
  useEffect(() => {
    if (!isPlaying || !isVisible || shouldReduceMotion) return;
    const interval = setInterval(() => {
      const next = (sceneIdx + 1) % app.scenes.length;
      setSceneIdx(next);
      setActiveBottomTab(next % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, isVisible, sceneIdx, app.scenes.length, shouldReduceMotion]);

  const currentScene = app.scenes[sceneIdx] || app.scenes[0];
  const highlightedPart = activePart || currentScene?.highlightPart;

  const isHighlighted = (part: DemoPartId) =>
    !compact && highlightedPart === part;

  const showDrawer =
    highlightedPart === "action_sheet" || currentScene?.highlightPart === "action_sheet";

  const ringClass =
    "ring-2 ring-brand-coral shadow-[0_0_0_4px_rgba(255,107,114,0.18)]";

  const handleClickPart = (e: React.MouseEvent, part: DemoPartId) => {
    if (!onSelectPart) return;
    e.stopPropagation();
    onSelectPart(part);
  };

  const renderTopNav = () => {
    const labels: Record<string, { title: string; badge: string }> = {
      expense_tracker: { title: "Nov 2026 ▾", badge: "$3,500 Cap" },
      linear_mobile: { title: "Engineering ▾", badge: "Cycle 42" },
      fitness_rings: { title: "Today • Tue", badge: "14d Streak" },
      ai_assistant: { title: "Aura 4 Pro ▾", badge: "Online" },
      sneaker_commerce: { title: "KICKS.", badge: "DROP LIVE" },
      music_player: { title: "AI DJ Mix", badge: "HD Audio" },
    };
    const meta = labels[app.visualKey] || { title: app.title, badge: "Live" };

    return (
      <div
        onClick={(e) => handleClickPart(e, "top_nav")}
        className={cn(
          "px-3 py-2 flex items-center justify-between border-b transition-all shrink-0",
          onSelectPart && "cursor-pointer hover:brightness-110",
          isHighlighted("top_nav") && ringClass
        )}
        style={{
          backgroundColor: app.bgColor,
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className="w-4 h-4 rounded-md shrink-0 flex items-center justify-center text-[9px] font-bold text-black"
            style={{ backgroundColor: app.accentColor }}
          >
            {app.title.charAt(0)}
          </span>
          <span className="text-[11px] font-semibold text-white truncate">
            {meta.title}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold"
            style={{
              backgroundColor: `${app.accentColor}22`,
              color: app.accentColor,
            }}
          >
            {meta.badge}
          </span>
          <Bell className="w-3 h-3 text-slate-400" />
        </div>
      </div>
    );
  };

  const renderCoreContent = () => {
    switch (app.visualKey) {
      case "expense_tracker": {
        const ringPct = sceneIdx === 0 ? 58 : sceneIdx === 1 ? 71 : 74;
        const dashOffset = 176 - (176 * ringPct) / 100;
        return (
          <div className="space-y-2.5">
            {/* Spending Ring Summary Card */}
            <div
              className="p-2.5 rounded-xl border flex items-center justify-between"
              style={{
                backgroundColor: app.surfaceColor,
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block">
                  Spent This Month
                </span>
                <motion.span
                  key={sceneIdx}
                  initial={shouldReduceMotion ? false : { opacity: 0.6, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-base font-extrabold text-white tabular-nums block"
                >
                  {sceneIdx >= 2 ? "$2,499.00" : "$2,480.50"}
                </motion.span>
                <span
                  className="text-[9px] font-mono"
                  style={{ color: app.accentColor }}
                >
                  {ringPct}% of $3,500 budget
                </span>
              </div>

              <svg className="w-14 h-14 -rotate-90 shrink-0" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="6"
                  fill="none"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke={app.accentColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="176"
                  animate={{ strokeDashoffset: dashOffset }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </svg>
            </div>

            {/* Animated Category Progress Bars */}
            <div className="space-y-1.5">
              {[
                { name: "Food & Coffee", amt: "$642", pct: "68%", color: "#3ECF8E" },
                { name: "Software & AI", amt: "$410", pct: "46%", color: "#7867FF" },
                { name: "Transit & Rides", amt: "$218", pct: "31%", color: "#39D8E8" },
              ].map((cat, idx) => (
                <motion.div
                  key={cat.name}
                  initial={shouldReduceMotion ? false : { x: -6, opacity: 0.7 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.06 }}
                  className="px-2.5 py-1.5 rounded-lg border space-y-1"
                  style={{
                    backgroundColor: app.surfaceColor,
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-200 font-medium">{cat.name}</span>
                    <span className="font-mono text-white tabular-nums">{cat.amt}</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-black/40 overflow-hidden">
                    <motion.div
                      animate={{ width: sceneIdx === 1 ? "80%" : cat.pct }}
                      transition={{ duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      }

      case "fitness_rings": {
        return (
          <div className="space-y-2.5">
            <div
              className="p-3 rounded-xl border flex items-center justify-between"
              style={{
                backgroundColor: app.surfaceColor,
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <svg className="w-16 h-16 -rotate-90 shrink-0" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="26" stroke="#FF6B7230" strokeWidth="5" fill="none" />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#FF6B72"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="163"
                  animate={{ strokeDashoffset: sceneIdx === 0 ? 35 : 22 }}
                  transition={{ duration: 0.8 }}
                />
                <circle cx="32" cy="32" r="18" stroke="#39D8E830" strokeWidth="5" fill="none" />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="18"
                  stroke="#39D8E8"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="113"
                  animate={{ strokeDashoffset: sceneIdx === 0 ? 28 : 16 }}
                  transition={{ duration: 0.8 }}
                />
              </svg>
              <div className="space-y-1 text-right">
                <div className="text-[10px] font-mono text-[#FF6B72] font-bold">MOVE 540 KCAL</div>
                <div className="text-[10px] font-mono text-[#39D8E8] font-bold">EXERCISE 38 MIN</div>
                <div className="text-[10px] font-mono text-emerald-400">HEART 124 BPM</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {["Morning Run • 5.2km", "HIIT Core • 22m"].map((w) => (
                <div
                  key={w}
                  className="p-2 rounded-lg border text-[10px] text-slate-200 font-medium"
                  style={{
                    backgroundColor: app.surfaceColor,
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  {w}
                </div>
              ))}
            </div>
          </div>
        );
      }

      case "ai_assistant": {
        return (
          <div className="space-y-2">
            <div className="ml-auto max-w-[80%] px-2.5 py-1.5 rounded-xl bg-[#7867FF] text-white text-[10px]">
              Generate bottom nav with spring indicator
            </div>
            <motion.div
              key={sceneIdx}
              initial={shouldReduceMotion ? false : { opacity: 0.6, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-2.5 rounded-xl border space-y-1.5"
              style={{
                backgroundColor: app.surfaceColor,
                borderColor: "rgba(120,103,255,0.35)",
              }}
            >
              <div className="flex items-center gap-1 text-[9px] font-mono text-[#39D8E8]">
                <Sparkles className="w-3 h-3" />
                <span>STREAMING COMPONENT</span>
              </div>
              <div className="p-2 rounded-lg bg-black/40 font-mono text-[9px] text-slate-300">
                {"<motion.span layoutId='pill' />"}
              </div>
            </motion.div>
          </div>
        );
      }

      case "sneaker_commerce": {
        return (
          <div className="space-y-2">
            <div
              className="p-3 rounded-xl border relative overflow-hidden"
              style={{
                backgroundColor: app.surfaceColor,
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-amber-400">LIMITED DROP</span>
                <span className="text-xs font-mono font-bold text-white">$185</span>
              </div>
              <motion.div
                animate={{
                  backgroundColor: sceneIdx % 2 === 0 ? "#FF6B72" : "#39D8E8",
                }}
                className="h-12 w-24 mx-auto my-2 rounded-2xl opacity-85 shadow-lg"
              />
              <div className="text-[11px] font-bold text-white text-center">
                Aero Glide 01
              </div>
            </div>
          </div>
        );
      }

      case "music_player": {
        return (
          <div className="space-y-2.5">
            <div
              className="p-3 rounded-xl border flex items-center gap-3"
              style={{
                backgroundColor: app.surfaceColor,
                borderColor: "rgba(29,185,84,0.3)",
              }}
            >
              <motion.div
                animate={isPlaying && !shouldReduceMotion ? { rotate: 360 } : {}}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1DB954] to-[#0B3B1C] flex items-center justify-center border border-white/20 shrink-0"
              >
                <Disc className="w-5 h-5 text-white" />
              </motion.div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white truncate">Midnight Pulse</div>
                <div className="text-[10px] text-slate-400">AI DJ • Live Mix</div>
                {/* Animated Audio Waveform */}
                <div className="flex items-end gap-1 h-4 mt-1.5">
                  {[0.6, 1, 0.4, 0.85, 0.5, 0.9, 0.65, 0.75].map((h, i) => (
                    <motion.span
                      key={i}
                      animate={
                        isPlaying && !shouldReduceMotion
                          ? { scaleY: [h, 1, 0.35, h] }
                          : { scaleY: h }
                      }
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.08,
                      }}
                      className="w-1 h-4 rounded-full bg-[#1DB954] origin-bottom"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case "linear_mobile":
      default: {
        return (
          <div className="space-y-1.5">
            {[
              { id: "ENG-402", title: "Auth token refresh flow", color: "#EB5757" },
              { id: "ENG-405", title: "Spring sheet transitions", color: "#F2994A" },
              { id: "ENG-398", title: "LRU thumbnail cache", color: "#5E6AD2" },
            ].map((row, idx) => (
              <motion.div
                key={row.id}
                animate={
                  sceneIdx === 1 && idx === 0
                    ? { scale: 1.02, borderColor: "#5E6AD2" }
                    : { scale: 1, borderColor: "rgba(255,255,255,0.08)" }
                }
                className="px-2.5 py-2 rounded-lg border flex items-center gap-2 text-[10px]"
                style={{ backgroundColor: app.surfaceColor }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: row.color }}
                />
                <span className="font-mono text-slate-400 shrink-0">{row.id}</span>
                <span className="text-slate-100 truncate">{row.title}</span>
              </motion.div>
            ))}
          </div>
        );
      }
    }
  };

  const renderBottomNav = () => {
    const tabs = app.modules.bottom_nav.keyElements[0]
      ?.replace("Tab items: ", "")
      .split(" • ") || ["Home", "Stats", "Cards", "Settings"];

    const icons = [Home, PieChart, CreditCard, Sliders];

    return (
      <div
        onClick={(e) => handleClickPart(e, "bottom_nav")}
        className={cn(
          "px-2 py-1.5 border-t flex items-center justify-around transition-all shrink-0 relative z-10",
          onSelectPart && "cursor-pointer hover:brightness-110",
          isHighlighted("bottom_nav") && ringClass
        )}
        style={{
          backgroundColor: app.surfaceColor,
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        {tabs.slice(0, 4).map((label, idx) => {
          const Icon = icons[idx % icons.length];
          const isActive = idx === activeBottomTab;
          return (
            <button
              key={label}
              type="button"
              onClick={(e) => {
                setActiveBottomTab(idx);
                if (onSelectPart) handleClickPart(e, "bottom_nav");
              }}
              className="relative px-2 py-1 rounded-lg flex flex-col items-center gap-0.5 text-[9px] font-medium transition-colors"
              style={{ color: isActive ? app.accentColor : "#94A3B8" }}
            >
              {isActive && (
                <motion.span
                  layoutId={`nav-pill-${app.id}-${compact ? "c" : "f"}`}
                  className="absolute inset-0 rounded-lg opacity-15"
                  style={{ backgroundColor: app.accentColor }}
                />
              )}
              <Icon className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10 truncate max-w-[54px]">{label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden flex flex-col justify-between select-none",
        compact ? "h-full" : "rounded-2xl border border-brand-border bg-brand-bg p-4 sm:p-6"
      )}
    >
      {/* Inner Device Viewport */}
      <div
        className={cn(
          "relative mx-auto flex flex-col overflow-hidden transition-all",
          compact
            ? "w-full h-full"
            : "w-full max-w-[360px] h-[520px] rounded-[34px] border-[6px] border-[#22283B] shadow-2xl"
        )}
        style={{ backgroundColor: app.bgColor }}
      >
        {/* Top Navigation */}
        {renderTopNav()}

        {/* Core UI Area */}
        <div
          onClick={(e) => handleClickPart(e, "core_ui")}
          className={cn(
            "flex-1 p-3 overflow-hidden relative transition-all",
            onSelectPart && "cursor-pointer",
            isHighlighted("core_ui") && ringClass
          )}
        >
          {renderCoreContent()}

          {/* Floating + Action Button */}
          {!showDrawer && (
            <motion.button
              type="button"
              onClick={(e) => handleClickPart(e, "action_sheet")}
              animate={
                isPlaying && !shouldReduceMotion
                  ? { scale: [1, 1.08, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-lg text-black font-bold"
              style={{ backgroundColor: app.accentColor }}
              title="Trigger Action Sheet"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          )}

          {/* Animated Spring Pull-Up Drawer Scene */}
          <AnimatePresence>
            {showDrawer && (
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { y: "100%" }}
                animate={{ y: 0, opacity: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { y: "100%" }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 26,
                  mass: 0.85,
                }}
                onClick={(e) => handleClickPart(e, "action_sheet")}
                className={cn(
                  "absolute bottom-0 inset-x-0 rounded-t-2xl p-3 border-t shadow-2xl z-20 space-y-2",
                  onSelectPart && "cursor-pointer",
                  isHighlighted("action_sheet") && ringClass
                )}
                style={{
                  backgroundColor: app.surfaceColor,
                  borderColor: app.accentColor,
                }}
              >
                <div className="w-8 h-1 rounded-full bg-white/25 mx-auto" />
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-white">
                    {app.modules.action_sheet.shortLabel}
                  </span>
                  <span
                    className="font-mono text-[9px]"
                    style={{ color: app.accentColor }}
                  >
                    Spring 320ms
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-white/10 text-[10px] text-slate-300 flex items-center justify-between">
                  <span>
                    {app.visualKey === "expense_tracker"
                      ? "Blue Bottle Coffee • Dining"
                      : app.visualKey === "sneaker_commerce"
                      ? "Select Size: US 10.5"
                      : "Quick Action Ready"}
                  </span>
                  <span
                    className="font-mono font-bold"
                    style={{ color: app.accentColor }}
                  >
                    {app.visualKey === "expense_tracker" ? "$18.50" : "✓"}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        {renderBottomNav()}

        {/* Video Progress Bar & Scene Strip at the very bottom */}
        <div className="h-1 w-full bg-black/50 relative shrink-0">
          <motion.div
            animate={{
              width: `${((sceneIdx + 1) / app.scenes.length) * 100}%`,
            }}
            transition={{ duration: 0.4 }}
            className="h-full"
            style={{ backgroundColor: app.accentColor }}
          />
        </div>
      </div>

      {/* Video Player Controls (Full mode only) */}
      {!compact && (
        <div className="mt-4 flex flex-col gap-3 max-w-[360px] w-full mx-auto">
          <div className="flex items-center justify-between gap-2 text-xs">
            <button
              type="button"
              onClick={() => setPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-elevated hover:bg-brand-border text-brand-pearl border border-brand-border font-medium transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-brand-coral" />
                  <span>Pause Reel</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>Play Reel</span>
                </>
              )}
            </button>

            <span className="text-[11px] font-mono text-brand-muted">
              {currentScene.label}
            </span>
          </div>

          {/* Scene Timeline Scrubber Pills */}
          <div className="grid grid-cols-4 gap-1.5">
            {app.scenes.map((sc, idx) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setSceneIdx(idx);
                  onSelectPart?.(sc.highlightPart);
                }}
                className={cn(
                  "px-2 py-1.5 rounded-lg text-[10px] font-mono text-left border transition-all truncate",
                  sceneIdx === idx
                    ? "bg-brand-elevated border-brand-coral text-brand-pearl font-bold"
                    : "bg-brand-surface border-brand-border text-brand-muted hover:text-brand-pearl"
                )}
                title={sc.caption}
              >
                {sc.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-brand-muted text-center">
            Tip: Click Top Nav, Cards, Drawer, or Bottom Nav inside the preview to inspect its prompt!
          </p>
        </div>
      )}
    </div>
  );
};
