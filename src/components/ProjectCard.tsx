import type { Project, User } from "../types";

const TIER_LABEL: Record<Project["tier"], string> = {
  critical: "Tier 1",
  standard: "Tier 2",
  experimental: "Experimental",
};

export function ProjectCard({ project, owner }: { project: Project; owner?: User }) {
  return (
    <article className="project-card">
      <header>
        <h3>{project.name}</h3>
        <span className={`tier tier-${project.tier}`}>{TIER_LABEL[project.tier]}</span>
      </header>
      <p>{project.description}</p>
      <footer>
        {owner ? `${owner.name} · ${owner.team}` : "Owner unknown"} · updated{" "}
        {new Date(project.updatedAt).toLocaleDateString()}
      </footer>
    </article>
  );
}
