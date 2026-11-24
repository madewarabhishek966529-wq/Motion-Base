"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Compass,
  PlayCircle,
  Layers,
  Wand2,
  Bookmark,
  PlusCircle,
  Menu,
  X,
  Shield,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Discover", icon: Compass },
  { href: "/demos", label: "Video Demos", icon: Video },
  { href: "/motion-lab", label: "Motion Lab", icon: PlayCircle },
  { href: "/components-lab", label: "Components", icon: Layers },
  { href: "/collections", label: "Collections", icon: Bookmark },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border/80 bg-brand-bg/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo + Primary Nav */}
        <div className="flex items-center gap-6 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral rounded-lg px-1 py-0.5 shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-violet via-brand-coral to-brand-cyan flex items-center justify-center shadow-md shadow-brand-violet/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-brand-bg fill-brand-bg" />
            </div>
            <div className="flex items-baseline">
              <span className="text-lg font-bold tracking-tight text-brand-pearl">
                Motion<span className="text-brand-coral">base</span>
              </span>
              <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider bg-brand-elevated text-brand-cyan rounded border border-brand-border">
                beta
              </span>
            </div>
          </Link>

          {/* Desktop Nav (lg+ prevents tablet cramping/wrapping) */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-xl whitespace-nowrap transition-colors ${
                    isActive
                      ? "text-brand-pearl bg-brand-elevated border border-brand-border shadow-sm"
                      : "text-brand-muted hover:text-brand-pearl hover:bg-brand-surface/80"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActive ? "text-brand-coral" : "text-brand-muted"
                    }`}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link href="/submit">
            <Button variant="outline" size="sm" className="gap-1.5 whitespace-nowrap">
              <PlusCircle className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Submit</span>
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-brand-muted whitespace-nowrap">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Button>
          </Link>
          <Link href="/prompt-studio">
            <Button
              variant="coral"
              size="sm"
              className={`gap-1.5 shadow-sm whitespace-nowrap ${
                pathname?.startsWith("/prompt-studio") ? "ring-2 ring-white/40" : ""
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Prompt Studio</span>
            </Button>
          </Link>
        </div>

        {/* Tablet/Mobile Right Controls */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <Link href="/prompt-studio" className="hidden sm:inline-flex">
            <Button variant="coral" size="sm" className="gap-1.5 text-xs">
              <Wand2 className="w-3.5 h-3.5" />
              <span>Prompt Studio</span>
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-brand-muted hover:text-brand-pearl hover:bg-brand-surface border border-transparent hover:border-brand-border transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Tablet/Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-brand-border bg-brand-surface/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                  isActive
                    ? "text-brand-pearl bg-brand-elevated border border-brand-border"
                    : "text-brand-muted hover:text-brand-pearl hover:bg-brand-elevated/50"
                }`}
              >
                <Icon className="w-4 h-4 text-brand-coral" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 mt-2 border-t border-brand-border grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Link href="/prompt-studio" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="coral" size="sm" className="w-full justify-center gap-2">
                <Wand2 className="w-4 h-4" />
                Prompt Studio
              </Button>
            </Link>
            <Link href="/submit" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full justify-center gap-2">
                <PlusCircle className="w-4 h-4 text-brand-cyan" />
                Submit Reference
              </Button>
            </Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-center gap-2">
                <Shield className="w-4 h-4" />
                Admin Studio
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
