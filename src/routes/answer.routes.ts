import { Router } from "express";
import { answerController } from "../controllers/answer.controller";
import { validate } from "../middlewares/validate";
import { AnswerRequestSchema } from "../models/attempt";

const r = Router();

r.get("/health", answerController.health);
r.post("/answer", validate(AnswerRequestSchema), answerController.submit);
r.get("/attempts", answerController.listAttempts);

export default r;
