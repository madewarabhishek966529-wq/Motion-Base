import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-brand-border bg-brand-bg py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-brand-violet to-brand-coral flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-brand-bg fill-brand-bg" />
              </div>
              <span className="text-base font-bold text-brand-pearl tracking-tight">
                Motion<span className="text-brand-coral">base</span>
              </span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              Application design inspiration, motion UI intelligence, and production-ready prompt generation.
            </p>
            <p className="text-[11px] text-brand-muted/70 flex items-center gap-1 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan inline" />
              Curated & attributed reference rights.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-pearl mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li>
                <Link href="/" className="hover:text-brand-pearl transition-colors">
                  Discovery Gallery
                </Link>
              </li>
              <li>
                <Link href="/motion-lab" className="hover:text-brand-pearl transition-colors">
                  Motion Lab
                </Link>
              </li>
              <li>
                <Link href="/components-lab" className="hover:text-brand-pearl transition-colors">
                  Component Lab
                </Link>
              </li>
              <li>
                <Link href="/prompt-studio" className="hover:text-brand-pearl transition-colors">
                  Prompt Studio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-pearl mb-3">
              Tools Supported
            </h4>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li>Google Antigravity</li>
              <li>Cursor</li>
              <li>Google Stitch</li>
              <li>Claude Code</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-pearl mb-3">
              Principles & Legal
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Motionbase references are stored with source attribution and rights declarations. Screenshots are evidence of appearance; hidden implementation is never claimed.
            </p>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted/70">
          <p>© {new Date().getFullYear()} Motionbase. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Crafted for engineers, designers & AI builders
          </p>
        </div>
      </div>
    </footer>
  );
};
