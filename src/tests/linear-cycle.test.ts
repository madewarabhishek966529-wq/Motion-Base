import { describe, it, expect } from "vitest";
import { MOCK_CYCLE_42 } from "@/features/linear/mock-data";

describe("Linear Mobile Phase 4: Cycle Burndown Metrics", () => {
  it("calculates completion percentage correctly", () => {
    const pct = Math.round(
      (MOCK_CYCLE_42.completedPoints / MOCK_CYCLE_42.totalPoints) * 100
    );
    expect(pct).toBe(67);
  });

  it("ensures ideal burndown trajectory is non-increasing", () => {
    const burndown = MOCK_CYCLE_42.burndown;
    for (let i = 0; i < burndown.length - 1; i++) {
      expect(burndown[i].ideal).toBeGreaterThanOrEqual(burndown[i + 1].ideal);
    }
  });

  it("maintains a valid velocity score", () => {
    expect(MOCK_CYCLE_42.velocityScore).toBeGreaterThanOrEqual(0);
    expect(MOCK_CYCLE_42.velocityScore).toBeLessThanOrEqual(100);
  });
});
