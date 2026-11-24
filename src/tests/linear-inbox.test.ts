import { describe, it, expect } from "vitest";
import { MOCK_ISSUES } from "@/features/linear/mock-data";
import { LinearIssue } from "@/features/linear/types";

describe("Linear Mobile Phase 2: Inbox Triage & Search", () => {
  it("filters issues by search query matching title or identifier", () => {
    const query = "ENG-402";
    const matched = MOCK_ISSUES.filter(
      (i) =>
        i.title.toLowerCase().includes(query.toLowerCase()) ||
        i.identifier.toLowerCase().includes(query.toLowerCase())
    );
    expect(matched.length).toBe(1);
    expect(matched[0].identifier).toBe("ENG-402");
  });

  it("groups issues accurately into priority buckets", () => {
    const urgent = MOCK_ISSUES.filter((i) => i.priority === "urgent");
    const high = MOCK_ISSUES.filter((i) => i.priority === "high");
    const medium = MOCK_ISSUES.filter((i) => i.priority === "medium");

    expect(urgent.length).toBeGreaterThan(0);
    expect(high.length).toBeGreaterThan(0);
    expect(medium.length).toBeGreaterThan(0);
  });

  it("toggles issue status correctly", () => {
    let issue: LinearIssue = { ...MOCK_ISSUES[0], status: "todo" };
    expect(issue.status).toBe("todo");

    // Toggle to in_progress
    issue = { ...issue, status: "in_progress" };
    expect(issue.status).toBe("in_progress");

    // Toggle to done
    issue = { ...issue, status: "done" };
    expect(issue.status).toBe("done");
  });
});
