"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { DEMO_APPS } from "@/features/demos/demo-apps";
import { DemoPartId } from "@/features/demos/types";
import { DemoVideoPreview } from "@/features/demos/components/demo-video-preview";
import { generateComponentPrompt } from "@/lib/prompt-engine/component-prompt-builder";
import { PromptFramework, PromptTool } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Copy,
  Check,
  Download,
  Wand2,
  PanelBottom,
  PanelTop,
  LayoutGrid,
  Layers,
  Palette,
  Sparkles,
  Code,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PART_OPTIONS: Array<{
  id: DemoPartId;
  label: string;
  desc: string;
  icon: any;
}> = [
  { id: "bottom_nav", label: "Bottom Navigation", desc: "Tab bar & active pill spring", icon: PanelBottom },
  { id: "top_nav", label: "Top Navigation", desc: "Sticky header, search & actions", icon: PanelTop },
  { id: "core_ui", label: "Cards & Charts", desc: "Main dashboard & feed rows", icon: LayoutGrid },
  { id: "action_sheet", label: "Bottom Sheet & Modal", desc: "Pull-up drawer & form sheet", icon: Layers },
  { id: "motion_tokens", label: "Tokens & Motion", desc: "Colors, typography & curves", icon: Palette },
  { id: "complete_app", label: "Complete App", desc: "Full end-to-end architecture", icon: Sparkles },
];

function DemoDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;
  const initialPart = (searchParams.get("part") as DemoPartId) || "bottom_nav";

  const app = DEMO_APPS.find((a) => a.slug === slug) || DEMO_APPS[0];

  const [selectedPart, setSelectedPart] = useState<DemoPartId>(
    app.modules[initialPart] ? initialPart : "bottom_nav"
  );
  const [tool, setTool] = useState<PromptTool>("antigravity");
  const [framework, setFramework] = useState<PromptFramework>("nextjs_tailwind");
  const [customNotes, setCustomNotes] = useState("");
  const [promptText, setPromptText] = useState("");
  const [activeTab, setActiveTab] = useState<"prompt" | "code">("prompt");
  const [copied, setCopied] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sync scene highlight when selecting a part explicitly
  const handleSelectPart = (part: DemoPartId) => {
    setSelectedPart(part);
    setIsPlaying(false);
    const matchingSceneIdx = app.scenes.findIndex((s) => s.highlightPart === part);
    if (matchingSceneIdx >= 0) {
      setSceneIndex(matchingSceneIdx);
    }
  };

  useEffect(() => {
    const compiled = generateComponentPrompt({
      app,
      partId: selectedPart,
      tool,
      framework,
      additionalInstructions: customNotes,
    });
    setPromptText(compiled);
  }, [app, selectedPart, tool, framework, customNotes]);

  const currentModule = app.modules[selectedPart] || app.modules.complete_app;
  const starterSnippet =
    framework === "flutter_dart"
      ? currentModule.sampleCodeFlutter
      : currentModule.sampleCodeReact;

  const handleCopy = () => {
    const textToCopy = activeTab === "prompt" ? promptText : starterSnippet;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([promptText], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${app.slug}-${selectedPart}-${tool}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Breadcrumb + Quick App Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex items-center gap-2 text-xs text-brand-muted">
          <Link href="/" className="hover:text-brand-pearl transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/demos" className="hover:text-brand-pearl transition-colors">
            Video Demos
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-pearl font-medium">{app.title}</span>
        </nav>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {DEMO_APPS.map((item) => (
            <Link
              key={item.id}
              href={`/demos/${item.slug}?part=${selectedPart}`}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap border transition-colors",
                item.id === app.id
                  ? "bg-brand-elevated text-brand-pearl border-brand-coral/60"
                  : "bg-brand-surface text-brand-muted hover:text-brand-pearl border-brand-border"
              )}
            >
              {item.title.split(" ")[0]}
            </Link>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-brand-border">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: app.accentColor }}
            />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-pearl tracking-tight">
              {app.title}
            </h1>
            <Badge variant="coral" size="sm" className="uppercase font-mono text-[10px]">
              Interactive Video Demo
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-2xl">
            {app.tagline} Select any app module below (Bottom Navigation, Top Navigation, Cards, or Drawer) to copy its ready-to-build AI prompt.
          </p>
        </div>

        <Link href="/demos">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Demos</span>
          </Button>
        </Link>
      </div>

      {/* Main Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Live Video App Demo */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <DemoVideoPreview
            app={app}
            compact={false}
            activePart={selectedPart}
            onSelectPart={handleSelectPart}
            controlledPlaying={isPlaying}
            onPlayingChange={setIsPlaying}
            controlledSceneIndex={sceneIndex}
            onSceneChange={setSceneIndex}
          />
        </div>

        {/* Right: Modular Part Selector + Prompt Generator */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Module Picker */}
          <div className="p-4 sm:p-5 bg-brand-surface border border-brand-border rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-brand-pearl">
                1. Click Any App Part to Get Its Prompt
              </h2>
              <span className="text-[11px] font-mono text-brand-coral">
                Highlights live in demo ←
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {PART_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedPart === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectPart(opt.id)}
                    className={cn(
                      "p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1",
                      isSelected
                        ? "bg-brand-elevated border-brand-coral text-brand-pearl ring-1 ring-brand-coral shadow-md"
                        : "bg-brand-bg/50 border-brand-border text-brand-muted hover:text-brand-pearl hover:bg-brand-elevated/60"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className={cn(
                          "w-4 h-4 shrink-0",
                          isSelected ? "text-brand-coral" : "text-brand-muted"
                        )}
                      />
                      <span className="text-xs font-bold truncate">{opt.label}</span>
                    </div>
                    <span className="text-[10px] text-brand-muted/80 line-clamp-1">
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Tool & Framework Controls */}
          <div className="p-4 sm:p-5 bg-brand-surface border border-brand-border rounded-2xl space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-pearl">
              2. Target AI Tool &amp; Tech Stack
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-brand-muted block mb-1">AI Coding Tool</label>
                <select
                  value={tool}
                  onChange={(e) => setTool(e.target.value as PromptTool)}
                  className="w-full bg-brand-elevated border border-brand-border rounded-xl p-2.5 text-xs text-brand-pearl focus:outline-none focus:border-brand-coral"
                >
                  <option value="antigravity">Google Antigravity</option>
                  <option value="cursor">Cursor</option>
                  <option value="stitch">Google Stitch</option>
                  <option value="claude_code">Claude Code</option>
                </select>
              </div>

              <div>
                <label className="text-brand-muted block mb-1">Framework</label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value as PromptFramework)}
                  className="w-full bg-brand-elevated border border-brand-border rounded-xl p-2.5 text-xs text-brand-pearl focus:outline-none focus:border-brand-coral"
                >
                  <option value="nextjs_tailwind">Next.js + Tailwind CSS</option>
                  <option value="react_typescript">React + TypeScript</option>
                  <option value="flutter_dart">Flutter + Dart</option>
                  <option value="html_css_javascript">HTML + CSS + JS</option>
                </select>
              </div>
            </div>

            <div>
              <input
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Optional extra instruction (e.g. Include Lucide icons and dark glass blur)..."
                className="w-full bg-brand-elevated border border-brand-border rounded-xl px-3.5 py-2 text-xs text-brand-pearl placeholder:text-brand-muted/60 focus:outline-none focus:border-brand-coral"
              />
            </div>
          </div>

          {/* 3. Prompt & Starter Code Output */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-brand-border flex flex-wrap items-center justify-between gap-2 bg-brand-elevated/40">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab("prompt")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                    activeTab === "prompt"
                      ? "bg-brand-elevated text-brand-pearl border border-brand-border"
                      : "text-brand-muted hover:text-brand-pearl"
                  )}
                >
                  <FileText className="w-3.5 h-3.5 text-brand-coral" />
                  <span>{currentModule.shortLabel} Prompt</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("code")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                    activeTab === "code"
                      ? "bg-brand-elevated text-brand-pearl border border-brand-border"
                      : "text-brand-muted hover:text-brand-pearl"
                  )}
                >
                  <Code className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>Starter Code</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="gap-1 text-xs h-8"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">.md</span>
                </Button>
                <Button
                  variant="coral"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-1.5 text-xs h-8"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy {activeTab === "prompt" ? "Prompt" : "Code"}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {activeTab === "prompt" ? (
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                className="w-full min-h-[380px] p-4 bg-brand-bg text-xs font-mono text-brand-pearl leading-relaxed resize-y focus:outline-none"
                spellCheck={false}
              />
            ) : (
              <pre className="w-full min-h-[380px] p-4 bg-brand-bg text-xs font-mono text-brand-pearl leading-relaxed overflow-x-auto">
                <code>{starterSnippet}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DemoDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-brand-muted animate-pulse">
          Loading Interactive App Demo Studio...
        </div>
      }
    >
      <DemoDetailContent />
    </Suspense>
  );
}
