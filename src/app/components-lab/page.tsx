"use client";

import React, { useState } from "react";
import { CURATED_COMPONENTS, ComponentCatalogItem } from "@/data/components";
import { Button } from "@/components/ui/button";
import {
  Layers,
  Smartphone,
  Tablet,
  Monitor,
  Check,
  Copy,
  Code,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ComponentsLabPage() {
  const [selectedComp, setSelectedComp] = useState<ComponentCatalogItem>(
    CURATED_COMPONENTS[0]
  );
  const [activeState, setActiveState] = useState<string>("default");
  const [viewportWidth, setViewportWidth] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [snippetLang, setSnippetLang] = useState<"react" | "flutter">("react");
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const viewportWidths = {
    mobile: "max-w-[360px]",
    tablet: "max-w-[600px]",
    desktop: "max-w-full",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-brand-violet" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-pearl tracking-tight">
              Component Lab
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-xl">
            Interactive UI components with states, responsive previews, and production-ready React & Flutter implementation code.
          </p>
        </div>

        {/* Viewport Width Switcher */}
        <div className="flex items-center gap-1.5 bg-brand-surface p-1 rounded-xl border border-brand-border self-start md:self-auto">
          <button
            onClick={() => setViewportWidth("mobile")}
            className={cn(
              "p-2 rounded-lg text-xs transition-colors flex items-center gap-1",
              viewportWidth === "mobile"
                ? "bg-brand-elevated text-brand-coral font-bold"
                : "text-brand-muted hover:text-brand-pearl"
            )}
            title="Mobile (360px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
          <button
            onClick={() => setViewportWidth("tablet")}
            className={cn(
              "p-2 rounded-lg text-xs transition-colors flex items-center gap-1",
              viewportWidth === "tablet"
                ? "bg-brand-elevated text-brand-coral font-bold"
                : "text-brand-muted hover:text-brand-pearl"
            )}
            title="Tablet (600px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setViewportWidth("desktop")}
            className={cn(
              "p-2 rounded-lg text-xs transition-colors flex items-center gap-1",
              viewportWidth === "desktop"
                ? "bg-brand-elevated text-brand-coral font-bold"
                : "text-brand-muted hover:text-brand-pearl"
            )}
            title="Full Width"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Component Selector Sidebar */}
        <div className="space-y-2 lg:col-span-1">
          <h3 className="text-xs uppercase font-semibold text-brand-muted tracking-wider mb-2">
            Component Catalog
          </h3>
          {CURATED_COMPONENTS.map((comp) => (
            <button
              key={comp.id}
              onClick={() => {
                setSelectedComp(comp);
                setActiveState("default");
              }}
              className={cn(
                "w-full text-left p-3 rounded-xl border text-xs transition-all flex flex-col justify-between gap-1",
                selectedComp.id === comp.id
                  ? "bg-brand-elevated border-brand-coral text-brand-pearl font-semibold shadow-md"
                  : "bg-brand-surface border-brand-border text-brand-muted hover:text-brand-pearl"
              )}
            >
              <span className="truncate">{comp.name}</span>
              <span className="text-[10px] font-mono uppercase text-brand-muted/70">
                {comp.category}
              </span>
            </button>
          ))}
        </div>

        {/* Main Stage & Code Inspector */}
        <div className="space-y-6 lg:col-span-3">
          {/* Component Title & State Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-brand-surface border border-brand-border rounded-2xl">
            <div>
              <h3 className="text-base font-bold text-brand-pearl">
                {selectedComp.name}
              </h3>
              <p className="text-xs text-brand-muted mt-0.5">
                {selectedComp.description}
              </p>
            </div>

            {/* Interactive States Picker */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <span className="text-[11px] text-brand-muted font-mono mr-1">State:</span>
              {selectedComp.availableStates.map((st) => (
                <button
                  key={st}
                  onClick={() => setActiveState(st)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition-colors border",
                    activeState === st
                      ? "bg-brand-coral/20 text-brand-coral border-brand-coral/40 font-bold"
                      : "bg-brand-elevated text-brand-muted border-brand-border hover:text-brand-pearl"
                  )}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Preview Canvas */}
          <div className="bg-brand-bg border border-brand-border rounded-2xl p-8 sm:p-12 flex items-center justify-center min-h-[260px] overflow-hidden">
            <div
              className={cn(
                "w-full transition-all duration-300 flex items-center justify-center",
                viewportWidths[viewportWidth]
              )}
            >
              {selectedComp.id === "comp-action-btn" && (
                <Button
                  variant="primary"
                  size="lg"
                  isLoading={activeState === "loading"}
                  disabled={activeState === "disabled"}
                  className={cn(
                    activeState === "hover" && "scale-105",
                    activeState === "active" && "scale-95",
                    activeState === "focus" && "ring-2 ring-brand-coral"
                  )}
                >
                  Deploy Application
                </Button>
              )}

              {selectedComp.id === "comp-search-bar" && (
                <div className="w-full max-w-md relative flex items-center">
                  <input
                    disabled={activeState === "disabled"}
                    placeholder="Search anything (e.g. issues, cycle)..."
                    className={cn(
                      "w-full pl-4 pr-12 py-3 bg-brand-surface border border-brand-border rounded-xl text-xs text-brand-pearl placeholder:text-brand-muted/60 transition-colors",
                      activeState === "focus" && "border-brand-coral ring-1 ring-brand-coral",
                      activeState === "disabled" && "opacity-50"
                    )}
                  />
                  <kbd className="absolute right-3 px-1.5 py-0.5 rounded text-[10px] bg-brand-elevated text-brand-muted font-mono">
                    ⌘K
                  </kbd>
                </div>
              )}

              {selectedComp.id === "comp-bento-card" && (
                <div
                  className={cn(
                    "p-6 rounded-2xl bg-brand-surface border border-brand-border transition-all w-full max-w-sm shadow-xl",
                    activeState === "hover" && "-translate-y-1 border-brand-coral/50",
                    activeState === "active" && "scale-95"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-brand-cyan uppercase font-semibold">
                      Active Sprint
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <h4 className="text-base font-semibold text-brand-pearl">
                    Core Engine v2.4
                  </h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    14 issues resolved this week with 98.4% velocity score.
                  </p>
                </div>
              )}

              {selectedComp.id === "comp-status-pill" && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Connected • 18ms latency</span>
                </div>
              )}
            </div>
          </div>

          {/* Code Generator & Snippets */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-brand-coral" />
                <h4 className="text-sm font-semibold text-brand-pearl">
                  Component Code Implementation
                </h4>
                <div className="flex items-center gap-1 ml-3">
                  <button
                    onClick={() => setSnippetLang("react")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-mono transition-colors",
                      snippetLang === "react"
                        ? "bg-brand-coral/20 text-brand-coral font-bold"
                        : "text-brand-muted hover:text-brand-pearl"
                    )}
                  >
                    React + Tailwind
                  </button>
                  <button
                    onClick={() => setSnippetLang("flutter")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-mono transition-colors",
                      snippetLang === "flutter"
                        ? "bg-brand-coral/20 text-brand-coral font-bold"
                        : "text-brand-muted hover:text-brand-pearl"
                    )}
                  >
                    Flutter (Dart)
                  </button>
                </div>
              </div>

              <button
                onClick={() =>
                  handleCopy(
                    snippetLang === "react"
                      ? selectedComp.codeSnippets.react
                      : selectedComp.codeSnippets.flutter
                  )
                }
                className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-pearl transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 bg-brand-bg rounded-xl border border-brand-border text-xs font-mono text-brand-pearl overflow-x-auto leading-relaxed max-h-64">
              <code>
                {snippetLang === "react"
                  ? selectedComp.codeSnippets.react
                  : selectedComp.codeSnippets.flutter}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
