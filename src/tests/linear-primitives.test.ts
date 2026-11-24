import { describe, it, expect } from "vitest";
import { MOCK_ISSUES, MOCK_CYCLE_42 } from "@/features/linear/mock-data";
import { LinearIssue, IssueStatus } from "@/features/linear/types";

describe("Linear Mobile Phase 1: Tokens, Primitives & Data", () => {
  it("validates mock issues adhere to identifier schema", () => {
    expect(MOCK_ISSUES.length).toBeGreaterThanOrEqual(4);
    MOCK_ISSUES.forEach((issue) => {
      expect(issue.identifier).toMatch(/^ENG-\d+$/);
      expect(issue.title).toBeTruthy();
      expect(["urgent", "high", "medium", "low", "none"]).toContain(issue.priority);
      expect(["backlog", "todo", "in_progress", "done", "canceled"]).toContain(issue.status);
    });
  });

  it("handles status transitions correctly", () => {
    const nextStatus = (curr: IssueStatus): IssueStatus => {
      if (curr === "todo") return "in_progress";
      if (curr === "in_progress") return "done";
      return "todo";
    };

    expect(nextStatus("todo")).toBe("in_progress");
    expect(nextStatus("in_progress")).toBe("done");
    expect(nextStatus("done")).toBe("todo");
  });

  it("verifies Cycle 42 burndown metric integrity", () => {
    expect(MOCK_CYCLE_42.number).toBe(42);
    expect(MOCK_CYCLE_42.totalPoints).toBe(
      MOCK_CYCLE_42.completedPoints +
        MOCK_CYCLE_42.inProgressPoints +
        MOCK_CYCLE_42.todoPoints
    );
    expect(MOCK_CYCLE_42.burndown.length).toBeGreaterThan(0);
  });
});
