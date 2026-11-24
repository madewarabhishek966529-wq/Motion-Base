import { NavAnimationPreset, NavStyleItem } from "./types";

export const NAV_ANIMATION_CURVES: Record<
  NavAnimationPreset,
  {
    label: string;
    flutterCurve: string;
    transition: { type?: "spring"; stiffness?: number; damping?: number; mass?: number; duration?: number; ease?: number[] };
  }
> = {
  spring_bounce: {
    label: "Spring Bounce",
    flutterCurve: "Curves.elasticOut / SpringSimulation(stiffness: 420, damping: 24)",
    transition: { type: "spring", stiffness: 420, damping: 24, mass: 0.85 },
  },
  elastic_overshoot: {
    label: "Elastic Overshoot",
    flutterCurve: "Curves.easeOutBack",
    transition: { type: "spring", stiffness: 520, damping: 16, mass: 0.9 },
  },
  smooth_ease: {
    label: "Smooth Ease",
    flutterCurve: "Curves.easeInOutCubic",
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
  snappy: {
    label: "Snappy",
    flutterCurve: "Curves.fastOutSlowIn",
    transition: { type: "spring", stiffness: 650, damping: 34, mass: 0.7 },
  },
};

export const NAV_COLOR_PRESETS = [
  { name: "Indigo", hex: "#5E6AD2" },
  { name: "Emerald", hex: "#3ECF8E" },
  { name: "Coral", hex: "#FF6B72" },
  { name: "Teal", hex: "#2BB6A8" },
  { name: "Cyan", hex: "#39D8E8" },
  { name: "Violet", hex: "#7867FF" },
  { name: "Sky", hex: "#3B82F6" },
];

const STANDARD_TABS: NavStyleItem["tabs"] = [
  { id: "home", label: "Home", iconKey: "home" },
  { id: "search", label: "Search", iconKey: "search" },
  { id: "add", label: "Add", iconKey: "add" },
  { id: "messages", label: "Messages", iconKey: "messages" },
  { id: "settings", label: "Settings", iconKey: "settings" },
];

export const NAV_STYLES: NavStyleItem[] = [
  {
    id: "raised-circle-fab",
    name: "Raised Circular Center FAB",
    category: "fab_notch",
    description: "Classic 5-slot bar with elevated circular center action button & bottom notch.",
    defaultColor: "#3B82F6",
    defaultSurface: "light",
    defaultAnimation: "spring_bounce",
    tabs: STANDARD_TABS,
    defaultActiveIndex: 0,
    motionSpecs: "Center circular FAB lifts -12px on tap with spring scale(0.92 -> 1.06 -> 1).",
    flutterSnippet: `Scaffold(
  floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
  floatingActionButton: FloatingActionButton(
    shape: const CircleBorder(),
    backgroundColor: const Color(0xFF3B82F6),
    onPressed: () {},
    child: const Icon(Icons.add, color: Colors.white),
  ),
  bottomNavigationBar: BottomAppBar(
    shape: const CircularNotchedRectangle(),
    notchMargin: 8,
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [/* Home, Search, Spacer, Messages, Settings */],
    ),
  ),
)`,
    reactSnippet: `<nav className="relative flex items-center justify-around px-3 py-2 border-t">
  {tabs.map((tab, idx) => idx === 2 ? (
    <motion.button whileTap={{ scale: 0.9 }} className="-mt-7 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white" style={{ backgroundColor: accent }}>
      <Plus className="w-5 h-5" />
    </motion.button>
  ) : (/* regular tab item */))}
</nav>`,
  },
  {
    id: "raised-squircle-fab",
    name: "Raised Squircle Center FAB",
    category: "fab_notch",
    description: "Modern rounded-square elevated center CTA button paired with crisp icon states.",
    defaultColor: "#3B82F6",
    defaultSurface: "light",
    defaultAnimation: "elastic_overshoot",
    tabs: STANDARD_TABS,
    defaultActiveIndex: 4,
    motionSpecs: "Center squircle rotates subtly on press while selected tab icon pops.",
    flutterSnippet: `FloatingActionButton(
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
  backgroundColor: const Color(0xFF3B82F6),
  onPressed: () {},
  child: const Icon(Icons.add, color: Colors.white),
)`,
    reactSnippet: `<motion.button whileTap={{ scale: 0.92, rotate: 90 }} className="-mt-6 w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center text-white" style={{ backgroundColor: accent }}>
  <Plus className="w-5 h-5" />
</motion.button>`,
  },
  {
    id: "expanding-soft-pill",
    name: "Expanding Soft Pill Capsule",
    category: "pill_morph",
    description: "Active tab smoothly widens into a soft tinted capsule revealing its label.",
    defaultColor: "#3B82F6",
    defaultSurface: "light",
    defaultAnimation: "spring_bounce",
    tabs: STANDARD_TABS,
    defaultActiveIndex: 0,
    motionSpecs: "Shared layoutId pill morphs width & position smoothly between active tabs.",
    flutterSnippet: `AnimatedContainer(
  duration: const Duration(milliseconds: 300),
  curve: Curves.easeOutBack,
  padding: EdgeInsets.symmetric(horizontal: isActive ? 16 : 10, vertical: 8),
  decoration: BoxDecoration(
    color: isActive ? accent.withOpacity(0.15) : Colors.transparent,
    borderRadius: BorderRadius.circular(999),
  ),
  child: Row(children: [Icon(icon), if (isActive) Text(label)]),
)`,
    reactSnippet: `<button className="relative px-3.5 py-2 rounded-full flex items-center gap-1.5">
  {isActive && <motion.span layoutId="softPill" className="absolute inset-0 rounded-full opacity-15" style={{ backgroundColor: accent }} />}
  <Icon className="w-4 h-4 relative z-10" />
  {isActive && <span className="text-xs font-semibold relative z-10">{tab.label}</span>}
</button>`,
  },
  {
    id: "soft-lavender-pill",
    name: "Soft Tinted Squircle Pill",
    category: "pill_morph",
    description: "Rounded rectangular soft tint wraps the active icon and label cleanly.",
    defaultColor: "#5E6AD2",
    defaultSurface: "light",
    defaultAnimation: "smooth_ease",
    tabs: STANDARD_TABS,
    defaultActiveIndex: 4,
    motionSpecs: "Smooth eased width & opacity reveal using AnimatedSize + AnimatedSwitcher.",
    flutterSnippet: `AnimatedContainer(
  duration: const Duration(milliseconds: 280),
  curve: Curves.easeInOutCubic,
  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
  decoration: BoxDecoration(
    color: isActive ? const Color(0xFF5E6AD2).withOpacity(0.14) : Colors.transparent,
    borderRadius: BorderRadius.circular(12),
  ),
)`,
    reactSnippet: `{isActive && <motion.span layoutId="lavenderPill" className="absolute inset-0 rounded-xl opacity-15" style={{ backgroundColor: accent }} />}`,
  },
  {
    id: "solid-filled-pill",
    name: "Solid Filled Pill Slide",
    category: "pill_morph",
    description: "High-contrast solid filled color capsule glides behind active icon and text.",
    defaultColor: "#5E6AD2",
    defaultSurface: "light",
    defaultAnimation: "spring_bounce",
    tabs: STANDARD_TABS,
    defaultActiveIndex: 4,
    motionSpecs: "Bold solid capsule slides across tabs with crisp white active foreground.",
    flutterSnippet: `AnimatedContainer(
  duration: const Duration(milliseconds: 320),
  curve: Curves.fastOutSlowIn,
  padding: EdgeInsets.symmetric(horizontal: isActive ? 16 : 10, vertical: 8),
  decoration: BoxDecoration(
    color: isActive ? const Color(0xFF5E6AD2) : Colors.transparent,
    borderRadius: BorderRadius.circular(999),
  ),
)`,
    reactSnippet: `{isActive && <motion.span layoutId="solidPill" className="absolute inset-0 rounded-full shadow-md" style={{ backgroundColor: accent }} />}`,
  },
  {
    id: "teal-search-capsule",
    name: "Teal Expanding Action Capsule",
    category: "pill_morph",
    description: "Vibrant filled squircle-pill highlighting contextual action items like Search.",
    defaultColor: "#2BB6A8",
    defaultSurface: "light",
    defaultAnimation: "elastic_overshoot",
    tabs: STANDARD_TABS,
    defaultActiveIndex: 1,
    motionSpecs: "Elastic overshoot reveal on label expansion with vibrant teal/emerald fill.",
    flutterSnippet: `AnimatedContainer(
  duration: const Duration(milliseconds: 340),
  curve: Curves.easeOutBack,
  decoration: BoxDecoration(
    color: isActive ? const Color(0xFF2BB6A8) : Colors.transparent,
    borderRadius: BorderRadius.circular(14),
  ),
)`,
    reactSnippet: `{isActive && <motion.span layoutId="tealCapsule" className="absolute inset-0 rounded-xl shadow-md" style={{ backgroundColor: accent }} />}`,
  },
  {
    id: "dot-bounce",
    name: "Minimal Dot-Under-Icon",
    category: "line_dot",
    description: "Ultra-clean icon-only tab bar with animated dot indicator beneath active item.",
    defaultColor: "#5E6AD2",
    defaultSurface: "light",
    defaultAnimation: "spring_bounce",
    tabs: STANDARD_TABS,
    defaultActiveIndex: 4,
    motionSpecs: "Icon lifts -2px while active dot scales in underneath via spring curve.",
    flutterSnippet: `Column(
  mainAxisSize: MainAxisSize.min,
  children: [
    Icon(icon, color: isActive ? accent : Colors.grey),
    AnimatedScale(
      scale: isActive ? 1.0 : 0.0,
      duration: const Duration(milliseconds: 250),
      child: Container(width: 5, height: 5, decoration: BoxDecoration(color: accent, shape: BoxShape.circle)),
    ),
  ],
)`,
    reactSnippet: `<div className="flex flex-col items-center gap-1">
  <Icon className="w-4 h-4" />
  {isActive && <motion.span layoutId="dotInd" className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />}
</div>`,
  },
  {
    id: "bottom-underline",
    name: "Animated Bottom Underline",
    category: "line_dot",
    description: "Sliding horizontal bar glides smoothly along the bottom edge of the active icon.",
    defaultColor: "#2BB6A8",
    defaultSurface: "light",
    defaultAnimation: "snappy",
    tabs: STANDARD_TABS,
    defaultActiveIndex: 1,
    motionSpecs: "2.5px bottom line tracks active tab width cleanly with layoutId spring.",
    flutterSnippet: `Stack(
  children: [
    Row(children: tabs),
    AnimatedPositioned(
      duration: const Duration(milliseconds: 260),
      curve: Curves.fastOutSlowIn,
      bottom: 0,
      left: activeIndex * tabWidth,
      child: Container(width: tabWidth, height: 3, color: accent),
    ),
  ],
)`,
    reactSnippet: `{isActive && <motion.span layoutId="bottomLine" className="absolute bottom-0 inset-x-2 h-[2.5px] rounded-full" style={{ backgroundColor: accent }} />}`,
  },
  {
    id: "top-line-slide",
    name: "Top-Edge Sliding Indicator",
    category: "line_dot",
    description: "Linear/Material style top border accent bar that glides over the active tab.",
    defaultColor: "#3B82F6",
    defaultSurface: "light",
    defaultAnimation: "snappy",
    tabs: STANDARD_TABS,
    defaultActiveIndex: 2,
    motionSpecs: "Top edge indicator aligns flush with the navigation top border.",
    flutterSnippet: `AnimatedPositioned(
  duration: const Duration(milliseconds: 250),
  top: 0,
  left: activeIndex * tabWidth,
  child: Container(width: tabWidth, height: 3, decoration: BoxDecoration(color: accent, borderRadius: BorderRadius.circular(2))),
)`,
    reactSnippet: `{isActive && <motion.span layoutId="topLine" className="absolute top-0 inset-x-2 h-[3px] rounded-b-full" style={{ backgroundColor: accent }} />}`,
  },
  {
    id: "icon-pop-scale",
    name: "Icon Pop & Color Shift",
    category: "line_dot",
    description: "Minimalist labeled bar where active icon pops upward with bold color tint.",
    defaultColor: "#3B82F6",
    defaultSurface: "light",
    defaultAnimation: "elastic_overshoot",
    tabs: STANDARD_TABS,
    defaultActiveIndex: 2,
    motionSpecs: "Active icon translates -3px and scales 1.18x with elastic curve.",
    flutterSnippet: `AnimatedScale(
  scale: isActive ? 1.18 : 1.0,
  duration: const Duration(milliseconds: 260),
  curve: Curves.easeOutBack,
  child: Icon(icon, color: isActive ? accent : Colors.grey),
)`,
    reactSnippet: `<motion.div animate={{ y: isActive ? -2 : 0, scale: isActive ? 1.18 : 1 }}>
  <Icon className="w-4 h-4" />
</motion.div>`,
  },
  {
    id: "squircle-halo",
    name: "Soft Squircle Halo Tile",
    category: "floating_glass",
    description: "Soft rounded-tile surface highlight behind each tab with subtle scale shift.",
    defaultColor: "#7867FF",
    defaultSurface: "light",
    defaultAnimation: "spring_bounce",
    tabs: STANDARD_TABS,
    defaultActiveIndex: 0,
    motionSpecs: "Floating squircle background softly tracks tap focus across all 5 slots.",
    flutterSnippet: `AnimatedContainer(
  duration: const Duration(milliseconds: 280),
  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
  decoration: BoxDecoration(
    color: isActive ? Colors.white : Colors.transparent,
    borderRadius: BorderRadius.circular(14),
    boxShadow: isActive ? [BoxShadow(color: Colors.black12, blurRadius: 8)] : [],
  ),
)`,
    reactSnippet: `{isActive && <motion.span layoutId="haloTile" className="absolute inset-0.5 rounded-xl border border-black/10 shadow-sm bg-white/15" />}`,
  },
  {
    id: "liquid-notch-curve",
    name: "Floating Frosted Glass Capsule",
    category: "floating_glass",
    description: "Detached floating pill dock with backdrop blur, glowing active ring & smooth slide.",
    defaultColor: "#39D8E8",
    defaultSurface: "glass",
    defaultAnimation: "spring_bounce",
    tabs: STANDARD_TABS,
    defaultActiveIndex: 0,
    motionSpecs: "Detached rounded capsule with backdrop-filter blur(20px) and glowing active orb.",
    flutterSnippet: `ClipRRect(
  borderRadius: BorderRadius.circular(28),
  child: BackdropFilter(
    filter: ImageFilter.blur(sigmaX: 18, sigmaY: 18),
    child: Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.black.withOpacity(0.55),
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: Colors.white24),
      ),
      child: Row(mainAxisAlignment: MainAxisAlignment.spaceAround, children: tabs),
    ),
  ),
)`,
    reactSnippet: `<nav className="mx-3 mb-2 px-3 py-2 rounded-full backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-around">
  {tabs.map((t, i) => /* animated orb indicator */)}
</nav>`,
  },
];
