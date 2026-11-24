import { AnimationItem } from "@/types";

export const CURATED_ANIMATIONS: AnimationItem[] = [
  {
    id: "anim-spring-sheet",
    name: "Damped Bottom Sheet Spring",
    category: "spring_interaction",
    description: "Mobile bottom modal sheet transitions upward with responsive spring overshoot and damped settling.",
    triggerType: "tap",
    targetDescription: "Modal sheet container",
    durationMs: 380,
    delayMs: 0,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    springConfig: { stiffness: 420, damping: 26, mass: 0.85 },
    direction: "up",
    reducedMotionBehavior: "fade",
    library: "framer-motion",
    provenance: "manually_verified",
    confidence: "high",
    previewType: "framer",
    snippets: [
      {
        framework: "react_ts",
        code: `import { motion } from "framer-motion";

export const SpringSheet = ({ isOpen, onClose, children }) => (
  <motion.div
    initial={{ y: "100%", opacity: 0.6 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: "100%", opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 420,
      damping: 26,
      mass: 0.85,
    }}
    className="fixed bottom-0 inset-x-0 bg-[#171F30] border-t border-[#293752] rounded-t-3xl p-6"
  >
    {children}
  </motion.div>
);`,
        notes: "Accessible: Framer automatically respects useReducedMotion() hook.",
      },
      {
        framework: "flutter_dart",
        code: `AnimationController(
  duration: const Duration(milliseconds: 380),
  vsync: this,
);
final animation = CurvedAnimation(
  parent: controller,
  curve: const SpringCurve(stiffness: 420, damping: 26),
);`,
      },
    ],
  },
  {
    id: "anim-ambient-glow",
    name: "Ambient Gradient Glow & Pulse",
    category: "gradient_glow",
    description: "Continuous breathing luminescence behind elevated cards and status capsules.",
    triggerType: "load",
    targetDescription: "Backdrop ambient shadow canvas",
    durationMs: 3200,
    delayMs: 0,
    repeatConfig: { repeat: true, type: "loop" },
    reducedMotionBehavior: "static",
    library: "css_keyframe",
    provenance: "observed",
    confidence: "high",
    previewType: "css",
    snippets: [
      {
        framework: "react_ts",
        code: `// CSS Keyframe implementation
@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.35;
    transform: scale(1);
    filter: blur(24px);
  }
  50% {
    opacity: 0.75;
    transform: scale(1.08);
    filter: blur(32px);
  }
}

.glow-ambient {
  animation: pulseGlow 3.2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .glow-ambient {
    animation: none;
    opacity: 0.4;
  }
}`,
      },
    ],
  },
  {
    id: "anim-jelly-drag",
    name: "Jelly Drag Elastic Stretch",
    category: "spring_interaction",
    description: "Interactive draggable element elastically deforms along the axis of gesture velocity.",
    triggerType: "gesture",
    targetDescription: "Calendar event pill / task block",
    durationMs: 220,
    springConfig: { stiffness: 500, damping: 16, mass: 1 },
    reducedMotionBehavior: "instant",
    library: "framer-motion",
    provenance: "manually_verified",
    confidence: "high",
    previewType: "framer",
    snippets: [
      {
        framework: "react_ts",
        code: `<motion.div
  drag
  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
  dragElastic={0.35}
  whileDrag={{ scale: 1.05, cursor: "grabbing" }}
  transition={{ type: "spring", stiffness: 500, damping: 16 }}
  className="p-3 bg-[#7867FF] text-white rounded-xl shadow-lg"
>
  Drag Me
</motion.div>`,
      },
    ],
  },
  {
    id: "anim-heart-pop",
    name: "Micro-Interaction Heart Pop",
    category: "micro_interaction",
    description: "Satisfying pop and particle burst when toggling a bookmark or like button.",
    triggerType: "tap",
    targetDescription: "Like / bookmark icon",
    durationMs: 280,
    easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    springConfig: { stiffness: 600, damping: 12, mass: 0.6 },
    reducedMotionBehavior: "instant",
    library: "framer-motion",
    provenance: "manually_verified",
    confidence: "high",
    previewType: "framer",
    snippets: [
      {
        framework: "react_ts",
        code: `<motion.button
  whileTap={{ scale: 0.8 }}
  animate={{ scale: [1, 1.35, 1] }}
  transition={{ duration: 0.28, ease: [0.175, 0.885, 0.32, 1.275] }}
  className="text-[#FF6B72]"
>
  <Heart fill="currentColor" />
</motion.button>`,
      },
    ],
  },
  {
    id: "anim-shimmer-skeleton",
    name: "Linear Shimmer Skeleton Wave",
    category: "loading_skeleton",
    description: "Smooth horizontal luminance wave traveling across placeholder shapes during data fetch.",
    triggerType: "load",
    targetDescription: "Content placeholder skeletons",
    durationMs: 1800,
    repeatConfig: { repeat: true, type: "loop" },
    reducedMotionBehavior: "static",
    library: "css_keyframe",
    provenance: "extracted",
    confidence: "high",
    previewType: "css",
    snippets: [
      {
        framework: "html_css_js",
        code: `.shimmer-wave {
  background: linear-gradient(
    90deg,
    rgba(32, 43, 64, 0.6) 0%,
    rgba(57, 216, 232, 0.15) 50%,
    rgba(32, 43, 64, 0.6) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.8s infinite linear;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,
      },
    ],
  },
  {
    id: "anim-pill-morph",
    name: "Search Capsule Width Morph",
    category: "page_transition",
    description: "Compact navigation bar search pill smoothly expands into full-width input field.",
    triggerType: "tap",
    targetDescription: "Navigation search input",
    durationMs: 260,
    easing: "cubic-bezier(0.2, 0, 0, 1)",
    reducedMotionBehavior: "instant",
    library: "framer-motion",
    provenance: "observed",
    confidence: "high",
    previewType: "framer",
    snippets: [
      {
        framework: "react_ts",
        code: `<motion.div
  layout
  transition={{ duration: 0.26, ease: [0.2, 0, 0, 1] }}
  className={isExpanded ? "w-full" : "w-36"}
/>`,
      },
    ],
  },
];
