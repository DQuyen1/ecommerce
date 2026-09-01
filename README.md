# Company Website Template

A reusable company website — products catalogue, news, recruitment with CV upload,
and a contact form. React + Vite on the front, Express + MongoDB on the back.

All company-specific content is isolated in **two config files**, so rebranding for a
new client is a content edit, not a code change.

```
client/   React 19 + Vite + React Router
server/   Express 4 + Mongoose
```

## Running it

```bash
# 1. API  (needs MongoDB on localhost:27017)
cd server
npm install
cp .env.example .env      # adjust PORT / MONGODB_URI if needed
npm run seed              # loads placeholder demo content
npm run dev               # http://localhost:3000

# 2. Web
cd client
npm install
cp .env.example .env      # VITE_API_URL must point at the API
npm run dev               # http://localhost:5173
```

## Rebranding for a new client

### 1. `client/src/config/site.ts` — almost everything

Company name, wordmark, phone, email, address, every heading and paragraph, the
stats counters, core values, the four process steps, the capability showcase,
testimonials, the closing call-to-action band, recruitment benefits, and the
product categories. No page or component contains a hard-coded company name or
marketing sentence.

> **Replace the testimonials before going live.** `home.testimonials` holds
> invented quotes from invented people ("Nguyễn Văn A, Công ty ABC") so the demo
> has something in that slot. Swap in real, permitted quotes, or delete the block
> and the section that renders it in `pages/Home.tsx`. The same goes for the stat
> counters in `home.stats` — they are round placeholder numbers.

Adding or removing an entry in `process`, `values`, `showcase.points` or
`testimonials` needs no CSS: the layouts are grids and the timeline draws its
connectors from the step count.

### 2. `client/index.html` — browser tab

Update `<title>` and `<meta name="description">` to match `site.seo`. These are
duplicated because they must exist in the HTML before React boots (for SEO and
link previews).

### 3. `server/src/config/catalog.ts` — product categories

The API validates `product.category` against this list. **The slugs must match
`CATEGORIES` in `client/src/config/site.ts`.** The server stores only the slug;
the human-readable Vietnamese label lives on the client.

After changing categories, re-run `npm run seed` — products carrying a removed
slug will fail validation on their next update.

### 4. Brand colours — `client/src/index.css`

The palette is defined as custom properties in `:root` at the top of the file.
Changing `--brand`, `--brand-dark`, `--brand-light`, `--brand-glow`, `--brand-soft`,
`--brand-softer` and `--grad-brand` re-skins the whole site — buttons, cards,
icons, gradients, and the dark sections all derive from those tokens.

### 5. Favicon — `client/public/favicon.svg`

A simple SVG mark using the brand gradient. Swap in the client's logo.

### 6. Demo content — `server/src/seed.ts`

Placeholder products, articles and job postings. Replace with the client's real
content, or leave as-is for a demo.

### 7. Fonts — `client/index.html`

Currently Playfair Display (headings) + Be Vietnam Pro (body), both chosen for
full Vietnamese diacritic support. If you change these, update the
`font-family` declarations in `index.css` to match.

## API

Base URL `http://localhost:3000/api`. Responses expose `id` (not `_id`), and
errors return `{ "error": "message" }`.

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/products` | `?category=<slug>` to filter |
| GET | `/products/categories` | valid category slugs |
| GET | `/products/:id` | |
| GET | `/news` | `?topic=&page=&limit=` — returns `{total, page, limit, items}` |
| GET | `/news/topics` | distinct topics |
| GET | `/news/:idOrSlug` | accepts an id or a slug |
| GET | `/jobs` | |
| GET | `/jobs/:id` | |
| POST | `/jobs/:id/apply` | multipart; `cv` field accepts PDF/DOC/DOCX up to 5MB |
| GET | `/jobs/:id/applications` | |
| POST | `/contact` | JSON |

Products, news and jobs also expose `POST` / `PUT` / `DELETE` for admin use.
**These are unauthenticated** — put them behind auth before deploying, or drop
the routes if content is only ever seeded.

Uploaded CVs are written to `server/uploads/cv/` and served from `/uploads/cv/...`.

## Deploying

`npm run build` in `client/` produces a static SPA in `client/dist`. The host must
serve `index.html` for unmatched routes, otherwise deep links like `/san-pham/:id`
will 404 on refresh. Set `VITE_API_URL` to the production API origin **before**
building — Vite inlines it at build time.
