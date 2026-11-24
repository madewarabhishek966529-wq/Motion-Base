"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bookmark,
  FolderPlus,
  Trash2,
  ExternalLink,
  Sparkles,
  Plus,
  Lock,
  Globe,
} from "lucide-react";
import { ReferenceItem, CollectionItem } from "@/types";
import { storage } from "@/lib/storage";
import { ReferenceCard } from "@/components/discovery/reference-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CollectionsPage() {
  const [bookmarks, setBookmarks] = useState<ReferenceItem[]>([]);
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [activeTab, setActiveTab] = useState<"bookmarks" | "custom">("bookmarks");

  const loadData = () => {
    const allRefs = storage.getReferences();
    const savedIds = storage.getBookmarks();
    const savedItems = allRefs.filter((r) => savedIds.includes(r.id));
    setBookmarks(savedItems);
    setCollections(storage.getCollections());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    storage.createCollection(newTitle, newDesc);
    setNewTitle("");
    setNewDesc("");
    setShowCreateModal(false);
    loadData();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-pearl tracking-tight">
            Saved & Collections
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Organize UI references, motion patterns, and design systems for your projects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="coral"
            size="sm"
            onClick={() => setShowCreateModal(true)}
            className="gap-2"
          >
            <FolderPlus className="w-4 h-4" />
            <span>New Collection</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-brand-border pb-1">
        <button
          onClick={() => setActiveTab("bookmarks")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-colors ${
            activeTab === "bookmarks"
              ? "bg-brand-elevated text-brand-pearl border border-brand-border"
              : "text-brand-muted hover:text-brand-pearl"
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 text-brand-coral" />
          <span>All Bookmarks</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-brand-surface font-mono text-brand-muted">
            {bookmarks.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("custom")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-colors ${
            activeTab === "custom"
              ? "bg-brand-elevated text-brand-pearl border border-brand-border"
              : "text-brand-muted hover:text-brand-pearl"
          }`}
        >
          <FolderPlus className="w-3.5 h-3.5 text-brand-cyan" />
          <span>Custom Collections</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-brand-surface font-mono text-brand-muted">
            {collections.length}
          </span>
        </button>
      </div>

      {/* Bookmarks Tab */}
      {activeTab === "bookmarks" && (
        <div>
          {bookmarks.length === 0 ? (
            <div className="py-20 text-center bg-brand-surface/40 rounded-2xl border border-brand-border p-6">
              <Bookmark className="w-10 h-10 text-brand-muted/40 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-brand-pearl mb-1">
                No saved references yet
              </h3>
              <p className="text-xs text-brand-muted max-w-sm mx-auto mb-6">
                When exploring the discovery feed, click the bookmark icon on any design card to save it here for quick access.
              </p>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Browse Discovery
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarks.map((ref) => (
                <ReferenceCard
                  key={ref.id}
                  reference={ref}
                  onBookmarkChange={loadData}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Collections Tab */}
      {activeTab === "custom" && (
        <div className="space-y-6">
          {collections.map((col) => {
            const allRefs = storage.getReferences();
            const colRefs = allRefs.filter((r) => col.referenceIds.includes(r.id));

            return (
              <div
                key={col.id}
                className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-border/60 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-brand-pearl">
                        {col.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-brand-elevated text-brand-muted flex items-center gap-1">
                        {col.visibility === "public" ? (
                          <>
                            <Globe className="w-2.5 h-2.5 text-brand-cyan" />
                            Public
                          </>
                        ) : (
                          <>
                            <Lock className="w-2.5 h-2.5" />
                            Private
                          </>
                        )}
                      </span>
                    </div>
                    {col.description && (
                      <p className="text-xs text-brand-muted mt-1">
                        {col.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-mono text-brand-muted">
                    {colRefs.length} items
                  </span>
                </div>

                {colRefs.length === 0 ? (
                  <p className="text-xs text-brand-muted italic py-4">
                    This collection is currently empty.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {colRefs.map((ref) => (
                      <ReferenceCard
                        key={ref.id}
                        reference={ref}
                        onBookmarkChange={loadData}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* New Collection Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-surface border border-brand-border rounded-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-brand-pearl">
              Create New Collection
            </h3>
            <form onSubmit={handleCreateCollection} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-brand-muted block mb-1.5">
                  Collection Title *
                </label>
                <Input
                  required
                  placeholder="e.g. Fintech Glassmorphism"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-brand-muted block mb-1.5">
                  Description (optional)
                </label>
                <textarea
                  className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 text-xs text-brand-pearl placeholder:text-brand-muted/60 focus:border-brand-coral focus:outline-none h-20"
                  placeholder="What is the purpose of this reference board?"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="coral" size="sm">
                  Create Collection
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
