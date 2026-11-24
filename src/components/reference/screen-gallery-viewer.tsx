"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ScreenItem } from "@/types";
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScreenGalleryViewerProps {
  screens: ScreenItem[];
  title: string;
}

export const ScreenGalleryViewer: React.FC<ScreenGalleryViewerProps> = ({
  screens,
  title,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeScreen = screens[activeIndex] || screens[0];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % screens.length);
  }, [screens.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + screens.length) % screens.length);
  }, [screens.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, handleNext, handlePrev]);

  if (!screens || screens.length === 0) {
    return (
      <div className="p-8 text-center bg-brand-surface rounded-2xl border border-brand-border text-brand-muted text-sm">
        No screens recorded for this reference.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Viewport */}
      <div className="relative rounded-2xl overflow-hidden bg-brand-surface border border-brand-border group">
        <div className="relative aspect-[16/10] w-full bg-[#0B0D14]">
          <Image
            src={activeScreen.imageUrl}
            alt={activeScreen.altText || `${title} screen ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-contain"
          />

          {/* Fullscreen Inspect Button */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute top-3 right-3 px-2.5 py-2 rounded-xl bg-brand-bg/85 hover:bg-brand-elevated text-brand-pearl backdrop-blur-md border border-white/15 transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 active:scale-95 flex items-center gap-1.5 text-xs font-medium shadow-md"
            aria-label="Inspect screen full size"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fullscreen</span>
          </button>

          {/* Carousel Arrows */}
          {screens.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-brand-pearl backdrop-blur-md border border-white/10 transition-transform active:scale-90"
                aria-label="Previous screen"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-brand-pearl backdrop-blur-md border border-white/10 transition-transform active:scale-90"
                aria-label="Next screen"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Screen Caption Bar */}
        <div className="p-4 bg-brand-surface/95 border-t border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-brand-coral font-medium">
                Screen {activeIndex + 1} of {screens.length}
              </span>
              <span className="text-brand-muted/40">•</span>
              <h3 className="text-sm font-semibold text-brand-pearl">
                {activeScreen.title}
              </h3>
            </div>
            {activeScreen.screenDescription && (
              <p className="text-xs text-brand-muted mt-0.5">
                {activeScreen.screenDescription}
              </p>
            )}
          </div>

          <div className="text-[11px] text-brand-muted/80 font-mono bg-brand-elevated px-2.5 py-1 rounded-lg border border-brand-border shrink-0 self-start sm:self-auto">
            {activeScreen.altText ? "Alt text verified" : "Visual asset"}
          </div>
        </div>
      </div>

      {/* Thumbnail Bar */}
      {screens.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {screens.map((screen, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={screen.id}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "relative aspect-[16/10] w-28 sm:w-36 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-brand-elevated",
                  isActive
                    ? "border-brand-coral ring-2 ring-brand-coral/30 opacity-100"
                    : "border-brand-border opacity-60 hover:opacity-100"
                )}
                aria-label={`View ${screen.title}`}
              >
                <Image
                  src={screen.thumbnailUrl || screen.imageUrl}
                  alt={screen.title}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
                <div className="absolute bottom-1 right-1 px-1.5 py-0.2 text-[9px] font-mono bg-black/75 text-white rounded">
                  {idx + 1}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col p-4 sm:p-6"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-brand-pearl">
            <div>
              <h4 className="text-sm font-medium">{activeScreen.title}</h4>
              <p className="text-xs text-brand-muted">
                {activeIndex + 1} / {screens.length} • {title}
              </p>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-brand-pearl transition-colors"
              aria-label="Close fullscreen view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Image Viewport */}
          <div className="relative flex-1 my-4 flex items-center justify-center">
            <Image
              src={activeScreen.imageUrl}
              alt={activeScreen.altText || activeScreen.title}
              fill
              className="object-contain"
              priority
            />

            {screens.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Caption */}
          <div className="text-center text-xs text-brand-muted max-w-xl mx-auto">
            {activeScreen.screenDescription || activeScreen.altText}
            <span className="block text-[11px] text-brand-muted/60 mt-1 font-mono">
              Use Left / Right arrow keys to navigate, Esc to close
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
