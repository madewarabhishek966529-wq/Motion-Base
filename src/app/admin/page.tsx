"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Plus,
  Trash2,
  CheckCircle,
  Archive,
  Eye,
  Edit,
  ExternalLink,
  Sparkles,
  Layers,
  Database,
} from "lucide-react";
import { ReferenceItem, ContentStatus, PlatformType, ReferenceCategory } from "@/types";
import { storage } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function AdminStudioPage() {
  const [references, setReferences] = useState<ReferenceItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // New reference form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState<PlatformType>("ios");
  const [category, setCategory] = useState<ReferenceCategory>("productivity");
  const [creatorName, setCreatorName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [attributionText, setAttributionText] = useState("");
  const [licenseStatus, setLicenseStatus] = useState("fair_use_reference");
  const [dominantColor, setDominantColor] = useState("#7867FF");
  const [screenUrl, setScreenUrl] = useState("");
  const [screenAlt, setScreenAlt] = useState("");

  const loadData = () => {
    setReferences(storage.getReferences());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = (id: string, newStatus: ContentStatus) => {
    const item = references.find((r) => r.id === id);
    if (!item) return;
    storage.saveReference({ ...item, status: newStatus });
    loadData();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this reference?")) {
      storage.deleteReference(id);
      loadData();
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return;

    const newRef: ReferenceItem = {
      id: `ref-${Date.now()}`,
      slug: slug.toLowerCase().replace(/\s+/g, "-"),
      title,
      summary,
      description,
      platform,
      category,
      styles: ["minimal", "dark"],
      referenceType: "real_product",
      creatorName,
      sourceUrl,
      attributionText,
      licenseStatus,
      status: "published",
      featured: false,
      dominantColor,
      tags: [platform, category],
      likesCount: 1,
      savedCount: 1,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      screens: [
        {
          id: `screen-${Date.now()}`,
          applicationId: `ref-${Date.now()}`,
          title: `${title} Primary Screen`,
          screenOrder: 1,
          imageUrl:
            screenUrl ||
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
          thumbnailUrl:
            screenUrl ||
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
          altText: screenAlt || `${title} interface screenshot`,
          createdAt: new Date().toISOString(),
        },
      ],
      tokens: [
        {
          id: `tok-${Date.now()}`,
          applicationId: `ref-${Date.now()}`,
          tokenType: "color",
          tokenName: "brand-dominant",
          tokenValue: { hex: dominantColor },
          provenance: "manually_verified",
          confidence: "high",
          updatedAt: new Date().toISOString(),
        },
      ],
      gradients: [],
      components: [],
      animations: [],
      flows: [],
    };

    storage.saveReference(newRef);
    setShowAddModal(false);
    // Reset form
    setTitle("");
    setSlug("");
    setSummary("");
    setDescription("");
    setCreatorName("");
    setSourceUrl("");
    setAttributionText("");
    loadData();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Admin Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-coral" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-pearl tracking-tight">
              Admin Content Studio
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Manage reference catalog, screen assets, attribution rights, and review status.
          </p>
        </div>

        <Button
          variant="coral"
          size="sm"
          onClick={() => setShowAddModal(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Reference</span>
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-brand-surface border border-brand-border rounded-xl">
          <span className="text-[11px] text-brand-muted uppercase font-medium">
            Total References
          </span>
          <div className="text-2xl font-bold text-brand-pearl mt-1">
            {references.length}
          </div>
        </div>
        <div className="p-4 bg-brand-surface border border-brand-border rounded-xl">
          <span className="text-[11px] text-brand-muted uppercase font-medium">
            Published
          </span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">
            {references.filter((r) => r.status === "published").length}
          </div>
        </div>
        <div className="p-4 bg-brand-surface border border-brand-border rounded-xl">
          <span className="text-[11px] text-brand-muted uppercase font-medium">
            Total Screens
          </span>
          <div className="text-2xl font-bold text-brand-cyan mt-1">
            {references.reduce((acc, r) => acc + (r.screens?.length || 0), 0)}
          </div>
        </div>
        <div className="p-4 bg-brand-surface border border-brand-border rounded-xl">
          <span className="text-[11px] text-brand-muted uppercase font-medium">
            Design Tokens
          </span>
          <div className="text-2xl font-bold text-brand-violet mt-1">
            {references.reduce((acc, r) => acc + (r.tokens?.length || 0), 0)}
          </div>
        </div>
      </div>

      {/* References Table */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-brand-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-brand-pearl">
            Curated Reference Catalog
          </h3>
          <span className="text-xs text-brand-muted font-mono">
            {references.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-elevated/80 text-brand-muted uppercase tracking-wider font-medium border-b border-brand-border">
              <tr>
                <th className="py-3 px-4">Title & Slug</th>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Screens</th>
                <th className="py-3 px-4">Rights Status</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {references.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-brand-elevated/40 transition-colors"
                >
                  <td className="py-3 px-4">
                    <Link
                      href={`/references/${item.slug}`}
                      className="font-semibold text-brand-pearl hover:text-brand-coral flex items-center gap-1.5"
                    >
                      <span>{item.title}</span>
                      <ExternalLink className="w-3 h-3 text-brand-muted" />
                    </Link>
                    <span className="text-[11px] font-mono text-brand-muted block">
                      /{item.slug}
                    </span>
                  </td>
                  <td className="py-3 px-4 capitalize">{item.platform}</td>
                  <td className="py-3 px-4 capitalize">
                    {item.category.replace("_", " ")}
                  </td>
                  <td className="py-3 px-4 font-mono">
                    {item.screens?.length || 0}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[11px] font-mono text-brand-muted">
                      {item.licenseStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value as ContentStatus)
                      }
                      className="bg-brand-elevated text-brand-pearl border border-brand-border rounded-lg px-2 py-1 text-xs focus:outline-none"
                    >
                      <option value="published">Published</option>
                      <option value="review">Review</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg text-brand-muted hover:text-brand-coral hover:bg-brand-elevated"
                      title="Delete reference"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Reference Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-surface border border-brand-border rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-brand-pearl">
              Add New Reference
            </h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-brand-muted block mb-1">
                    Application Title *
                  </label>
                  <Input
                    required
                    placeholder="e.g. Cron Calendar"
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
                    URL Slug *
                  </label>
                  <Input
                    required
                    placeholder="e.g. cron-calendar"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-brand-muted block mb-1">
                  Summary (1 sentence) *
                </label>
                <Input
                  required
                  placeholder="e.g. Next generation calendar designed for professionals."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-brand-muted block mb-1">
                  Full Description
                </label>
                <textarea
                  className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 text-xs text-brand-pearl placeholder:text-brand-muted/60 focus:border-brand-coral focus:outline-none h-20"
                  placeholder="Explain UI patterns, density, and interaction highlights..."
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-brand-muted block mb-1">
                    Creator Name *
                  </label>
                  <Input
                    required
                    placeholder="e.g. Notion Labs, Inc."
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
                    placeholder="https://notion.so/calendar"
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-brand-muted block mb-1">
                  Attribution & License Declaration *
                </label>
                <Input
                  required
                  placeholder="e.g. Registered trademark of Notion Labs. Reference under fair use."
                  value={attributionText}
                  onChange={(e) => setAttributionText(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-brand-muted block mb-1">
                  Screen Image URL (High Resolution)
                </label>
                <Input
                  placeholder="https://images.unsplash.com/..."
                  value={screenUrl}
                  onChange={(e) => setScreenUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-brand-muted block mb-1">
                  Screen Descriptive Alt Text (Accessibility)
                </label>
                <Input
                  placeholder="e.g. Desktop calendar weekly view in dark mode with color tagged meeting blocks"
                  value={screenAlt}
                  onChange={(e) => setScreenAlt(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-brand-border">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="coral" size="sm">
                  Publish to Catalog
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
