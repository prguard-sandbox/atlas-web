import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "./ProjectCard";

const project = {
  id: "p1",
  name: "payments-api",
  description: "Card and wallet payments",
  ownerId: "u1",
  tier: "critical" as const,
  updatedAt: "2026-09-01T10:00:00Z",
};

describe("ProjectCard", () => {
  it("shows the tier label", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText("Tier 1")).toBeTruthy();
  });

  it("says when the owner is unknown", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText(/Owner unknown/)).toBeTruthy();
  });
});
