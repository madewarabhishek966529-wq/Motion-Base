import { SEED_REFERENCES } from "@/data/references";
import { ReferenceItem, CollectionItem } from "@/types";

const REFERENCES_STORAGE_KEY = "motionbase_custom_references_v2";
const BOOKMARKS_STORAGE_KEY = "motionbase_bookmarks_v1";
const COLLECTIONS_STORAGE_KEY = "motionbase_collections_v1";
const LIKES_STORAGE_KEY = "motionbase_likes_v1";

// Default collections
const DEFAULT_COLLECTIONS: CollectionItem[] = [
  {
    id: "col-default-1",
    userId: "usr-guest",
    title: "Mobile Motion Favorites",
    description: "Curated spring physics and fluid gestural patterns for mobile UX.",
    visibility: "public",
    referenceIds: ["ref-linear", "ref-arc"],
    createdAt: "2026-10-20T12:00:00Z",
    updatedAt: "2026-10-20T12:00:00Z",
  },
  {
    id: "col-default-2",
    userId: "usr-guest",
    title: "Developer Tools & Dark Mode",
    description: "High-density command centers, syntax-themed interfaces, and obsidian dark palettes.",
    visibility: "public",
    referenceIds: ["ref-linear", "ref-raycast", "ref-supabase"],
    createdAt: "2026-10-25T14:00:00Z",
    updatedAt: "2026-10-25T14:00:00Z",
  },
];

class StorageService {
  private memoryReferences: ReferenceItem[] = [...SEED_REFERENCES];
  private memoryBookmarks: string[] = ["ref-linear"];
  private memoryLikes: string[] = [];
  private memoryCollections: CollectionItem[] = [...DEFAULT_COLLECTIONS];

  private isBrowser(): boolean {
    return typeof window !== "undefined" && typeof localStorage !== "undefined";
  }

  // References
  getReferences(): ReferenceItem[] {
    if (!this.isBrowser()) {
      return [...this.memoryReferences];
    }
    try {
      const stored = localStorage.getItem(REFERENCES_STORAGE_KEY);
      if (!stored) {
        return [...SEED_REFERENCES];
      }
      const custom: ReferenceItem[] = JSON.parse(stored);
      // Merge seed with any locally created/edited references
      const customMap = new Map(custom.map((r) => [r.id, r]));
      const merged = SEED_REFERENCES.map((seed) => customMap.get(seed.id) || seed);
      
      // Also include brand new custom references
      custom.forEach((item) => {
        if (!SEED_REFERENCES.some((s) => s.id === item.id)) {
          merged.unshift(item);
        }
      });
      return merged;
    } catch (e) {
      console.warn("Error reading references from storage:", e);
      return [...SEED_REFERENCES];
    }
  }

  saveReference(ref: ReferenceItem): ReferenceItem {
    const list = this.getReferences();
    const existingIndex = list.findIndex((r) => r.id === ref.id || r.slug === ref.slug);
    
    if (existingIndex >= 0) {
      list[existingIndex] = { ...ref, updatedAt: new Date().toISOString() };
    } else {
      list.unshift({ ...ref, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }

    this.memoryReferences = list;

    if (this.isBrowser()) {
      try {
        localStorage.setItem(REFERENCES_STORAGE_KEY, JSON.stringify(list));
      } catch (e) {
        console.error("Storage error:", e);
      }
    }
    return ref;
  }

  deleteReference(id: string): boolean {
    const list = this.getReferences().filter((r) => r.id !== id);
    this.memoryReferences = list;
    if (this.isBrowser()) {
      try {
        localStorage.setItem(REFERENCES_STORAGE_KEY, JSON.stringify(list));
      } catch (e) {
        console.error("Storage error:", e);
      }
    }
    return true;
  }

  // Bookmarks / Saved
  getBookmarks(): string[] {
    if (!this.isBrowser()) return [...this.memoryBookmarks];
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : ["ref-linear"];
    } catch {
      return ["ref-linear"];
    }
  }

  toggleBookmark(referenceId: string): boolean {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(referenceId);
    let isSaved = false;

    if (index >= 0) {
      bookmarks.splice(index, 1);
      isSaved = false;
    } else {
      bookmarks.push(referenceId);
      isSaved = true;
    }

    this.memoryBookmarks = [...bookmarks];

    if (this.isBrowser()) {
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
      } catch (e) {
        console.error(e);
      }
    }
    return isSaved;
  }

  // Likes
  getLikes(): string[] {
    if (!this.isBrowser()) return [...this.memoryLikes];
    try {
      const stored = localStorage.getItem(LIKES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  toggleLike(referenceId: string): boolean {
    const likes = this.getLikes();
    const index = likes.indexOf(referenceId);
    let isLiked = false;

    if (index >= 0) {
      likes.splice(index, 1);
      isLiked = false;
    } else {
      likes.push(referenceId);
      isLiked = true;
    }

    this.memoryLikes = [...likes];

    if (this.isBrowser()) {
      try {
        localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likes));
      } catch (e) {
        console.error(e);
      }
    }
    return isLiked;
  }

  // Collections
  getCollections(): CollectionItem[] {
    if (!this.isBrowser()) return [...this.memoryCollections];
    try {
      const stored = localStorage.getItem(COLLECTIONS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_COLLECTIONS;
    } catch {
      return DEFAULT_COLLECTIONS;
    }
  }

  createCollection(title: string, description?: string): CollectionItem {
    const newItem: CollectionItem = {
      id: `col-${Date.now()}`,
      userId: "usr-guest",
      title: title.trim(),
      description: description?.trim(),
      visibility: "public",
      referenceIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const collections = this.getCollections();
    collections.unshift(newItem);
    this.memoryCollections = collections;

    if (this.isBrowser()) {
      try {
        localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(collections));
      } catch (e) {
        console.error(e);
      }
    }
    return newItem;
  }

  addReferenceToCollection(collectionId: string, referenceId: string): boolean {
    const collections = this.getCollections();
    const target = collections.find((c) => c.id === collectionId);
    if (!target) return false;

    if (!target.referenceIds.includes(referenceId)) {
      target.referenceIds.push(referenceId);
      target.updatedAt = new Date().toISOString();
      this.memoryCollections = collections;
      if (this.isBrowser()) {
        try {
          localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(collections));
        } catch (e) {
          console.error(e);
        }
      }
    }
    return true;
  }

  removeReferenceFromCollection(collectionId: string, referenceId: string): boolean {
    const collections = this.getCollections();
    const target = collections.find((c) => c.id === collectionId);
    if (!target) return false;

    target.referenceIds = target.referenceIds.filter((id) => id !== referenceId);
    target.updatedAt = new Date().toISOString();
    this.memoryCollections = collections;

    if (this.isBrowser()) {
      try {
        localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(collections));
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  }
}

export const storage = new StorageService();
