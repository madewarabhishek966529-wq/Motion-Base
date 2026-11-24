import { describe, it, expect } from "vitest";
import { NAV_STYLES, NAV_COLOR_PRESETS, NAV_ANIMATION_CURVES } from "@/features/navigation/nav-styles";
import { generateNavStylePrompt } from "@/lib/prompt-engine/nav-prompt-builder";

describe("Navigation Phase 1: 12 Navigation Styles & Flutter/React Prompt Engine", () => {
  it("provides 12 distinct navigation styles with Flutter and React snippets", () => {
    expect(NAV_STYLES.length).toBe(12);
    const ids = new Set(NAV_STYLES.map((s) => s.id));
    expect(ids.size).toBe(12);

    NAV_STYLES.forEach((style) => {
      expect(style.tabs.length).toBe(5);
      expect(style.flutterSnippet.length).toBeGreaterThan(20);
      expect(style.reactSnippet.length).toBeGreaterThan(20);
    });
  });

  it("includes color presets and animation curve presets", () => {
    expect(NAV_COLOR_PRESETS.length).toBeGreaterThanOrEqual(6);
    expect(Object.keys(NAV_ANIMATION_CURVES)).toEqual([
      "spring_bounce",
      "elastic_overshoot",
      "smooth_ease",
      "snappy",
    ]);
  });

  it("generates Flutter and Next.js prompts respecting custom colors and surfaces", () => {
    const sample = NAV_STYLES[0];
    const flutterPrompt = generateNavStylePrompt({
      navStyle: sample,
      accentColor: "#3ECF8E",
      surfaceMode: "light",
      animationPreset: "elastic_overshoot",
      speed: 1,
      tool: "antigravity",
      framework: "flutter_dart",
    });

    expect(flutterPrompt).toContain("Flutter + Dart");
    expect(flutterPrompt).toContain("#3ECF8E");
    expect(flutterPrompt).toContain("Elastic Overshoot");
    expect(flutterPrompt).toContain("FloatingActionButton");

    const reactPrompt = generateNavStylePrompt({
      navStyle: NAV_STYLES[4],
      accentColor: "#FF6B72",
      surfaceMode: "glass",
      animationPreset: "spring_bounce",
      speed: 0.5,
      tool: "cursor",
      framework: "nextjs_tailwind",
    });

    expect(reactPrompt).toContain("Next.js + Tailwind CSS");
    expect(reactPrompt).toContain("#FF6B72");
    expect(reactPrompt).toContain("GLASS");
  });
});
