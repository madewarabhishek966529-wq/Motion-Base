import { ComponentPromptParams, DemoPartId } from "@/features/demos/types";
import { PromptFramework, PromptTool } from "@/types";

/**
 * Generates a focused, high-precision implementation prompt for a selected demo app
 * and specific UI module (e.g. Bottom Navigation, Top Navigation, Cards, Drawer, or Full App).
 */
export function generateComponentPrompt(params: ComponentPromptParams): string {
  const { app, partId, tool, framework, additionalInstructions } = params;
  const mod = app.modules[partId] || app.modules.complete_app;

  const toolLabels: Record<PromptTool, string> = {
    antigravity: "Google Antigravity Agent",
    cursor: "Cursor AI Composer",
    stitch: "Google Stitch Visual Design",
    claude_code: "Claude Code CLI",
  };

  const fwLabels: Record<PromptFramework, string> = {
    nextjs_tailwind: "Next.js (App Router) + Tailwind CSS + Framer Motion",
    react_typescript: "React + TypeScript + Framer Motion",
    flutter_dart: "Flutter + Dart",
    html_css_javascript: "Semantic HTML5 + CSS Variables + Vanilla JavaScript",
  };

  const sections: string[] = [];

  sections.push(`# Role & Objective
You are a senior frontend engineer and UI architect using **${toolLabels[tool]}**.
Implement the **${mod.title}** inspired by the live demo **"${app.title}"** (${app.platform.toUpperCase()} — ${app.category}).
Target Stack: **${fwLabels[framework]}**.`);

  sections.push(`## Module Specification: ${mod.shortLabel}
- **Goal:** ${mod.summary}
- **Key UI Elements:**
${mod.keyElements.map((el) => `  - ${el}`).join("\n")}`);

  sections.push(`## Design Tokens & Visual Theme
- **Canvas Background:** \`${app.bgColor}\`
- **Elevated Surface:** \`${app.surfaceColor}\`
- **Primary Brand Accent:** \`${app.accentColor}\`
- **Secondary Accent:** \`${app.secondaryColor}\`
- **Rule:** Preserve strict color contrast (>=4.5:1 text) and avoid layout shifts (CLS <= 0.1).`);

  sections.push(`## Layout & Responsive Rules
${mod.layoutRules.map((r) => `- ${r}`).join("\n")}`);

  sections.push(`## Motion & Accessibility Behavior
- **Animation Timing:** ${mod.motionSpec}
- **Hardware Acceleration:** Animate only \`transform\` and \`opacity\`.
- **Accessibility:** ${mod.accessibilityNotes}
- **Reduced Motion:** Evaluate \`prefers-reduced-motion\` and provide instant/fade fallbacks.`);

  const refSnippet =
    framework === "flutter_dart" ? mod.sampleCodeFlutter : mod.sampleCodeReact;

  sections.push(`## Reference Starter Structure (${fwLabels[framework]})
\`\`\`${framework === "flutter_dart" ? "dart" : "tsx"}
${refSnippet}
\`\`\``);

  sections.push(renderToolGuidance(tool, partId));

  if (additionalInstructions && additionalInstructions.trim()) {
    sections.push(`## Custom Requirements\n${additionalInstructions.trim()}`);
  }

  return sections.join("\n\n---\n\n");
}

function renderToolGuidance(tool: PromptTool, partId: DemoPartId): string {
  switch (tool) {
    case "antigravity":
      return `## Google Antigravity Execution Plan
1. Setup the design tokens in \`tailwind.config.ts\` / CSS variables.
2. Build the \`${partId}\` component with typed props and semantic landmarks.
3. Add Framer Motion spring transitions with \`useReducedMotion()\` fallback.
4. Run tests and verify responsive behavior at 375px and 1280px.`;
    case "cursor":
      return `## Cursor Execution Instructions
1. Inspect existing layout and UI primitives before creating new files.
2. Implement \`${partId}\` cleanly in its own feature component file.
3. Reuse existing utility helpers (\`cn\`) and verify types with \`npm run build\`.`;
    case "stitch":
      return `## Google Stitch Visual Instructions
1. Emphasize crisp visual spacing, visual hierarchy, and surface contrast for \`${partId}\`.
2. Render Mobile (390px) and Desktop responsive layouts clearly.
> Note: Tailored for high-fidelity visual screen composition.`;
    case "claude_code":
      return `## Claude Code Execution Steps
1. Inspect project structure and theme configuration.
2. Implement \`${partId}\` with clean state management and keyboard accessibility.
3. Verify compilation, run unit tests, and summarize touched files.`;
  }
}
