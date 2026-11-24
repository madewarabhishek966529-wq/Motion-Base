import React from "react";
import Link from "next/link";
import { Sparkles, Wand2, PlayCircle, ShieldCheck } from "lucide-react";
import { GalleryGrid } from "@/components/discovery/gallery-grid";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Editorial Hero Section */}
      <section className="relative pt-6 pb-4 sm:pt-10 sm:pb-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-brand-elevated text-brand-pearl border border-brand-border mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
          <span>Curated Application Design Intelligence & Prompt Engine</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-pearl leading-[1.12] mb-6">
          Discover. Deconstruct. <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-coral via-brand-violet to-brand-cyan bg-clip-text text-transparent">
            Prompt to Build.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed mb-8">
          Inspect mobile, web, and desktop application references with verified design tokens, interactive spring motion breakdowns, and prompt generation for Antigravity, Cursor, Stitch, and Claude Code.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/prompt-studio">
            <Button variant="coral" size="lg" className="gap-2 shadow-lg shadow-brand-coral/20">
              <Wand2 className="w-4 h-4" />
              <span>Launch Prompt Studio</span>
            </Button>
          </Link>
          <Link href="/motion-lab">
            <Button variant="secondary" size="lg" className="gap-2">
              <PlayCircle className="w-4 h-4 text-brand-cyan" />
              <span>Explore Motion Lab</span>
            </Button>
          </Link>
        </div>

        <div className="pt-8 flex items-center justify-center gap-6 text-xs text-brand-muted/70">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Clear Observed vs. Estimated Provenance
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Respects Reduced Motion</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Attributed References</span>
        </div>
      </section>

      {/* Discovery Gallery */}
      <section>
        <GalleryGrid />
      </section>
    </div>
  );
}
