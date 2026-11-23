import { describe, it, expect } from "vitest";
import { formatNumber, truncateText, cn } from "@/lib/utils";
import type { ReferenceItem, DesignTokenItem, PromptIR } from "@/types";

describe("Motionbase Core Domain & Utils", () => {
  it("formats numbers properly", () => {
    expect(formatNumber(1250)).toBe("1,250");
    expect(formatNumber(0)).toBe("0");
  });

  it("truncates text with ellipsis", () => {
    expect(truncateText("Short text", 20)).toBe("Short text");
    expect(truncateText("This is a much longer sentence that should truncate", 15)).toBe(
      "This is a much …"
    );
  });

  it("merges class names correctly", () => {
    const result = cn("px-4 py-2", "px-6", { "bg-red-500": true, "text-white": false });
    expect(result).toContain("py-2");
    expect(result).toContain("px-6");
    expect(result).toContain("bg-red-500");
  });

  it("validates domain reference model structure", () => {
    const reference: ReferenceItem = {
      id: "ref-1",
      slug: "linear-mobile",
      title: "Linear Mobile",
      summary: "Issue tracking and project management",
      description: "High-speed issue tracking built for modern engineering teams.",
      platform: "ios",
      category: "productivity",
      styles: ["minimal", "dark"],
      referenceType: "real_product",
      creatorName: "Linear Orbit, Inc.",
      sourceUrl: "https://linear.app",
      attributionText: "Linear is a registered trademark of Linear Orbit, Inc.",
      licenseStatus: "fair_use_reference",
      status: "published",
      featured: true,
      dominantColor: "#5E6AD2",
      tags: ["issue-tracking", "dark-mode", "high-speed"],
      likesCount: 342,
      savedCount: 189,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(reference.id).toBe("ref-1");
    expect(reference.platform).toBe("ios");
    expect(reference.status).toBe("published");
  });

  it("validates design token provenance models", () => {
    const token: DesignTokenItem = {
      id: "tok-1",
      applicationId: "ref-1",
      tokenType: "color",
      tokenName: "brand-primary",
      tokenValue: { hex: "#5E6AD2" },
      provenance: "extracted",
      confidence: "high",
      evidenceNote: "Extracted directly from native header icon screenshot",
      updatedAt: new Date().toISOString(),
    };

    expect(token.provenance).toBe("extracted");
    expect(token.confidence).toBe("high");
    expect(token.tokenValue.hex).toBe("#5E6AD2");
  });

  it("validates prompt IR schema integrity", () => {
    const promptIR: PromptIR = {
      version: "1.0.0",
      meta: {
        sourceId: "ref-1",
        title: "Linear Mobile",
        creator: "Linear",
        platform: "ios",
        category: "productivity",
        attribution: "Linear",
      },
      scope: "complete_application",
      framework: "react_typescript",
      designDna: {
        colors: [{ name: "primary", hex: "#5E6AD2", role: "brand", provenance: "extracted" }],
        gradients: [],
        typography: [{ role: "heading", spec: "18px / 600", provenance: "inferred" }],
        spacing: [{ name: "base", value: "8px" }],
        radii: [{ name: "card", value: "12px" }],
      },
      screens: [{ title: "Issue List", description: "Filterable list of issues", role: "main" }],
      components: [
        {
          name: "IssueCard",
          type: "card",
          states: ["default", "selected", "hover"],
          variants: ["compact", "expanded"],
        },
      ],
      motion: [
        {
          name: "SheetSlideUp",
          trigger: "tap",
          behavior: "Spring slide up from bottom",
          reducedMotion: "Instant opacity fade",
        },
      ],
      screenFlows: [],
      assumptions: ["Font is Inter-derived", "Animations use 250ms spring"],
      confidenceScore: "mixed",
    };

    expect(promptIR.version).toBe("1.0.0");
    expect(promptIR.components.length).toBe(1);
    expect(promptIR.motion[0].reducedMotion).toBe("Instant opacity fade");
  });
});
