export type IssuePriority = "urgent" | "high" | "medium" | "low" | "none";

export type IssueStatus = "backlog" | "todo" | "in_progress" | "done" | "canceled";

export interface LinearUser {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
}

export interface ActivityItem {
  id: string;
  user: LinearUser;
  action: string;
  timestamp: string;
  detail?: string;
}

export interface CommentItem {
  id: string;
  user: LinearUser;
  body: string;
  timestamp: string;
  reactions?: Array<{ emoji: string; count: number }>;
}

export interface LinearIssue {
  id: string;
  identifier: string; // e.g. ENG-402
  title: string;
  description: string;
  priority: IssuePriority;
  status: IssueStatus;
  assignee: LinearUser;
  creator: LinearUser;
  cycle: {
    number: number;
    name: string;
  };
  estimatePoints?: number;
  labels: string[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  activity: ActivityItem[];
  comments: CommentItem[];
  subtasks?: Array<{ id: string; title: string; completed: boolean }>;
}

export interface BurndownPoint {
  day: string;
  ideal: number;
  remaining: number;
  completed: number;
}

export interface CycleData {
  number: number;
  name: string;
  startDate: string;
  endDate: string;
  totalPoints: number;
  completedPoints: number;
  inProgressPoints: number;
  todoPoints: number;
  daysRemaining: number;
  velocityScore: number;
  burndown: BurndownPoint[];
}
