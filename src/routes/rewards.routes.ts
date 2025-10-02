import { Router } from "express";
import * as rewardsController from "../controllers/rewards.controller";

const r = Router();

// GET /rewards/:childId
r.get("/:childId", rewardsController.getRewards);

export default r;
