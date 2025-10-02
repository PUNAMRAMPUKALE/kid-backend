// src/index.ts
import "dotenv/config"; // load .env BEFORE anything else

import express from "express";
import cors from "cors";
import { z } from "zod";
import { env } from "./env";
import { supabaseAdmin } from "./supabase";
import { evaluateAnswer } from "./ai";

const app = express();
app.use(cors());
app.use(express.json());

const AnswerSchema = z.object({
  childId: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
});

app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use((req, _res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

app.post("/api/answer", async (req, res) => {
  const parsed = AnswerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Bad payload" });

  const { childId, question, answer } = parsed.data;
  const { correct, companionText } = evaluateAnswer(question, answer);

  // write log to Supabase (server-side)
  if (supabaseAdmin) {
    await supabaseAdmin.from("parent_logs").insert({
      child_id: childId, question, answer, correct
    });
  }

  res.json({ correct, companionText });
});

app.listen(env.PORT, () => {
  console.log(`API running on :${env.PORT}`);
});
