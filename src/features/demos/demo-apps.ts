import { DemoAppItem, DemoModuleSpec, DemoPartId } from "./types";

function buildStandardModules(config: {
  appTitle: string;
  accent: string;
  secondary: string;
  bg: string;
  surface: string;
  topNavTitle: string;
  topNavElements: string[];
  topNavReact: string;
  bottomNavTabs: string[];
  bottomNavStyle: string;
  bottomNavReact: string;
  coreTitle: string;
  coreElements: string[];
  coreReact: string;
  drawerTitle: string;
  drawerElements: string[];
  drawerReact: string;
}): Record<DemoPartId, DemoModuleSpec> {
  return {
    bottom_nav: {
      id: "bottom_nav",
      title: `${config.appTitle} — Bottom Navigation Bar`,
      shortLabel: "Bottom Navigation",
      summary: `${config.bottomNavStyle} tab bar with tabs: ${config.bottomNavTabs.join(", ")}, spring active pill indicator, and safe-area padding.`,
      highlightRegion: "bottom",
      keyElements: [
        `Tab items: ${config.bottomNavTabs.join(" • ")}`,
        `Active state indicator using ${config.accent} tint and shared layoutId spring transition`,
        "Haptic-like scale-down (0.94) on tap with instant active label contrast",
        "Backdrop blur glass surface with 1px subtle top divider",
      ],
      motionSpec: "Spring tab pill slide (stiffness: 420, damping: 28); reduced-motion switches to instant opacity crossfade.",
      layoutRules: [
        "Fixed or sticky bottom container with env(safe-area-inset-bottom) padding",
        "48px minimum hit target per tab item for thumb reachability",
        "Max 4-5 concise single-word labels; hide secondary badges on <340px",
      ],
      accessibilityNotes: "Use <nav aria-label='Primary Bottom Navigation'>, aria-current='page' on active tab, and visible focus rings.",
      sampleCodeReact: config.bottomNavReact,
      sampleCodeFlutter: `NavigationBar(
  backgroundColor: const Color(0xFF${config.surface.replace("#", "")}),
  indicatorColor: const Color(0xFF${config.accent.replace("#", "")}).withOpacity(0.18),
  selectedIndex: currentIndex,
  onDestinationSelected: onTabChange,
  destinations: const [
    ${config.bottomNavTabs.map((t) => `NavigationDestination(icon: Icon(Icons.circle_outlined), label: '${t}')`).join(",\n    ")}
  ],
)`,
    },
    top_nav: {
      id: "top_nav",
      title: `${config.appTitle} — Top Navigation Header`,
      shortLabel: "Top Navigation",
      summary: `Sticky frosted header featuring ${config.topNavTitle}, quick actions, and scroll-aware elevation border.`,
      highlightRegion: "top",
      keyElements: config.topNavElements,
      motionSpec: "Subtle backdrop blur transition on scroll; icon buttons use 150ms scale(0.95) tap feedback.",
      layoutRules: [
        "Height 56px-64px sticky top-0 with backdrop-blur-md",
        "Left: Brand / workspace switcher or back button; Right: Quick action icons + avatar",
        "Single-line truncation on narrow mobile viewports (360px+)",
      ],
      accessibilityNotes: "Semantic <header> landmark, clear aria-label on icon-only buttons, >=4.5:1 text contrast.",
      sampleCodeReact: config.topNavReact,
      sampleCodeFlutter: `SliverAppBar(
  pinned: true,
  backgroundColor: const Color(0xFF${config.bg.replace("#", "")}).withOpacity(0.9),
  title: const Text('${config.topNavTitle}'),
  actions: [
    IconButton(icon: const Icon(Icons.search), onPressed: () {}),
    IconButton(icon: const Icon(Icons.notifications_none), onPressed: () {}),
  ],
)`,
    },
    core_ui: {
      id: "core_ui",
      title: `${config.appTitle} — ${config.coreTitle}`,
      shortLabel: "Cards & Charts",
      summary: `Primary dashboard content featuring ${config.coreElements.join(", ")} with crisp hierarchy.`,
      highlightRegion: "middle",
      keyElements: config.coreElements,
      motionSpec: "Staggered entrance (35ms per row, max 6 rows) and smooth hover/tap elevation shift.",
      layoutRules: [
        `Surface background ${config.surface} over canvas ${config.bg}`,
        "Tabular numerals (tabular-nums) for all currency, percentages, and metrics",
        "Consistent 12px-16px card border radius and 1px border contrast",
      ],
      accessibilityNotes: "Never communicate status solely by color; pair icons/labels with metric badges.",
      sampleCodeReact: config.coreReact,
      sampleCodeFlutter: `Card(
  color: const Color(0xFF${config.surface.replace("#", "")}),
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
  child: const Padding(padding: EdgeInsets.all(16), child: Text('${config.coreTitle}')),
)`,
    },
    action_sheet: {
      id: "action_sheet",
      title: `${config.appTitle} — ${config.drawerTitle}`,
      shortLabel: "Bottom Sheet & Modal",
      summary: `Interactive pull-up modal sheet for ${config.drawerTitle} triggered from FAB or row tap.`,
      highlightRegion: "drawer",
      keyElements: config.drawerElements,
      motionSpec: "Damped spring slide-up (stiffness: 420, damping: 26, mass: 0.85); Escape/backdrop tap closes.",
      layoutRules: [
        "Rounded top corners (24px) with centered 40px drag handle pill",
        "Backdrop dim rgba(0,0,0,0.65) with subtle blur",
        "Primary submit CTA pinned at bottom with loading & disabled states",
      ],
      accessibilityNotes: "role='dialog', aria-modal='true', focus trap when open, and Escape key dismissal.",
      sampleCodeReact: config.drawerReact,
      sampleCodeFlutter: `showModalBottomSheet(
  context: context,
  backgroundColor: const Color(0xFF${config.surface.replace("#", "")}),
  shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
  builder: (_) => const SizedBox(height: 360),
);`,
    },
    motion_tokens: {
      id: "motion_tokens",
      title: `${config.appTitle} — Design Tokens & Motion System`,
      shortLabel: "Tokens & Motion",
      summary: `Color tokens (${config.bg}, ${config.surface}, ${config.accent}, ${config.secondary}), typography scale, and spring physics.`,
      highlightRegion: "full",
      keyElements: [
        `Canvas: ${config.bg} | Elevated Surface: ${config.surface}`,
        `Primary Accent: ${config.accent} | Secondary Accent: ${config.secondary}`,
        "Standard Spring: stiffness 420, damping 26, mass 0.85",
        "Micro-interaction tap: scale(0.96) over 140ms ease-out",
      ],
      motionSpec: "GPU-only properties (transform, opacity); strict prefers-reduced-motion fallback to instant fade.",
      layoutRules: [
        "8px spacing grid (4px micro-steps for badges and icons)",
        "4.5:1 minimum WCAG AA contrast for body copy",
      ],
      accessibilityNotes: "Wrap spring transitions with useReducedMotion() check and provide static fallbacks.",
      sampleCodeReact: `:root {
  --app-bg: ${config.bg};
  --app-surface: ${config.surface};
  --app-accent: ${config.accent};
  --app-secondary: ${config.secondary};
}`,
      sampleCodeFlutter: `class AppColors {
  static const bg = Color(0xFF${config.bg.replace("#", "")});
  static const surface = Color(0xFF${config.surface.replace("#", "")});
  static const accent = Color(0xFF${config.accent.replace("#", "")});
}`,
    },
    complete_app: {
      id: "complete_app",
      title: `${config.appTitle} — Complete Application`,
      shortLabel: "Complete App",
      summary: `Full end-to-end UI combining ${config.topNavTitle}, ${config.coreTitle}, ${config.drawerTitle}, and ${config.bottomNavTabs.join("/")} navigation.`,
      highlightRegion: "full",
      keyElements: [
        `Top Navigation: ${config.topNavElements.join(", ")}`,
        `Core Views: ${config.coreElements.join(", ")}`,
        `Interactive Drawer: ${config.drawerElements.join(", ")}`,
        `Bottom Navigation: ${config.bottomNavTabs.join(" • ")}`,
      ],
      motionSpec: "Shared-element tab indicators, damped spring bottom sheets, and smooth screen transitions.",
      layoutRules: [
        "Mobile-first responsive shell (375px–430px centered frame or adaptive full-bleed)",
        "Zero layout shifts (CLS <= 0.1) with reserved chart/image heights",
      ],
      accessibilityNotes: "Full keyboard navigation, semantic landmarks, screen reader labels, and reduced-motion compliance.",
      sampleCodeReact: config.bottomNavReact,
      sampleCodeFlutter: `Scaffold(
  backgroundColor: const Color(0xFF${config.bg.replace("#", "")}),
  body: CustomScrollView(/* Header + Core Cards */),
  bottomNavigationBar: /* NavigationBar */,
)`,
    },
  };
}

