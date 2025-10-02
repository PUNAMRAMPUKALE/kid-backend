import type { AnswerRequest } from "../models/attempt";
import { attemptRepository } from "../repositories/attempt.repository";

function simpleEvaluate(question: string, answer: string) {
  // placeholder logic; replace with your AI evaluateAnswer if you have one
  const q = question.trim().toLowerCase();
  const a = answer.trim().toLowerCase();
  const correct =
    (q.includes("2 + 2") && (a === "4" || a === "four")) ||
    (q.includes("spell") && a.length > 0) ||
    (q.includes("color") && ["blue", "red", "green"].includes(a));
  const companionText = correct
    ? "Great job! 🎉"
    : "Close! Try again, you’ve got this 💪";
  return { correct, companionText };
}

export const answerService = {
  async gradeAndLog(payload: AnswerRequest) {
    const { correct, companionText } = simpleEvaluate(payload.question, payload.answer);
    const row = await attemptRepository.insert({
      child_id: payload.childId,
      question: payload.question,
      answer: payload.answer,
      correct,
      question_id: ""
    });
    return { correct, companionText, attempt: row };
  },

  listAttempts(childId: string, limit?: number) {
    return attemptRepository.listByChild(childId, limit);
  },
};
