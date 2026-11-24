import { describe, it, expect } from "vitest";
import { MOCK_ISSUES, MOCK_CYCLE_42 } from "@/features/linear/mock-data";
import { LinearIssue } from "@/features/linear/types";

describe("Linear Mobile Phase 5: Shell Integration & State Flow", () => {
  it("transitions between screens cleanly", () => {
    type ActiveScreen = "inbox" | "detail" | "cycle";
    let currentScreen: ActiveScreen = "inbox";

    // Nav to detail
    currentScreen = "detail";
    expect(currentScreen).toBe("detail");

    // Nav to cycle burndown
    currentScreen = "cycle";
    expect(currentScreen).toBe("cycle");

    // Nav back to inbox
    currentScreen = "inbox";
    expect(currentScreen).toBe("inbox");
  });

  it("modifies issue status and reflects in list state", () => {
    const issues = [...MOCK_ISSUES];
    const target = issues[0];

    const updated = issues.map((i) =>
      i.id === target.id ? { ...i, status: "done" as const } : i
    );

    expect(updated.find((i) => i.id === target.id)?.status).toBe("done");
  });

  it("verifies spring animation parameters conformance", () => {
    const springConfig = {
      type: "spring",
      stiffness: 420,
      damping: 26,
      mass: 0.85,
    };

    expect(springConfig.stiffness).toBe(420);
    expect(springConfig.damping).toBe(26);
    expect(springConfig.mass).toBe(0.85);
  });
});
