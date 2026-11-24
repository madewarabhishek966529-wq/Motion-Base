import { LinearIssue, CycleData, LinearUser } from "./types";

export const MOCK_USERS: Record<string, LinearUser> = {
  alex: {
    id: "usr-1",
    name: "Alex Rivera",
    handle: "arivera",
    avatarUrl: "/avatars/alex.svg",
  },
  elena: {
    id: "usr-2",
    name: "Elena Rostova",
    handle: "erostova",
    avatarUrl: "/avatars/elena.svg",
  },
  marcus: {
    id: "usr-3",
    name: "Marcus Chen",
    handle: "mchen",
    avatarUrl: "/avatars/marcus.svg",
  },
  sarah: {
    id: "usr-4",
    name: "Sarah Jenkins",
    handle: "sjenkins",
    avatarUrl: "/avatars/sarah.svg",
  },
};

export const MOCK_ISSUES: LinearIssue[] = [
  {
    id: "iss-1",
    identifier: "ENG-402",
    title: "Re-architect auth token refresh flow with background retry",
    description: `### Context
The current authentication refresh token cycle fails when network reconnects during app suspension. We need to implement an exponential backoff loop with secure keychain storage.

### Deliverables
- [x] Secure storage for refresh tokens
- [ ] Mutex locking during simultaneous API token refresh
- [ ] Fallback re-authentication sheet when refresh expires`,
    priority: "urgent",
    status: "in_progress",
    assignee: MOCK_USERS.alex,
    creator: MOCK_USERS.elena,
    cycle: { number: 42, name: "Cycle 42" },
    estimatePoints: 5,
    labels: ["backend", "security", "p0"],
    dueDate: "Tomorrow",
    createdAt: "2026-11-20T10:00:00Z",
    updatedAt: "2026-11-24T18:00:00Z",
    subtasks: [
      { id: "sub-1", title: "Secure storage for refresh tokens", completed: true },
      { id: "sub-2", title: "Mutex locking during simultaneous API refresh", completed: false },
      { id: "sub-3", title: "Fallback re-authentication sheet", completed: false },
    ],
    activity: [
      {
        id: "act-1",
        user: MOCK_USERS.elena,
        action: "created issue and marked priority as Urgent",
        timestamp: "4 days ago",
      },
      {
        id: "act-2",
        user: MOCK_USERS.alex,
        action: "moved to In Progress",
        timestamp: "Yesterday at 14:20",
      },
    ],
    comments: [
      {
        id: "com-1",
        user: MOCK_USERS.elena,
        body: "Make sure this integrates cleanly with the iOS Keychain wrapper without adding blocking delays to application boot.",
        timestamp: "Yesterday at 16:45",
        reactions: [{ emoji: "👍", count: 3 }],
      },
    ],
  },
  {
    id: "iss-2",
    identifier: "ENG-405",
    title: "Implement fluid spring navigation transitions in iOS companion",
    description: `Tune bottom sheet and modal presentation to respect 420 stiffness and 26 damping. Ensure instant fallback when prefers-reduced-motion is active.`,
    priority: "high",
    status: "in_progress",
    assignee: MOCK_USERS.elena,
    creator: MOCK_USERS.alex,
    cycle: { number: 42, name: "Cycle 42" },
    estimatePoints: 3,
    labels: ["frontend", "motion", "ios"],
    dueDate: "In 2 days",
    createdAt: "2026-11-21T11:00:00Z",
    updatedAt: "2026-11-24T14:30:00Z",
    subtasks: [
      { id: "sub-201", title: "Configure spring curve parameters", completed: true },
      { id: "sub-202", title: "Test with accessibility reduced motion", completed: true },
    ],
    activity: [
      {
        id: "act-201",
        user: MOCK_USERS.alex,
        action: "assigned to Elena Rostova",
        timestamp: "3 days ago",
      },
    ],
    comments: [
      {
        id: "com-201",
        user: MOCK_USERS.alex,
        body: "The spring overshoot feels exceptional on 120Hz displays!",
        timestamp: "Today at 10:15",
        reactions: [{ emoji: "🔥", count: 4 }],
      },
    ],
  },
  {
    id: "iss-3",
    identifier: "ENG-398",
    title: "Optimize image thumbnail caching with memory bounded LRU",
    description: `Prevent out-of-memory crashes on older devices when scrolling long triage feeds with high resolution attachments.`,
    priority: "high",
    status: "todo",
    assignee: MOCK_USERS.marcus,
    creator: MOCK_USERS.alex,
    cycle: { number: 42, name: "Cycle 42" },
    estimatePoints: 4,
    labels: ["performance", "cache"],
    createdAt: "2026-11-19T09:00:00Z",
    updatedAt: "2026-11-22T12:00:00Z",
    activity: [],
    comments: [],
  },
  {
    id: "iss-4",
    identifier: "ENG-411",
    title: "Add swipe-to-delegate gesture action on triage cards",
    description: `Users can swipe right to instantly complete an issue, or swipe left to reveal quick delegate and priority re-assignment.`,
    priority: "medium",
    status: "todo",
    assignee: MOCK_USERS.alex,
    creator: MOCK_USERS.sarah,
    cycle: { number: 42, name: "Cycle 42" },
    estimatePoints: 2,
    labels: ["interaction", "gestures"],
    createdAt: "2026-11-22T14:00:00Z",
    updatedAt: "2026-11-24T09:00:00Z",
    activity: [],
    comments: [],
  },
  {
    id: "iss-5",
    identifier: "ENG-387",
    title: "Support dark OLED pure black theme across all modals",
    description: `Replace dark gray #1A1A1A canvases with OLED black #08090C to improve power efficiency and visual contrast.`,
    priority: "low",
    status: "done",
    assignee: MOCK_USERS.elena,
    creator: MOCK_USERS.elena,
    cycle: { number: 42, name: "Cycle 42" },
    estimatePoints: 2,
    labels: ["theme", "design-tokens"],
    createdAt: "2026-11-18T16:00:00Z",
    updatedAt: "2026-11-23T11:00:00Z",
    activity: [
      {
        id: "act-501",
        user: MOCK_USERS.elena,
        action: "marked as Done",
        timestamp: "Yesterday",
      },
    ],
    comments: [],
  },
];

export const MOCK_CYCLE_42: CycleData = {
  number: 42,
  name: "Cycle 42",
  startDate: "Nov 17, 2026",
  endDate: "Nov 28, 2026",
  totalPoints: 48,
  completedPoints: 32,
  inProgressPoints: 10,
  todoPoints: 6,
  daysRemaining: 4,
  velocityScore: 94.2,
  burndown: [
    { day: "Mon", ideal: 48, remaining: 48, completed: 0 },
    { day: "Tue", ideal: 43, remaining: 44, completed: 4 },
    { day: "Wed", ideal: 38, remaining: 39, completed: 9 },
    { day: "Thu", ideal: 33, remaining: 31, completed: 17 },
    { day: "Fri", ideal: 28, remaining: 26, completed: 22 },
    { day: "Mon", ideal: 23, remaining: 20, completed: 28 },
    { day: "Tue", ideal: 18, remaining: 16, completed: 32 },
  ],
};
