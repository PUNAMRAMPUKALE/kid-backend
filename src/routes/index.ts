import { Router } from "express";
import quizRoutes from "./quiz.routes";
import answerRoutes from "./answer.routes";

const api = Router();

api.use("/quiz", quizRoutes);
api.use("/", answerRoutes); // optional; previous health/answer endpoints

export default api;
