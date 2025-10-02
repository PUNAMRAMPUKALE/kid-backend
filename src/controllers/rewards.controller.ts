import { Request, Response, NextFunction } from "express";
import * as rewardsService from "../services/rewards.service";

export async function getRewards(req: Request, res: Response, next: NextFunction) {
  try {
    const childId = String(req.params.childId || "");
    if (!childId) return res.status(400).json({ error: "childId is required" });

    const data = await rewardsService.computeRewards(childId);
    res.json(data);
  } catch (err) {
    next(err);
  }
}
