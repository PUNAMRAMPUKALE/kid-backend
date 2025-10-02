import { supabase } from "../lib/supabase";

export const questionRepository = {
  async findRandom(level: number, excludeId?: string) {
    let q = supabase
      .from("questions")
      .select("id, level, prompt, answer")
      .eq("level", level);

    if (excludeId) q = q.neq("id", excludeId);

    // fetch small batch & pick one at random (simple + efficient enough for small sets)
    const { data, error } = await q.limit(10);
    if (error) throw error;
    if (!data || data.length === 0) return null;

    const idx = Math.floor(Math.random() * data.length);
    return data[idx];
  },

  async findById(id: string) {
    const { data, error } = await supabase
      .from("questions")
      .select("id, level, prompt, answer")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },
};
