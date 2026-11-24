"use client";

import React, { useState } from "react";
import { AnimationItem } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Play,
  RotateCcw,
  Check,
  Copy,
  Code,
  Accessibility,
  Heart,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MotionPlayerProps {
  animation: AnimationItem;
}

export const MotionPlayer: React.FC<MotionPlayerProps> = ({ animation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [key, setKey] = useState(0);
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleReplay = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setKey((prev) => prev + 1);
      setIsPlaying(true);
    }, 50);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentSnippet = animation.snippets[activeSnippetIndex] || animation.snippets[0];

  const renderPreviewElement = () => {
    const durationSec = (animation.durationMs || 300) / 1000 / playbackSpeed;

    if (reducedMotion) {
      return (
        <div className="w-52 p-4 rounded-2xl bg-brand-surface border border-brand-border text-center text-xs text-brand-pearl font-medium shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-brand-violet/20 text-brand-violet mx-auto mb-2 flex items-center justify-center">
            <Accessibility className="w-5 h-5" />
          </div>
          <span className="text-emerald-400 font-semibold block">Reduced Motion Mode</span>
          <span className="text-[11px] text-brand-muted">
            {animation.reducedMotionBehavior} accessible fallback
          </span>
        </div>
      );
    }

    switch (animation.id) {
      case "anim-spring-sheet":
        return (
          <div
            key={key}
            style={{
              transition: isPlaying
                ? `transform ${durationSec}s cubic-bezier(0.16, 1, 0.3, 1), opacity ${durationSec}s ease`
                : "none",
              transform: isPlaying ? "translateY(0)" : "translateY(42px)",
              opacity: isPlaying ? 1 : 0.65,
            }}
            className="w-56 p-4 rounded-2xl bg-brand-elevated border border-brand-border shadow-2xl text-center"
          >
            <div className="w-10 h-1 bg-brand-border rounded-full mx-auto mb-3" />
            <span className="text-xs font-semibold text-brand-pearl block">Modal Sheet</span>
            <span className="text-[10px] text-brand-cyan font-mono">Spring k:420 c:26</span>
          </div>
        );

      case "anim-ambient-glow":
        return (
          <div className="relative flex items-center justify-center">
            <div
              className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-brand-coral via-brand-violet to-brand-cyan opacity-55 blur-xl animate-pulseGlow"
              style={{ animationDuration: `${3.2 / playbackSpeed}s` }}
            />
            <div className="relative w-52 p-4 rounded-2xl bg-brand-surface border border-brand-border text-center shadow-2xl z-10">
              <span className="text-xs font-semibold text-brand-pearl block">
                Ambient Luminescence
              </span>
              <span className="text-[10px] text-brand-cyan font-mono">
                Continuous {(3.2 / playbackSpeed).toFixed(1)}s Glow
              </span>
            </div>
          </div>
        );

      case "anim-jelly-drag":
        return (
          <div
            key={key}
            style={{
              transition: isPlaying
                ? `transform ${durationSec}s cubic-bezier(0.34, 1.56, 0.64, 1)`
                : "none",
              transform: isPlaying
                ? "scale(1.1) rotate(-3deg) translateY(-6px)"
                : "scale(1) rotate(0deg)",
            }}
            className="w-48 p-3.5 rounded-xl bg-brand-violet text-white text-center font-semibold text-xs shadow-xl shadow-brand-violet/30 border border-white/20 cursor-grab"
          >
            Jelly Elastic Pull
          </div>
        );

      case "anim-heart-pop":
        return (
          <div className="relative flex items-center justify-center">
            <div
              key={`ring-${key}`}
              style={{
                transition: isPlaying
                  ? `transform ${durationSec * 1.2}s ease-out, opacity ${durationSec * 1.2}s ease-out`
                  : "none",
                transform: isPlaying ? "scale(1.8)" : "scale(0.8)",
                opacity: isPlaying ? 0 : 0.6,
              }}
              className="absolute w-16 h-16 rounded-full border-2 border-brand-coral pointer-events-none"
            />
            <button
              type="button"
              onClick={handleReplay}
              key={key}
              style={{
                transition: isPlaying
                  ? `transform ${durationSec}s cubic-bezier(0.175, 0.885, 0.32, 1.275)`
                  : "none",
                transform: isPlaying ? "scale(1.28)" : "scale(1)",
              }}
              className="relative w-16 h-16 rounded-full bg-brand-coral/20 border border-brand-coral/50 flex items-center justify-center text-brand-coral shadow-lg shadow-brand-coral/20 cursor-pointer"
              aria-label="Replay heart pop"
            >
              <Heart className="w-7 h-7 fill-brand-coral" />
            </button>
          </div>
        );

      case "anim-shimmer-skeleton":
        return (
          <div className="w-60 p-4 rounded-2xl bg-brand-surface border border-brand-border space-y-3 shadow-lg">
            <div className="h-4 w-3/4 rounded-md bg-brand-elevated overflow-hidden relative">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent animate-shimmer"
                style={{ animationDuration: `${1.8 / playbackSpeed}s` }}
              />
            </div>
            <div className="h-3 w-full rounded-md bg-brand-elevated overflow-hidden relative">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent animate-shimmer"
                style={{ animationDuration: `${1.8 / playbackSpeed}s` }}
              />
            </div>
            <div className="h-3 w-1/2 rounded-md bg-brand-elevated overflow-hidden relative">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent animate-shimmer"
                style={{ animationDuration: `${1.8 / playbackSpeed}s` }}
              />
            </div>
          </div>
        );

      case "anim-pill-morph":
        return (
          <div
            key={key}
            onClick={handleReplay}
            style={{
              transition: isPlaying
                ? `transform ${durationSec}s cubic-bezier(0.2, 0, 0, 1), border-color ${durationSec}s ease`
                : "none",
              transform: isPlaying ? "scaleX(1.35)" : "scaleX(1)",
            }}
            className={cn(
              "w-44 px-4 py-2.5 rounded-full bg-brand-elevated border flex items-center gap-2 text-xs text-brand-pearl shadow-lg cursor-pointer origin-center",
              isPlaying ? "border-brand-coral" : "border-brand-border"
            )}
          >
            <Search className="w-3.5 h-3.5 text-brand-coral shrink-0" />
            <span className="truncate font-mono text-[11px]">
              {isPlaying ? "Searching..." : "Search"}
            </span>
          </div>
        );

      default:
        return (
          <div
            key={key}
            style={{
              transition: isPlaying ? `all ${durationSec}s ease-in-out` : "none",
              transform: isPlaying ? "scale(1.05)" : "scale(1)",
            }}
            className="w-48 p-4 rounded-xl bg-brand-elevated border border-brand-border text-center text-xs text-brand-pearl"
          >
            {animation.name}
          </div>
        );
    }
  };

  return (
    <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden flex flex-col justify-between">
      {/* Top Header */}
      <div className="p-4 border-b border-brand-border flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-semibold text-brand-pearl font-mono">
              {animation.name}
            </h4>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-brand-elevated text-brand-coral border border-brand-border">
              {animation.category.replace("_", " ")}
            </span>
          </div>
          <p className="text-xs text-brand-muted mt-1 leading-relaxed">
            {animation.description}
          </p>
        </div>

        {/* Reduced motion toggle */}
        <button
          onClick={() => setReducedMotion(!reducedMotion)}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors shrink-0",
            reducedMotion
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              : "bg-brand-elevated text-brand-muted border-brand-border hover:text-brand-pearl"
          )}
          title="Toggle prefers-reduced-motion simulation"
        >
          <Accessibility className="w-3.5 h-3.5" />
          <span>Reduced Motion</span>
        </button>
      </div>

      {/* Live Interactive Player Stage */}
      <div className="relative aspect-[16/9] w-full bg-brand-bg flex items-center justify-center overflow-hidden border-b border-brand-border p-6">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#394B6E_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        {renderPreviewElement()}
      </div>

      {/* Control Strip */}
      <div className="p-3.5 bg-brand-surface/95 border-b border-brand-border flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Button
            variant={isPlaying ? "secondary" : "coral"}
            size="sm"
            onClick={handleReplay}
            className="gap-1.5 text-xs h-8"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isPlaying ? "Replay" : "Play Animation"}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsPlaying(false);
              setKey((k) => k + 1);
            }}
            className="text-brand-muted hover:text-brand-pearl h-8"
            title="Reset"
            aria-label="Reset animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-brand-muted font-mono mr-1">Speed:</span>
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => setPlaybackSpeed(s)}
              className={cn(
                "px-2 py-0.5 rounded text-[11px] font-mono transition-colors",
                playbackSpeed === s
                  ? "bg-brand-elevated text-brand-pearl border border-brand-border font-bold"
                  : "text-brand-muted hover:text-brand-pearl"
              )}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Code Snippets Section */}
      {animation.snippets.length > 0 && currentSnippet && (
        <div className="p-4 bg-brand-surface/60 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Code className="w-3.5 h-3.5 text-brand-muted" />
              <span className="text-xs font-semibold text-brand-pearl">
                Implementation Code
              </span>
              <div className="flex items-center gap-1">
                {animation.snippets.map((snip, idx) => (
                  <button
                    key={snip.framework}
                    onClick={() => setActiveSnippetIndex(idx)}
                    className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-mono transition-colors",
                      activeSnippetIndex === idx
                        ? "bg-brand-coral/20 text-brand-coral font-bold"
                        : "text-brand-muted hover:text-brand-pearl"
                    )}
                  >
                    {snip.framework === "react_ts"
                      ? "React (Motion)"
                      : snip.framework === "flutter_dart"
                      ? "Flutter"
                      : "CSS"}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleCopy(currentSnippet.code)}
              className="flex items-center gap-1 text-xs text-brand-muted hover:text-brand-pearl transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-3.5 bg-brand-bg rounded-xl border border-brand-border text-xs font-mono text-brand-pearl overflow-x-auto leading-relaxed max-h-48">
            <code>{currentSnippet.code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
