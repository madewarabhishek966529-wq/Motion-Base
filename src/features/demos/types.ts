import { PlatformType, PromptFramework, PromptTool } from "@/types";

export type DemoPartId =
  | "complete_app"
  | "bottom_nav"
  | "top_nav"
  | "core_ui"
  | "action_sheet"
  | "motion_tokens";

export type DemoVisualKey =
  | "expense_tracker"
  | "linear_mobile"
  | "fitness_rings"
  | "ai_assistant"
  | "sneaker_commerce"
  | "music_player"
  | "travel_map"
  | "stripe_checkout";

export interface DemoScene {
  id: string;
  label: string;
  caption: string;
  highlightPart: DemoPartId;
  durationSec: number;
}

export interface DemoModuleSpec {
  id: DemoPartId;
  title: string;
  shortLabel: string;
  summary: string;
  highlightRegion: "top" | "bottom" | "middle" | "drawer" | "full";
  keyElements: string[];
  motionSpec: string;
  layoutRules: string[];
  accessibilityNotes: string;
  sampleCodeReact: string;
  sampleCodeFlutter: string;
}

export interface DemoAppItem {
  id: string;
  slug: string;
  visualKey: DemoVisualKey;
  title: string;
  tagline: string;
  category: string;
  platform: PlatformType;
  accentColor: string;
  secondaryColor: string;
  bgColor: string;
  surfaceColor: string;
  durationTotalSec: number;
  scenes: DemoScene[];
  modules: Record<DemoPartId, DemoModuleSpec>;
}

export interface ComponentPromptParams {
  app: DemoAppItem;
  partId: DemoPartId;
  tool: PromptTool;
  framework: PromptFramework;
  additionalInstructions?: string;
}
