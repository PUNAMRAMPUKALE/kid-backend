import { z } from "zod";

export const AnswerRequestSchema = z.object({
  childId: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
});

export type AnswerRequest = z.infer<typeof AnswerRequestSchema>;

export const AttemptSchema = z.object({
  id: z.string().uuid(),
  child_id: z.string(),
  question: z.string(),
  answer: z.string(),
  correct: z.boolean(),
  created_at: z.string().datetime().optional(),
});
export type Attempt = z.infer<typeof AttemptSchema>;
