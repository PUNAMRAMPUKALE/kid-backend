import "dotenv/config";
import { env } from "../src/env";
import { createClient } from "@supabase/supabase-js";

async function main() {
  
  console.log("Pinging:", env.SUPABASE_URL);
  const client = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE);

  // Try a cheap select to prove connectivity + auth
  const { data, error } = await client.from("questions").select("id").limit(1);
  console.log("RESULT:", { data, error });
}
main().catch((e) => console.error("PING ERROR:", e));
