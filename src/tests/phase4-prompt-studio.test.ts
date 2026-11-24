import { describe, it, expect } from "vitest";
import { SEED_REFERENCES } from "@/data/references";
import { buildPromptIR } from "@/lib/prompt-engine/prompt-ir";
import { generateImplementationPrompt } from "@/lib/prompt-engine/adapters";
import {
  PromptTool,
  PromptScope,
  PromptFramework,
  PromptInputParams,
} from "@/types";

describe("Phase 4: Prompt Studio IR Engine & Multi-Adapters", () => {
  const reference = SEED_REFERENCES[0]; // Linear Mobile

  it("compiles a valid, versioned Prompt IR with metadata and provenance", () => {
    const ir = buildPromptIR(reference, "complete_application", "nextjs_tailwind");

    expect(ir.version).toBe("1.0.0");
    expect(ir.meta.title).toBe("Linear Mobile");
    expect(ir.meta.creator).toBe("Linear Orbit, Inc.");
    expect(ir.designDna.colors.length).toBeGreaterThan(0);
    expect(ir.screens.length).toBeGreaterThan(0);
    expect(ir.assumptions.length).toBeGreaterThan(0);
  });

  it("generates specific guidelines for Google Antigravity", () => {
    const params: PromptInputParams = {
      referenceId: reference.id,
      tool: "antigravity",
      scope: "complete_application",
      framework: "nextjs_tailwind",
      fidelity: "close_recreation",
      animationIntensity: "balanced",
      includeAccessibility: true,
      includeAssumptions: true,
    };

    const prompt = generateImplementationPrompt(params, reference);
    expect(prompt).toContain("Antigravity Execution Guidelines");
    expect(prompt).toContain("Phased Implementation");
    expect(prompt).toContain("Verification Checkpoints");
  });

  it("generates codebase-first incremental guidelines for Cursor", () => {
    const params: PromptInputParams = {
      referenceId: reference.id,
      tool: "cursor",
      scope: "complete_application",
      framework: "react_typescript",
      fidelity: "close_recreation",
      animationIntensity: "balanced",
      includeAccessibility: true,
      includeAssumptions: true,
    };

    const prompt = generateImplementationPrompt(params, reference);
    expect(prompt).toContain("Cursor Execution Guidelines");
    expect(prompt).toContain("Inspect Codebase First");
    expect(prompt).toContain("Incremental Modifications");
  });

  it("ensures Google Stitch prompt focuses on visual design and clarifies scope", () => {
    const params: PromptInputParams = {
      referenceId: reference.id,
      tool: "stitch",
      scope: "complete_application",
      framework: "html_css_javascript",
      fidelity: "inspiration",
      animationIntensity: "subtle",
      includeAccessibility: true,
      includeAssumptions: true,
    };

    const prompt = generateImplementationPrompt(params, reference);
    expect(prompt).toContain("Google Stitch Design Guidelines");
    expect(prompt).toContain("Visual Composition");
    expect(prompt).toContain("Google Stitch is used for high-fidelity visual design composition");
  });

  it("generates architectural review and modular verification for Claude Code", () => {
    const params: PromptInputParams = {
      referenceId: reference.id,
      tool: "claude_code",
      scope: "complete_application",
      framework: "flutter_dart",
      fidelity: "pixel_focused",
      animationIntensity: "expressive",
      includeAccessibility: true,
      includeAssumptions: true,
    };

    const prompt = generateImplementationPrompt(params, reference);
    expect(prompt).toContain("Claude Code Execution Guidelines");
    expect(prompt).toContain("Architectural Review");
    expect(prompt).toContain("Modular Implementation");
  });

  it("produces valid outputs across all 64 tool x scope x framework matrix combinations", () => {
    const tools: PromptTool[] = ["antigravity", "cursor", "stitch", "claude_code"];
    const scopes: PromptScope[] = [
      "complete_application",
      "individual_screen",
      "animation_motion",
      "design_system",
    ];
    const frameworks: PromptFramework[] = [
      "react_typescript",
      "flutter_dart",
      "html_css_javascript",
      "nextjs_tailwind",
    ];

    let count = 0;
    for (const tool of tools) {
      for (const scope of scopes) {
        for (const framework of frameworks) {
          const params: PromptInputParams = {
            referenceId: reference.id,
            tool,
            scope,
            framework,
            fidelity: "close_recreation",
            animationIntensity: "balanced",
            includeAccessibility: true,
            includeAssumptions: true,
          };

          const prompt = generateImplementationPrompt(params, reference);
          expect(prompt.length).toBeGreaterThan(200);
          expect(prompt).toContain("Role & Objective");
          expect(prompt).toContain("Observed vs. Estimated");
          count++;
        }
      }
    }
    expect(count).toBe(64);
  });
});
