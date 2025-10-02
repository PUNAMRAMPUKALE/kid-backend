import { z } from "zod";

export const NextQuestionQuery = z.object({
  childId: z.string().min(1),
  level: z.coerce.number().min(1).optional(),
});

export const AnswerPayload = z.object({
  childId: z.string().min(1),
  questionId: z.string().uuid(),
  answer: z.string().min(1),
});

export type AnswerPayloadT = z.infer<typeof AnswerPayload>;

export type Question = {
  id: string;
  level: number;
  prompt: string;
  answer: string; // server keeps this; never send to client
};

export type RewardsSnapshot = {
  points: number;
  streak: number;
  best_streak: number;
  badges: string[];
};

export type AnswerResult = {
  correct: boolean;
  companionText: string;
  rewards: RewardsSnapshot;
  nextQuestion?: { id: string; level: number; prompt: string } | null;
};
