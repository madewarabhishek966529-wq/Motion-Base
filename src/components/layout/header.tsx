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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Discover", icon: Compass },
  { href: "/motion-lab", label: "Motion Lab", icon: PlayCircle },
  { href: "/components-lab", label: "Components", icon: Layers },
  { href: "/prompt-studio", label: "Prompt Studio", icon: Wand2 },
  { href: "/collections", label: "Collections", icon: Bookmark },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-bg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral rounded-lg px-1 py-0.5"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-violet via-brand-coral to-brand-cyan flex items-center justify-center shadow-md shadow-brand-violet/20 group-hover:scale-105 transition-transform">
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

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
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
                  className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-xl transition-colors ${
                    isActive
                      ? "text-brand-pearl bg-brand-elevated border border-brand-border"
                      : "text-brand-muted hover:text-brand-pearl hover:bg-brand-surface"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-brand-coral" : "text-brand-muted"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/submit">
            <Button variant="outline" size="sm" className="gap-1.5">
              <PlusCircle className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Submit</span>
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-brand-muted">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Button>
          </Link>
          <Link href="/prompt-studio">
            <Button variant="coral" size="sm" className="gap-1.5 shadow-sm">
              <Wand2 className="w-3.5 h-3.5" />
              <span>AI Prompt Studio</span>
            </Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-brand-muted hover:text-brand-pearl hover:bg-brand-surface"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-brand-border bg-brand-surface/95 px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl ${
                  isActive
                    ? "text-brand-pearl bg-brand-elevated"
                    : "text-brand-muted hover:text-brand-pearl"
                }`}
              >
                <Icon className="w-4 h-4 text-brand-coral" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-brand-border flex flex-col gap-2">
            <Link href="/submit" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <PlusCircle className="w-4 h-4 text-brand-cyan" />
                Submit Reference
              </Button>
            </Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
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
