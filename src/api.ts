import type { Project, User } from "./types";

const BASE = import.meta.env.VITE_API_URL ?? "/api";

async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { signal, credentials: "include" });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${path}`);
  return (await res.json()) as T;
}

export const listProjects = (signal?: AbortSignal) => get<Project[]>("/projects", signal);

export const searchProjects = (query: string, signal?: AbortSignal) =>
  get<Project[]>(`/projects/search?q=${query}`, signal);

export const getUser = (id: string, signal?: AbortSignal) => get<User>(`/users/${encodeURIComponent(id)}`, signal);

/** Several users in one request, so lists never fetch owners one by one. */
export const getUsers = (ids: string[], signal?: AbortSignal) =>
  get<User[]>(`/users?ids=${ids.map(encodeURIComponent).join(",")}`, signal);
