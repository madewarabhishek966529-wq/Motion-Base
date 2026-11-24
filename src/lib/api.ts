import { storage } from "@/lib/storage";
import { ReferenceItem, CollectionItem, PlatformType, ReferenceCategory, ReferenceStyle } from "@/types";

export interface FilterOptions {
  query?: string;
  platform?: PlatformType | "all";
  category?: ReferenceCategory | "all";
  style?: ReferenceStyle | "all";
  dominantColor?: string;
  sortBy?: "curated" | "newest" | "likes" | "saved";
  status?: string;
}

export async function getReferences(filters: FilterOptions = {}): Promise<ReferenceItem[]> {
  let items = storage.getReferences();

  // Filter by status (default only published unless in admin/draft filter)
  if (filters.status) {
    items = items.filter((item) => item.status === filters.status);
  } else {
    items = items.filter((item) => item.status === "published");
  }

  // Filter by platform
  if (filters.platform && filters.platform !== "all") {
    items = items.filter((item) => item.platform === filters.platform);
  }

  // Filter by category
  if (filters.category && filters.category !== "all") {
    items = items.filter((item) => item.category === filters.category);
  }

  // Filter by style
  if (filters.style && filters.style !== "all") {
    items = items.filter((item) => item.styles.includes(filters.style as ReferenceStyle));
  }

  // Filter by color
  if (filters.dominantColor) {
    items = items.filter((item) =>
      item.dominantColor.toLowerCase().includes(filters.dominantColor!.toLowerCase())
    );
  }

  // Filter by text search query (title, summary, tags, creator)
  if (filters.query && filters.query.trim().length > 0) {
    const q = filters.query.toLowerCase().trim();
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.creatorName.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sort
  if (filters.sortBy === "newest") {
    items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } else if (filters.sortBy === "likes") {
    items.sort((a, b) => b.likesCount - a.likesCount);
  } else if (filters.sortBy === "saved") {
    items.sort((a, b) => b.savedCount - a.savedCount);
  } else {
    // Curated: featured first, then newest
    items.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }

  return items;
}

export async function getReferenceBySlug(slug: string): Promise<ReferenceItem | null> {
  const items = storage.getReferences();
  return items.find((r) => r.slug === slug || r.id === slug) || null;
}

export async function getRelatedReferences(
  currentId: string,
  category: ReferenceCategory,
  limit: number = 3
): Promise<ReferenceItem[]> {
  const items = storage.getReferences();
  return items
    .filter((r) => r.id !== currentId && r.status === "published")
    .sort((a, b) => (a.category === category ? -1 : 1))
    .slice(0, limit);
}
