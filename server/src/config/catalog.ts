/**
 * Product categories the API accepts.
 *
 * IMPORTANT: these slugs must match `CATEGORIES` in
 * `client/src/config/site.ts`. The client renders the human-readable labels;
 * the server only validates the slug, so labels live on the client alone.
 *
 * Changing this list requires re-seeding (`npm run seed`) — existing products
 * carrying a removed slug will fail validation on their next update.
 */
export const CATEGORIES = [
  "core-products",
  "custom-solutions",
  "premium-line",
  "other-products",
] as const;

export type ProductCategory = (typeof CATEGORIES)[number];
