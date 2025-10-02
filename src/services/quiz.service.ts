import { questionRepository } from "../repositories/question.repository";
import { attemptRepository } from "../repositories/attempt.repository";

export async function nextQuestion(_childId: string, level: number) {
  return questionRepository.findRandom(level);
}

export async function submitAnswer(payload: { childId: string; questionId: string; answer: string }) {
  const q = await questionRepository.findById(payload.questionId); // questionId must be UUID
  if (!q) throw new Error("Question not found");

  const correct =
    q.answer.trim().toLowerCase() === String(payload.answer).trim().toLowerCase();

  await attemptRepository.insert({
    child_id: payload.childId,
    question_id: q.id,       // <- store the UUID
    question: q.prompt,      // <- snapshot prompt for parent view
    answer: payload.answer,
    correct,
  });

  const nextQ = await questionRepository.findRandom(q.level, q.id);

  return {
    correct,
    companionText: correct ? "🎉 Great job!" : `❌ Oops, the answer is “${q.answer}”.`,
    rewards: { points: correct ? 10 : 0, streak: correct ? 1 : 0, best_streak: 1, badges: [] },
    nextQuestion: nextQ ? { id: nextQ.id, level: nextQ.level, prompt: nextQ.prompt } : null,
  };
}
