// src/env.ts
export const env = {
  PORT: Number(process.env.PORT ?? 3001),
  SUPABASE_URL: process.env.SUPABASE_URL ?? "",
  SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE ?? "",
};

const missing: string[] = [];
if (!env.SUPABASE_URL) missing.push("SUPABASE_URL");
if (!env.SUPABASE_SERVICE_ROLE) missing.push("SUPABASE_SERVICE_ROLE");
if (missing.length) {
  console.warn(`⚠️ Missing env vars: ${missing.join(", ")}`);
}
