"use client";

import React, { useState } from "react";
import { ComponentItem } from "@/types";
import { ProvenanceBadge } from "@/components/ui/provenance-badge";
import { Layers, Copy, Check, Code } from "lucide-react";

interface ComponentsInventorySectionProps {
  components: ComponentItem[];
}

export const ComponentsInventorySection: React.FC<ComponentsInventorySectionProps> = ({
  components,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!components || components.length === 0) {
    return (
      <div className="p-8 text-center bg-brand-surface rounded-2xl border border-brand-border text-brand-muted text-sm">
        No isolated component specifications recorded for this reference yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {components.map((comp) => (
          <div
            key={comp.id}
            className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-semibold text-brand-pearl font-mono">
                    {comp.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-brand-elevated text-brand-violet border border-brand-border">
                    {comp.componentType}
                  </span>
                </div>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  {comp.description}
                </p>
              </div>
              <ProvenanceBadge provenance={comp.provenance} />
            </div>

            {/* States & Variants */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-brand-elevated/60 rounded-xl border border-brand-border/60">
                <span className="text-[10px] uppercase tracking-wider text-brand-muted font-medium block mb-1.5">
                  Interactive States
                </span>
                <div className="flex flex-wrap gap-1">
                  {comp.states.map((st) => (
                    <span
                      key={st}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-brand-surface text-brand-pearl border border-brand-border"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              {comp.responsiveNotes && (
                <div className="p-3 bg-brand-elevated/60 rounded-xl border border-brand-border/60">
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted font-medium block mb-1">
                    Responsive Rule
                  </span>
                  <p className="text-xs text-brand-pearl leading-relaxed">
                    {comp.responsiveNotes}
                  </p>
                </div>
              )}
            </div>

            {/* Code Snippet */}
            {comp.codeSnippet && (
              <div className="space-y-2">
                <div className="flex items-center justify-between border-t border-brand-border pt-3">
                  <span className="text-xs font-mono text-brand-muted">
                    {comp.codeSnippet.framework}
                  </span>
                  <button
                    onClick={() => handleCopy(comp.id, comp.codeSnippet!.code)}
                    className="text-xs text-brand-muted hover:text-brand-pearl flex items-center gap-1"
                  >
                    {copiedId === comp.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Component</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 bg-brand-bg rounded-xl border border-brand-border text-xs font-mono text-brand-pearl overflow-x-auto leading-relaxed">
                  <code>{comp.codeSnippet.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
