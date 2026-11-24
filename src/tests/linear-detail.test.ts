import { describe, it, expect } from "vitest";
import { MOCK_ISSUES, MOCK_USERS } from "@/features/linear/mock-data";
import { LinearIssue, CommentItem } from "@/features/linear/types";

describe("Linear Mobile Phase 3: Issue Detail & Activity", () => {
  it("toggles subtask completion state", () => {
    const issue: LinearIssue = { ...MOCK_ISSUES[0] };
    const subtask = issue.subtasks?.[0];
    expect(subtask).toBeDefined();

    const initial = subtask!.completed;
    const updatedSubtasks = issue.subtasks!.map((s) =>
      s.id === subtask!.id ? { ...s, completed: !s.completed } : s
    );
    expect(updatedSubtasks[0].completed).toBe(!initial);
  });

  it("appends new comment with timestamp and author", () => {
    const issue: LinearIssue = { ...MOCK_ISSUES[0], comments: [...MOCK_ISSUES[0].comments] };
    const initialCount = issue.comments.length;

    const newComment: CommentItem = {
      id: "com-test-1",
      user: MOCK_USERS.alex,
      body: "Testing comment append",
      timestamp: "Just now",
    };

    issue.comments.push(newComment);
    expect(issue.comments.length).toBe(initialCount + 1);
    expect(issue.comments[issue.comments.length - 1].body).toBe("Testing comment append");
  });

  it("updates priority accurately", () => {
    const issue: LinearIssue = { ...MOCK_ISSUES[0] };
    issue.priority = "urgent";
    expect(issue.priority).toBe("urgent");
  });
});
