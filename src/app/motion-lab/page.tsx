"use client";

import React, { useState } from "react";
import { CURATED_ANIMATIONS } from "@/data/animations";
import { MotionPlayer } from "@/components/motion/motion-player";
import { AnimationItem } from "@/types";
import { PlayCircle, Sparkles, Filter, Sliders, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MotionLabPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Animations" },
    { id: "spring_interaction", label: "Spring Physics" },
    { id: "gradient_glow", label: "Gradient & Glow" },
    { id: "micro_interaction", label: "Micro-interactions" },
    { id: "loading_skeleton", label: "Loading & Skeletons" },
    { id: "page_transition", label: "Page Transitions" },
  ];

  const filtered = CURATED_ANIMATIONS.filter((anim) => {
    const matchesCategory =
      selectedCategory === "all" || anim.category === selectedCategory;
    const matchesQuery =
      anim.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anim.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <PlayCircle className="w-6 h-6 text-brand-coral" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-pearl tracking-tight">
              Motion Lab
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-xl">
            Curated animation library with isolated interactive previews, spring physics telemetry, and multi-framework code snippets.
          </p>
        </div>

        <div className="text-xs font-mono text-brand-muted bg-brand-surface px-3 py-1.5 rounded-xl border border-brand-border self-start md:self-auto">
          {filtered.length} motion models
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors border ${
              selectedCategory === cat.id
                ? "bg-brand-elevated text-brand-pearl border-brand-coral/50 shadow-sm font-semibold"
                : "bg-brand-surface/60 text-brand-muted hover:text-brand-pearl border-brand-border"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Animation Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filtered.map((anim) => (
          <MotionPlayer key={anim.id} animation={anim} />
        ))}
      </div>
    </div>
  );
}
