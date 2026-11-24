"use client";

import React, { useState } from "react";
import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { PlatformType, ReferenceCategory, ReferenceStyle } from "@/types";
import { FilterOptions } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filters: FilterOptions;
  onChange: (updated: FilterOptions) => void;
  totalResults: number;
}

const platforms: Array<{ id: PlatformType | "all"; label: string }> = [
  { id: "all", label: "All Platforms" },
  { id: "ios", label: "iOS" },
  { id: "android", label: "Android" },
  { id: "web", label: "Web" },
  { id: "desktop", label: "Desktop" },
];

const categories: Array<{ id: ReferenceCategory | "all"; label: string }> = [
  { id: "all", label: "All Categories" },
  { id: "productivity", label: "Productivity" },
  { id: "developer_tools", label: "Developer Tools" },
  { id: "fintech", label: "Fintech" },
  { id: "health", label: "Health" },
  { id: "ai", label: "AI & Creative" },
  { id: "social", label: "Social" },
];

const styles: Array<{ id: ReferenceStyle | "all"; label: string }> = [
  { id: "all", label: "All Styles" },
  { id: "minimal", label: "Minimal" },
  { id: "dark", label: "Dark" },
  { id: "glass", label: "Glassmorphism" },
  { id: "gradient", label: "Gradient" },
  { id: "playful", label: "Playful" },
  { id: "neon", label: "Neon" },
];

const colorPalette = [
  { hex: "#5E6AD2", label: "Indigo" },
  { hex: "#FF6B72", label: "Coral" },
  { hex: "#7867FF", label: "Violet" },
  { hex: "#39D8E8", label: "Cyan" },
  { hex: "#3ECF8E", label: "Emerald" },
  { hex: "#FF6363", label: "Crimson" },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  totalResults,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, query: e.target.value });
  };

  const handleClear = () => {
    onChange({
      query: "",
      platform: "all",
      category: "all",
      style: "all",
      dominantColor: undefined,
      sortBy: "curated",
    });
  };

  const hasActiveFilters =
    Boolean(filters.query) ||
    (filters.platform && filters.platform !== "all") ||
    (filters.category && filters.category !== "all") ||
    (filters.style && filters.style !== "all") ||
    Boolean(filters.dominantColor);

  return (
    <div className="space-y-4 mb-8">
      {/* Top Search Bar & Primary Platform Pills */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex-1 max-w-xl relative">
          <Input
            value={filters.query || ""}
            onChange={handleQueryChange}
            placeholder="Search by app name, interactions, cycles, tags (e.g. Linear, dark, spring)..."
            icon={<Search className="w-4 h-4" />}
            className="w-full bg-brand-surface/90 pr-9"
          />
          {filters.query && (
            <button
              onClick={() => onChange({ ...filters, query: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-pearl p-0.5"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort & Advanced Filters Toggle */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="flex items-center gap-1.5 bg-brand-surface border border-brand-border rounded-xl px-2.5 py-1.5 text-xs text-brand-muted">
            <ArrowUpDown className="w-3.5 h-3.5 text-brand-muted" />
            <select
              value={filters.sortBy || "curated"}
              onChange={(e) =>
                onChange({ ...filters, sortBy: e.target.value as any })
              }
              className="bg-transparent text-brand-pearl focus:outline-none cursor-pointer text-xs"
            >
              <option value="curated" className="bg-brand-surface">
                Curated
              </option>
              <option value="newest" className="bg-brand-surface">
                Newest
              </option>
              <option value="saved" className="bg-brand-surface">
                Most Saved
              </option>
              <option value="likes" className="bg-brand-surface">
                Most Liked
              </option>
            </select>
          </div>

          <Button
            variant={showAdvanced || hasActiveFilters ? "coral" : "outline"}
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            )}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-xs text-brand-muted hover:text-brand-pearl"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Platform Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {platforms.map((p) => {
          const isSelected =
            (!filters.platform && p.id === "all") || filters.platform === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onChange({ ...filters, platform: p.id })}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors border",
                isSelected
                  ? "bg-brand-elevated text-brand-pearl border-brand-coral/50 shadow-sm"
                  : "bg-brand-surface/60 text-brand-muted hover:text-brand-pearl border-brand-border"
              )}
            >
              {p.label}
            </button>
          );
        })}

        <div className="ml-auto text-xs text-brand-muted/70 pl-2 hidden sm:block">
          {totalResults} {totalResults === 1 ? "reference" : "references"}
        </div>
      </div>

      {/* Collapsible Advanced Filters (Categories, Styles, Color Spectrum) */}
      {showAdvanced && (
        <div className="p-4 rounded-2xl bg-brand-surface/70 border border-brand-border space-y-4 animate-in fade-in-50 duration-150">
          {/* Categories */}
          <div>
            <label className="text-xs font-medium text-brand-muted block mb-2 uppercase tracking-wider">
              Category
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => {
                const isSelected =
                  (!filters.category && c.id === "all") ||
                  filters.category === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => onChange({ ...filters, category: c.id })}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border",
                      isSelected
                        ? "bg-brand-violet/20 text-[#B8AEFF] border-brand-violet/40"
                        : "bg-brand-elevated/40 text-brand-muted hover:text-brand-pearl border-brand-border/60"
                    )}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visual Styles */}
          <div>
            <label className="text-xs font-medium text-brand-muted block mb-2 uppercase tracking-wider">
              Visual Style
            </label>
            <div className="flex flex-wrap gap-1.5">
              {styles.map((s) => {
                const isSelected =
                  (!filters.style && s.id === "all") || filters.style === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => onChange({ ...filters, style: s.id })}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border",
                      isSelected
                        ? "bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40"
                        : "bg-brand-elevated/40 text-brand-muted hover:text-brand-pearl border-brand-border/60"
                    )}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dominant Color Filter */}
          <div>
            <label className="text-xs font-medium text-brand-muted block mb-2 uppercase tracking-wider">
              Dominant Palette Tint
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onChange({ ...filters, dominantColor: undefined })}
                className={cn(
                  "px-2 py-1 rounded-lg text-xs font-medium border",
                  !filters.dominantColor
                    ? "bg-brand-elevated text-brand-pearl border-brand-border"
                    : "text-brand-muted border-transparent"
                )}
              >
                Any
              </button>
              {colorPalette.map((col) => {
                const isSelected = filters.dominantColor === col.hex;
                return (
                  <button
                    key={col.hex}
                    onClick={() =>
                      onChange({
                        ...filters,
                        dominantColor: isSelected ? undefined : col.hex,
                      })
                    }
                    title={col.label}
                    className={cn(
                      "w-6 h-6 rounded-full transition-transform active:scale-95 border-2",
                      isSelected
                        ? "scale-110 border-white ring-2 ring-brand-coral"
                        : "border-transparent opacity-80 hover:opacity-100"
                    )}
                    style={{ backgroundColor: col.hex }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
