import { describe, it, expect } from "vitest";
import { CURATED_ANIMATIONS } from "@/data/animations";
import { CURATED_COMPONENTS } from "@/data/components";

describe("Phase 3: Motion Lab & Component Lab", () => {
  it("ensures all curated animations have accessible reduced-motion fallbacks", () => {
    expect(CURATED_ANIMATIONS.length).toBeGreaterThanOrEqual(5);

    CURATED_ANIMATIONS.forEach((anim) => {
      expect(["fade", "instant", "static"]).toContain(anim.reducedMotionBehavior);
      expect(anim.provenance).toBeDefined();
      expect(anim.confidence).toBeDefined();
      expect(anim.snippets.length).toBeGreaterThan(0);
    });
  });

  it("validates spring interaction physics configuration", () => {
    const springAnims = CURATED_ANIMATIONS.filter(
      (a) => a.category === "spring_interaction"
    );
    expect(springAnims.length).toBeGreaterThan(0);

    springAnims.forEach((anim) => {
      if (anim.springConfig) {
        expect(anim.springConfig.stiffness).toBeGreaterThan(0);
        expect(anim.springConfig.damping).toBeGreaterThan(0);
        expect(anim.springConfig.mass).toBeGreaterThan(0);
      }
    });
  });

  it("verifies multi-framework snippets exist for key animations", () => {
    const sheetAnim = CURATED_ANIMATIONS.find(
      (a) => a.id === "anim-spring-sheet"
    );
    expect(sheetAnim).toBeDefined();
    const frameworks = sheetAnim?.snippets.map((s) => s.framework);
    expect(frameworks).toContain("react_ts");
    expect(frameworks).toContain("flutter_dart");
  });

  it("validates component catalog items and state transitions", () => {
    expect(CURATED_COMPONENTS.length).toBeGreaterThanOrEqual(4);

    CURATED_COMPONENTS.forEach((comp) => {
      expect(comp.name).toBeTruthy();
      expect(comp.category).toBeTruthy();
      expect(comp.availableStates).toContain("default");
      expect(comp.codeSnippets.react).toContain("<");
      expect(comp.codeSnippets.flutter).toBeTruthy();
    });
  });
});
