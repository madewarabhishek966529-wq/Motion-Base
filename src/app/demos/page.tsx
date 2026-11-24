"use client";

import React, { useState } from "react";
import { DEMO_APPS } from "@/features/demos/demo-apps";
import { DemoCard } from "@/features/demos/components/demo-card";
import { Video, Sparkles, Wand2 } from "lucide-react";

export default function DemosDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    ...Array.from(new Set(DEMO_APPS.map((a) => a.category))),
  ];

  const filtered =
    selectedCategory === "all"
      ? DEMO_APPS
      : DEMO_APPS.filter((a) => a.category === selectedCategory);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <Video className="w-6 h-6 text-brand-coral" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-pearl tracking-tight">
              Live App Video Demos &amp; Component Prompts
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-2xl">
            Watch live animated walkthroughs of Expense Trackers, Fitness Rings, AI Assistants, E-Commerce Drops, and Productivity apps. Click any module chip to copy exact prompts for its Bottom Navigation, Top Navigation, Cards, or Drawers.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono text-brand-cyan self-start md:self-auto">
          {filtered.length} live interactive demos
        </span>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors border ${
              selectedCategory === cat
                ? "bg-brand-elevated text-brand-pearl border-brand-coral/50 font-semibold"
                : "bg-brand-surface/60 text-brand-muted hover:text-brand-pearl border-brand-border"
            }`}
          >
            {cat === "all" ? "All App Categories" : cat}
          </button>
        ))}
      </div>

      {/* Animated Demo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((app) => (
          <DemoCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
