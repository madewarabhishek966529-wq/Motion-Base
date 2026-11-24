export interface ComponentCatalogItem {
  id: string;
  name: string;
  category: "buttons" | "inputs" | "cards" | "navigation" | "modals" | "status";
  description: string;
  variants: Record<string, string[]>;
  availableStates: Array<"default" | "hover" | "active" | "focus" | "disabled" | "loading">;
  provenance: "manually_verified" | "observed" | "extracted";
  codeSnippets: {
    react: string;
    flutter: string;
  };
}

export const CURATED_COMPONENTS: ComponentCatalogItem[] = [
  {
    id: "comp-action-btn",
    name: "Magnetic Action Button",
    category: "buttons",
    description: "Primary action button with subtle spring press scaling, inner highlight glow, and focus ring.",
    variants: {
      hierarchy: ["primary", "coral", "cyan", "outline", "ghost"],
      size: ["sm", "md", "lg"],
    },
    availableStates: ["default", "hover", "active", "focus", "disabled", "loading"],
    provenance: "manually_verified",
    codeSnippets: {
      react: `<button className="px-5 py-2.5 rounded-xl font-medium text-sm bg-[#7867FF] text-white hover:bg-[#897AFF] active:scale-95 transition-all shadow-lg shadow-[#7867FF]/25 focus-visible:ring-2 focus-visible:ring-[#FF6B72]">
  Deploy Application
</button>`,
      flutter: `ElevatedButton(
  style: ElevatedButton.styleFrom(
    backgroundColor: const Color(0xFF7867FF),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
  ),
  onPressed: () {},
  child: const Text('Deploy Application'),
)`,
    },
  },
  {
    id: "comp-search-bar",
    name: "Keyboard Palette Input",
    category: "inputs",
    description: "Search input equipped with shortcut badges (⌘K), clear action, and debounced state.",
    variants: {
      style: ["elevated", "flat", "bordered"],
    },
    availableStates: ["default", "focus", "disabled", "loading"],
    provenance: "manually_verified",
    codeSnippets: {
      react: `<div className="relative flex items-center">
  <Search className="absolute left-3.5 w-4 h-4 text-[#AEB8CC]" />
  <input
    placeholder="Search anything..."
    className="w-full pl-10 pr-12 py-2.5 bg-[#171F30] border border-[#293752] rounded-xl text-sm text-[#F4F1FF] focus:border-[#FF6B72] focus:outline-none"
  />
  <kbd className="absolute right-3 px-1.5 py-0.5 rounded text-[10px] bg-[#202B40] text-[#AEB8CC] font-mono">⌘K</kbd>
</div>`,
      flutter: `TextField(
  decoration: InputDecoration(
    prefixIcon: const Icon(Icons.search, color: Color(0xFFAEB8CC)),
    hintText: 'Search anything...',
    filled: true,
    fillColor: const Color(0xFF171F30),
    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
  ),
)`,
    },
  },
  {
    id: "comp-bento-card",
    name: "Elevated Bento Tile",
    category: "cards",
    description: "High-density information tile with subtle top-to-bottom surface gradient and hover lift.",
    variants: {
      density: ["compact", "comfortable", "spacious"],
    },
    availableStates: ["default", "hover", "active"],
    provenance: "observed",
    codeSnippets: {
      react: `<div className="p-5 rounded-2xl bg-[#171F30] border border-[#293752] hover:border-[#AEB8CC]/40 hover:-translate-y-1 transition-all shadow-xl">
  <div className="flex items-center justify-between mb-3">
    <span className="text-xs font-mono text-[#39D8E8] uppercase">Active Cycle</span>
    <span className="w-2 h-2 rounded-full bg-emerald-400" />
  </div>
  <h4 className="text-base font-semibold text-[#F4F1FF]">Core Engine v2.4</h4>
  <p className="text-xs text-[#AEB8CC] mt-1">14 issues resolved this week</p>
</div>`,
      flutter: `Card(
  color: const Color(0xFF171F30),
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
  child: Padding(
    padding: const EdgeInsets.all(20),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Text('Core Engine v2.4', style: TextStyle(color: Color(0xFFF4F1FF))),
      ],
    ),
  ),
)`,
    },
  },
  {
    id: "comp-status-pill",
    name: "Realtime Pulsing Telemetry Pill",
    category: "status",
    description: "Compact status indicator displaying latency, live websocket state, and pulsing glow.",
    variants: {
      health: ["optimal", "degraded", "down"],
    },
    availableStates: ["default", "active"],
    provenance: "manually_verified",
    codeSnippets: {
      react: `<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
  </span>
  <span>Connected • 18ms</span>
</div>`,
      flutter: `Container(
  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
  decoration: BoxDecoration(
    color: const Color(0x1A10B981),
    borderRadius: BorderRadius.circular(999),
    border: Border.all(color: const Color(0x4D10B981)),
  ),
  child: Row(
    mainAxisSize: MainAxisSize.min,
    children: const [
      Icon(Icons.circle, size: 8, color: Color(0xFF10B981)),
      SizedBox(width: 6),
      Text('Connected • 18ms', style: TextStyle(color: Color(0xFF10B981), fontSize: 12)),
    ],
  ),
)`,
    },
  },
];
