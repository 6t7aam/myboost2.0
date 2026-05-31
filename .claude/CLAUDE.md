# Project Instructions

## Knowledge Graph

This project has a pre-built knowledge graph in `graphify-out/graph.json` (1129 nodes, 2040 edges, 99 communities).

**IMPORTANT: Before reading files to understand the codebase, check the graph first:**

1. Use `/graphify query "<question>"` to search the graph
2. Use `/graphify path "NodeA" "NodeB"` to find connections
3. Use `/graphify explain "NodeName"` to understand a component

The graph contains:
- All code structure (AST-extracted)
- Documentation relationships
- SEO implementation details
- Admin panel architecture
- Payment system flow
- Game service configurations (Rust, CS2, Dota2, Arena Breakout)

**God Nodes (most connected):**
- `cn()` - 74 edges (utility function used everywhere)
- `Button` - 44 edges (UI component)
- `useCart()` - 35 edges (cart state management)
- `Badge()` - 23 edges
- `useAuth()` - 23 edges (authentication)
- `supabase` - 19 edges (database client)

**Key Communities:**
- Community 0: Rust Game Services (69 nodes)
- Community 1: CS2 Services & SEO (64 nodes)
- Community 2: NPM Dependencies (53 nodes)
- Community 3: Authentication System (50 nodes)
- Community 4: Service Navigation (36 nodes)
- Community 8: Chat & Navbar (29 nodes)
- Community 10: Dota2 MMR Calculator (27 nodes)
- Community 14: Admin Order Management (22 nodes)

Use the graph to understand architecture before making changes. This saves tokens and gives you accurate structural information.

## Project Overview

MyBoost - game boosting marketplace for Rust, CS2, Dota2, and Arena Breakout Infinite.

Tech stack:
- React + TypeScript + Vite
- Supabase (PostgreSQL + Auth + Realtime)
- Tailwind CSS + shadcn/ui
- Payment: NowPayments (crypto)

## Terminology

- **Removed:** "boost/booster" terminology site-wide (replaced with service/marketplace language)
- **Preserved:** MyBoost brand name, URL slugs, database identifiers
