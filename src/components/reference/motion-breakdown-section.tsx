"use client";

import React, { useState } from "react";
import { AnimationItem } from "@/types";
import { ProvenanceBadge } from "@/components/ui/provenance-badge";
import { Play, RotateCcw, Code, Sparkles, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MotionBreakdownSectionProps {
  animations: AnimationItem[];
}

export const MotionBreakdownSection: React.FC<MotionBreakdownSectionProps> = ({
  animations,
}) => {
  const [activeSnippetTab, setActiveSnippetTab] = useState<Record<string, string>>({});
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  if (!animations || animations.length === 0) {
    return (
      <div className="p-8 text-center bg-brand-surface rounded-2xl border border-brand-border text-brand-muted text-sm">
        No animation records attached to this reference yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {animations.map((anim) => {
        const snippets = anim.snippets || [];
        const currentLang =
          activeSnippetTab[anim.id] || snippets[0]?.framework || "react_ts";
        const currentSnippet =
          snippets.find((s) => s.framework === currentLang) || snippets[0];

        return (
          <div
            key={anim.id}
            className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-4"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-semibold text-brand-pearl">
                    {anim.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-brand-elevated text-brand-cyan border border-brand-border">
                    {anim.category.replace("_", " ")}
                  </span>
                </div>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  {anim.description}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <ProvenanceBadge
                  provenance={anim.provenance}
                  confidence={anim.confidence}
                />
              </div>
            </div>

            {/* Technical Parameters Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-brand-elevated/60 rounded-xl border border-brand-border/60 text-xs">
              <div>
                <span className="text-[10px] text-brand-muted uppercase tracking-wider block">
                  Trigger
                </span>
                <span className="font-medium text-brand-pearl capitalize">
                  {anim.triggerType}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-brand-muted uppercase tracking-wider block">
                  Duration / Delay
                </span>
                <span className="font-mono text-brand-pearl">
                  {anim.durationMs ? `${anim.durationMs}ms` : "Instant"}
                  {anim.delayMs ? ` (delay ${anim.delayMs}ms)` : ""}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-brand-muted uppercase tracking-wider block">
                  Easing / Spring
                </span>
                <span className="font-mono text-brand-pearl text-[11px] truncate block">
                  {anim.springConfig
                    ? `k:${anim.springConfig.stiffness} c:${anim.springConfig.damping}`
                    : anim.easing || "cubic-bezier(0.16,1,0.3,1)"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-brand-muted uppercase tracking-wider block">
                  Reduced Motion
                </span>
                <span className="font-medium text-emerald-400 capitalize">
                  {anim.reducedMotionBehavior} fallback
                </span>
              </div>
            </div>

            {/* Code Snippets Section */}
            {snippets.length > 0 && currentSnippet && (
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-brand-border pb-2">
                  <div className="flex items-center gap-2">
                    <Code className="w-3.5 h-3.5 text-brand-muted" />
                    <span className="text-xs font-medium text-brand-pearl">
                      Implementation Snippet
                    </span>
                    <div className="flex items-center gap-1 ml-2">
                      {snippets.map((snip) => (
                        <button
                          key={snip.framework}
                          onClick={() =>
                            setActiveSnippetTab({
                              ...activeSnippetTab,
                              [anim.id]: snip.framework,
                            })
                          }
                          className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                            currentLang === snip.framework
                              ? "bg-brand-coral/20 text-brand-coral font-semibold"
                              : "text-brand-muted hover:text-brand-pearl"
                          }`}
                        >
                          {snip.framework === "react_ts" ? "React (Motion)" : "Flutter"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleCopyCode(anim.id, currentSnippet.code)
                    }
                    className="flex items-center gap-1 text-xs text-brand-muted hover:text-brand-pearl"
                  >
                    {copiedCodeId === anim.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-3 bg-brand-bg rounded-xl border border-brand-border text-xs font-mono text-brand-pearl overflow-x-auto leading-relaxed">
                  <code>{currentSnippet.code}</code>
                </pre>
                {currentSnippet.notes && (
                  <p className="text-[11px] text-brand-muted italic">
                    {currentSnippet.notes}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
