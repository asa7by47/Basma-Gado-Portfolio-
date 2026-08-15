# Implementation Plan — Basma Gado Creative Portfolio

> Feature ID: `001-basma-portfolio`
> Implementer: **Claude Opus 4.7** (writes all code)
> Companion contract: [`spec.md`](./spec.md) — read it first; it owns all data shapes, prop contracts, content, routes, and tokens. This plan owns the **build order**.

---

## How to use this plan

Work the phases in order. Do not start a phase until the previous phase's **Acceptance Criteria** all pass. Each phase lists its goal, exact files, implementation notes, and acceptance criteria. When a detail (interface field, URL, prop name) is needed, look it up in `spec.md` — do not invent. Run `npm run typecheck` and `npm run build` at the end of every phase; both must be green before moving on.

**Golden rules:**

- Atomic Design is strict: a molecule never reaches past atoms; an organism composes molecules/atoms; pages compose organisms via templates. No atom imports a molecule.
- No hardcoded content strings in components — everything comes from `src/data/*` and `src/types`.
- No third-party UI kit. Icons are inline SVG. The only runtime deps beyond React are `react-router-dom` and `framer-motion` (+ optional `clsx`).
- Every component folder ships `Component.tsx` + `index.ts`.
- Tailwind utilities reference design tokens (Section 5 of spec) — avoid raw hex in JSX.

---

## Shell Commands (Phase 0 — run once)

Run from the project root `D:\basma portfolio` (PowerShell). The directory already exists and is the Vite project root.

```powershell
# 1. Scaffold Vite React+TS into the CURRENT directory (note the trailing dot)
npm create vite@latest . -- --template react-ts

# 2. Install base deps
npm install

# 3. Runtime deps
npm install react-router-dom framer-motion clsx

# 4. Tailwind v3 + PostCSS toolchain (pin v3 — do NOT install v4)
npm install -D tailwindcss@^3.4 postcss autoprefixer
npx tailwindcss init -p

# 5. (optional) typecheck script presence — verify package.json has "build": "tsc -b && vite build"
npm run build
```

If `npm create vite` refuses because the directory is non-empty (CLAUDE.md / specs/ exist), scaffold into a temp subfolder and move files up, OR run `npm create vite@latest . -- --template react-ts` and accept "Ignore files and continue". Preserve `CLAUDE.md` and `specs/`.

**Path aliases.** Configure `@/` → `src/`:

- `vite.config.ts`: add `resolve.alias` mapping `@` to the absolute `src` path. Use `import { fileURLToPath, URL } from 'node:url'` → `'@': fileURLToPath(new URL('./src', import.meta.url))`. Keep the `@vitejs/plugin-react` plugin.
- `tsconfig.json` (or `tsconfig.app.json` in newer Vite templates — edit whichever holds `compilerOptions` used by the app): add `"baseUrl": "."` and `"paths": { "@/*": ["src/*"] }`. Ensure `"strict": true`.

**Google Fonts.** Add to `index.html` `<head>` the preconnect + stylesheet links for Playfair Display (weights 400,500,600,700) and DM Sans (400,500,700). Set `<title>Basma Gado — Cinema & Media Arts</title>` and a meta description.

---

## Phase 1 — Project Scaffolding & Foundations

**Goal:** A running Vite app with Tailwind wired to design tokens, path aliases working, global styles in place, and an empty router rendering a blank PageTemplate.

**Files to create / modify:**

- `tailwind.config.js` — extend theme with all tokens (spec §5.4): colors, fontFamily, fontSize scale, borderRadius, boxShadow, transitionTimingFunction, maxWidth. `content: ['./index.html', './src/**/*.{ts,tsx}']`.
- `postcss.config.js` — tailwindcss + autoprefixer (created by `init -p`; verify).
- `src/styles/globals.css` — `@tailwind base/components/utilities`; `:root` block with every CSS custom property (spec §5.1–§5.3); base element styles: `html, body` → `bg` background, `text` color, `font-body`, antialiased, smooth scroll; selection color = accent; focus-visible ring = accent. Import font families via the CSS vars.
- `src/main.tsx` — import `globals.css`, mount `<RouterProvider router={router}/>`.
- `vite.config.ts`, `tsconfig*.json` — path alias `@/*` (per Phase 0).
- `index.html` — fonts, title, meta, `#root`.
- `.gitignore` — ensure `node_modules`, `dist`.

**Implementation notes:**

- Confirm Tailwind v3 (NOT v4) — check `package.json`. v4 changes the config/import model and is out of scope.
- Map tokens so e.g. `className="bg-bg text-text font-display"` resolves. Color utilities should point at `var(--color-…)` so a future theme tweak is one file.
- Add `prefers-reduced-motion` base handling in CSS as a safety net (reduce transition durations) in addition to the JS hook later.

