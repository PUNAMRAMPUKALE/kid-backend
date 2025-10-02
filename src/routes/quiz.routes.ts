import { Router } from "express";
import * as quizController from "../controllers/quiz.controller";

const r = Router();

// GET /quiz/next
r.get("/next", quizController.next);

// POST /quiz/answer
r.post("/answer", quizController.submit);

// POST /quiz/submit  -> same handler
r.post("/submit", quizController.submit);

export default r;
