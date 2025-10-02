# kid-backend

Backend service for handling child learning Q&A with Supabase logging.  
Built with **Express**, **TypeScript**, **Supabase**, and **Zod**.

------------------------------------------------------------------------
------------------------------------------------------------------------

## ⚡ Overview

This backend receives answers from kids, evaluates them, and logs results to Supabase.  
It exposes health check and API endpoints that can be called directly or via the frontend (Vite).

---

## What Was Fixed

- **Env vars not loading**: `env.ts` read `process.env` before `dotenv` → “⚠ Missing env vars”.
- **Port conflicts**: Frontend (Vite) and backend (Express) both on `:3001` → requests hit Vite instead of API.
- **Route mismatch**: API routes not prefixed with `/api` → caused 404s in proxy.

Solution:
- Load `dotenv` first in `index.ts`.
- Backend runs on **:4000**, frontend on **:5173**.
- All API routes live under `/api`.

---

##  How It Works

### Startup flow
1. Run `npm run dev` → starts `ts-node src/index.ts`.
2. `dotenv/config` loads `.env` into `process.env`.
3. Express + middleware (`cors`, `express.json`) initialize.
4. Routes are registered:
   - `GET /health` → `{ ok: true }`
   - `GET /api/health` → `{ ok: true }`
   - `POST /api/answer` → validates payload, evaluates answer, logs to Supabase.
5. Server listens on port defined in `.env` (default `4000`).

### Request flow
- **/api/health** → returns `{ ok: true }`.
- **/api/answer**:
  1. Validates input with Zod.
  2. Runs `evaluateAnswer()`.
  3. Logs result into Supabase (`parent_logs`).
  4. Responds with `{ correct, companionText }`.

---
## Development

**Install dependencies**
npm install

  ### Run in dev mode
  
  npm run dev

### Build for production
  
npm run build
npm start