**Acceptance criteria:**

- `npm run dev` serves a page with the near-black background and off-white text rendered in DM Sans.
- A throwaway element using `font-display` shows Playfair Display.
- `import x from '@/...'` resolves in both Vite and tsc.
- `npm run build` is green.

---

## Phase 2 — Types, Data Layer, Hooks

**Goal:** All content and contracts exist before any UI, so components code against real data.

**Files to create:**

- `src/types/index.ts` — every interface from spec §6 verbatim (`VideoItem`, `ImageItem`, `InteractiveProject`, `SocialLink`, `NavItem`, `Skill`, `AboutContent`, `ReelContent`, `MediaSource`). Export `IconName` union here OR re-export from the Icon atom — pick one home and import consistently (recommend defining `IconName` in `types/index.ts` to avoid a cycle).
- `src/data/navigation.ts` — spec §11.1.
- `src/data/about.ts` — `about` + `reel` exports, spec §11.2 (transcribe bio, skills, socials, avatar URLs exactly; include the `// TODO` reel fallback comment).
- `src/data/videos.ts` — all 10 `VideoItem`s, spec §11.3 (exact URLs, correct `source`, `youtubeId`, adobe-ccv `fallbackUrl` TODO).
- `src/data/images.ts` — 5 placeholder `ImageItem`s, spec §11.4.
- `src/data/interactive.ts` — "Writing Home", spec §11.5.
- `src/hooks/useLazyLoad.ts`, `src/hooks/useScrollPosition.ts`, `src/hooks/useMediaQuery.ts`, `src/hooks/useReducedMotion.ts`, `src/hooks/index.ts` (barrel).
- `src/styles/cn.ts` (or `src/hooks/cn.ts`) — `clsx`-backed class merge helper.

**Implementation notes:**

- `useLazyLoad`: IntersectionObserver, `rootMargin: '200px'`, disconnect after first intersect, return `{ ref, isVisible }`. SSR-safe guards not needed (CSR only) but guard against missing `IntersectionObserver`.
- Data files are typed (`: VideoItem[]` etc.) so a transcription typo fails the typecheck.
- Derive YouTube thumbnails at usage time, not in data — keep `thumbnailUrl` undefined for YouTube items.

**Acceptance criteria:**

- `npm run typecheck` green with all data files typed against `src/types`.
- A temporary `console.log(videos.length)` prints `10`, `images.length` prints `5`.
- No content string anywhere except `src/data/*`.

---

## Phase 3 — Atoms

**Goal:** The eight atoms, fully styled with tokens, each in its own folder with a barrel export.

**Files to create (each folder: `X.tsx` + `index.ts`):**

- `src/components/atoms/Button/`
- `src/components/atoms/Text/`
- `src/components/atoms/Icon/`
- `src/components/atoms/Tag/`
- `src/components/atoms/VideoEmbed/`
- `src/components/atoms/Image/`
- `src/components/atoms/Link/`
- `src/components/atoms/Divider/`
- `src/components/atoms/index.ts` — barrel re-exporting all atoms.

**Implementation notes (contracts in spec §7):**

- **Icon**: single `Record<IconName, ReactNode>` of inline SVGs using `currentColor`. Required names listed in spec §7.3. Keep paths simple/clean (Lucide-style line icons are a fine visual reference but author the paths yourself — no library).
- **VideoEmbed** is the highest-risk atom. Implement exactly per spec §7.5: lazy gate via `useLazyLoad` + click-to-activate; poster state; YouTube thumbnail derivation (`maxresdefault` → `hqdefault` on error); aspect-ratio box; adobe-ccv always shows external fallback link; `eager` prop bypasses the gate. Iframe attrs per spec.
- **Image**: native lazy + async decode, shimmer-while-loading, error → placeholder, `placeholder` prop → labeled "coming soon" card (accent border). Never render a broken `<img>`.
- **Button**: 4 variants × 3 sizes, `as` button/anchor polymorphism, Framer Motion hover/tap micro-scale; respect reduced motion.
- **Text**: variant→fontSize token, color→token, sensible `as` defaults.
- **Link**: internal (`react-router` Link) vs external (anchor + `rel`).

**Acceptance criteria:**

- A scratch route renders every atom in every variant without console errors.
- VideoEmbed with a YouTube item shows a thumbnail + play button and only injects the iframe after click; Network tab shows no `youtube.com/embed` request until activation.
- Image with `placeholder` shows the styled placeholder, not a broken image.
- typecheck + build green.

---

## Phase 4 — Molecules

**Goal:** Seven molecules composing only atoms.

