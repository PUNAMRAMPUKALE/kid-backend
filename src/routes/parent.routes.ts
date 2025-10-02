import { Router } from "express";
import * as parentController from "../controllers/parent.controller";

const r = Router();

// GET /parent/attempts?childId=kid1&limit=50
r.get("/attempts", parentController.listAttempts);

export default r;
