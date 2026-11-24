import { PromptFramework, PromptTool } from "@/types";

export type NavStyleCategory =
  | "fab_notch"
  | "pill_morph"
  | "line_dot"
  | "floating_glass";

export type NavSurfaceMode = "light" | "dark" | "glass";

export type NavAnimationPreset =
  | "spring_bounce"
  | "elastic_overshoot"
  | "smooth_ease"
  | "snappy";

export interface NavStyleItem {
  id: string;
  name: string;
  category: NavStyleCategory;
  description: string;
  defaultColor: string;
  defaultSurface: NavSurfaceMode;
  defaultAnimation: NavAnimationPreset;
  tabs: Array<{ id: string; label: string; iconKey: "home" | "search" | "add" | "messages" | "settings" }>;
  defaultActiveIndex: number;
  flutterSnippet: string;
  reactSnippet: string;
  motionSpecs: string;
}

export interface NavPromptParams {
  navStyle: NavStyleItem;
  accentColor: string;
  surfaceMode: NavSurfaceMode;
  animationPreset: NavAnimationPreset;
  speed: number;
  tool: PromptTool;
  framework: PromptFramework;
  customInstructions?: string;
}
