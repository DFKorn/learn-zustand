import type { User } from "../types/user";

export type GetUsersFilters = {
  limit: number;
  page: number;
};

export async function getUser(filters?: GetUsersFilters) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const users: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];
  return users;
}
