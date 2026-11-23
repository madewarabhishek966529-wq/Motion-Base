// Core Domain Types for Motionbase

export type PlatformType = "ios" | "android" | "web" | "desktop" | "cross_platform";

export type ReferenceCategory =
  | "fintech"
  | "productivity"
  | "commerce"
  | "education"
  | "health"
  | "travel"
  | "social"
  | "ai"
  | "developer_tools"
  | "entertainment"
  | "design";

export type ReferenceStyle =
  | "minimal"
  | "editorial"
  | "brutalist"
  | "glass"
  | "neumorphic"
  | "dark"
  | "neon"
  | "gradient"
  | "playful";

export type ReferenceType = "real_product" | "concept" | "recreation";

export type ProvenanceType =
  | "observed"
  | "extracted"
  | "inferred"
  | "manually_verified"
  | "user_submitted";

export type ConfidenceLevel = "high" | "medium" | "low" | "unknown";

export type ContentStatus = "draft" | "review" | "published" | "archived";

export interface ReferenceItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  platform: PlatformType;
  category: ReferenceCategory;
  styles: ReferenceStyle[];
  referenceType: ReferenceType;
  creatorName: string;
  creatorUrl?: string;
  sourceUrl: string;
  attributionText: string;
  licenseStatus: string;
  rightsNotes?: string;
  status: ContentStatus;
  featured: boolean;
  dominantColor: string;
  tags: string[];
  likesCount: number;
  savedCount: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  // Relationships
  screens?: ScreenItem[];
  tokens?: DesignTokenItem[];
  gradients?: GradientItem[];
  components?: ComponentItem[];
  animations?: AnimationItem[];
  flows?: ScreenFlowEdge[];
}

export interface ScreenItem {
  id: string;
  applicationId: string;
  title: string;
  screenOrder: number;
  imageUrl: string;
  thumbnailUrl: string;
  altText: string;
  screenDescription?: string;
  createdAt: string;
}

export interface DesignTokenItem {
  id: string;
  applicationId: string;
  screenId?: string;
  tokenType: "color" | "typography" | "spacing" | "radius" | "shadow" | "other";
  tokenName: string;
  tokenValue: Record<string, any>;
  provenance: ProvenanceType;
  confidence: ConfidenceLevel;
  evidenceNote?: string;
  reviewedBy?: string;
  updatedAt: string;
}

export interface GradientItem {
  id: string;
  applicationId: string;
  name: string;
  gradientType: "linear" | "radial" | "conic" | "mesh";
  angle?: string;
  stops: Array<{ color: string; position: number }>;
  css: string;
  provenance: ProvenanceType;
  confidence: ConfidenceLevel;
}

export interface ComponentItem {
  id: string;
  applicationId: string;
  screenId?: string;
  name: string;
  componentType: string;
  description: string;
  variants: Record<string, string[]>;
  states: string[];
  responsiveNotes?: string;
  provenance: ProvenanceType;
  codeSnippet?: {
    framework: string;
    code: string;
  };
}

export interface AnimationItem {
  id: string;
  applicationId?: string;
  componentId?: string;
  name: string;
  category:
    | "page_transition"
    | "spring_interaction"
    | "scroll_parallax"
    | "gradient_glow"
    | "micro_interaction"
    | "liquid_morph"
    | "3d_motion"
    | "loading_skeleton";
  description: string;
  triggerType: "tap" | "scroll" | "hover" | "state_change" | "load" | "gesture";
  targetDescription: string;
  durationMs?: number;
  delayMs?: number;
  easing?: string;
  springConfig?: {
    stiffness: number;
    damping: number;
    mass: number;
  };
  direction?: "up" | "down" | "left" | "right" | "in" | "out" | "none";
  repeatConfig?: {
    repeat: boolean;
    type?: "reverse" | "loop";
  };
  reducedMotionBehavior: "instant" | "fade" | "static";
  library: "motion" | "framer-motion" | "flutter" | "css_keyframe" | "gsap";
  provenance: ProvenanceType;
  confidence: ConfidenceLevel;
  previewType?: "css" | "framer" | "video";
  snippets: Array<{
    framework: "react_ts" | "flutter_dart" | "html_css_js" | "next_tailwind";
    code: string;
    notes?: string;
  }>;
}

export interface ScreenFlowEdge {
  id: string;
  applicationId: string;
  fromScreenId: string;
  toScreenId: string;
  fromScreenTitle?: string;
  toScreenTitle?: string;
  trigger: "tap" | "swipe" | "submit" | "deep_link" | "scroll";
  notes?: string;
  provenance: ProvenanceType;
}

export interface CollectionItem {
  id: string;
  userId: string;
  title: string;
  description?: string;
  visibility: "public" | "private";
  referenceIds: string[];
  createdAt: string;
  updatedAt: string;
}

// Prompt Studio Types
export type PromptTool = "antigravity" | "cursor" | "stitch" | "claude_code";
export type PromptScope = "complete_application" | "individual_screen" | "animation_motion" | "design_system";
export type PromptFramework = "react_typescript" | "flutter_dart" | "html_css_javascript" | "nextjs_tailwind";
export type PromptFidelity = "inspiration" | "close_recreation" | "pixel_focused";

export interface PromptInputParams {
  referenceId: string;
  tool: PromptTool;
  scope: PromptScope;
  framework: PromptFramework;
  fidelity: PromptFidelity;
  animationIntensity: "subtle" | "balanced" | "expressive";
  includeAccessibility: boolean;
  includeAssumptions: boolean;
  targetScreenId?: string;
  additionalInstructions?: string;
}

export interface PromptIR {
  version: "1.0.0";
  meta: {
    sourceId: string;
    title: string;
    creator: string;
    platform: PlatformType;
    category: string;
    attribution: string;
  };
  scope: PromptScope;
  framework: PromptFramework;
  designDna: {
    colors: Array<{ name: string; hex: string; role: string; provenance: ProvenanceType }>;
    gradients: Array<{ name: string; css: string }>;
    typography: Array<{ role: string; spec: string; provenance: ProvenanceType }>;
    spacing: Array<{ name: string; value: string }>;
    radii: Array<{ name: string; value: string }>;
  };
  screens: Array<{
    title: string;
    description: string;
    role: string;
  }>;
  components: Array<{
    name: string;
    type: string;
    states: string[];
    variants: string[];
  }>;
  motion: Array<{
    name: string;
    trigger: string;
    behavior: string;
    reducedMotion: string;
  }>;
  screenFlows: Array<{
    from: string;
    to: string;
    trigger: string;
  }>;
  assumptions: string[];
  confidenceScore: "verified" | "mixed" | "high_inference";
}
