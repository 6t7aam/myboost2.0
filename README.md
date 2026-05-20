# MyBoost

Web frontend for the MyBoost gaming-services platform (Dota 2, Arena Breakout, and more).
Built with Vite + React 18 + TypeScript, shadcn/ui, Tailwind, and Supabase.

## Prerequisites

- Node.js 18+ (or Bun)
- A `.env` file based on [.env.example](.env.example)

## Setup

```bash
npm install
cp .env.example .env   # then fill in the values
```

## Common scripts

| Command           | What it does                               |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start the Vite dev server                  |
| `npm run build`   | Production build + static page generation  |
| `npm run lint`    | Run ESLint                                 |
| `npm test`        | Run the Vitest suite                       |
| `npm run preview` | Preview the production build locally       |
