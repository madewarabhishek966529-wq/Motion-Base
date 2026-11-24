"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ScreenFlowEdge, ScreenItem } from "@/types";
import { ProvenanceBadge } from "@/components/ui/provenance-badge";
import { Button } from "@/components/ui/button";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Smartphone,
  Navigation,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveFlowGraphProps {
  flows: ScreenFlowEdge[];
  screens: ScreenItem[];
}

export const InteractiveFlowGraph: React.FC<InteractiveFlowGraphProps> = ({
  flows,
  screens,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedFlowId, setSelectedFlowId] = useState<string | null>(
    flows[0]?.id || null
  );

  const screenMap = new Map(screens.map((s) => [s.id, s]));
  const activeFlow = flows.find((f) => f.id === selectedFlowId);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.15, 1.6));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.15, 0.7));
  const handleResetZoom = () => setZoomLevel(1);

  if (!flows || flows.length === 0) {
    return (
      <div className="p-8 text-center bg-brand-surface rounded-2xl border border-brand-border text-brand-muted text-sm">
        No interactive screen transition pathways recorded for this reference.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Visual Canvas Container */}
      <div className="relative bg-brand-surface border border-brand-border rounded-2xl overflow-hidden min-h-[420px] flex flex-col justify-between">
        {/* Canvas Toolbar */}
        <div className="p-3 border-b border-brand-border bg-brand-surface/80 backdrop-blur-sm flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-brand-coral" />
            <span className="text-xs font-semibold text-brand-pearl">
              Interactive Screen Flow Graph
            </span>
            <span className="text-[11px] font-mono text-brand-muted bg-brand-elevated px-2 py-0.5 rounded border border-brand-border">
              {flows.length} navigation paths
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg bg-brand-elevated hover:bg-brand-border text-brand-muted hover:text-brand-pearl"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-brand-muted px-1.5">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg bg-brand-elevated hover:bg-brand-border text-brand-muted hover:text-brand-pearl"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg bg-brand-elevated hover:bg-brand-border text-brand-muted hover:text-brand-pearl ml-1"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Node Graph Area */}
        <div className="p-8 overflow-x-auto flex items-center justify-center min-h-[300px]">
          <div
            className="flex flex-wrap items-center justify-center gap-8 transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
          >
            {flows.map((flow, idx) => {
              const fromScreen = screenMap.get(flow.fromScreenId);
              const toScreen = screenMap.get(flow.toScreenId);
              const isSelected = selectedFlowId === flow.id;

              return (
                <div
                  key={flow.id}
                  onClick={() => setSelectedFlowId(flow.id)}
                  className={cn(
                    "p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 bg-brand-elevated/80 hover:bg-brand-elevated shadow-lg",
                    isSelected
                      ? "border-brand-coral ring-2 ring-brand-coral/30 scale-105"
                      : "border-brand-border opacity-85 hover:opacity-100"
                  )}
                >
                  {/* From Node */}
                  <div className="flex flex-col items-center w-28">
                    <div className="relative aspect-[9/16] w-20 rounded-lg overflow-hidden border border-brand-border bg-black">
                      {fromScreen?.thumbnailUrl ? (
                        <Image
                          src={fromScreen.thumbnailUrl}
                          alt={fromScreen.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-brand-muted">
                          Screen
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-brand-pearl text-center mt-2 truncate w-full">
                      {fromScreen?.title || flow.fromScreenTitle || "Origin"}
                    </span>
                  </div>

                  {/* Transition Edge Arrow */}
                  <div className="flex flex-col items-center justify-center px-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-brand-coral/20 text-brand-coral font-bold mb-1 shadow-sm">
                      {flow.trigger}
                    </span>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-brand-coral via-brand-violet to-brand-cyan relative">
                      <div className="absolute right-0 -top-1 w-2.5 h-2.5 border-t-2 border-r-2 border-brand-cyan rotate-45" />
                    </div>
                  </div>

                  {/* To Node */}
                  <div className="flex flex-col items-center w-28">
                    <div className="relative aspect-[9/16] w-20 rounded-lg overflow-hidden border border-brand-border bg-black">
                      {toScreen?.thumbnailUrl ? (
                        <Image
                          src={toScreen.thumbnailUrl}
                          alt={toScreen.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-brand-muted">
                          Screen
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-brand-pearl text-center mt-2 truncate w-full">
                      {toScreen?.title || flow.toScreenTitle || "Target"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Transition Detail Inspector */}
        {activeFlow && (
          <div className="p-4 bg-brand-elevated/90 border-t border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono text-brand-coral uppercase font-bold">
                {activeFlow.trigger} interaction:
              </span>
              <span className="text-brand-pearl">
                {activeFlow.fromScreenTitle || screenMap.get(activeFlow.fromScreenId)?.title}
                {" → "}
                {activeFlow.toScreenTitle || screenMap.get(activeFlow.toScreenId)?.title}
              </span>
              {activeFlow.notes && (
                <span className="text-brand-muted italic hidden md:inline">
                  ({activeFlow.notes})
                </span>
              )}
            </div>

            <ProvenanceBadge
              provenance={activeFlow.provenance}
              showIcon={false}
              className="self-start sm:self-auto text-[10px]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
