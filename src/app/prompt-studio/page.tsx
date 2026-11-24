"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { storage } from "@/lib/storage";
import {
  ReferenceItem,
  PromptTool,
  PromptScope,
  PromptFramework,
  PromptFidelity,
  PromptInputParams,
} from "@/types";
import { generateImplementationPrompt } from "@/lib/prompt-engine/adapters";
import { buildPromptIR } from "@/lib/prompt-engine/prompt-ir";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wand2,
  Copy,
  Check,
  Download,
  RotateCcw,
  Sliders,
  Code,
  FileText,
  ShieldCheck,
  Eye,
  Sparkles,
  Bot,
  Laptop,
  Terminal,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PromptStudioPage() {
  const searchParams = useSearchParams();
  const initialRefId = searchParams.get("referenceId");

  const [references, setReferences] = useState<ReferenceItem[]>([]);
  const [selectedRefId, setSelectedRefId] = useState<string>(initialRefId || "ref-linear");
  const [tool, setTool] = useState<PromptTool>("antigravity");
  const [scope, setScope] = useState<PromptScope>("complete_application");
  const [framework, setFramework] = useState<PromptFramework>("nextjs_tailwind");
  const [fidelity, setFidelity] = useState<PromptFidelity>("close_recreation");
  const [intensity, setIntensity] = useState<"subtle" | "balanced" | "expressive">("balanced");
  const [includeAccessibility, setIncludeAccessibility] = useState(true);
  const [includeAssumptions, setIncludeAssumptions] = useState(true);
  const [additionalInstructions, setAdditionalInstructions] = useState("");

  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [activeViewTab, setActiveViewTab] = useState<"prompt" | "ir">("prompt");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const list = storage.getReferences();
    setReferences(list);
    if (!initialRefId && list.length > 0) {
      setSelectedRefId(list[0].id);
    }
  }, [initialRefId]);

  const currentRef = references.find((r) => r.id === selectedRefId) || references[0];

  // Recompile prompt whenever parameters change
  useEffect(() => {
    if (!currentRef) return;

    const params: PromptInputParams = {
      referenceId: currentRef.id,
      tool,
      scope,
      framework,
      fidelity,
      animationIntensity: intensity,
      includeAccessibility,
      includeAssumptions,
      additionalInstructions,
    };

    const result = generateImplementationPrompt(params, currentRef);
    setGeneratedPrompt(result);
  }, [
    currentRef,
    tool,
    scope,
    framework,
    fidelity,
    intensity,
    includeAccessibility,
    includeAssumptions,
    additionalInstructions,
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedPrompt], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `motionbase-prompt-${currentRef?.slug || "spec"}-${tool}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tools: Array<{ id: PromptTool; name: string; tag: string; icon: any }> = [
    { id: "antigravity", name: "Google Antigravity", tag: "Agent Workflow", icon: Bot },
    { id: "cursor", name: "Cursor", tag: "Codebase Composer", icon: Laptop },
    { id: "stitch", name: "Google Stitch", tag: "Visual UI Design", icon: Sparkles },
    { id: "claude_code", name: "Claude Code", tag: "Terminal Agent", icon: Terminal },
  ];

  const scopes: Array<{ id: PromptScope; name: string; desc: string }> = [
    { id: "complete_application", name: "Complete App", desc: "Front-to-back screens & components" },
    { id: "individual_screen", name: "Single Screen", desc: "One isolated screen view" },
    { id: "animation_motion", name: "Motion & Interaction", desc: "Spring physics & transitions" },
    { id: "design_system", name: "Design System", desc: "Tokens, colors & components" },
  ];

  const frameworks: Array<{ id: PromptFramework; name: string }> = [
    { id: "nextjs_tailwind", name: "Next.js + Tailwind CSS" },
    { id: "react_typescript", name: "React + TypeScript" },
    { id: "flutter_dart", name: "Flutter + Dart" },
    { id: "html_css_javascript", name: "HTML5 + CSS + JS" },
  ];

  const promptIR = currentRef ? buildPromptIR(currentRef, scope, framework) : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-brand-coral" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-pearl tracking-tight">
              AI Prompt Studio
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-xl">
            Compile structured, verified reference metadata into implementation briefs tailored to your AI coding agent and tech stack.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="gap-1.5 text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .md</span>
          </Button>

          <Button
            variant="coral"
            size="sm"
            onClick={handleCopy}
            className="gap-1.5 text-xs shadow-md shadow-brand-coral/20"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Prompt Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Prompt</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Configuration Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Reference Selector */}
          <div className="p-4 bg-brand-surface border border-brand-border rounded-2xl space-y-3">
            <label className="text-xs font-semibold text-brand-pearl uppercase tracking-wider block">
              1. Source Design Reference
            </label>
            <select
              value={selectedRefId}
              onChange={(e) => setSelectedRefId(e.target.value)}
              className="w-full bg-brand-elevated border border-brand-border rounded-xl p-2.5 text-xs text-brand-pearl focus:outline-none focus:border-brand-coral"
            >
              {references.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.platform.toUpperCase()} • {r.category})
                </option>
              ))}
            </select>
            {currentRef && (
              <p className="text-[11px] text-brand-muted italic line-clamp-1">
                "{currentRef.summary}"
              </p>
            )}
          </div>

          {/* AI Tool Selector */}
          <div className="p-4 bg-brand-surface border border-brand-border rounded-2xl space-y-3">
            <label className="text-xs font-semibold text-brand-pearl uppercase tracking-wider block">
              2. Target AI Tool Profile
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {tools.map((t) => {
                const Icon = t.icon;
                const isSelected = tool === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTool(t.id)}
                    className={cn(
                      "p-3 rounded-xl border text-left transition-all flex flex-col justify-between",
                      isSelected
                        ? "bg-brand-elevated border-brand-coral text-brand-pearl shadow-md shadow-brand-coral/10 ring-1 ring-brand-coral"
                        : "bg-brand-elevated/40 border-brand-border text-brand-muted hover:text-brand-pearl hover:bg-brand-elevated"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Icon className={cn("w-4 h-4", isSelected ? "text-brand-coral" : "text-brand-muted")} />
                      <span className="text-[9px] font-mono uppercase text-brand-muted/70">
                        {t.tag}
                      </span>
                    </div>
                    <span className="text-xs font-bold truncate">{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scope Selector */}
          <div className="p-4 bg-brand-surface border border-brand-border rounded-2xl space-y-3">
            <label className="text-xs font-semibold text-brand-pearl uppercase tracking-wider block">
              3. Generation Scope
            </label>
            <div className="grid grid-cols-2 gap-2">
              {scopes.map((s) => {
                const isSelected = scope === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setScope(s.id)}
                    className={cn(
                      "p-2.5 rounded-xl border text-left transition-all",
                      isSelected
                        ? "bg-brand-elevated border-brand-cyan text-brand-pearl ring-1 ring-brand-cyan"
                        : "bg-brand-elevated/40 border-brand-border text-brand-muted hover:text-brand-pearl"
                    )}
                  >
                    <span className="text-xs font-bold block">{s.name}</span>
                    <span className="text-[10px] text-brand-muted/80 block mt-0.5 line-clamp-1">
                      {s.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Technology & Framework */}
          <div className="p-4 bg-brand-surface border border-brand-border rounded-2xl space-y-3">
            <label className="text-xs font-semibold text-brand-pearl uppercase tracking-wider block">
              4. Implementation Framework
            </label>
            <div className="grid grid-cols-2 gap-2">
              {frameworks.map((fw) => {
                const isSelected = framework === fw.id;
                return (
                  <button
                    key={fw.id}
                    onClick={() => setFramework(fw.id)}
                    className={cn(
                      "p-2.5 rounded-xl border text-xs font-medium text-left transition-all",
                      isSelected
                        ? "bg-brand-elevated border-brand-violet text-brand-pearl ring-1 ring-brand-violet font-semibold"
                        : "bg-brand-elevated/40 border-brand-border text-brand-muted hover:text-brand-pearl"
                    )}
                  >
                    {fw.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Advanced Options (Fidelity, Intensity, Toggles) */}
          <div className="p-4 bg-brand-surface border border-brand-border rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-pearl uppercase tracking-wider">
                5. Fidelity & Constraints
              </span>
              <Sliders className="w-3.5 h-3.5 text-brand-muted" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-brand-muted block mb-1">Fidelity</label>
                <select
                  value={fidelity}
                  onChange={(e) => setFidelity(e.target.value as any)}
                  className="w-full bg-brand-elevated border border-brand-border rounded-xl p-2 text-xs text-brand-pearl"
                >
                  <option value="inspiration">Inspiration (Creative)</option>
                  <option value="close_recreation">Close Recreation</option>
                  <option value="pixel_focused">Pixel-Focused Strict</option>
                </select>
              </div>

              <div>
                <label className="text-brand-muted block mb-1">Motion Feel</label>
                <select
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value as any)}
                  className="w-full bg-brand-elevated border border-brand-border rounded-xl p-2 text-xs text-brand-pearl"
                >
                  <option value="subtle">Subtle</option>
                  <option value="balanced">Balanced Spring</option>
                  <option value="expressive">Expressive</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 pt-1 text-xs text-brand-muted">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeAccessibility}
                  onChange={(e) => setIncludeAccessibility(e.target.checked)}
                  className="rounded border-brand-border text-brand-coral focus:ring-0 bg-brand-elevated"
                />
                <span>Include WCAG 2.1 AA & Reduced Motion Requirements</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeAssumptions}
                  onChange={(e) => setIncludeAssumptions(e.target.checked)}
                  className="rounded border-brand-border text-brand-coral focus:ring-0 bg-brand-elevated"
                />
                <span>Include Explicit Engineering Assumptions & Disclosures</span>
              </label>
            </div>

            <div>
              <label className="text-xs font-medium text-brand-muted block mb-1">
                Custom Instructions (Optional)
              </label>
              <textarea
                value={additionalInstructions}
                onChange={(e) => setAdditionalInstructions(e.target.value)}
                placeholder="e.g. Use Lucide icons, export components to separate files..."
                className="w-full bg-brand-elevated border border-brand-border rounded-xl p-3 text-xs text-brand-pearl placeholder:text-brand-muted/60 focus:border-brand-coral focus:outline-none h-16"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Prompt Output & Live IR Inspector */}
        <div className="lg:col-span-7 space-y-4 flex flex-col">
          {/* View Mode Switcher */}
          <div className="flex items-center justify-between border-b border-brand-border pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveViewTab("prompt")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeViewTab === "prompt"
                    ? "bg-brand-elevated text-brand-pearl border border-brand-border"
                    : "text-brand-muted hover:text-brand-pearl"
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-brand-coral" />
                <span>Generated AI Prompt</span>
              </button>

              <button
                onClick={() => setActiveViewTab("ir")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeViewTab === "ir"
                    ? "bg-brand-elevated text-brand-pearl border border-brand-border"
                    : "text-brand-muted hover:text-brand-pearl"
                }`}
              >
                <Code className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Prompt IR (JSON)</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-brand-muted">
              <span>{generatedPrompt.split("\n").length} lines</span>
              <span>•</span>
              <span>{generatedPrompt.length} chars</span>
            </div>
          </div>

          {/* Active View Container */}
          {activeViewTab === "prompt" && (
            <div className="relative flex-1 flex flex-col">
              <textarea
                value={generatedPrompt}
                onChange={(e) => setGeneratedPrompt(e.target.value)}
                className="w-full flex-1 min-h-[580px] p-5 bg-brand-surface border border-brand-border rounded-2xl text-xs font-mono text-brand-pearl leading-relaxed resize-y focus:outline-none focus:border-brand-coral/60 selection:bg-brand-coral selection:text-brand-bg shadow-inner"
                spellCheck={false}
              />
            </div>
          )}

          {activeViewTab === "ir" && (
            <div className="relative flex-1 flex flex-col">
              <pre className="w-full flex-1 min-h-[580px] p-5 bg-brand-surface border border-brand-border rounded-2xl text-xs font-mono text-brand-pearl leading-relaxed overflow-x-auto shadow-inner">
                <code>{JSON.stringify(promptIR, null, 2)}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