export const DEMO_APPS: DemoAppItem[] = [
  {
    id: "demo-expense",
    slug: "expense-tracker-pro",
    visualKey: "expense_tracker",
    title: "Expense Tracker & Budget Flow",
    tagline: "Animated spending ring, category bars, quick-add receipt drawer & floating bottom nav.",
    category: "Fintech & Personal Finance",
    platform: "ios",
    accentColor: "#3ECF8E",
    secondaryColor: "#7867FF",
    bgColor: "#090D16",
    surfaceColor: "#131A2B",
    durationTotalSec: 12,
    scenes: [
      { id: "s1", label: "01 Budget Overview", caption: "Animated monthly spend ring & net balance header", highlightPart: "core_ui", durationSec: 3 },
      { id: "s2", label: "02 Category Breakdown", caption: "Food, transit & software bar meters animate smoothly", highlightPart: "top_nav", durationSec: 3 },
      { id: "s3", label: "03 Add Expense Sheet", caption: "Tap + FAB to slide up spring expense entry drawer", highlightPart: "action_sheet", durationSec: 3 },
      { id: "s4", label: "04 Bottom Tab Switch", caption: "Floating glass bottom navigation shifts active pill", highlightPart: "bottom_nav", durationSec: 3 },
    ],
    modules: buildStandardModules({
      appTitle: "Expense Tracker Pro",
      accent: "#3ECF8E",
      secondary: "#7867FF",
      bg: "#090D16",
      surface: "#131A2B",
      topNavTitle: "November Budget",
      topNavElements: [
        "Month selector pill (Nov 2026) with chevron dropdown",
        "Account balance chip + quick search icon",
        "Filter & CSV export action button",
      ],
      topNavReact: `<header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-[#090D16]/90 backdrop-blur-md border-b border-[#1E2942]">
  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#131A2B] border border-[#243252] text-xs font-semibold text-white">
    <span>November 2026</span>
    <ChevronDown className="w-3.5 h-3.5 text-[#3ECF8E]" />
  </button>
  <div className="flex items-center gap-2">
    <button aria-label="Search transactions" className="p-2 rounded-xl bg-[#131A2B] text-slate-300"><Search className="w-4 h-4" /></button>
    <button aria-label="Notifications" className="p-2 rounded-xl bg-[#131A2B] text-slate-300"><Bell className="w-4 h-4" /></button>
  </div>
</header>`,
      bottomNavTabs: ["Overview", "Analytics", "Cards", "Budget"],
      bottomNavStyle: "Floating frosted dark capsule with emerald active pill & centered + Add Expense FAB",
      bottomNavReact: `<nav aria-label="Bottom Navigation" className="sticky bottom-3 mx-3 px-2 py-1.5 rounded-2xl bg-[#131A2B]/95 backdrop-blur-xl border border-[#253352] flex items-center justify-around shadow-2xl">
  {["Overview", "Analytics", "Cards", "Budget"].map((tab, idx) => (
    <button key={tab} className={\`relative px-3 py-2 rounded-xl text-[11px] font-medium flex flex-col items-center gap-1 \${idx === active ? "text-[#3ECF8E]" : "text-slate-400"}\`}>
      {idx === active && <motion.span layoutId="expNavPill" className="absolute inset-0 rounded-xl bg-[#3ECF8E]/15 border border-[#3ECF8E]/30" />}
      <Wallet className="w-4 h-4 relative z-10" />
      <span className="relative z-10">{tab}</span>
    </button>
  ))}
</nav>`,
      coreTitle: "Spending Ring & Transaction Feed",
      coreElements: [
        "Circular SVG spending ring ($2,480 spent of $3,500 budget)",
        "Category progress bars (Dining, SaaS, Transit)",
        "Transaction rows with merchant icon, timestamp, and tabular amount",
      ],
      coreReact: `<div className="p-4 rounded-2xl bg-[#131A2B] border border-[#243252] space-y-3">
  <div className="flex items-center justify-between">
    <div>
      <span className="text-[11px] uppercase tracking-wider text-slate-400">Spent This Month</span>
      <div className="text-2xl font-extrabold text-white tabular-nums">$2,480.50</div>
    </div>
    <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-[#3ECF8E]/15 text-[#3ECF8E]">71% of $3,500</span>
  </div>
  <div className="h-2 rounded-full bg-[#090D16] overflow-hidden">
    <div className="h-full w-[71%] rounded-full bg-gradient-to-r from-[#3ECF8E] to-[#7867FF]" />
  </div>
</div>`,
      drawerTitle: "Quick Add Expense Spring Sheet",
      drawerElements: [
        "Numeric currency keypad / amount input ($18.50)",
        "Category chip selector (Food, Coffee, Transport, Bills)",
        "Merchant note + Save Expense CTA with spring close",
      ],
      drawerReact: `<motion.div
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "100%" }}
  transition={{ type: "spring", stiffness: 420, damping: 26, mass: 0.85 }}
  className="absolute bottom-0 inset-x-0 bg-[#131A2B] border-t border-[#253352] rounded-t-3xl p-5 space-y-4"
>
  <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto" />
  <h3 className="text-sm font-bold text-white">Log New Expense</h3>
  <input type="number" placeholder="$0.00" className="w-full text-2xl font-mono font-bold bg-[#090D16] border border-[#253352] rounded-xl p-3 text-[#3ECF8E]" />
  <button className="w-full py-3 rounded-xl bg-[#3ECF8E] text-[#090D16] font-bold text-sm">Save Expense</button>
</motion.div>`,
    }),
  },
  {
    id: "demo-linear",
    slug: "linear-mobile-triage",
    visualKey: "linear_mobile",
    title: "Linear Mobile Triage & Cycles",
    tagline: "High-density dark inbox, inline status cycling, spring drawer & burndown chart.",
    category: "Productivity & Engineering",
    platform: "ios",
    accentColor: "#5E6AD2",
    secondaryColor: "#8793FA",
    bgColor: "#08090C",
    surfaceColor: "#14151B",
    durationTotalSec: 12,
    scenes: [
      { id: "s1", label: "01 Top Bar & Search", caption: "Workspace switcher, Cycle 42 pill & instant search", highlightPart: "top_nav", durationSec: 3 },
      { id: "s2", label: "02 Priority Triage", caption: "Grouped Urgent & High issue rows with status cycling", highlightPart: "core_ui", durationSec: 3 },
      { id: "s3", label: "03 Comment Drawer", caption: "Damped spring bottom sheet for quick updates", highlightPart: "action_sheet", durationSec: 3 },
      { id: "s4", label: "04 Tab Capsule", caption: "OLED bottom bar switching Inbox, Cycle 42 & Inspector", highlightPart: "bottom_nav", durationSec: 3 },
    ],
    modules: buildStandardModules({
      appTitle: "Linear Mobile",
      accent: "#5E6AD2",
      secondary: "#8793FA",
      bg: "#08090C",
      surface: "#14151B",
      topNavTitle: "Engineering",
      topNavElements: [
        "Team workspace dropdown (Engineering) with Linear badge",
        "Cycle 42 shortcut pill + unread notifications dot",
        "Full-width search input + Assigned/Created/Subscribed tabs",
      ],
      topNavReact: `<header className="px-4 py-3 border-b border-[#242632] bg-[#08090C]/95 backdrop-blur-md flex items-center justify-between">
  <div className="flex items-center gap-2">
    <span className="w-6 h-6 rounded-lg bg-[#5E6AD2] text-white font-bold text-xs flex items-center justify-center">L</span>
    <span className="text-sm font-semibold text-[#EEEEF0]">Engineering</span>
  </div>
  <span className="px-2 py-1 rounded-lg bg-[#14151B] border border-[#242632] text-[11px] font-mono text-[#8793FA]">Cycle 42</span>
</header>`,
      bottomNavTabs: ["Inbox", "Cycles", "Search", "Profile"],
      bottomNavStyle: "OLED pure-black minimal tab bar with crisp indigo highlight",
      bottomNavReact: `<nav aria-label="Linear Bottom Tabs" className="h-14 border-t border-[#242632] bg-[#14151B]/95 flex items-center justify-around px-4">
  {["Inbox", "Cycles", "Search", "Profile"].map((t, i) => (
    <button key={t} className={\`flex flex-col items-center gap-0.5 text-[10px] font-medium \${i === 0 ? "text-[#5E6AD2]" : "text-[#8A8F98]"}\`}>
      <Inbox className="w-4 h-4" />
      <span>{t}</span>
    </button>
  ))}
</nav>`,
      coreTitle: "Priority Issue Rows & Burndown",
      coreElements: [
        "IssueRowItem with priority signal glyph + interactive status ring",
        "Monospace identifier (ENG-402) + truncated title + assignee avatar",
        "Cycle velocity burndown SVG curve",
      ],
      coreReact: `<div className="flex items-center justify-between p-3 bg-[#14151B] border border-[#242632] rounded-[10px]">
  <div className="flex items-center gap-2.5">
    <span className="w-2 h-2 rounded-full bg-amber-400" />
    <span className="font-mono text-[11px] text-[#8A8F98]">ENG-402</span>
    <span className="text-xs text-[#EEEEF0] font-medium">Auth token refresh retry</span>
  </div>
</div>`,
      drawerTitle: "Quick Comment & Issue Sheet",
      drawerElements: [
        "Damped spring bottom drawer (320ms overshoot)",
        "Markdown comment box + Post CTA",
      ],
      drawerReact: `<motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 420, damping: 26 }} className="bg-[#14151B] rounded-t-3xl p-5 border-t border-[#242632]">
  <textarea placeholder="Write an update..." className="w-full bg-[#08090C] border border-[#242632] rounded-xl p-3 text-xs text-white" />
</motion.div>`,
    }),
  },
  {
    id: "demo-fitness",
    slug: "pulse-fitness-rings",
    visualKey: "fitness_rings",
    title: "Pulse Fitness & Activity Rings",
    tagline: "Animated concentric workout rings, heart-rate cards, quick log sheet & dark pill nav.",
    category: "Health & Fitness",
    platform: "ios",
    accentColor: "#FF6B72",
    secondaryColor: "#39D8E8",
    bgColor: "#0B0D14",
    surfaceColor: "#161B28",
    durationTotalSec: 12,
    scenes: [
      { id: "s1", label: "01 Rings Progress", caption: "Triple concentric SVG rings sweep smoothly to daily goal", highlightPart: "core_ui", durationSec: 3 },
      { id: "s2", label: "02 Date Strip Header", caption: "Weekly calendar day pills + streak flame badge", highlightPart: "top_nav", durationSec: 3 },
      { id: "s3", label: "03 Start Workout", caption: "Quick action modal drawer for Run, Cycle, or HIIT", highlightPart: "action_sheet", durationSec: 3 },
      { id: "s4", label: "04 Tab Switcher", caption: "Bottom nav capsule between Today, Workouts & Coach", highlightPart: "bottom_nav", durationSec: 3 },
    ],
    modules: buildStandardModules({
      appTitle: "Pulse Fitness",
      accent: "#FF6B72",
      secondary: "#39D8E8",
      bg: "#0B0D14",
      surface: "#161B28",
      topNavTitle: "Today • 14 Day Streak",
      topNavElements: [
        "Greeting + streak flame counter badge",
        "7-day horizontal date selector pills",
        "User profile ring avatar",
      ],
      topNavReact: `<header className="px-4 py-3 border-b border-[#252E42] flex items-center justify-between bg-[#0B0D14]">
  <div>
    <span className="text-[11px] font-mono text-[#39D8E8]">TUESDAY, NOV 24</span>
    <h2 className="text-base font-bold text-white">Activity Summary</h2>
  </div>
  <span className="px-2.5 py-1 rounded-full bg-[#FF6B72]/15 text-[#FF6B72] text-xs font-bold">14d Streak</span>
</header>`,
      bottomNavTabs: ["Summary", "Workouts", "Trends", "Profile"],
      bottomNavStyle: "Sleek dark bottom navigation with coral glow active icon",
      bottomNavReact: `<nav aria-label="Fitness Navigation" className="h-14 border-t border-[#252E42] bg-[#161B28]/95 flex items-center justify-around">
  {["Summary", "Workouts", "Trends", "Profile"].map((t, i) => (
    <button key={t} className={\`text-[10px] font-semibold \${i === 0 ? "text-[#FF6B72]" : "text-slate-400"}\`}>{t}</button>
  ))}
</nav>`,
      coreTitle: "Concentric Rings & BPM Metrics",
      coreElements: [
        "Triple SVG stroke-dashoffset activity rings (Move, Exercise, Stand)",
        "Heart rate zone mini bar chart",
        "Recent workout session cards",
      ],
      coreReact: `<div className="p-4 rounded-2xl bg-[#161B28] border border-[#252E42] flex items-center justify-between">
  <div className="space-y-1">
    <div className="text-xs text-[#FF6B72] font-mono font-bold">MOVE 540 / 600 KCAL</div>
    <div className="text-xs text-[#39D8E8] font-mono font-bold">EXERCISE 38 / 45 MIN</div>
  </div>
</div>`,
      drawerTitle: "Quick Workout Launcher Sheet",
      drawerElements: [
        "Activity type grid (Outdoor Run, Strength, Cycling)",
        "Target goal slider + Start Countdown CTA",
      ],
      drawerReact: `<div className="rounded-t-3xl bg-[#161B28] p-5 border-t border-[#252E42] space-y-3">
  <h3 className="text-sm font-bold text-white">Start Workout</h3>
  <button className="w-full py-3 rounded-xl bg-[#FF6B72] text-[#0B0D14] font-bold text-sm">Begin Outdoor Run</button>
</div>`,
    }),
  },
  {
    id: "demo-ai-chat",
    slug: "aura-ai-assistant",
    visualKey: "ai_assistant",
    title: "Aura AI Voice & Chat Studio",
    tagline: "Streaming markdown cards, glowing orb waveform & floating prompt composer bar.",
    category: "AI & Productivity",
    platform: "cross_platform",
    accentColor: "#7867FF",
    secondaryColor: "#39D8E8",
    bgColor: "#0D101B",
    surfaceColor: "#171D30",
    durationTotalSec: 12,
    scenes: [
      { id: "s1", label: "01 Top Model Bar", caption: "Model selector pill & new thread header", highlightPart: "top_nav", durationSec: 3 },
      { id: "s2", label: "02 Streaming Reply", caption: "Animated AI response card & code artifact block", highlightPart: "core_ui", durationSec: 3 },
      { id: "s3", label: "03 Prompt Composer", caption: "Floating bottom input bar with voice & attach triggers", highlightPart: "bottom_nav", durationSec: 3 },
      { id: "s4", label: "04 Voice Mode Sheet", caption: "Glowing cyan-violet audio waveform sheet", highlightPart: "action_sheet", durationSec: 3 },
    ],
    modules: buildStandardModules({
      appTitle: "Aura AI Assistant",
      accent: "#7867FF",
      secondary: "#39D8E8",
      bg: "#0D101B",
      surface: "#171D30",
      topNavTitle: "Aura 4 • Reasoning",
      topNavElements: [
        "History sidebar drawer toggle",
        "Centered model picker capsule with glowing indicator",
        "New chat button",
      ],
      topNavReact: `<header className="px-4 py-3 border-b border-[#26314D] flex items-center justify-between bg-[#0D101B]/90 backdrop-blur-md">
  <button aria-label="Menu" className="p-2 rounded-xl bg-[#171D30] text-slate-300"><Menu className="w-4 h-4" /></button>
  <button className="px-3 py-1 rounded-full bg-[#171D30] border border-[#7867FF]/40 text-xs font-semibold text-white">Aura Pro ▾</button>
  <button aria-label="New chat" className="p-2 rounded-xl bg-[#171D30] text-[#39D8E8]"><Plus className="w-4 h-4" /></button>
</header>`,
      bottomNavTabs: ["Chat", "Voice", "Artifacts", "History"],
      bottomNavStyle: "Docked prompt composer + compact bottom switcher bar",
      bottomNavReact: `<div className="p-3 border-t border-[#26314D] bg-[#0D101B]/95 space-y-2">
  <div className="flex items-center gap-2 bg-[#171D30] border border-[#2C395A] rounded-2xl px-3 py-2">
    <input placeholder="Ask Aura anything..." className="flex-1 bg-transparent text-xs text-white focus:outline-none" />
    <button className="p-1.5 rounded-xl bg-[#7867FF] text-white"><ArrowUp className="w-3.5 h-3.5" /></button>
  </div>
</div>`,
      coreTitle: "Streaming Messages & Artifact Cards",
      coreElements: [
        "User prompt bubble aligned right",
        "Assistant response with syntax code artifact card",
        "Quick follow-up suggestion chips",
      ],
      coreReact: `<div className="p-3.5 rounded-2xl bg-[#171D30] border border-[#2C395A] text-xs text-slate-200 space-y-2">
  <div className="text-[10px] font-mono text-[#39D8E8]">AURA • ARTIFACT READY</div>
  <p>Generated responsive BottomNavigation with spring layoutId transitions.</p>
</div>`,
      drawerTitle: "Live Voice Waveform Modal",
      drawerElements: [
        "Animated multi-bar audio visualizer",
        "Mute mic & End voice session buttons",
      ],
      drawerReact: `<div className="rounded-t-3xl bg-[#171D30] p-6 border-t border-[#7867FF]/40 text-center space-y-4">
  <div className="text-xs font-mono text-[#39D8E8]">LISTENING...</div>
  <button className="px-6 py-2.5 rounded-full bg-[#FF6B72] text-[#0D101B] font-bold text-xs">End Voice</button>
</div>`,
    }),
  },
  {
    id: "demo-commerce",
    slug: "kicks-sneaker-drop",
    visualKey: "sneaker_commerce",
    title: "Kicks Sneaker Drop & Cart",
    tagline: "Colorway morph card, size selector sheet, animated cart badge & sleek bottom nav.",
    category: "E-Commerce & Retail",
    platform: "ios",
    accentColor: "#FF6B72",
    secondaryColor: "#F59E0B",
    bgColor: "#0C0C0F",
    surfaceColor: "#17171D",
    durationTotalSec: 12,
    scenes: [
      { id: "s1", label: "01 Store Header", caption: "Drop countdown pill, search & live cart badge", highlightPart: "top_nav", durationSec: 3 },
      { id: "s2", label: "02 Hero Drop Card", caption: "Product showcase with colorway tint swap", highlightPart: "core_ui", durationSec: 3 },
      { id: "s3", label: "03 Size & Cart Sheet", caption: "Spring bottom sheet for US sizing & Add to Bag", highlightPart: "action_sheet", durationSec: 3 },
      { id: "s4", label: "04 Shop Bottom Nav", caption: "Minimal 4-tab storefront navigation", highlightPart: "bottom_nav", durationSec: 3 },
    ],
    modules: buildStandardModules({
      appTitle: "Kicks Drop Store",
      accent: "#FF6B72",
      secondary: "#F59E0B",
      bg: "#0C0C0F",
      surface: "#17171D",
      topNavTitle: "DROP • 02:14:09",
      topNavElements: [
        "Brand wordmark + Live drop timer pill",
        "Wishlist heart counter + Bag icon with badge",
      ],
      topNavReact: `<header className="px-4 py-3 border-b border-[#272730] flex items-center justify-between bg-[#0C0C0F]">
  <span className="font-black tracking-tight text-white">KICKS.</span>
  <div className="flex items-center gap-2">
    <span className="px-2 py-0.5 rounded-full bg-[#FF6B72]/15 text-[#FF6B72] text-[10px] font-mono">DROP LIVE</span>
    <button aria-label="Bag" className="relative p-2 text-white"><ShoppingBag className="w-4 h-4" /></button>
  </div>
</header>`,
      bottomNavTabs: ["Drops", "Shop", "Saved", "Bag"],
      bottomNavStyle: "Clean dark storefront bottom bar with animated item count badge",
      bottomNavReact: `<nav aria-label="Store Navigation" className="h-14 border-t border-[#272730] bg-[#17171D] flex items-center justify-around">
  {["Drops", "Shop", "Saved", "Bag"].map((t, i) => (
    <button key={t} className={\`text-[11px] font-semibold \${i === 0 ? "text-[#FF6B72]" : "text-zinc-400"}\`}>{t}</button>
  ))}
</nav>`,
      coreTitle: "Hero Product Cards & Colorways",
      coreElements: [
        "Product stage with soft radial lighting",
        "Color variant swatch switcher",
        "Price & quick-buy row",
      ],
      coreReact: `<div className="p-4 rounded-2xl bg-[#17171D] border border-[#272730] space-y-2">
  <span className="text-[10px] font-mono text-[#F59E0B]">LIMITED EDITION</span>
  <h3 className="text-base font-bold text-white">Aero Glide 01 — Coral</h3>
  <div className="text-sm font-mono font-bold text-white">$185.00</div>
</div>`,
      drawerTitle: "Size Picker & Checkout Sheet",
      drawerElements: [
        "4-column size chip grid (US 8 – US 11.5)",
        "Express Apple Pay & Add to Bag buttons",
      ],
      drawerReact: `<div className="rounded-t-3xl bg-[#17171D] p-5 border-t border-[#272730] space-y-3">
  <div className="grid grid-cols-4 gap-2 text-xs font-mono">
    {["8.5", "9", "9.5", "10"].map((sz) => <button key={sz} className="py-2 rounded-lg bg-[#0C0C0F] border border-[#272730] text-white">{sz}</button>)}
  </div>
</div>`,
    }),
  },
  {
    id: "demo-music",
    slug: "spotify-ai-dj-demo",
    visualKey: "music_player",
    title: "Spotify AI DJ & Now Playing",
    tagline: "Reactive audio equalizer bars, mini-player dock, lyrics sheet & bottom nav.",
    category: "Music & Media",
    platform: "android",
    accentColor: "#1DB954",
    secondaryColor: "#1ED760",
    bgColor: "#0A0E0C",
    surfaceColor: "#141D17",
    durationTotalSec: 12,
    scenes: [
      { id: "s1", label: "01 Source Header", caption: "Playing from AI DJ context & queue button", highlightPart: "top_nav", durationSec: 3 },
      { id: "s2", label: "02 Wave & Vinyl", caption: "Dynamic album gradient & live equalizer bars", highlightPart: "core_ui", durationSec: 3 },
      { id: "s3", label: "03 Lyrics Sheet", caption: "Expandable green synced lyrics drawer", highlightPart: "action_sheet", durationSec: 3 },
      { id: "s4", label: "04 Player Tab Bar", caption: "Persistent mini-player docked above bottom tabs", highlightPart: "bottom_nav", durationSec: 3 },
    ],
    modules: buildStandardModules({
      appTitle: "Spotify AI DJ",
      accent: "#1DB954",
      secondary: "#1ED760",
      bg: "#0A0E0C",
      surface: "#141D17",
      topNavTitle: "Playing from AI DJ",
      topNavElements: ["Collapse chevron", "Source playlist label", "Queue & device cast icon"],
      topNavReact: `<header className="px-4 py-3 flex items-center justify-between text-white">
  <ChevronDown className="w-5 h-5" />
  <span className="text-[11px] font-bold tracking-wider uppercase text-zinc-300">Playing from AI DJ</span>
  <MoreHorizontal className="w-5 h-5" />
</header>`,
      bottomNavTabs: ["Home", "Search", "Library", "DJ"],
      bottomNavStyle: "Mini-player progress strip stacked cleanly above 4-tab bottom navigation",
      bottomNavReact: `<nav aria-label="Media Navigation" className="border-t border-white/10 bg-[#0A0E0C]/95">
  <div className="h-0.5 bg-zinc-800"><div className="h-full w-2/3 bg-[#1DB954]" /></div>
  <div className="h-14 flex items-center justify-around text-[10px]">
    {["Home", "Search", "Library", "DJ"].map((t, i) => (
      <button key={t} className={i === 3 ? "text-[#1DB954] font-bold" : "text-zinc-400"}>{t}</button>
    ))}
  </div>
</nav>`,
      coreTitle: "Album Canvas & Equalizer Bars",
      coreElements: ["Rounded album artwork card", "Animated CSS/Motion equalizer bars", "Scrubber timeline & transport controls"],
      coreReact: `<div className="p-4 rounded-2xl bg-gradient-to-b from-[#1A472A] to-[#121212] text-white space-y-3">
  <div className="text-base font-bold">Midnight Pulse</div>
  <div className="h-1 bg-white/20 rounded-full"><div className="h-full w-3/5 bg-[#1DB954] rounded-full" /></div>
</div>`,
      drawerTitle: "Synced Lyrics Pull Sheet",
      drawerElements: ["Scroll-snap active lyric line highlighting", "Share lyric card button"],
      drawerReact: `<div className="rounded-t-3xl bg-[#1B3B26] p-5 space-y-2 text-white">
  <span className="text-[10px] font-bold uppercase text-[#1ED760]">Synced Lyrics</span>
  <p className="text-sm font-bold">Racing through the neon skyline...</p>
</div>`,
    }),
  },
];
