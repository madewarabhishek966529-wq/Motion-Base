"use client";

import React, { useState, useEffect } from "react";
import { ReferenceItem } from "@/types";
import { FilterOptions, getReferences } from "@/lib/api";
import { ReferenceCard } from "@/components/discovery/reference-card";
import { FilterBar } from "@/components/discovery/filter-bar";
import { Sparkles, Compass, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="w-full">
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
