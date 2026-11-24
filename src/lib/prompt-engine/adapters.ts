import {
  PromptInputParams,
  PromptIR,
  ReferenceItem,
  PromptTool,
  PromptScope,
  PromptFramework,
} from "@/types";
import { buildPromptIR } from "@/lib/prompt-engine/prompt-ir";

/**
 * Main prompt compilation engine: maps IR through Tool, Scope, and Framework adapters
 */
export function generateImplementationPrompt(
  params: PromptInputParams,
  reference: ReferenceItem
): string {
  const ir = buildPromptIR(reference, params.scope, params.framework);
  const sections: string[] = [];

  // 1. Role & Objective
  sections.push(renderRoleAndObjective(params.tool, params.scope, ir));

  // 2. Reference Context & Source Attribution
  sections.push(renderReferenceContext(ir));

  // 3. Observed vs. Estimated Provenance Disclosure
  sections.push(renderProvenanceDisclosure(ir));

  // 4. Scope-Specific Content
  if (params.scope === "complete_application" || params.scope === "individual_screen") {
    sections.push(renderScreenSpecs(ir, params.targetScreenId));
  }

  if (params.scope === "complete_application" || params.scope === "design_system") {
    sections.push(renderDesignSystemSpecs(ir));
    sections.push(renderComponentSpecs(ir));
  }

  if (params.scope === "complete_application" || params.scope === "animation_motion") {
    sections.push(renderMotionSpecs(ir, params.animationIntensity));
  }

  if (params.scope === "complete_application" && ir.screenFlows.length > 0) {
    sections.push(renderFlowSpecs(ir));
  }

  // 5. Framework-Specific Implementation Instructions
  sections.push(renderFrameworkInstructions(params.framework, params.scope));

  // 6. Tool-Specific Instructions
  sections.push(renderToolInstructions(params.tool));

  // 7. Fidelity, Accessibility & Verification
  sections.push(
    renderQualityAndAcceptance(
      params.fidelity,
      params.includeAccessibility,
      params.includeAssumptions,
      ir
    )
  );

  // 8. Custom user instructions if provided
  if (params.additionalInstructions && params.additionalInstructions.trim()) {
    sections.push(`## Additional User Instructions\n${params.additionalInstructions.trim()}`);
  }

  return sections.join("\n\n---\n\n");
}

function renderRoleAndObjective(
  tool: PromptTool,
  scope: PromptScope,
  ir: PromptIR
): string {
  const toolNames: Record<PromptTool, string> = {
    antigravity: "Google Antigravity Agent",
    cursor: "Cursor AI Assistant",
    stitch: "Google Stitch Visual Builder",
    claude_code: "Claude Code CLI Agent",
  };

  const scopeDescriptions: Record<PromptScope, string> = {
    complete_application: "complete front-to-back application user interface",
    individual_screen: "isolated production-ready single screen view",
    animation_motion: "interactive motion and spring animation system",
    design_system: "reusable design system, design tokens, and core UI component primitives",
  };

  return `# Role & Objective
You are a senior frontend engineer and interaction design specialist working with **${toolNames[tool]}**.
Your objective is to implement the **${scopeDescriptions[scope]}** inspired by the curated reference **"${ir.meta.title}"** (${ir.meta.platform.toUpperCase()}).`;
}

function renderReferenceContext(ir: PromptIR): string {
  return `## Reference Context & Attribution
- **Application:** ${ir.meta.title}
- **Creator / Organization:** ${ir.meta.creator}
- **Target Platform:** ${ir.meta.platform}
- **Category:** ${ir.meta.category}
- **Attribution & Rights Notice:** ${ir.meta.attribution}
> Note: This specification is constructed from observed visual design reference data for educational, inspiration, and recreation purposes.`;
}

function renderProvenanceDisclosure(ir: PromptIR): string {
  return `## Observed vs. Estimated Provenance Disclosure
To ensure reliable, hallucination-free implementation:
- **Observed / Extracted Properties:** Colors, hex values, border radii, and visual layout hierarchy are extracted directly from high-resolution reference captures.
- **Inferred Properties:** Typography scale metrics, animation spring tensions (stiffness/damping), and deep state trees are modeled approximations designed to replicate the observable interface behavior.
- **Rule:** Do not invent hidden backend API endpoints or fabricate unverifiable proprietary technologies.`;
}

