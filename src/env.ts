const clean = (s?: string) => (s ?? "").trim().replace(/^['"]|['"]$/g, "");

export const env = {
  PORT: Number(process.env.PORT ?? 4000),
  SUPABASE_URL: clean(process.env.SUPABASE_URL),
  SUPABASE_SERVICE_ROLE: clean(process.env.SUPABASE_SERVICE_ROLE),
};

if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE) {
  console.warn("! Missing env vars:", { url: !!env.SUPABASE_URL, key: !!env.SUPABASE_SERVICE_ROLE });
}

// debug once on boot (safe: no secrets)
try {
  // throws if invalid
  new URL(env.SUPABASE_URL);
  console.log("[env] SUPABASE_URL OK:", env.SUPABASE_URL);
  console.log("[env] SERVICE_ROLE length:", env.SUPABASE_SERVICE_ROLE.length);
} catch {
  console.error("Error: SUPABASE_URL is not a valid URL:", env.SUPABASE_URL);
}
