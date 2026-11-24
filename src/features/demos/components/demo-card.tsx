"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DemoAppItem, DemoPartId } from "../types";
import { DemoVideoPreview } from "./demo-video-preview";
import { Play, Pause, Wand2, ArrowRight, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DemoCardProps {
  app: DemoAppItem;
}

export const DemoCard: React.FC<DemoCardProps> = ({ app }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const quickParts: Array<{ id: DemoPartId; label: string }> = [
    { id: "bottom_nav", label: "Bottom Nav" },
    { id: "top_nav", label: "Top Nav" },
    { id: "core_ui", label: "Cards & Charts" },
    { id: "action_sheet", label: "Drawer" },
  ];

  return (
    <article className="group bg-brand-surface border border-brand-border hover:border-brand-coral/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1">
      {/* Live Animated Video Preview Viewport */}
      <div className="relative aspect-[16/11] w-full bg-brand-bg border-b border-brand-border overflow-hidden">
        <Link href={`/demos/${app.slug}`} className="block w-full h-full">
          <DemoVideoPreview
            app={app}
            compact={true}
            controlledPlaying={isPlaying}
            onPlayingChange={setIsPlaying}
          />
        </Link>

        {/* Video Status Overlay Pill */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            className="px-2 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white flex items-center gap-1 hover:bg-black/90 transition-colors"
            title={isPlaying ? "Pause live demo" : "Play live demo"}
          >
            {isPlaying ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE DEMO</span>
                <Pause className="w-2.5 h-2.5 ml-0.5" />
              </>
            ) : (
              <>
                <Play className="w-2.5 h-2.5 text-brand-cyan" />
                <span>PAUSED</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info & Modular Prompt Shortcuts */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <Link
              href={`/demos/${app.slug}`}
              className="text-base font-bold text-brand-pearl group-hover:text-brand-coral transition-colors line-clamp-1"
            >
              {app.title}
            </Link>
            <Badge variant="muted" size="sm" className="uppercase font-mono text-[10px] shrink-0">
              {app.platform.replace("_", " ")}
            </Badge>
          </div>
          <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
            {app.tagline}
          </p>
        </div>

        {/* Clickable Module Prompt Chips */}
        <div className="space-y-2 pt-2 border-t border-brand-border/60">
          <div className="flex items-center justify-between text-[10px] font-mono text-brand-muted uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Wand2 className="w-3 h-3 text-brand-coral" />
              Get Prompt For:
            </span>
            <Link
              href={`/demos/${app.slug}`}
              className="text-brand-cyan hover:underline flex items-center gap-0.5"
            >
              <span>Open Studio</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {quickParts.map((part) => (
              <Link
                key={part.id}
                href={`/demos/${app.slug}?part=${part.id}`}
                className="px-2 py-1 rounded-lg bg-brand-elevated hover:bg-brand-coral hover:text-brand-bg border border-brand-border text-[11px] font-medium text-brand-pearl transition-colors"
              >
                {part.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
