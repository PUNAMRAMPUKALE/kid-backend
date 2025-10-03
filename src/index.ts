import "dotenv/config";
import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quiz.routes";
import rewardsRoutes from "./routes/rewards.routes";
import parentRoutes from "./routes/parent.routes";
const app = express();

// tighten CORS using env (we’ll set ALLOW_ORIGIN in Render)
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || "*"; // set to frontend URL after deploy
app.use(cors({ origin: ALLOW_ORIGIN }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/quiz", quizRoutes);
app.use("/rewards", rewardsRoutes); // GET /rewards/:childId
app.use("/parent", parentRoutes); // GET /parent/attempts?childId=...
// 404 JSON
app.use((req, res) => {
  res
    .status(404)
    .json({ error: `Not found: ${req.method} ${req.originalUrl}` });
});

// ERROR JSON (key fix)
app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err?.status || 500;
  console.error("Error:", err); // visible in terminal
  res.status(status).json({
    error: err?.message || "Internal Server Error",
    details: process.env.NODE_ENV !== "production" ? err : undefined,
  });
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`API running on :${process.env.PORT || 4000}`)
);
