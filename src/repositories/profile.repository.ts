import { supabase } from "../lib/supabase";
import type { RewardsSnapshot } from "../models/quiz";

type Row = {
  child_id: string;
  points: number;
  streak: number;
  best_streak: number;
  badges: string[];
};

export const profileRepo = {
  async getOrCreate(childId: string): Promise<Row> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data } = await supabase.from("child_profiles").select("*").eq("child_id", childId).single();
    if (data) return data as Row;
    const { data: created, error } = await supabase
      .from("child_profiles")
      .insert({ child_id: childId })
      .select()
      .single();
    if (error) throw error;
    return created as Row;
  },

  async save(child: Row): Promise<Row> {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase
      .from("child_profiles")
      .update({ points: child.points, streak: child.streak, best_streak: child.best_streak, badges: child.badges, updated_at: new Date().toISOString() })
      .eq("child_id", child.child_id)
      .select()
      .single();
    if (error) throw error;
    return data as Row;
  },

  toSnapshot(row: Row): RewardsSnapshot {
    return { points: row.points, streak: row.streak, best_streak: row.best_streak, badges: row.badges };
  },
};
