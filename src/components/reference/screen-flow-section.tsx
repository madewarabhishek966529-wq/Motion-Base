"use client";

import React, { useState } from "react";
import { ScreenFlowEdge, ScreenItem } from "@/types";
import { ArrowRight, Navigation, LayoutGrid, List } from "lucide-react";
import { ProvenanceBadge } from "@/components/ui/provenance-badge";
import { InteractiveFlowGraph } from "@/components/design-intelligence/interactive-flow-graph";

interface ScreenFlowSectionProps {
  flows: ScreenFlowEdge[];
  screens: ScreenItem[];
}

export const ScreenFlowSection: React.FC<ScreenFlowSectionProps> = ({
  flows,
  screens,
}) => {
  const [viewMode, setViewMode] = useState<"graph" | "list">("graph");

  if (!flows || flows.length === 0) {
    return (
      <div className="p-8 text-center bg-brand-surface rounded-2xl border border-brand-border text-brand-muted text-sm">
        No screen transition pathways charted for this reference yet.
      </div>
    );
  }

  const screenMap = new Map(screens.map((s) => [s.id, s.title]));

  return (
    <div className="space-y-6">
      {/* Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-brand-surface border border-brand-border">
        <div className="flex items-start gap-3">
          <Navigation className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
          <div className="text-xs text-brand-muted leading-relaxed">
            <strong className="text-brand-pearl block mb-0.5 font-semibold">
              Screen Navigation & Interaction Pathways
            </strong>
            Observe how screens transition across tap, swipe, and modal triggers in the product flow.
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-brand-elevated p-1 rounded-xl border border-brand-border self-start sm:self-auto shrink-0">
          <button
            onClick={() => setViewMode("graph")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              viewMode === "graph"
                ? "bg-brand-surface text-brand-pearl shadow-sm border border-brand-border"
                : "text-brand-muted hover:text-brand-pearl"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-brand-coral" />
            <span>Graph View</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              viewMode === "list"
                ? "bg-brand-surface text-brand-pearl shadow-sm border border-brand-border"
                : "text-brand-muted hover:text-brand-pearl"
            }`}
          >
            <List className="w-3.5 h-3.5 text-brand-cyan" />
            <span>List View</span>
          </button>
        </div>
      </div>

      {/* Interactive Visual Graph */}
      {viewMode === "graph" && (
        <InteractiveFlowGraph flows={flows} screens={screens} />
      )}

      {/* Accessible List View */}
      {viewMode === "list" && (
        <div className="space-y-3">
          {flows.map((flow) => {
            const fromTitle =
              flow.fromScreenTitle || screenMap.get(flow.fromScreenId) || "Origin Screen";
            const toTitle =
              flow.toScreenTitle || screenMap.get(flow.toScreenId) || "Destination Screen";

            return (
              <div
                key={flow.id}
                className="bg-brand-surface border border-brand-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-brand-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-brand-elevated border border-brand-border font-medium text-xs text-brand-pearl">
                    {fromTitle}
                  </div>

                  <div className="flex flex-col items-center px-1">
                    <span className="text-[10px] font-mono text-brand-coral uppercase tracking-wider font-semibold">
                      {flow.trigger}
                    </span>
                    <ArrowRight className="w-4 h-4 text-brand-muted" />
                  </div>

                  <div className="px-3 py-1.5 rounded-lg bg-brand-elevated border border-brand-border font-medium text-xs text-brand-pearl">
                    {toTitle}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {flow.notes && (
                    <span className="text-xs text-brand-muted leading-tight sm:max-w-xs">
                      {flow.notes}
                    </span>
                  )}
                  <ProvenanceBadge
                    provenance={flow.provenance}
                    showIcon={false}
                    className="text-[10px] shrink-0"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