**Files to create (folder + barrel each):**

- `src/components/molecules/NavItem/`
- `src/components/molecules/VideoCard/`
- `src/components/molecules/ImageCard/`
- `src/components/molecules/ProjectCard/`
- `src/components/molecules/SocialLink/`
- `src/components/molecules/SectionHeader/`
- `src/components/molecules/SkillBadge/`
- `src/components/molecules/index.ts` — barrel.

**Implementation notes (contracts in spec §8):**

- `NavItem`: dropdown for `children` (Work), `NavLink` active styling (accent underline), `onNavigate` to close mobile menu.
- `VideoCard` / `ImageCard`: hover scale (1.02) + overlay revealing title; cards on `surface`, rounded-lg, `shadow-soft`. `VideoCard` wraps `VideoEmbed` (poster mode); `priority` forwards eager-ish behavior to first row.
- `SectionHeader`: `whileInView` stagger reveal, `viewport={{ once: true }}`; respect reduced motion.
- Molecules import from `@/components/atoms` only.

**Acceptance criteria:**

- Scratch route renders a `VideoGrid`-like row of `VideoCard`s from real `videos` data with working lazy embeds.
- Hover overlays and active-nav styling visible.
- No molecule imports another molecule or an organism. typecheck + build green.

---

## Phase 5 — Organisms

**Goal:** Nine organisms composing molecules/atoms + data.

**Files to create (folder + barrel each):**

- `src/components/organisms/Navbar/`
- `src/components/organisms/Hero/`
- `src/components/organisms/VideoGrid/`
- `src/components/organisms/ImageGallery/`
- `src/components/organisms/InteractiveProject/`
- `src/components/organisms/ReelPlayer/`
- `src/components/organisms/AboutSection/`
- `src/components/organisms/ContactSection/`
- `src/components/organisms/Footer/`
- `src/components/organisms/index.ts` — barrel.

**Implementation notes (responsibilities in spec §9):**

- `Navbar`: pinned, `useScrollPosition` shrink/blur; desktop nav from `navigation.ts`; mobile hamburger → full-screen Framer Motion overlay; Work dropdown via `NavItem`. Wordmark → `/`.
- `Hero`: Playfair headline, tagline, locations line, "Watch the Reel" → `/reel`, "View Work" → `/work/videos`. Background: if no media asset, animated gradient/grain (CSS) — do NOT block on a video file.
- `VideoGrid`: responsive grid (spec §9), first 2 `priority`, stagger-in.
- `ReelPlayer`: `VideoEmbed eager` with `reel.embedUrl`, music credit, external fallback link.
- `InteractiveProject`: Stornaway embed (eager, single) + header + prose.
- `AboutSection` / `ContactSection` / `Footer`: per spec §9; ContactSection default = contact methods only (email mailto + socials), no functional form.

**Acceptance criteria:**

- Each organism renders standalone from real data on a scratch route.
- Navbar mobile menu opens/closes; Work dropdown works; scroll changes navbar state.
- typecheck + build green.

---

## Phase 6 — Templates, Pages & Routing

**Goal:** Wire everything into routes with templates and page transitions.

**Files to create:**

- `src/components/templates/PageTemplate/` — root layout: Navbar + `<main>` with `AnimatePresence` page-transition around `<Outlet/>` + Footer; `max-w-content` container.
- `src/components/templates/WorkTemplate/` — nested layout for `/work/*`: work sub-nav tabs (Videos/Images/Interactive) + page `SectionHeader` + `<Outlet/>`; active tab highlight.
- `src/components/templates/FullscreenTemplate/` — minimal chrome for Reel; slim back link, no footer.
- `src/components/templates/index.ts` — barrel.
- `src/components/pages/HomePage/`, `ReelPage/`, `VideosPage/`, `ImagesPage/`, `InteractivePage/`, `AboutPage/`, `ContactPage/`, `CVPage/` (folder + barrel each).
- `src/components/pages/index.ts` — barrel.
- `src/router/index.tsx` — `createBrowserRouter` tree (spec §4): root `PageTemplate` layout → children for `/`, `/reel` (FullscreenTemplate), `/about`, `/contact`, `/resume`, and a `/work` layout route using `WorkTemplate` with children `videos`/`images`/`interactive`; `*` → NotFound. Default `/work` index → redirect to `videos`.
- `src/App.tsx` — if still referenced by template, otherwise router lives in `main.tsx`; remove Vite boilerplate (`App.css`, logos, default counter).

**Implementation notes:**

