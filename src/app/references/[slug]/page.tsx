"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Bookmark,
  Heart,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Wand2,
  Sparkles,
  Layers,
  PlayCircle,
  Eye,
  GitBranch,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { ReferenceItem } from "@/types";
import { getReferenceBySlug, getRelatedReferences } from "@/lib/api";
import { storage } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProvenanceBadge } from "@/components/ui/provenance-badge";
import { ScreenGalleryViewer } from "@/components/reference/screen-gallery-viewer";
import { DesignDnaSection } from "@/components/reference/design-dna-section";
import { MotionBreakdownSection } from "@/components/reference/motion-breakdown-section";
import { ComponentsInventorySection } from "@/components/reference/components-inventory-section";
import { ScreenFlowSection } from "@/components/reference/screen-flow-section";
import { ReferenceCard } from "@/components/discovery/reference-card";
import { cn } from "@/lib/utils";

type DetailTab = "screens" | "dna" | "motion" | "components" | "flow";

export default function ReferenceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const [reference, setReference] = useState<ReferenceItem | null>(null);
  const [related, setRelated] = useState<ReferenceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DetailTab>("screens");
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const item = await getReferenceBySlug(slug);
        if (item) {
          setReference(item);
          setLikesCount(item.likesCount);
          setIsSaved(storage.getBookmarks().includes(item.id));
          setIsLiked(storage.getLikes().includes(item.id));
          const rel = await getRelatedReferences(item.id, item.category);
          setRelated(rel);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    if (slug) {
      loadData();
    }
  }, [slug]);

  const handleToggleSave = () => {
    if (!reference) return;
    const saved = storage.toggleBookmark(reference.id);
    setIsSaved(saved);
  };

  const handleToggleLike = () => {
    if (!reference) return;
    const liked = storage.toggleLike(reference.id);
    setIsLiked(liked);
    setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center animate-pulse space-y-4">
        <div className="h-8 bg-brand-surface rounded w-1/3 mx-auto" />
        <div className="h-4 bg-brand-surface rounded w-1/4 mx-auto" />
        <div className="h-96 bg-brand-surface rounded-2xl max-w-4xl mx-auto mt-8" />
      </div>
    );
  }

  if (!reference) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-brand-pearl">Reference not found</h2>
        <p className="text-sm text-brand-muted">
          The requested application design reference could not be located.
        </p>
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Discovery</span>
          </Button>
        </Link>
      </div>
    );
  }

  const tabs: Array<{ id: DetailTab; label: string; count?: number; icon: any }> = [
    { id: "screens", label: "Screen Gallery", count: reference.screens?.length, icon: Eye },
    { id: "dna", label: "Design DNA", count: reference.tokens?.length, icon: Sparkles },
    { id: "motion", label: "Motion Breakdown", count: reference.animations?.length, icon: PlayCircle },
    { id: "components", label: "Components", count: reference.components?.length, icon: Layers },
    { id: "flow", label: "Screen Flow", count: reference.flows?.length, icon: GitBranch },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-brand-muted" aria-label="Breadcrumbs">
        <Link href="/" className="hover:text-brand-pearl transition-colors">
          Discovery
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="capitalize">{reference.platform}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-pearl font-medium truncate max-w-xs">{reference.title}</span>
      </nav>

      {/* Header Info Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-brand-border">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-pearl tracking-tight">
              {reference.title}
            </h1>
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: reference.dominantColor }}
              title={`Dominant color: ${reference.dominantColor}`}
            />
            <Badge variant="coral" size="sm" className="uppercase font-mono">
              {reference.platform}
            </Badge>
            <Badge variant="muted" size="sm" className="capitalize">
              {reference.category.replace("_", " ")}
            </Badge>
          </div>

          <p className="text-sm text-brand-muted leading-relaxed">
            {reference.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-brand-muted pt-1">
            <span className="text-brand-pearl">
              Creator: <strong>{reference.creatorName}</strong>
            </span>
            <span>•</span>
            <a
              href={reference.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand-cyan hover:underline"
            >
              <span>Source Project</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {reference.licenseStatus.replace(/_/g, " ")}
            </span>
          </div>
        </div>

        {/* Actions CTA */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleToggleSave}
            className={cn(
              "p-2.5 rounded-xl border flex items-center gap-2 text-xs font-medium transition-all active:scale-95",
              isSaved
                ? "bg-brand-coral text-brand-bg border-brand-coral shadow-lg shadow-brand-coral/20 font-semibold"
                : "bg-brand-surface text-brand-pearl border-brand-border hover:bg-brand-elevated"
            )}
          >
            <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
            <span>{isSaved ? "Saved" : "Save Reference"}</span>
          </button>

          <button
            onClick={handleToggleLike}
            className={cn(
              "p-2.5 rounded-xl border flex items-center gap-2 text-xs font-medium transition-all active:scale-95",
              isLiked
                ? "bg-brand-coral/10 text-brand-coral border-brand-coral/30"
                : "bg-brand-surface text-brand-muted hover:text-brand-pearl border-brand-border"
            )}
          >
            <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
            <span>{likesCount}</span>
          </button>

          <Link href={`/prompt-studio?referenceId=${reference.id}`}>
            <Button variant="coral" size="md" className="gap-2 shadow-lg shadow-brand-coral/20">
              <Wand2 className="w-4 h-4" />
              <span>Generate AI Prompt</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Attribution & Rights Note Box */}
      <div className="p-3.5 rounded-xl bg-brand-surface/70 border border-brand-border text-xs text-brand-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="italic">
          "{reference.attributionText}" {reference.rightsNotes && `— ${reference.rightsNotes}`}
        </p>
        <span className="text-[11px] font-mono text-brand-muted/70 shrink-0">
          Last reviewed: {new Date(reference.updatedAt).toLocaleDateString()}
        </span>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-brand-border flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                isActive
                  ? "border-brand-coral text-brand-pearl"
                  : "border-transparent text-brand-muted hover:text-brand-pearl hover:border-brand-border"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-brand-coral" : "text-brand-muted")} />
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={cn(
                    "px-1.5 py-0.2 rounded-full text-[10px] font-mono",
                    isActive
                      ? "bg-brand-coral/20 text-brand-coral font-bold"
                      : "bg-brand-elevated text-brand-muted"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="pt-2">
        {activeTab === "screens" && (
          <ScreenGalleryViewer
            screens={reference.screens || []}
            title={reference.title}
          />
        )}

        {activeTab === "dna" && (
          <DesignDnaSection
            tokens={reference.tokens || []}
            gradients={reference.gradients || []}
          />
        )}

        {activeTab === "motion" && (
          <MotionBreakdownSection
            animations={reference.animations || []}
          />
        )}

        {activeTab === "components" && (
          <ComponentsInventorySection
            components={reference.components || []}
          />
        )}

        {activeTab === "flow" && (
          <ScreenFlowSection
            flows={reference.flows || []}
            screens={reference.screens || []}
          />
        )}
      </div>

      {/* Related References */}
      {related.length > 0 && (
        <section className="pt-12 border-t border-brand-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-brand-pearl">
                Related Design References
              </h3>
              <p className="text-xs text-brand-muted">
                Other applications in {reference.category.replace("_", " ")} and similar design systems
              </p>
            </div>
            <Link href="/" className="text-xs text-brand-coral hover:underline">
              Browse all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rel) => (
              <ReferenceCard key={rel.id} reference={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
