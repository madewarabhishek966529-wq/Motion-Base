import { describe, it, expect } from "vitest";
import {
  getRelativeLuminance,
  getContrastRatio,
  checkWcagCompliance,
  exportToCssVariables,
  exportToTailwindConfig,
  exportToW3cFormat,
} from "@/lib/design-tokens";
import { DesignTokenItem } from "@/types";

describe("Phase 2: Design Intelligence & Tokens", () => {
  it("calculates relative luminance correctly according to WCAG 2.1", () => {
    // Pure black has luminance 0, pure white has luminance 1
    expect(getRelativeLuminance("#000000")).toBeCloseTo(0, 2);
    expect(getRelativeLuminance("#ffffff")).toBeCloseTo(1, 2);
  });

  it("calculates exact contrast ratios", () => {
    const whiteOnBlack = getContrastRatio("#ffffff", "#000000");
    expect(whiteOnBlack).toBe(21);

    const blackOnBlack = getContrastRatio("#000000", "#000000");
    expect(blackOnBlack).toBe(1);

    // Coral on dark canvas
    const coralOnDark = getContrastRatio("#FF6B72", "#101522");
    expect(coralOnDark).toBeGreaterThan(4.5);
  });

  it("checks WCAG AA and AAA compliance thresholds correctly", () => {
    const highContrast = checkWcagCompliance(8.2);
    expect(highContrast.aaNormal).toBe(true);
    expect(highContrast.aaaNormal).toBe(true);
    expect(highContrast.level).toBe("AAA");

    const mediumContrast = checkWcagCompliance(4.8);
    expect(mediumContrast.aaNormal).toBe(true);
    expect(mediumContrast.aaaNormal).toBe(false);
    expect(mediumContrast.level).toBe("AA");

    const largeOnly = checkWcagCompliance(3.4);
    expect(largeOnly.aaNormal).toBe(false);
    expect(largeOnly.aaLarge).toBe(true);
    expect(largeOnly.level).toBe("AA Large");

    const failing = checkWcagCompliance(1.8);
    expect(failing.aaNormal).toBe(false);
    expect(failing.aaLarge).toBe(false);
    expect(failing.level).toBe("Fail");
  });

  it("exports design tokens to CSS Custom Properties", () => {
    const sampleTokens: DesignTokenItem[] = [
      {
        id: "tok-1",
        applicationId: "app-1",
        tokenType: "color",
        tokenName: "brand-primary",
        tokenValue: { hex: "#7867FF" },
        provenance: "manually_verified",
        confidence: "high",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "tok-2",
        applicationId: "app-1",
        tokenType: "radius",
        tokenName: "card-radius",
        tokenValue: { value: "12px" },
        provenance: "extracted",
        confidence: "high",
        updatedAt: new Date().toISOString(),
      },
    ];

    const css = exportToCssVariables(sampleTokens);
    expect(css).toContain(":root {");
    expect(css).toContain("--brand-primary: #7867FF;");
    expect(css).toContain("--card-radius: 12px;");
    expect(css).toContain("}");
  });

  it("exports design tokens to Tailwind config", () => {
    const sampleTokens: DesignTokenItem[] = [
      {
        id: "tok-1",
        applicationId: "app-1",
        tokenType: "color",
        tokenName: "brand-coral",
        tokenValue: { hex: "#FF6B72" },
        provenance: "observed",
        confidence: "high",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "tok-2",
        applicationId: "app-1",
        tokenType: "radius",
        tokenName: "pill",
        tokenValue: { value: "9999px" },
        provenance: "extracted",
        confidence: "high",
        updatedAt: new Date().toISOString(),
      },
    ];

    const tailwind = exportToTailwindConfig(sampleTokens);
    expect(tailwind).toContain("theme");
    expect(tailwind).toContain("brandcoral");
    expect(tailwind).toContain("#FF6B72");
    expect(tailwind).toContain("9999px");
  });

  it("exports design tokens to W3C DTCG format JSON", () => {
    const sampleTokens: DesignTokenItem[] = [
      {
        id: "tok-1",
        applicationId: "app-1",
        tokenType: "color",
        tokenName: "brand-cyan",
        tokenValue: { hex: "#39D8E8" },
        provenance: "manually_verified",
        confidence: "high",
        evidenceNote: "Sampled from header glow",
        updatedAt: new Date().toISOString(),
      },
    ];

    const w3cJson = exportToW3cFormat(sampleTokens);
    const parsed = JSON.parse(w3cJson);
    expect(parsed.$description).toBe("Motionbase Extracted Design Tokens");
    expect(parsed.color["brand-cyan"].$value).toBe("#39D8E8");
    expect(parsed.color["brand-cyan"].$extensions["motionbase:provenance"]).toBe(
      "manually_verified"
    );
    expect(parsed.color["brand-cyan"].$extensions["motionbase:evidence"]).toBe(
      "Sampled from header glow"
    );
  });
});
