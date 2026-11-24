import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Wand2,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEMO_APPS } from "@/features/demos/demo-apps";
import { DemoCard } from "@/features/demos/components/demo-card";
import { NavigationShowcase } from "@/features/navigation/components/navigation-showcase";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Editorial Hero Section (Image 1 preserved) */}
      <section className="relative pt-4 pb-2 sm:pt-8 sm:pb-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-brand-surface/90 text-brand-pearl border border-brand-border mb-5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
          <span>Interactive App Video Demos • Design Intelligence • Prompt Studio</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-brand-pearl leading-[1.08] mb-5">
          Discover. Watch Demos.{" "}
          <span className="bg-gradient-to-r from-brand-coral via-brand-violet to-brand-cyan bg-clip-text text-transparent">
            Prompt Every Part.
          </span>
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed mb-7">
          Watch live animated demos of Expense Trackers, Fitness Rings, AI Chats, and Productivity apps — then click any app to generate exact prompts for its Bottom Navigation, Top Navigation, Cards, or Drawers.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/demos/expense-tracker-pro">
            <Button variant="coral" size="lg" className="gap-2 shadow-lg shadow-brand-coral/20">
              <Video className="w-4 h-4" />
              <span>Watch Expense Tracker Demo</span>
            </Button>
          </Link>
          <Link href="/prompt-studio">
            <Button variant="secondary" size="lg" className="gap-2">
              <Wand2 className="w-4 h-4 text-brand-cyan" />
              <span>Open Prompt Studio</span>
            </Button>
          </Link>
          <Link href="/recreations/linear-mobile">
            <Button variant="outline" size="lg" className="gap-2 border-brand-violet/40 hover:border-brand-violet">
              <Smartphone className="w-4 h-4 text-[#A69BFF]" />
              <span>Linear Mobile App</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-muted" />
            </Button>
          </Link>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-brand-muted/80">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Live Animated App Walkthroughs
          </span>
          <span className="hidden sm:inline text-brand-border">•</span>
          <span>Click-to-Prompt Nav &amp; Components</span>
          <span className="hidden sm:inline text-brand-border">•</span>
          <span>Reduced Motion Support</span>
        </div>
      </section>

      {/* Live Video Demo Reel Section (Image 1 preserved) */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-brand-border/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-lg sm:text-xl font-bold text-brand-pearl tracking-tight">
                Live Video App Demos — Click Any App for Component Prompts
              </h2>
            </div>
            <p className="text-xs text-brand-muted mt-0.5">
              Auto-playing animated app flows. Click any chip (Bottom Nav, Top Nav, Cards, Drawer) to jump straight to that UI module&apos;s prompt.
            </p>
          </div>
          <Link
            href="/demos"
            className="text-xs font-semibold text-brand-coral hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View all live demos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_APPS.map((app) => (
            <DemoCard key={app.id} app={app} />
          ))}
        </div>
      </section>

      {/* Interactive 12-Style Navigation & Motion Showcase (Replaces Image 3 static cards!) */}
      <NavigationShowcase />
    </div>
  );
}
