export async function getUserFromDB(id: string) {
  await new Promise((r) => setTimeout(r, 700)); // simulate latency
  return { id, name: `User-${id}` };
}
