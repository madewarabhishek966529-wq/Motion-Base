import { NavPromptParams } from "@/features/navigation/types";
import { NAV_ANIMATION_CURVES } from "@/features/navigation/nav-styles";
import { PromptFramework, PromptTool } from "@/types";

/**
 * Generates an implementation prompt for any customizable Navigation Bar style
 * tailored to Flutter + Dart (DarkNova "Bring Your Flutter UI to Life") or React/Next.js.
 */
export function generateNavStylePrompt(params: NavPromptParams): string {
  const {
    navStyle,
    accentColor,
    surfaceMode,
    animationPreset,
    speed,
    tool,
    framework,
    customInstructions,
  } = params;

  const curve = NAV_ANIMATION_CURVES[animationPreset];

  const toolNames: Record<PromptTool, string> = {
    antigravity: "Google Antigravity Agent",
    cursor: "Cursor AI",
    stitch: "Google Stitch Visual Builder",
    claude_code: "Claude Code CLI",
  };

  const fwNames: Record<PromptFramework, string> = {
    flutter_dart: "Flutter + Dart (Bring Your Flutter UI to Life)",
    nextjs_tailwind: "Next.js + Tailwind CSS + Framer Motion",
    react_typescript: "React + TypeScript + Framer Motion",
    html_css_javascript: "HTML5 + CSS Variables + JavaScript",
  };

  const codeSample =
    framework === "flutter_dart"
      ? navStyle.flutterSnippet
      : navStyle.reactSnippet;

  const bgSpec =
    surfaceMode === "light"
      ? "#FFFFFF surface with #F3F4F6 subtle border & #6B7280 inactive icons"
      : surfaceMode === "glass"
      ? "rgba(20, 27, 45, 0.72) frosted glass backdrop-blur(20px) with 1px rgba(255,255,255,0.16) border"
      : "#14151B OLED dark surface with #242632 border & #8A8F98 inactive icons";

  const lines: string[] = [
    `# Role & Objective
You are a senior mobile & UI animation engineer working with **${toolNames[tool]}**.
Implement the **"${navStyle.name}"** navigation component for **${fwNames[framework]}**.`,

    `## Navigation Design Specification
- **Style Pattern:** ${navStyle.name} (\`${navStyle.category}\`)
- **Description:** ${navStyle.description}
- **Tabs:** ${navStyle.tabs.map((t) => t.label).join(" • ")}
- **Surface Theme:** ${surfaceMode.toUpperCase()} (${bgSpec})
- **Primary Accent Color:** \`${accentColor}\``,

    `## Animation & Motion Physics
- **Selected Curve:** ${curve.label} (${curve.flutterCurve})
- **Playback Speed Multiplier:** ${speed}x
- **Interaction Behavior:** ${navStyle.motionSpecs}
- **Accessibility:** Respect system reduced-motion (\`MediaQuery.accessibleNavigation\` in Flutter / \`useReducedMotion\` in React) and provide 48px minimum hit targets.`,

    `## Reference Code Starter (${fwNames[framework]})
\`\`\`${framework === "flutter_dart" ? "dart" : "tsx"}
${codeSample}
\`\`\``,
  ];

  if (customInstructions && customInstructions.trim()) {
    lines.push(`## Additional Instructions\n${customInstructions.trim()}`);
  }

  return lines.join("\n\n---\n\n");
}
