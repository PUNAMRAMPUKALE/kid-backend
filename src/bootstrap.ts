// src/bootstrap.ts
import "dotenv/config";            // 1) load .env FIRST
import "./index";                  // 2) then load your app (which imports env.ts, etc.)