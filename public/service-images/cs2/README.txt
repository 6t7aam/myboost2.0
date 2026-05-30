CS2 service card images
========================

The site serves optimized .webp files (small + fast). The service config
(src/data/gameConfigs.ts) points at /service-images/cs2/<slug>.webp.

To add or replace an image:
  1. Drop a .png / .jpg / .webp here named after the service slug
     (e.g. premier-rating.png).
  2. Run:  npm run optimize:images
     This resizes to max 800px wide and writes an optimized <slug>.webp
     (deleting the heavy original). ~2MB source -> ~50-90KB webp.

Service slugs:
  premier-rating, rent-a-booster, faceit-wins, faceit-rank, esea-rank,
  competitive-rank, wingman-rank, placement-matches, wins-boost,
  armory-boost, profile-rank, coaching, esea-wins, global-elite-boost

Until a file exists for a slug, the card/order panel shows a black-yellow
gradient placeholder.
