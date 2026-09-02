# Client

React 19 + Vite front end. See the [root README](../README.md) for setup, the
rebranding checklist, and Vercel deploy steps (`vercel.json` lives in this folder).

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | dev server on http://localhost:5173 |
| `npm run build` | typecheck then build to `dist/` |
| `npm run preview` | serve the production build locally |
| `npm run lint` | oxlint |

## Where things live

```
src/
  config/site.ts      ← all company content: name, contact, copy, categories
  api.ts              typed fetch wrapper around the REST API (public + admin)
  adminAuth.ts         admin JWT storage (localStorage), read by api.ts
  types.ts            API response shapes
  index.css           design system — brand tokens in :root at the top
  components/
    Layout.tsx        header, mobile nav, CTA band, footer, scroll progress, back-to-top
    Icon.tsx          inline SVG icon set + the hero and showcase artwork
    Reveal.tsx        scroll-triggered entrance animation wrapper
    Motion.tsx        SplitText — word-by-word headline entrance
    States.tsx        loading spinner, error, empty, shimmer skeletons
  hooks/
    useAsync.ts       fetch + loading/error state, ignores stale results
    useReveal.ts      IntersectionObserver reveal + animated counters
    useMotion.ts      pointer-driven effects: cursor highlight, magnetic buttons, tilt
    useAdminGuard.ts  redirects to /admin/login on a 401 from an admin call
  pages/              one file per public route
  pages/admin/        /admin/* — see the root README's Admin Dashboard section
    RequireAdmin.tsx  route guard for the whole /admin tree
    AdminLogin.tsx    password → JWT
    AdminLayout.tsx   sidebar shell (Outlet for the pages below)
    Admin{Products,News,Jobs}.tsx        list + delete
    Admin{Product,News,Job}Form.tsx      shared create/edit form
    Admin{Applications,Contacts}.tsx     read + delete only, nothing to edit
```

## Environment

`VITE_API_URL` points at the API origin (default `http://localhost:3000`). It is
inlined at build time, so set it before running `npm run build`.

## Design system notes

A few decisions in `index.css` that look like mistakes but aren't:

- **Display headings are `font-weight: 400`.** The serif carries its own weight;
  bolding it makes it look heavy rather than confident.
- **`h1`/`h2` sit at `line-height: 1.12`, not the ~1.0 you'd see on an English
  site.** Vietnamese stacks diacritics above the cap line (Ế, Ữ, Ẵ). Measured on
  a worst-case string, 1.0 makes consecutive lines' ink actually merge; 1.12
  leaves ~7px of real clearance at display size. Don't tighten it further
  without re-measuring.
- **Surfaces are defined by a hairline border, not by elevation.** `--shadow-sm`
  is deliberately almost invisible; shadows appear on hover, where they mean
  "this lifts".
- **Two easing curves, three durations.** `--dur` (0.2s) for hover and other
  micro-interactions, `--dur-slow` (0.4s) for physical movement, `--dur-enter`
  (0.8s) for scroll entrances. A hover that takes longer than ~0.25s reads as
  lag rather than smoothness.

## Motion

Three layers, all of them optional at runtime:

- **Scroll entrances** — `Reveal` adds `is-visible` when an element scrolls into
  view; `.reveal` in the stylesheet does the rest. `index` staggers siblings.
  SVG pieces that draw themselves (the showcase bars, the trend line, the process
  connectors) key off the same class.
- **Word-by-word headlines** — `SplitText` wraps each word in a span carrying its
  position as `--w`, which `.split-word` turns into an animation delay.
- **Pointer effects** — `usePointerFx`, mounted once in `Layout`, runs a single
  `pointermove` listener for the whole app. It writes `--mx`/`--my` on the hovered
  card (cursor highlight) and `--pull-x`/`--pull-y` on the hovered button
  (magnetic drift); the stylesheet decides what those mean. `useTilt` is separate
  and used only for the hero artwork.

## `prefers-reduced-motion` policy

This is scoped deliberately, not blanket. Only **continuous, self-looping**
motion respects the preference: the hero's drifting aurora and orbiting rings,
the mesh grid pan, the marquee's auto-scroll, the gradient sweeps, and
`useTilt`'s cursor-tracked 3D rotation (the closest thing here to real
parallax). Those stop or freeze under `prefers-reduced-motion: reduce`.

Everything else — scroll entrances, hover states, the magnetic button pull, the
cursor highlight, SVG draw-ins, the count-up stats — runs the same for every
visitor regardless of that setting. These are brief, one-shot or
user-triggered, and low-amplitude; WCAG's animation-from-interactions guidance
targets things like this far less than it targets unstoppable background
motion.

**Why this matters**: an earlier version zeroed every animation and transition
on the page under this preference — including hover polish and scroll
entrances — which is technically spec-compliant but means an accessibility
setting on the *visitor's* machine can make the whole site look unstyled,
with no error or visual cue that anything is different. Windows' "Show
animations" toggle (Settings → Accessibility → Visual effects) drives this
media query in Chrome/Edge, and it is off by default on some machines and
locked-down corporate images — worth knowing since this is a sales-demo site
shown on other people's hardware.
