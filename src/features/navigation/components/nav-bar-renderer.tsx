"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Home,
  Search,
  Plus,
  MessageSquare,
  Settings,
} from "lucide-react";
import {
  NavAnimationPreset,
  NavStyleItem,
  NavSurfaceMode,
} from "../types";
import { NAV_ANIMATION_CURVES } from "../nav-styles";
import { cn } from "@/lib/utils";

interface NavBarRendererProps {
  navStyle: NavStyleItem;
  accentColor?: string;
  surfaceMode?: NavSurfaceMode;
  animationPreset?: NavAnimationPreset;
  speed?: number;
  instanceId?: string;
  controlledActiveIndex?: number;
  onTabSelect?: (index: number) => void;
  compact?: boolean;
  customTabs?: NavStyleItem["tabs"];
}

export const NavBarRenderer: React.FC<NavBarRendererProps> = ({
  navStyle,
  accentColor,
  surfaceMode,
  animationPreset,
  speed = 1,
  instanceId = navStyle.id,
  controlledActiveIndex,
  onTabSelect,
  compact = false,
  customTabs,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [internalIndex, setInternalIndex] = useState(navStyle.defaultActiveIndex);

  const activeIndex =
    controlledActiveIndex !== undefined ? controlledActiveIndex : internalIndex;

  const color = accentColor || navStyle.defaultColor;
  const surface = surfaceMode || navStyle.defaultSurface;
  const animKey = animationPreset || navStyle.defaultAnimation;
  const curve = NAV_ANIMATION_CURVES[animKey];
  const tabs = customTabs || navStyle.tabs;

  const transition = shouldReduceMotion
    ? { duration: 0.05 }
    : curve.transition.type === "spring"
    ? {
        type: "spring" as const,
        stiffness: (curve.transition.stiffness || 420) * speed,
        damping: curve.transition.damping || 24,
        mass: curve.transition.mass || 0.85,
      }
    : {
        duration: (curve.transition.duration || 0.3) / speed,
        ease: curve.transition.ease || [0.22, 1, 0.36, 1],
      };

  const handleSelect = (idx: number) => {
    setInternalIndex(idx);
    onTabSelect?.(idx);
  };

  const iconMap = {
    home: Home,
    search: Search,
    add: Plus,
    messages: MessageSquare,
    settings: Settings,
  };

  const surfaceStyles: Record<NavSurfaceMode, string> = {
    light: "bg-white text-slate-600 border-slate-200 shadow-sm",
    dark: "bg-[#14151B] text-slate-400 border-[#242632] shadow-lg",
    glass:
      "bg-[#131B2E]/80 backdrop-blur-xl text-slate-300 border-white/15 shadow-xl",
  };

  const inactiveColor = surface === "light" ? "#6B7280" : "#8A8F98";
  const isFloatingGlass = navStyle.id === "liquid-notch-curve";

  return (
    <div
      className={cn(
        "w-full select-none",
        isFloatingGlass && "px-2 pb-1 pt-2"
      )}
    >
      <nav
        aria-label={navStyle.name}
        className={cn(
          "relative w-full flex items-center justify-around border transition-colors",
          compact ? "px-1.5 py-1.5" : "px-2.5 py-2.5",
          isFloatingGlass ? "rounded-full" : "rounded-xl",
          surfaceStyles[surface],
          navStyle.id === "raised-circle-fab" || navStyle.id === "raised-squircle-fab"
            ? "mt-4"
            : ""
        )}
      >
        {tabs.map((tab, idx) => {
          const Icon = iconMap[tab.iconKey] || Home;
          const isActive = idx === activeIndex;
          const isCenterFab =
            (navStyle.id === "raised-circle-fab" ||
              navStyle.id === "raised-squircle-fab") &&
            idx === Math.floor(tabs.length / 2);

          // 1 & 2: Raised Circular / Squircle Center FAB Notch
          if (isCenterFab) {
            return (
              <div
                key={tab.id}
                className="relative flex flex-col items-center justify-center"
              >
                <motion.button
                  type="button"
                  onClick={() => handleSelect(idx)}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: isActive ? -16 : -12,
                          scale: isActive ? 1.08 : 1,
                        }
                  }
                  transition={transition}
                  className={cn(
                    "flex items-center justify-center text-white shadow-lg border-2",
                    compact ? "w-9 h-9" : "w-11 h-11",
                    navStyle.id === "raised-circle-fab"
                      ? "rounded-full"
                      : "rounded-2xl",
                    surface === "light" ? "border-white" : "border-[#08090C]"
                  )}
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 6px 18px -4px ${color}99`,
                  }}
                >
                  <Icon className={compact ? "w-4 h-4" : "w-5 h-5"} />
                </motion.button>
                <span
                  className="text-[9px] font-medium -mt-2"
                  style={{ color: isActive ? color : inactiveColor }}
                >
                  {tab.label}
                </span>
              </div>
            );
          }

          // 3, 4, 5, 6: Pill Morph Variants
          if (
            navStyle.id === "expanding-soft-pill" ||
            navStyle.id === "soft-lavender-pill" ||
            navStyle.id === "solid-filled-pill" ||
            navStyle.id === "teal-search-capsule"
          ) {
            const isSolid =
              navStyle.id === "solid-filled-pill" ||
              navStyle.id === "teal-search-capsule";
            const pillRadius =
              navStyle.id === "soft-lavender-pill" ||
              navStyle.id === "teal-search-capsule"
                ? "rounded-xl"
                : "rounded-full";

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={cn(
                  "relative flex items-center justify-center gap-1.5 transition-colors",
                  compact ? "px-2 py-1.5" : "px-3 py-2",
                  pillRadius
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId={`pill-${instanceId}`}
                    transition={transition}
                    className={cn("absolute inset-0", pillRadius)}
                    style={{
                      backgroundColor: isSolid ? color : `${color}22`,
                    }}
                  />
                )}
                <Icon
                  className={cn(
                    "relative z-10 shrink-0 transition-transform",
                    compact ? "w-3.5 h-3.5" : "w-4 h-4"
                  )}
                  style={{
                    color: isActive
                      ? isSolid
                        ? "#FFFFFF"
                        : color
                      : inactiveColor,
                  }}
                />
                {isActive && (
                  <motion.span
                    initial={shouldReduceMotion ? false : { opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={transition}
                    className="relative z-10 text-[10px] font-semibold whitespace-nowrap overflow-hidden"
                    style={{ color: isSolid ? "#FFFFFF" : color }}
                  >
                    {tab.label}
                  </motion.span>
                )}
              </button>
            );
          }

          // 7: Minimal Dot-Under-Icon
          if (navStyle.id === "dot-bounce") {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1",
                  compact ? "px-2 py-1.5" : "px-3 py-2"
                )}
              >
                <motion.div
                  animate={
                    shouldReduceMotion ? undefined : { y: isActive ? -2 : 0 }
                  }
                  transition={transition}
                >
                  <Icon
                    className={compact ? "w-4 h-4" : "w-4 h-4"}
                    style={{ color: isActive ? color : inactiveColor }}
                  />
                </motion.div>
                <div className="h-1.5 flex items-center justify-center">
                  {isActive && (
                    <motion.span
                      layoutId={`dot-${instanceId}`}
                      transition={transition}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  )}
                </div>
              </button>
            );
          }

          // 8 & 9: Bottom Underline & Top-Edge Line
          if (
            navStyle.id === "bottom-underline" ||
            navStyle.id === "top-line-slide"
          ) {
            const isTop = navStyle.id === "top-line-slide";
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-0.5",
                  compact ? "px-2 py-1" : "px-3 py-1.5"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId={`line-${instanceId}`}
                    transition={transition}
                    className={cn(
                      "absolute inset-x-1.5 h-[3px] rounded-full",
                      isTop
                        ? compact
                          ? "-top-1.5"
                          : "-top-2.5"
                        : compact
                        ? "-bottom-1.5"
                        : "-bottom-2.5"
                    )}
                    style={{ backgroundColor: color }}
                  />
                )}
                <Icon
                  className={compact ? "w-3.5 h-3.5" : "w-4 h-4"}
                  style={{ color: isActive ? color : inactiveColor }}
                />
                {!isTop && (
                  <span className="sr-only">{tab.label}</span>
                )}
                {isTop && (
                  <span
                    className="text-[9px] font-medium"
                    style={{ color: isActive ? color : inactiveColor }}
                  >
                    {tab.label}
                  </span>
                )}
              </button>
            );
          }

          // 11 & 12: Squircle Halo Tile & Floating Frosted Glass Capsule
          if (
            navStyle.id === "squircle-halo" ||
            navStyle.id === "liquid-notch-curve"
          ) {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-0.5 rounded-xl",
                  compact ? "px-2 py-1" : "px-3 py-1.5"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId={`halo-${instanceId}`}
                    transition={transition}
                    className={cn(
                      "absolute inset-0",
                      navStyle.id === "liquid-notch-curve"
                        ? "rounded-full"
                        : "rounded-xl"
                    )}
                    style={{
                      backgroundColor: `${color}22`,
                      border: `1px solid ${color}55`,
                    }}
                  />
                )}
                <Icon
                  className={cn(
                    "relative z-10",
                    compact ? "w-3.5 h-3.5" : "w-4 h-4"
                  )}
                  style={{ color: isActive ? color : inactiveColor }}
                />
                <span
                  className="relative z-10 text-[9px] font-semibold"
                  style={{ color: isActive ? color : inactiveColor }}
                >
                  {tab.label}
                </span>
              </button>
            );
          }

          // 10 (Default): Icon Pop & Color Shift
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSelect(idx)}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5",
                compact ? "px-2 py-1" : "px-3 py-1.5"
              )}
            >
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: isActive ? -3 : 0,
                        scale: isActive ? 1.18 : 1,
                      }
                }
                transition={transition}
              >
                <Icon
                  className={compact ? "w-3.5 h-3.5" : "w-4 h-4"}
                  style={{ color: isActive ? color : inactiveColor }}
                />
              </motion.div>
              <span
                className="text-[9px] font-medium"
                style={{ color: isActive ? color : inactiveColor }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
