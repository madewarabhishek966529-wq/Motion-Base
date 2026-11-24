"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  ShieldCheck,
  Check,
  AlertTriangle,
  ArrowRight,
  Upload,
  Sparkles,
  Info,
} from "lucide-react";
import { storage } from "@/lib/storage";
import { ReferenceItem, PlatformType, ReferenceCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SubmitReferencePage() {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState<PlatformType>("ios");
  const [category, setCategory] = useState<ReferenceCategory>("productivity");
  const [creatorName, setCreatorName] = useState("");
  const [creatorUrl, setCreatorUrl] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [attributionText, setAttributionText] = useState("");
  const [licenseStatus, setLicenseStatus] = useState("fair_use_reference");
  const [dominantColor, setDominantColor] = useState("#FF6B72");
  const [screenUrl, setScreenUrl] = useState("");
  const [screenAlt, setScreenAlt] = useState("");
  const [rightsConfirmed, setRightsConfirmed] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rightsConfirmed) {
      alert("Please confirm the reference rights declaration.");
      return;
    }

    const newRef: ReferenceItem = {
      id: `ref-user-${Date.now()}`,
      slug: (slug || title).toLowerCase().replace(/\s+/g, "-"),
      title,
      summary,
      description,
      platform,
      category,
      styles: ["minimal", "dark"],
      referenceType: "concept",
      creatorName,
      creatorUrl: creatorUrl || undefined,
      sourceUrl,
      attributionText,
      licenseStatus,
      rightsNotes: "Submitted via community contribution workflow.",
      status: "review", // Submits to moderation review queue
      featured: false,
      dominantColor,
      tags: [platform, category, "community-submission"],
      likesCount: 0,
      savedCount: 0,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      screens: [
        {
          id: `screen-${Date.now()}`,
          applicationId: `ref-user-${Date.now()}`,
          title: `${title} Primary Screen`,
          screenOrder: 1,
          imageUrl:
            screenUrl ||
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
          thumbnailUrl:
            screenUrl ||
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
          altText: screenAlt || `${title} preview screenshot`,
          createdAt: new Date().toISOString(),
        },
      ],
      tokens: [
        {
          id: `tok-${Date.now()}`,
          applicationId: `ref-user-${Date.now()}`,
          tokenType: "color",
          tokenName: "dominant-brand",
          tokenValue: { hex: dominantColor },
          provenance: "user_submitted",
          confidence: "medium",
          updatedAt: new Date().toISOString(),
        },
      ],
      gradients: [],
      components: [],
      animations: [],
      flows: [],
    };

    storage.saveReference(newRef);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto bg-brand-surface border border-brand-border rounded-3xl p-8 space-y-4 animate-in zoom-in-95 duration-200">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-brand-pearl">
          Reference Submitted for Moderation!
        </h2>
        <p className="text-xs text-brand-muted leading-relaxed">
          Thank you for contributing to Motionbase. Your reference has been placed in the curation queue with status: <strong className="text-brand-pearl">review</strong>. Our team will verify rights attribution and design token fidelity.
        </p>
        <div className="pt-4 flex items-center justify-center gap-3">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              View in Admin Studio
            </Button>
          </Link>
          <Link href="/">
            <Button variant="coral" size="sm">
              Return to Discovery
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-6 border-b border-brand-border">
        <div className="flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-brand-coral" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-pearl tracking-tight">
            Submit an Application Reference
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-brand-muted mt-1 leading-relaxed">
          Contribute a mobile, web, or desktop application interface. We require proper creator attribution and license transparency for every submission.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Rights & Licensing Commitment */}
        <div className="p-4 rounded-2xl bg-brand-surface border border-brand-coral/40 space-y-3">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-coral shrink-0 mt-0.5" />
            <div className="text-xs text-brand-muted leading-relaxed">
              <strong className="text-brand-pearl block mb-0.5 font-semibold">
                Rights & Attribution Commitment (Required)
              </strong>
              Motionbase respects creators' intellectual property. Submissions must either be your own work, officially published public press assets, or shared with a reviewed legal basis for fair use reference.
            </div>
          </div>

          <label className="flex items-start gap-3 pt-2 text-xs text-brand-pearl cursor-pointer">
            <input
              type="checkbox"
              required
              checked={rightsConfirmed}
              onChange={(e) => setRightsConfirmed(e.target.checked)}
              className="mt-0.5 rounded border-brand-border text-brand-coral focus:ring-0 bg-brand-elevated"
            />
            <span>
              I declare that I either created this design, possess explicit permission from the creator, or am submitting public interface reference material under fair use with full creator attribution.
            </span>
          </label>
        </div>

        {/* Basic Metadata */}
        <div className="p-6 bg-brand-surface border border-brand-border rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-brand-pearl">
            Application Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-brand-muted block mb-1">
                Application Title *
              </label>
              <Input
                required
                placeholder="e.g. Arc Companion"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slug) {
                    setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }
                }}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-brand-muted block mb-1">
                Slug (URL Path) *
              </label>
              <Input
                required
                placeholder="e.g. arc-companion"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-brand-muted block mb-1">
              Summary (1 concise sentence) *
            </label>
            <Input
              required
              placeholder="e.g. Fluid space theming and dynamic tab drawer interactions."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-brand-muted block mb-1">
              Detailed Description
            </label>
            <textarea
              className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 text-xs text-brand-pearl placeholder:text-brand-muted/60 focus:border-brand-coral focus:outline-none h-20"
              placeholder="Highlight standout micro-interactions, layout density, and design patterns..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-brand-muted block mb-1">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs text-brand-pearl"
              >
                <option value="ios">iOS</option>
                <option value="android">Android</option>
                <option value="web">Web</option>
                <option value="desktop">Desktop</option>
                <option value="cross_platform">Cross Platform</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-brand-muted block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs text-brand-pearl"
              >
                <option value="productivity">Productivity</option>
                <option value="developer_tools">Developer Tools</option>
                <option value="fintech">Fintech</option>
                <option value="health">Health</option>
                <option value="ai">AI & Creative</option>
                <option value="social">Social</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-brand-muted block mb-1">
                Dominant Tint
              </label>
              <Input
                type="color"
                value={dominantColor}
                onChange={(e) => setDominantColor(e.target.value)}
                className="h-10 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Creator & Attribution Details */}
        <div className="p-6 bg-brand-surface border border-brand-border rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-brand-pearl">
            Creator & Attribution Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-brand-muted block mb-1">
                Creator / Team Name *
              </label>
              <Input
                required
                placeholder="e.g. The Browser Company"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-brand-muted block mb-1">
                Source Project URL *
              </label>
              <Input
                required
                placeholder="https://arc.net"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-brand-muted block mb-1">
              Attribution Notice *
            </label>
            <Input
              required
              placeholder="e.g. Arc is a trademark of The Browser Company. Referenced for UX study."
              value={attributionText}
              onChange={(e) => setAttributionText(e.target.value)}
            />
          </div>
        </div>

        {/* Screen Asset */}
        <div className="p-6 bg-brand-surface border border-brand-border rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-brand-pearl">
            Primary Screen Asset
          </h3>

          <div>
            <label className="text-xs font-medium text-brand-muted block mb-1">
              Screen Image URL (High Resolution PNG/JPEG)
            </label>
            <Input
              placeholder="https://images.unsplash.com/..."
              value={screenUrl}
              onChange={(e) => setScreenUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-brand-muted block mb-1">
              Descriptive Alt Text (For Accessibility)
            </label>
            <Input
              placeholder="e.g. Mobile workspace view in dark theme with coral and violet gradient backdrop"
              value={screenAlt}
              onChange={(e) => setScreenAlt(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Action */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link href="/">
            <Button variant="ghost" size="md">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="coral"
            size="md"
            disabled={!rightsConfirmed}
            className="gap-2 shadow-lg shadow-brand-coral/20"
          >
            <span>Submit for Review</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
