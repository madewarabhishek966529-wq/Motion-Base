import { describe, it, expect } from "vitest";
import { getReferences, getReferenceBySlug, getRelatedReferences } from "@/lib/api";
import { storage } from "@/lib/storage";

describe("Phase 1: Discovery, Filters, References & Collections", () => {
  it("retrieves published references with default filters", async () => {
    const references = await getReferences();
    expect(references.length).toBeGreaterThan(0);
    expect(references.every((r) => r.status === "published")).toBe(true);
  });

  it("filters references by platform accurately", async () => {
    const iosRefs = await getReferences({ platform: "ios" });
    expect(iosRefs.length).toBeGreaterThan(0);
    expect(iosRefs.every((r) => r.platform === "ios")).toBe(true);

    const desktopRefs = await getReferences({ platform: "desktop" });
    expect(desktopRefs.length).toBeGreaterThan(0);
    expect(desktopRefs.every((r) => r.platform === "desktop")).toBe(true);
  });

  it("filters references by category accurately", async () => {
    const devTools = await getReferences({ category: "developer_tools" });
    expect(devTools.length).toBeGreaterThan(0);
    expect(devTools.every((r) => r.category === "developer_tools")).toBe(true);
  });

  it("filters references by visual style", async () => {
    const darkRefs = await getReferences({ style: "dark" });
    expect(darkRefs.length).toBeGreaterThan(0);
    expect(darkRefs.every((r) => r.styles.includes("dark"))).toBe(true);
  });

  it("searches references by title, creator, or tags", async () => {
    const linearSearch = await getReferences({ query: "Linear" });
    expect(linearSearch.length).toBeGreaterThan(0);
    expect(linearSearch[0].slug).toBe("linear-mobile");

    const raycastSearch = await getReferences({ query: "command" });
    expect(raycastSearch.length).toBeGreaterThan(0);
    expect(raycastSearch.some((r) => r.slug === "raycast-command-palette")).toBe(true);
  });

  it("sorts references by likes and saved counts", async () => {
    const likedRefs = await getReferences({ sortBy: "likes" });
    for (let i = 0; i < likedRefs.length - 1; i++) {
      expect(likedRefs[i].likesCount).toBeGreaterThanOrEqual(likedRefs[i + 1].likesCount);
    }

    const savedRefs = await getReferences({ sortBy: "saved" });
    for (let i = 0; i < savedRefs.length - 1; i++) {
      expect(savedRefs[i].savedCount).toBeGreaterThanOrEqual(savedRefs[i + 1].savedCount);
    }
  });

  it("finds a reference by slug with complete screen galleries", async () => {
    const ref = await getReferenceBySlug("linear-mobile");
    expect(ref).not.toBeNull();
    expect(ref?.title).toBe("Linear Mobile");
    expect(ref?.screens?.length).toBeGreaterThanOrEqual(2);
    expect(ref?.tokens?.length).toBeGreaterThan(0);
    expect(ref?.animations?.length).toBeGreaterThan(0);
  });

  it("finds related references in the same category", async () => {
    const related = await getRelatedReferences("ref-linear", "productivity", 2);
    expect(related.length).toBeGreaterThan(0);
    expect(related.every((r) => r.id !== "ref-linear")).toBe(true);
  });

  it("toggles bookmarks and persists without duplicates", () => {
    const initialBookmarks = storage.getBookmarks();
    const testId = "ref-arc";

    // Toggle on
    const isSaved = storage.toggleBookmark(testId);
    expect(storage.getBookmarks()).toContain(testId);

    // Toggle off
    const isUnsaved = storage.toggleBookmark(testId);
    expect(storage.getBookmarks().includes(testId)).toBe(!isSaved);
  });

  it("manages custom collections correctly", () => {
    const col = storage.createCollection("Test Vault", "Personal testing collection");
    expect(col.title).toBe("Test Vault");

    // Add reference
    const added = storage.addReferenceToCollection(col.id, "ref-raycast");
    expect(added).toBe(true);

    const updatedCol = storage.getCollections().find((c) => c.id === col.id);
    expect(updatedCol?.referenceIds).toContain("ref-raycast");

    // Remove reference
    const removed = storage.removeReferenceFromCollection(col.id, "ref-raycast");
    expect(removed).toBe(true);
    const emptiedCol = storage.getCollections().find((c) => c.id === col.id);
    expect(emptiedCol?.referenceIds).not.toContain("ref-raycast");
  });
});
