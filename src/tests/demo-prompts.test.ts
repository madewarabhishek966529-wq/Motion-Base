import { describe, it, expect } from "vitest";
import { DEMO_APPS } from "@/features/demos/demo-apps";
import { generateComponentPrompt } from "@/lib/prompt-engine/component-prompt-builder";
import { DemoPartId } from "@/features/demos/types";
import { PromptFramework, PromptTool } from "@/types";

describe("Demos Phase 1: Video Demo Apps & Modular Prompt Builder", () => {
  it("includes Expense Tracker and diverse app demos with all required parts", () => {
    const expenseApp = DEMO_APPS.find((a) => a.slug === "expense-tracker-pro");
    expect(expenseApp).toBeDefined();
    expect(DEMO_APPS.length).toBeGreaterThanOrEqual(6);

    const requiredParts: DemoPartId[] = [
      "bottom_nav",
      "top_nav",
      "core_ui",
      "action_sheet",
      "motion_tokens",
      "complete_app",
    ];

    DEMO_APPS.forEach((app) => {
      expect(app.scenes.length).toBeGreaterThanOrEqual(4);
      requiredParts.forEach((part) => {
        expect(app.modules[part]).toBeDefined();
        expect(app.modules[part].sampleCodeReact).toBeTruthy();
        expect(app.modules[part].sampleCodeFlutter).toBeTruthy();
      });
    });
  });

  it("generates targeted prompts for Bottom Navigation and Top Navigation across all tools", () => {
    const expenseApp = DEMO_APPS[0];
    const tools: PromptTool[] = ["antigravity", "cursor", "stitch", "claude_code"];
    const frameworks: PromptFramework[] = [
      "nextjs_tailwind",
      "react_typescript",
      "flutter_dart",
      "html_css_javascript",
    ];

    for (const tool of tools) {
      for (const framework of frameworks) {
        const bottomPrompt = generateComponentPrompt({
          app: expenseApp,
          partId: "bottom_nav",
          tool,
          framework,
        });
        expect(bottomPrompt).toContain("Bottom Navigation");
        expect(bottomPrompt).toContain(expenseApp.accentColor);

        const topPrompt = generateComponentPrompt({
          app: expenseApp,
          partId: "top_nav",
          tool,
          framework,
        });
        expect(topPrompt).toContain("Top Navigation");
      }
    }
  });
});