function renderDesignSystemSpecs(ir: PromptIR): string {
  const colorsText = ir.designDna.colors
    .map(
      (c) => `- \`${c.name}\`: **${c.hex}** (${c.role}) — *[Provenance: ${c.provenance}]*`
    )
    .join("\n");

  const gradientsText =
    ir.designDna.gradients.length > 0
      ? ir.designDna.gradients.map((g) => `- **${g.name}:** \`${g.css}\``).join("\n")
      : "- None observed; uses solid flat surfaces.";

  const typoText = ir.designDna.typography
    .map((t) => `- **${t.role}:** ${t.spec}`)
    .join("\n");

  const radiiText = ir.designDna.radii
    .map((r) => `- **${r.name}:** \`${r.value}\``)
    .join("\n");

  return `## Design System & Token Specifications

### Color Palette
${colorsText}

### Gradients & Surface Luminance
${gradientsText}

### Typography Scale
${typoText || "- Primary font family: Inter / System Sans, optical kerning, tight line heights."}

### Border Radii & Elevation
${radiiText || "- Squircle border radius: 12px for cards, 8px for buttons, 9999px for pills."}`;
}

function renderScreenSpecs(ir: PromptIR, targetScreenId?: string): string {
  const screensText = ir.screens
    .map((s, idx) => `### Screen ${idx + 1}: ${s.title}\n- **Role:** ${s.role}\n- **Description:** ${s.description}`)
    .join("\n\n");

  return `## Screen Layout & Visual Hierarchy
${screensText}`;
}

function renderComponentSpecs(ir: PromptIR): string {
  if (ir.components.length === 0) {
    return `## Component Inventory
- Primary interactive buttons with pressed feedback
- Elevated card container with 1px border
- Search and keyboard filter inputs`;
  }

  const compText = ir.components
    .map(
      (c) =>
        `- **${c.name}** (\`${c.type}\`): States: [${c.states.join(", ")}]; Variants: [${c.variants.join(", ")}]`
    )
    .join("\n");

  return `## Component Inventory & States
${compText}`;
}

function renderMotionSpecs(ir: PromptIR, intensity: string = "balanced"): string {
  const motionItems =
    ir.motion.length > 0
      ? ir.motion
          .map(
            (m) =>
              `- **${m.name}:** Trigger on \`${m.trigger}\`. ${m.behavior}. Accessible fallback: **${m.reducedMotion}**.`
          )
          .join("\n")
      : `- Spring sheet transition with 350ms damped easing.\n- Accessible fallback: Instant opacity transition for users with \`prefers-reduced-motion: reduce\`.`;

  return `## Motion & Interaction Architecture
- **Target Animation Intensity:** ${intensity.toUpperCase()}
${motionItems}

### Motion Rules
1. Never animate continuous expensive layout properties (\`width\`, \`height\`, \`top\`, \`left\`). Prioritize \`transform\` and \`opacity\`.
2. Hardware acceleration: Apply \`will-change: transform\` only during active gesture interactions.
3. Accessible: All animations MUST evaluate \`prefers-reduced-motion\` and switch to instant/fade transitions.`;
}

function renderFlowSpecs(ir: PromptIR): string {
  const flowText = ir.screenFlows
    .map((f) => `- **From [${f.from}]** → **To [${f.to}]** via \`${f.trigger}\` action.`)
    .join("\n");

  return `## Navigation & Screen Flow Pathways
${flowText}`;
}

