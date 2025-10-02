import { Request, Response, NextFunction } from "express";
import { attemptRepository } from "../repositories/attempt.repository";

export async function listAttempts(req: Request, res: Response, next: NextFunction) {
  try {
    const childId = String(req.query.childId || "");
    const limit = req.query.limit ? Number(req.query.limit) : 50;

    if (!childId) return res.status(400).json({ error: "childId is required" });

    const data = await attemptRepository.listByChild(childId, limit);
    res.json({ data });
  } catch (err) {
    next(err);
  }
}
