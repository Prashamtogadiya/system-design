import { userCache } from "./cache";
import { getUserFromDB } from "./db";

export async function getUser(id: string) {
  const key = `user:${id}`;

  const cached = userCache.get(key);
  if (cached) {
    return { source: "cache", data: cached };
  }

  const user = await getUserFromDB(id);
  userCache.set(key, user, 10);

  return { source: "db", data: user };
}
