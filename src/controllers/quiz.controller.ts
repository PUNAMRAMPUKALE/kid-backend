// src/controllers/quiz.controller.ts
import { Request, Response, NextFunction } from "express";
import * as quizService from "../services/quiz.service";

const isUuid = (s: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);

export async function next(req: Request, res: Response, nextFn: NextFunction) {
  try {
    const childId = String(req.query.childId || "");
    const level = Number(req.query.level || 1);
    const q = await quizService.nextQuestion(childId, level);
    res.json(q ? { id: q.id, level: q.level, prompt: q.prompt } : null);
  } catch (err) { nextFn(err); }
}

export async function submit(req: Request, res: Response, nextFn: NextFunction) {
  try {
    const { childId, questionId, answer } = req.body as {
      childId: string; questionId: string; answer: string;
    };
    if (!isUuid(questionId)) {
      return res.status(400).json({ error: "questionId must be a UUID returned by /quiz/next" });
    }
    const result = await quizService.submitAnswer({ childId, questionId, answer });
    res.json(result);
  } catch (err) { nextFn(err); }
}
