import express from "express";
import { getUser } from "./user.service";
import { userCache } from "./cache";

const app = express();

app.get("/users/:id", async (req, res) => {
  const result = await getUser(req.params.id);
  res.json(result);
});

app.get("/cache/metrics", (req, res) => {
  
  res.json(userCache.getMetrics());
});
  console.log(
  "Has getMetrics:",
  typeof (userCache as any).getMetrics
);


app.listen(3002, () => {
  console.log("Cache-backed service running on port 3002");
});
