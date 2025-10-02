import { attemptRepository } from "../repositories/attempt.repository";

type Rewards = {
  points: number;
  streak: number;
  best_streak: number;
  badges: string[];
};

export async function computeRewards(childId: string): Promise<Rewards> {
  // attempts are returned newest-first
  const history = await attemptRepository.listByChild(childId, 500);

  // Points: +10 per correct
  const points = history.reduce((sum, a) => sum + (a.correct ? 10 : 0), 0);

  // Current streak: consecutive corrects from most recent backwards
  let streak = 0;
  for (const a of history) {
    if (a.correct) streak++;
    else break;
  }

  // Best streak: scan chronologically
  let best = 0, current = 0;
  for (const a of [...history].reverse()) {
    if (a.correct) {
      current++;
      if (current > best) best = current;
    } else {
      current = 0;
    }
  }

  // Simple badges (customize as you like)
  const totalCorrect = history.filter(h => h.correct).length;
  const badges: string[] = [];
  if (points >= 50) badges.push("Star Collector ⭐");
  if (best >= 5) badges.push("Streak Hero 🔥");
  if (totalCorrect >= 10) badges.push("Brain Builder 🧠");

  return { points, streak, best_streak: best, badges };
}
