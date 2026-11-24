"use client";

import React, { useState, useEffect } from "react";
import {
  NAV_STYLES,
  NAV_COLOR_PRESETS,
  NAV_ANIMATION_CURVES,
} from "../nav-styles";
import {
  NavAnimationPreset,
  NavStyleCategory,
  NavStyleItem,
  NavSurfaceMode,
} from "../types";
import { NavBarRenderer } from "./nav-bar-renderer";
import { generateNavStylePrompt } from "@/lib/prompt-engine/nav-prompt-builder";
import { PromptFramework, PromptTool } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Palette,
  Sparkles,
  Play,
  Pause,
  Copy,
  Check,
  Code,
  X,
  Wand2,
  Sun,
  Moon,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const NavigationShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<NavStyleCategory | "all">("all");
  const [surfaceMode, setSurfaceMode] = useState<NavSurfaceMode>("light");
  const [accentColor, setAccentColor] = useState<string>("#5E6AD2");
  const [animationPreset, setAnimationPreset] = useState<NavAnimationPreset>("spring_bounce");
  const [speed, setSpeed] = useState<number>(1);
  const [framework, setFramework] = useState<PromptFramework>("flutter_dart");
  const [tool, setTool] = useState<PromptTool>("antigravity");
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [autoTick, setAutoTick] = useState<number>(0);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inspectingStyle, setInspectingStyle] = useState<NavStyleItem | null>(null);
  const [modalTab, setModalTab] = useState<"prompt" | "code">("prompt");

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setAutoTick((t) => (t + 1) % 5);
    }, 1500 / speed);
    return () => clearInterval(timer);
  }, [autoPlay, speed]);

  const filteredStyles =
    selectedCategory === "all"
      ? NAV_STYLES
      : NAV_STYLES.filter((s) => s.category === selectedCategory);

  const buildPromptFor = (style: NavStyleItem) =>
    generateNavStylePrompt({
      navStyle: style,
      accentColor,
      surfaceMode,
      animationPreset,
      speed,
      tool,
      framework,
    });

  const handleCopyPrompt = (style: NavStyleItem) => {
    const prompt = buildPromptFor(style);
    navigator.clipboard.writeText(prompt);
    setCopiedId(style.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const categories: Array<{ id: NavStyleCategory | "all"; label: string }> = [
    { id: "all", label: "All 12 Nav Styles" },
    { id: "fab_notch", label: "Center FAB Notch" },
    { id: "pill_morph", label: "Expanding Pills" },
    { id: "line_dot", label: "Lines & Dots" },
    { id: "floating_glass", label: "Glass & Halo" },
  ];

  return (
    <section className="space-y-6 pt-4 border-t border-brand-border/80">
      {/* Header Banner (Bring Your Flutter UI to Life / DarkNova) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-violet/15 border border-brand-violet/30 text-[11px] font-mono text-[#B7ACFF] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
            <span>Bring Your Flutter &amp; App UI to Life • Navigation Studio</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-brand-pearl tracking-tight">
            12 Interactive Navigation Designs, Animations &amp; Custom Colors
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-2xl">
            Click tabs inside any navigation bar below to test its live animation. Customize colors, light/dark/glass surfaces, and spring curves, then copy the Flutter or React prompt.
          </p>
        </div>

        {/* Auto-Animate Toggle */}
        <Button
          variant={autoPlay ? "coral" : "outline"}
          size="sm"
          onClick={() => setAutoPlay(!autoPlay)}
          className="gap-1.5 shrink-0 self-start lg:self-auto"
        >
          {autoPlay ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Stop Auto-Play</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Auto-Animate All 12</span>
            </>
          )}
        </Button>
      </div>

      {/* Rich Customization Bar (More Options to User) */}
      <div className="p-4 rounded-2xl bg-brand-surface border border-brand-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Surface Mode */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted block">
            Surface Style
          </span>
          <div className="grid grid-cols-3 gap-1 bg-brand-bg p-1 rounded-xl border border-brand-border">
            {[
              { id: "light", label: "Light", icon: Sun },
              { id: "dark", label: "Dark", icon: Moon },
              { id: "glass", label: "Glass", icon: Layers },
            ].map((m) => {
              const Icon = m.icon;
              const active = surfaceMode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSurfaceMode(m.id as NavSurfaceMode)}
                  className={cn(
                    "py-1.5 rounded-lg font-medium flex items-center justify-center gap-1 transition-colors",
                    active
                      ? "bg-brand-elevated text-brand-pearl border border-brand-border"
                      : "text-brand-muted hover:text-brand-pearl"
                  )}
                >
                  <Icon className="w-3 h-3" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Presets + Custom Picker */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted flex items-center justify-between">
            <span>Design Color</span>
            <span className="font-mono text-brand-pearl uppercase">{accentColor}</span>
          </span>
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {NAV_COLOR_PRESETS.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => setAccentColor(c.hex)}
                title={c.name}
                className={cn(
                  "w-6 h-6 rounded-full border-2 transition-transform",
                  accentColor.toLowerCase() === c.hex.toLowerCase()
                    ? "scale-110 border-white ring-2 ring-brand-coral"
                    : "border-transparent opacity-80 hover:opacity-100"
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <label
              title="Custom color picker"
              className="w-6 h-6 rounded-full border border-brand-border bg-brand-elevated flex items-center justify-center cursor-pointer overflow-hidden"
            >
              <Palette className="w-3 h-3 text-brand-pearl pointer-events-none" />
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="opacity-0 absolute w-0 h-0"
              />
            </label>
          </div>
        </div>

        {/* Animation Feel & Speed */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted block">
            Animation Curve &amp; Speed
          </span>
          <div className="flex items-center gap-2">
            <select
              value={animationPreset}
              onChange={(e) => setAnimationPreset(e.target.value as NavAnimationPreset)}
              className="flex-1 bg-brand-elevated border border-brand-border rounded-xl px-2.5 py-2 text-xs text-brand-pearl focus:outline-none focus:border-brand-coral"
            >
              {Object.entries(NAV_ANIMATION_CURVES).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
            <div className="flex items-center bg-brand-bg rounded-xl border border-brand-border p-0.5">
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeed(s)}
                  className={cn(
                    "px-2 py-1 rounded-lg font-mono text-[10px]",
                    speed === s
                      ? "bg-brand-elevated text-brand-coral font-bold"
                      : "text-brand-muted hover:text-brand-pearl"
                  )}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Framework & AI Tool */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted block">
            Prompt Target Stack &amp; Tool
          </span>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value as PromptFramework)}
              className="bg-brand-elevated border border-brand-border rounded-xl px-2 py-2 text-xs text-brand-pearl focus:outline-none"
            >
              <option value="flutter_dart">Flutter + Dart</option>
              <option value="nextjs_tailwind">Next.js + Tailwind</option>
              <option value="react_typescript">React + TS</option>
              <option value="html_css_javascript">HTML + CSS + JS</option>
            </select>
            <select
              value={tool}
              onChange={(e) => setTool(e.target.value as PromptTool)}
              className="bg-brand-elevated border border-brand-border rounded-xl px-2 py-2 text-xs text-brand-pearl focus:outline-none"
            >
              <option value="antigravity">Antigravity</option>
              <option value="cursor">Cursor</option>
              <option value="stitch">Stitch</option>
              <option value="claude_code">Claude Code</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors border",
              selectedCategory === cat.id
                ? "bg-brand-elevated text-brand-pearl border-brand-coral/50 font-semibold"
                : "bg-brand-surface/60 text-brand-muted hover:text-brand-pearl border-brand-border"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 2-Column Live Navigation Gallery Grid (inspired by Image 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredStyles.map((style, idx) => (
          <div
            key={style.id}
            className="bg-brand-surface border border-brand-border hover:border-brand-muted/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4 transition-colors"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-brand-elevated text-brand-cyan border border-brand-border">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-bold text-brand-pearl">
                    {style.name}
                  </h3>
                </div>
                <p className="text-xs text-brand-muted mt-1">{style.description}</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setInspectingStyle(style);
                    setModalTab("prompt");
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-brand-elevated hover:bg-brand-border text-brand-pearl border border-brand-border text-[11px] font-medium flex items-center gap-1 transition-colors"
                >
                  <Code className="w-3.5 h-3.5 text-brand-cyan" />
                  <span className="hidden sm:inline">Code &amp; Prompt</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopyPrompt(style)}
                  className="px-2.5 py-1.5 rounded-xl bg-brand-coral hover:bg-[#FF7D83] text-brand-bg text-[11px] font-semibold flex items-center gap-1 transition-colors shadow-sm"
                >
                  {copiedId === style.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Live Clickable Navigation Bar Stage */}
            <div
              className={cn(
                "p-4 rounded-xl border flex items-center justify-center min-h-[86px]",
                surfaceMode === "light"
                  ? "bg-slate-100 border-slate-300/60"
                  : "bg-brand-bg border-brand-border/80"
              )}
            >
              <NavBarRenderer
                navStyle={style}
                accentColor={accentColor}
                surfaceMode={surfaceMode}
                animationPreset={animationPreset}
                speed={speed}
                controlledActiveIndex={autoPlay ? (autoTick + idx) % 5 : undefined}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Prompt & Code Modal */}
      {inspectingStyle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-brand-surface border border-brand-border rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div>
                <h3 className="text-base font-bold text-brand-pearl">
                  {inspectingStyle.name}
                </h3>
                <p className="text-xs text-brand-muted">
                  {NAV_ANIMATION_CURVES[animationPreset].label} • {surfaceMode.toUpperCase()} • {accentColor}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInspectingStyle(null)}
                className="p-1.5 rounded-lg text-brand-muted hover:text-brand-pearl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Preview inside Modal */}
            <div
              className={cn(
                "p-5 rounded-xl border",
                surfaceMode === "light" ? "bg-slate-100 border-slate-300" : "bg-brand-bg border-brand-border"
              )}
            >
              <NavBarRenderer
                navStyle={inspectingStyle}
                accentColor={accentColor}
                surfaceMode={surfaceMode}
                animationPreset={animationPreset}
                speed={speed}
                instanceId={`modal-${inspectingStyle.id}`}
              />
            </div>

            <div className="flex items-center justify-between border-b border-brand-border pb-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModalTab("prompt")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5",
                    modalTab === "prompt"
                      ? "bg-brand-elevated text-brand-pearl border border-brand-border"
                      : "text-brand-muted hover:text-brand-pearl"
                  )}
                >
                  <Wand2 className="w-3.5 h-3.5 text-brand-coral" />
                  <span>AI Prompt ({framework === "flutter_dart" ? "Flutter" : framework})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab("code")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5",
                    modalTab === "code"
                      ? "bg-brand-elevated text-brand-pearl border border-brand-border"
                      : "text-brand-muted hover:text-brand-pearl"
                  )}
                >
                  <Code className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>{framework === "flutter_dart" ? "Flutter Dart" : "React + Motion"}</span>
                </button>
              </div>

              <Button
                variant="coral"
                size="sm"
                onClick={() => {
                  const content =
                    modalTab === "prompt"
                      ? buildPromptFor(inspectingStyle)
                      : framework === "flutter_dart"
                      ? inspectingStyle.flutterSnippet
                      : inspectingStyle.reactSnippet;
                  navigator.clipboard.writeText(content);
                  setCopiedId("modal");
                  setTimeout(() => setCopiedId(null), 1800);
                }}
                className="gap-1.5 text-xs"
              >
                {copiedId === "modal" ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>

            <pre className="p-4 rounded-xl bg-brand-bg border border-brand-border text-xs font-mono text-brand-pearl overflow-x-auto max-h-64 leading-relaxed whitespace-pre-wrap">
              <code>
                {modalTab === "prompt"
                  ? buildPromptFor(inspectingStyle)
                  : framework === "flutter_dart"
                  ? inspectingStyle.flutterSnippet
                  : inspectingStyle.reactSnippet}
              </code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
};
