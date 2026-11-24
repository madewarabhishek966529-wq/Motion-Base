"use client";

import React, { useState, useEffect } from "react";
import { ReferenceItem, ReferenceStyle } from "@/types";
import { FilterOptions, getReferences } from "@/lib/api";
import { ReferenceCard } from "@/components/discovery/reference-card";
import { FilterBar } from "@/components/discovery/filter-bar";
import { AlertCircle, Sparkles, Layers, Palette, Smartphone, Monitor, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DESIGN_STYLE_SPOTLIGHTS: Array<{
  style: ReferenceStyle | "all";
  title: string;
  subtitle: string;
  accent: string;
  swatch: string;
}> = [
  {
    style: "all",
    title: "All Designs",
    subtitle: "12 curated apps",
    accent: "border-brand-coral/50",
    swatch: "from-brand-coral via-brand-violet to-brand-cyan",
  },
  {
    style: "dark",
    title: "Dark OLED & Pro",
    subtitle: "Linear, Raycast, Runway",
    accent: "border-[#5E6AD2]/60",
    swatch: "from-[#14151B] via-[#5E6AD2] to-[#08090C]",
  },
  {
    style: "glass",
    title: "Glass & Mesh Glow",
    subtitle: "Arc, Opal, Revolut",
    accent: "border-brand-cyan/60",
    swatch: "from-[#FF6B72] via-[#7867FF] to-[#39D8E8]",
  },
  {
    style: "editorial",
    title: "Editorial & Light",
    subtitle: "Airbnb, Amie Calendar",
    accent: "border-[#FF385C]/60",
    swatch: "from-[#FFFFFF] via-[#FFE4E8] to-[#FF385C]",
  },
  {
    style: "playful",
    title: "Playful & Gamified",
    subtitle: "Duolingo, Amie",
    accent: "border-[#58CC02]/60",
    swatch: "from-[#58CC02] via-[#1CB0F6] to-[#FF9600]",
  },
  {
    style: "neon",
    title: "Neon & Media",
    subtitle: "Spotify DJ, Supabase",
    accent: "border-[#1DB954]/60",
    swatch: "from-[#1DB954] via-[#3ECF8E] to-[#121212]",
  },
];

export const GalleryGrid: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    platform: "all",
    category: "all",
    style: "all",
    sortBy: "curated",
  });
  const [references, setReferences] = useState<ReferenceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async (f: FilterOptions) => {
    setIsLoading(true);
    try {
      const data = await getReferences(f);
      setReferences(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData(filters);
  }, [filters]);

  return (
    <div className="w-full space-y-6">
      {/* Diverse Design Styles Quick Switcher */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-muted flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-brand-coral" />
            Explore Various Design Aesthetics
          </h2>
          <span className="text-[11px] font-mono text-brand-muted/70">
            Click a style to filter
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {DESIGN_STYLE_SPOTLIGHTS.map((item) => {
            const isSelected = (filters.style || "all") === item.style;
            return (
              <button
                key={item.style}
                type="button"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    style: item.style,
                  }))
                }
                className={cn(
                  "group p-3 rounded-2xl border text-left transition-all bg-brand-surface/80 hover:bg-brand-elevated/80 flex flex-col justify-between gap-2",
                  isSelected
                    ? `${item.accent} ring-1 ring-brand-coral/40 bg-brand-elevated shadow-md`
                    : "border-brand-border"
                )}
              >
                <div
                  className={cn(
                    "h-2 w-full rounded-full bg-gradient-to-r",
                    item.swatch
                  )}
                />
                <div>
                  <div className="text-xs font-semibold text-brand-pearl group-hover:text-white truncate">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-brand-muted truncate">
                    {item.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <FilterBar
        filters={filters}
        onChange={(newFilters) => setFilters(newFilters)}
        totalResults={references.length}
      />

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-brand-surface border border-brand-border rounded-2xl h-[360px] animate-pulse p-4 space-y-4"
            >
              <div className="bg-brand-elevated rounded-xl h-44 w-full" />
              <div className="h-5 bg-brand-elevated rounded w-3/4" />
              <div className="h-3 bg-brand-elevated rounded w-1/2" />
              <div className="flex gap-2 pt-4">
                <div className="h-6 w-16 bg-brand-elevated rounded-full" />
                <div className="h-6 w-16 bg-brand-elevated rounded-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reference Cards Grid */}
      {!isLoading && references.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {references.map((reference) => (
            <ReferenceCard
              key={reference.id}
              reference={reference}
              onBookmarkChange={() => loadData(filters)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && references.length === 0 && (
        <div className="text-center py-20 px-4 rounded-3xl bg-brand-surface/40 border border-brand-border my-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-elevated flex items-center justify-center mx-auto mb-4 border border-brand-border text-brand-coral">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-brand-pearl mb-1">
            No design references matched your filters
          </h3>
          <p className="text-sm text-brand-muted max-w-md mx-auto mb-6">
            Try adjusting your search query, or clear your platform, category, or color selections to explore more application references.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setFilters({
                query: "",
                platform: "all",
                category: "all",
                style: "all",
                sortBy: "curated",
              })
            }
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
};
