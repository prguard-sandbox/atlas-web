import { useEffect, useState } from "react";
import { getUser, searchProjects } from "../api";
import type { Project, User } from "../types";

/** Wraps every match of the query in <mark> so it stands out in the results. */
function highlight(text: string, query: string): string {
  if (!query) return text;
  return text.replace(new RegExp(query, "gi"), (match) => `<mark>${match}</mark>`);
}

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Project[]>([]);
  const [owners, setOwners] = useState<Record<string, User>>({});

  useEffect(() => {
    // Debounce: search once the user stops typing for 250 ms.
    setTimeout(async () => {
      const found = await searchProjects(query);
      setResults(found);
      for (const project of found) {
        const owner = await getUser(project.ownerId);
        setOwners((prev) => ({ ...prev, [project.ownerId]: owner }));
      }
    }, 250);
  }, [query]);

  return (
    <section className="search">
      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects by name or description"
      />
      <p className="search-count">{results.length} projects</p>
      <ul>
        {results.map((p) => (
          <li key={p.id}>
            <h3 dangerouslySetInnerHTML={{ __html: highlight(p.name, query) }} />
            <p dangerouslySetInnerHTML={{ __html: highlight(p.description, query) }} />
            <small>{owners[p.ownerId]?.name ?? "…"}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
