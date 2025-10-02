// src/controllers/answer.controller.ts
import { Request, Response } from "express";
import { answerService } from "../services/answer.service";

export const answerController = {
  health: (_req: Request, res: Response) => res.json({ ok: true }),

  submit: async (req: Request, res: Response) => {
    const result = await answerService.gradeAndLog(req.body);
    res.json({ correct: result.correct, companionText: result.companionText });
  },

  listAttempts: async (req: Request, res: Response) => {
    const { childId, limit } = req.query as { childId?: string; limit?: string };
    if (!childId) return res.status(400).json({ error: "childId required" });
    const rows = await answerService.listAttempts(childId, limit ? Number(limit) : undefined);
    res.json({ data: rows });
  },
};