- Page transitions: wrap each page's root in a Framer Motion element (fade + ~16px vertical slide, `--ease-out`, `--dur-med`); `AnimatePresence mode="wait"` keyed on `location.pathname` in PageTemplate. Respect reduced motion.
- Reel uses `FullscreenTemplate` (sits OUTSIDE PageTemplate's chrome) — structure the router so `/reel` is a sibling layout, or render FullscreenTemplate within and hide Navbar/Footer; recommend a separate top-level layout branch for fullscreen routes.
- Each page composes its organisms; pages hold NO business logic beyond passing data.
- Set a per-page `<h1>` and document title (update `document.title` in a tiny effect or a `usePageTitle` hook — optional).
- Delete all Vite starter scaffolding (`src/App.css`, `src/assets/react.svg`, default `App.tsx` content).

**Acceptance criteria:**

- All 8 routes + 404 navigate correctly; navbar links and Work dropdown route properly; `/work` redirects to `/work/videos`.
- Page transitions animate; work tabs persist across `/work/*` and highlight active.
- VideosPage shows all 10 lazy videos; ImagesPage shows 5 placeholders; InteractivePage shows Stornaway embed; ReelPage shows reel + fallback link; AboutPage/ContactPage/CVPage render.
- typecheck + build green.

---

## Phase 7 — Animations, Responsive & Polish

**Goal:** Production-feel motion, full responsiveness, accessibility, and the constraint-handling fallbacks proven.

**Files to modify:** organisms, molecules, pages, `globals.css`, hooks as needed. No new architecture.

**Implementation notes:**

- **Motion pass:** scroll-reveal (`whileInView`, once) on section headers, grids (stagger children), hero entrance; hover polish on cards/buttons/links; navbar blur transition. All gated by `useReducedMotion`.
- **Responsive pass:** verify mobile-first at ~375px, ~768px, ~1280px. Grids reflow (VideoGrid 1→2→2/3 cols; ImageGallery similar). Navbar collapses to hamburger below `md`. Typography scales (display sizes shrink on mobile).
- **Constraint fallbacks (prove them):**
  - Adobe CCV reel + video #2: confirm external fallback link renders and is clickable even if the iframe is blank/blocked.
  - Images/resume placeholders render cleanly (no broken images); document the swap path.
  - 10 iframes stay unmounted until activated (verify in Network tab).
  - Avatar CDN failure → Image placeholder (test by temporarily breaking the URL).
- **SEO/meta:** `index.html` description; per-page titles; `og:title`/`og:description`/`og:image` (use avatar) — optional but encouraged.
- **`public/` scaffolding for Basma:** create `public/images/.gitkeep` and `public/resume/.gitkeep`, and a short `public/README.md` listing the exact files she must drop in: `images/work-1..5.jpg`, `images/resume-1.jpg`, `images/resume-2.jpg`, `images/avatar-1.png`, `images/avatar-2.png` (if hotlinking fails), `resume/basma-gado-resume.pdf`. When real files land, flip `placeholder:false` in `images.ts` and update avatar/resume `src`s.

**Acceptance criteria:**

- No layout breakage at 375/768/1280px; no horizontal scroll.
- Reduced-motion users get static/opacity-only transitions.
- All five constraints (spec §15) demonstrably handled.
- Keyboard navigation reaches all interactive elements with visible accent focus rings.
- typecheck + build green.

---

## Phase 8 — Final QA & Handoff

**Goal:** Green build, clean console, documented handoff.

**Tasks:**

- `npm run build` + `npm run preview` — click through every route; zero console errors/warnings.
- Remove all scratch/test routes and dead code; ensure no `console.log` left.
- Confirm Atomic boundaries hold (grep for cross-layer imports: atoms importing molecules, etc.).
- Confirm every embed URL matches spec §11 exactly (no typos in IDs).
- Lighthouse (desktop): Performance ≥ 90, Accessibility ≥ 95. Note any gaps.
- Update/confirm `CLAUDE.md` pointer is intact.
- Write `specs/001-basma-portfolio/HANDOFF.md`: what's done, the exact asset list Basma must supply (mirror `public/README.md`), and the two adobe-ccv fallback `// TODO` links that need real Behance/YouTube permalinks.

**Acceptance criteria:**

- Production build serves all routes cleanly.
- Lighthouse targets met (or documented exceptions).
- HANDOFF.md present and accurate.
- typecheck + build + (optional) lint all green.

---

## Dependency Order Summary

```
Phase 0 (scaffold) → 1 (tokens/styles) → 2 (types/data/hooks)
  → 3 (atoms) → 4 (molecules) → 5 (organisms)
  → 6 (templates/pages/router) → 7 (animation/responsive/fallbacks) → 8 (QA)
```

Never build a layer before the layer it depends on exists and typechecks. Look up every shape, URL, and prop in `spec.md` — it is the single source of truth.
