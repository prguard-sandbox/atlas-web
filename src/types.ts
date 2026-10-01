export interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  tier: "critical" | "standard" | "experimental";
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  team: string;
}
