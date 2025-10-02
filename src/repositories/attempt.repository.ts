import { supabase } from "../lib/supabase";

export type AttemptRow = {
  child_id: string;
  question_id: string;  // uuid
  question: string;
  answer: string;
  correct: boolean;
  created_at?: string;
};

export const attemptRepository = {
  async insert(row: AttemptRow) {
    const { data, error } = await supabase
      .from("parent_logs")
      .insert(row)
      .select()
      .single();
    if (error) throw error;
    return data as AttemptRow;
  },

  async listByChild(childId: string, limit = 20) {
    const { data, error } = await supabase
      .from("parent_logs")
      .select("*")
      .eq("child_id", childId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data ?? []) as AttemptRow[];
  },
};
