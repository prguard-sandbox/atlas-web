import { useEffect, useState } from "react";
import { getUsers, listProjects } from "./api";
import { ProjectCard } from "./components/ProjectCard";
import { SearchPage } from "./pages/SearchPage";
import type { Project, User } from "./types";

export function App() {
  const [tab, setTab] = useState<"all" | "search">("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [owners, setOwners] = useState<Map<string, User>>(new Map());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const list = await listProjects(controller.signal);
        setProjects(list);
        const ids = [...new Set(list.map((p) => p.ownerId))];
        const users = ids.length ? await getUsers(ids, controller.signal) : [];
        setOwners(new Map(users.map((u) => [u.id, u])));
      } catch (err) {
        if (!controller.signal.aborted) setError(String(err));
      }
    })();
    return () => controller.abort();
  }, []);

  if (error) return <p role="alert">Could not load projects: {error}</p>;

  return (
    <main>
      <nav>
        <button aria-pressed={tab === "all"} onClick={() => setTab("all")}>
          All projects
        </button>
        <button aria-pressed={tab === "search"} onClick={() => setTab("search")}>
          Search
        </button>
      </nav>
      {tab === "search" ? (
        <SearchPage />
      ) : (
        <>
          <h1>Projects</h1>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} owner={owners.get(p.ownerId)} />
          ))}
        </>
      )}
    </main>
  );
}
