import React from "react";
import Link from "next/link";
import { Sparkles, Wand2, PlayCircle, ShieldCheck, Smartphone, ArrowRight } from "lucide-react";
import { GalleryGrid } from "@/components/discovery/gallery-grid";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Editorial Hero Section */}
      <section className="relative pt-4 pb-2 sm:pt-8 sm:pb-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-brand-surface/90 text-brand-pearl border border-brand-border mb-5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
          <span>Curated Application Design Intelligence & Prompt Engine</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-brand-pearl leading-[1.08] mb-5">
          Discover. Deconstruct.{" "}
          <span className="bg-gradient-to-r from-brand-coral via-brand-violet to-brand-cyan bg-clip-text text-transparent">
            Prompt to Build.
          </span>
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed mb-7">
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
          <Link href="/recreations/linear-mobile">
            <Button variant="outline" size="lg" className="gap-2 border-brand-violet/40 hover:border-brand-violet">
              <Smartphone className="w-4 h-4 text-[#A69BFF]" />
              <span>Linear Mobile Demo</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-muted" />
            </Button>
          </Link>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-brand-muted/80">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Observed vs. Inferred Provenance
          </span>
          <span className="hidden sm:inline text-brand-border">•</span>
          <span>WCAG AA Contrast Checks</span>
          <span className="hidden sm:inline text-brand-border">•</span>
          <span>Reduced Motion Support</span>
          <span className="hidden sm:inline text-brand-border">•</span>
          <span>Attributed References</span>
        </div>
      </section>

      {/* Discovery Gallery */}
      <section>
        <GalleryGrid />
      </section>
    </div>
  );
}
