"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bookmark,
  Heart,
  ExternalLink,
  Smartphone,
  Monitor,
  Globe,
  Layers,
  Sparkles,
} from "lucide-react";
import { ReferenceItem, PlatformType } from "@/types";
import { ProvenanceBadge } from "@/components/ui/provenance-badge";
import { Badge } from "@/components/ui/badge";
import { storage } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface ReferenceCardProps {
  reference: ReferenceItem;
  onBookmarkChange?: () => void;
}

export const ReferenceCard: React.FC<ReferenceCardProps> = ({
  reference,
  onBookmarkChange,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reference.likesCount);

  useEffect(() => {
    setIsSaved(storage.getBookmarks().includes(reference.id));
    setIsLiked(storage.getLikes().includes(reference.id));
  }, [reference.id]);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = storage.toggleBookmark(reference.id);
    setIsSaved(saved);
    if (onBookmarkChange) onBookmarkChange();
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const liked = storage.toggleLike(reference.id);
    setIsLiked(liked);
    setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
  };

  const platformIcons: Record<PlatformType, React.ReactNode> = {
    ios: <Smartphone className="w-3.5 h-3.5" />,
    android: <Smartphone className="w-3.5 h-3.5" />,
    web: <Globe className="w-3.5 h-3.5" />,
    desktop: <Monitor className="w-3.5 h-3.5" />,
    cross_platform: <Layers className="w-3.5 h-3.5" />,
  };

  const coverScreen = reference.screens?.[0];
  const coverUrl =
    coverScreen?.thumbnailUrl ||
    coverScreen?.imageUrl ||
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop";

  return (
    <article className="group relative bg-brand-surface border border-brand-border hover:border-brand-muted/40 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col h-full hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1">
      {/* Visual Header / Cover Image */}
      <Link
        href={`/references/${reference.slug}`}
        className="block relative aspect-[16/10] w-full overflow-hidden bg-brand-elevated"
      >
        <Image
          src={coverUrl}
          alt={coverScreen?.altText || `${reference.title} interface preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span
              className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md text-brand-pearl border border-white/10 flex items-center gap-1"
            >
              {platformIcons[reference.platform]}
              <span className="capitalize">{reference.platform}</span>
            </span>
            {reference.featured && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-brand-coral/90 text-brand-bg backdrop-blur-md flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Curated
              </span>
            )}
          </div>

          {/* Save Action Button */}
          <button
            onClick={handleToggleSave}
            title={isSaved ? "Remove from bookmarks" : "Save to bookmarks"}
            aria-label={isSaved ? "Saved" : "Save reference"}
            className={cn(
              "pointer-events-auto p-2 rounded-xl backdrop-blur-md transition-all active:scale-95 border",
              isSaved
                ? "bg-brand-coral text-brand-bg border-brand-coral shadow-lg shadow-brand-coral/30"
                : "bg-black/60 text-brand-pearl hover:text-white border-white/10 hover:bg-black/80"
            )}
          >
            <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Bottom thumbnail indicators */}
        {reference.screens && reference.screens.length > 1 && (
          <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/60 backdrop-blur-md text-brand-muted border border-white/10">
            {reference.screens.length} screens
          </div>
        )}
      </Link>

      {/* Content Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Title and Category */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <Link
              href={`/references/${reference.slug}`}
              className="text-base font-semibold text-brand-pearl group-hover:text-brand-coral transition-colors line-clamp-1"
            >
              {reference.title}
            </Link>
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
              style={{ backgroundColor: reference.dominantColor }}
              title={`Dominant color: ${reference.dominantColor}`}
            />
          </div>

          <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed mb-3">
            {reference.summary}
          </p>

          {/* Style Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            <Badge variant="muted" size="sm" className="capitalize">
              {reference.category.replace("_", " ")}
            </Badge>
            {reference.styles.slice(0, 2).map((style) => (
              <Badge key={style} variant="outline" size="sm" className="capitalize">
                {style}
              </Badge>
            ))}
          </div>
        </div>

        {/* Footer Meta & Stats */}
        <div className="pt-3 border-t border-brand-border/70 flex items-center justify-between text-xs text-brand-muted">
          <div className="flex items-center gap-1.5 truncate max-w-[60%]">
            <span className="truncate" title={`Creator: ${reference.creatorName}`}>
              {reference.creatorName}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleToggleLike}
              className={cn(
                "flex items-center gap-1 transition-colors hover:text-brand-coral",
                isLiked ? "text-brand-coral font-medium" : "text-brand-muted"
              )}
              aria-label="Like reference"
            >
              <Heart className="w-3.5 h-3.5" fill={isLiked ? "currentColor" : "none"} />
              <span className="text-[11px]">{likesCount}</span>
            </button>
            <ProvenanceBadge
              provenance={
                reference.tokens?.[0]?.provenance || "manually_verified"
              }
              showIcon={false}
              className="text-[10px] py-0 px-1.5"
            />
          </div>
        </div>
      </div>
    </article>
  );
};
