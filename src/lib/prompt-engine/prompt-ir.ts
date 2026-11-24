import { ReferenceItem, PromptIR, PromptScope, PromptFramework } from "@/types";

/**
 * Builds a versioned, normalized Prompt Intermediate Representation (IR) from a reference.
 * Enforces provenance separation (distinguishing observed from inferred values).
 */
export function buildPromptIR(
  reference: ReferenceItem,
  scope: PromptScope = "complete_application",
  framework: PromptFramework = "react_typescript"
): PromptIR {
  const colors = (reference.tokens || [])
    .filter((t) => t.tokenType === "color")
    .map((t) => ({
      name: t.tokenName,
      hex: t.tokenValue.hex || "#FFFFFF",
      role: t.tokenValue.role || "Color swatch",
      provenance: t.provenance,
    }));

  const gradients = (reference.gradients || []).map((g) => ({
    name: g.name,
    css: g.css,
  }));

  const typography = (reference.tokens || [])
    .filter((t) => t.tokenType === "typography")
    .map((t) => ({
      role: t.tokenName,
      spec: `${t.tokenValue.family || "Sans"} | ${t.tokenValue.size || "16px"} | ${t.tokenValue.weight || "400"}`,
      provenance: t.provenance,
    }));

  const spacing = (reference.tokens || [])
    .filter((t) => t.tokenType === "spacing")
    .map((t) => ({
      name: t.tokenName,
      value: t.tokenValue.value || "16px",
    }));

  const radii = (reference.tokens || [])
    .filter((t) => t.tokenType === "radius")
    .map((t) => ({
      name: t.tokenName,
      value: t.tokenValue.value || "12px",
    }));

  const screens = (reference.screens || []).map((s) => ({
    title: s.title,
    description: s.screenDescription || s.altText || "Application screen",
    role: `Screen #${s.screenOrder}`,
  }));

  const components = (reference.components || []).map((c) => ({
    name: c.name,
    type: c.componentType,
    states: c.states,
    variants: Object.keys(c.variants),
  }));

  const motion = (reference.animations || []).map((a) => ({
    name: a.name,
    trigger: a.triggerType,
    behavior: `${a.description} (${a.durationMs || 300}ms, ${a.easing || "cubic-bezier(0.16, 1, 0.3, 1)"})`,
    reducedMotion: `${a.reducedMotionBehavior} fallback`,
  }));

  const screenFlows = (reference.flows || []).map((f) => ({
    from: f.fromScreenTitle || "Origin",
    to: f.toScreenTitle || "Destination",
    trigger: f.trigger,
  }));

  // Determine overall confidence
  const hasInferred = (reference.tokens || []).some((t) => t.provenance === "inferred");
  const hasVerified = (reference.tokens || []).some(
    (t) => t.provenance === "manually_verified" || t.provenance === "observed"
  );
  const confidenceScore =
    hasVerified && !hasInferred ? "verified" : hasVerified ? "mixed" : "high_inference";

  return {
    version: "1.0.0",
    meta: {
      sourceId: reference.id,
      title: reference.title,
      creator: reference.creatorName,
      platform: reference.platform,
      category: reference.category,
      attribution: reference.attributionText,
    },
    scope,
    framework,
    designDna: {
      colors,
      gradients,
      typography,
      spacing,
      radii,
    },
    screens,
    components,
    motion,
    screenFlows,
    assumptions: [
      "Font families without direct vector inspection are matched to visually equivalent system neo-grotesque faces.",
      "Exact animation curves derived from video/interaction captures are mapped to standard cubic-bezier and spring coefficients.",
      "Screenshots are treated as visual evidence of appearance, not proof of internal backend architecture.",
    ],
    confidenceScore,
  };
}
