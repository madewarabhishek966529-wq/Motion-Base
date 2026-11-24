"use client";

import React from "react";
import Link from "next/link";
import { LinearMobileShell } from "@/features/linear/linear-mobile-shell";
import {
  Sparkles,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  Code,
  Check,
  Palette,
  Layers,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LinearMobileRecreationPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-pearl transition-colors">
          Discovery
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href="/references/linear-mobile"
          className="hover:text-brand-pearl transition-colors"
        >
          Linear Mobile
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-pearl font-medium">Interactive Recreation</span>
      </nav>

      {/* Hero Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-linear-indigo" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-pearl tracking-tight">
              Linear Mobile Interactive Recreation
            </h1>
            <Badge variant="coral" size="sm" className="font-mono uppercase text-[10px]">
              iOS Native Feel
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-2xl leading-relaxed">
            Live frontend recreation built according to the Motionbase Prompt Studio specification: My Issues Inbox triage, Spring Action Drawer, and Cycle 42 Burndown analytics.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link href="/prompt-studio?referenceId=ref-linear">
            <Button variant="coral" size="sm" className="gap-1.5 text-xs">
              <Wand2 className="w-3.5 h-3.5" />
              <span>Inspect Prompt Matrix</span>
            </Button>
          </Link>
          <Link href="/references/linear-mobile">
            <Button variant="outline" size="sm" className="text-xs">
              Reference Detail
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid: Interactive Mobile Simulator + Design Intelligence Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Mobile Simulator Stage */}
        <div className="lg:col-span-8 flex justify-center">
          <LinearMobileShell />
        </div>

        {/* Technical Architecture Specs Panel */}
        <div className="lg:col-span-4 space-y-5 text-xs">
          {/* Specifications Card */}
          <div className="p-4 bg-brand-surface border border-brand-border rounded-2xl space-y-3">
            <h3 className="text-xs font-bold text-brand-pearl uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-brand-cyan" />
              Verified Design Tokens
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-xl bg-brand-elevated border border-brand-border">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-md bg-[#5E6AD2]" />
                  <span className="font-mono text-brand-pearl">linear-indigo</span>
                </div>
                <span className="font-mono text-brand-muted uppercase">#5E6AD2</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-brand-elevated border border-brand-border">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-md bg-[#08090C] border border-white/20" />
                  <span className="font-mono text-brand-pearl">linear-bg-dark</span>
                </div>
                <span className="font-mono text-brand-muted uppercase">#08090C</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-brand-elevated border border-brand-border">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-md bg-[#14151B]" />
                  <span className="font-mono text-brand-pearl">surface-elevated</span>
                </div>
                <span className="font-mono text-brand-muted uppercase">#14151B</span>
              </div>
            </div>
          </div>

          {/* Spring Physics Card */}
          <div className="p-4 bg-brand-surface border border-brand-border rounded-2xl space-y-3">
            <h3 className="text-xs font-bold text-brand-pearl uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
              Motion & Spring Physics
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-brand-elevated border border-brand-border">
                <span className="text-[10px] text-brand-muted block uppercase">Stiffness</span>
                <span className="font-mono font-bold text-brand-pearl text-sm">420</span>
              </div>
              <div className="p-2 rounded-xl bg-brand-elevated border border-brand-border">
                <span className="text-[10px] text-brand-muted block uppercase">Damping</span>
                <span className="font-mono font-bold text-brand-pearl text-sm">26</span>
              </div>
              <div className="p-2 rounded-xl bg-brand-elevated border border-brand-border">
                <span className="text-[10px] text-brand-muted block uppercase">Mass</span>
                <span className="font-mono font-bold text-brand-pearl text-sm">0.85</span>
              </div>
            </div>
            <p className="text-[11px] text-brand-muted leading-relaxed">
              Damped spring parameters produce instant tactile feedback on touch devices with natural settling and zero oscillation flicker.
            </p>
          </div>

          {/* Screen Navigation Flow */}
          <div className="p-4 bg-brand-surface border border-brand-border rounded-2xl space-y-2">
            <h3 className="text-xs font-bold text-brand-pearl uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-brand-violet" />
              Tested User Pathways
            </h3>
            <ul className="space-y-1.5 text-[11px] text-brand-muted">
              <li>• Tap issue row → Issue Inspector & Subtask Checklist</li>
              <li>• Swipe right on issue → Toggle Status (Todo ↔ In Progress ↔ Done)</li>
              <li>• Tap Cycle pill or Cycle tab → Active Burndown Chart</li>
              <li>• Tap Write Comment → Spring-animated bottom drawer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