function renderFrameworkInstructions(
  framework: PromptFramework,
  scope: PromptScope
): string {
  switch (framework) {
    case "react_typescript":
      return `## React + TypeScript Architecture
- Build modular functional components with strict TypeScript types for all props and events.
- Use \`framer-motion\` or CSS transitions for interaction.
- Maintain accessible semantic HTML (\`<main>\`, \`<article>\`, \`<nav>\`, \`<button>\`).
- Structure:
  - \`src/components/ui/\`: Primitives (Button, Badge, Card, Modal).
  - \`src/components/features/\`: Feature-specific compound components.
  - \`src/styles/\`: CSS variables and design tokens.`;

    case "nextjs_tailwind":
      return `## Next.js (App Router) + Tailwind CSS Architecture
- Use Server Components by default for static data presentation.
- Use Client Components (\`"use client"\`) strictly around interactive boundaries (gestures, state toggles, modals).
- Configure Tailwind tokens in \`tailwind.config.ts\` using the design tokens specified above.
- Reserve explicit aspect-ratio and dimensions on images to guarantee CLS = 0.
- Dynamic import for heavy animation or 3D modules.`;

    case "flutter_dart":
      return `## Flutter + Dart Architecture
- Structure widget tree with clean separation of presentation and state (\`StatefulWidget\` or Riverpod/Bloc).
- Define \`ThemeData\` with custom \`ThemeExtension\` holding the color and radius tokens.
- Use \`AnimationController\` and \`CurvedAnimation\` with spring curves (\`Curves.easeOutCubic\`).
- Implement \`MediaQuery.of(context).accessibleNavigation\` to respect system reduced motion.`;

    case "html_css_javascript":
      return `## Modern HTML5 + CSS3 + Vanilla JavaScript Architecture
- Semantic HTML markup with full ARIA attributes for dialogs and buttons.
- Design tokens defined in CSS Custom Properties on \`:root\`.
- Use modern CSS Grid, Flexbox, and \`clamp()\` for responsive layout.
- Minimal, clean ES6+ JavaScript for event handling and class toggling.
- Zero heavyweight third-party runtime dependencies.`;
  }
}

function renderToolInstructions(tool: PromptTool): string {
  switch (tool) {
    case "antigravity":
      return `## Antigravity Execution Guidelines
1. **Phased Implementation:** Decompose the task into incremental phases: setup tokens → build core primitives → assemble screen layouts → integrate motion.
2. **Verification Checkpoints:** After each phase, run tests and build checks to verify zero regressions.
3. **Commit Cadence:** Execute git checkpoints after completing each milestone.
4. **Agent Tools:** Leverage parallel file reading and subagents for broad exploration where applicable.`;

    case "cursor":
      return `## Cursor Execution Guidelines
1. **Inspect Codebase First:** Examine existing files and styling conventions before creating new files.
2. **Incremental Modifications:** Make surgical, drop-in changes without wiping unrelated helper functions.
3. **Command Verification:** Run \`npm test\` and \`npm run build\` to verify changes before presenting to the user.
4. **Follow Conventions:** Respect the project's existing ESLint, Prettier, and import path alias configurations.`;

    case "stitch":
      return `## Google Stitch Design Guidelines
1. **Visual Composition:** Prioritize visual hierarchy, spacing harmony, and color fidelity.
2. **Component Structure:** Lay out clean responsive screen variants (Mobile 375px, Tablet 768px, Desktop 1440px).
3. **Styling Tokens:** Apply the exact hex colors, border radiuses, and typography scales defined in Design DNA.
> Note: Google Stitch is used for high-fidelity visual design composition and responsive screen layouts.`;

    case "claude_code":
      return `## Claude Code Execution Guidelines
1. **Architectural Review:** Inspect repository layout and declare all architectural assumptions upfront.
2. **Modular Implementation:** Implement coherent domain and presentation modules sequentially.
3. **Verification:** Run type-checking (\`tsc --noEmit\`) and test suites after each module edit.
4. **Summary:** Provide a concise summary of touched files, key design decisions, and remaining steps.`;
  }
}

function renderQualityAndAcceptance(
  fidelity: string,
  includeAccessibility: boolean,
  includeAssumptions: boolean,
  ir: PromptIR
): string {
  const items: string[] = [];

  items.push(`## Acceptance Criteria & Quality Gates
- **Fidelity Target:** ${fidelity.toUpperCase().replace("_", " ")}.`);

  if (includeAccessibility) {
    items.push(`- **Accessibility (WCAG 2.1 AA):**
  - Minimum contrast ratio 4.5:1 for normal text and 3:1 for large text/icons.
  - Visible focus indicators on all interactive controls.
  - Full keyboard navigability (Tab, Enter, Space, Escape for modals).
  - \`prefers-reduced-motion\` respected across all motion interactions.`);
  }

  items.push(`- **Performance Budget:**
  - Zero layout shifts (CLS <= 0.1).
  - Interaction latency <= 100ms.
  - Responsive layout seamlessly adapting across screen widths.`);

  if (includeAssumptions && ir.assumptions.length > 0) {
    items.push(`### Recorded Engineering Assumptions
${ir.assumptions.map((a) => `- ${a}`).join("\n")}`);
  }

  return items.join("\n");
}
