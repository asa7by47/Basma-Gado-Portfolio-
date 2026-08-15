# Spec — Basma Gado Creative Portfolio

> Feature ID: `001-basma-portfolio`
> Status: Ready for implementation
> Audience: Claude Opus 4.7 (implementer)
> This document is the **contract**. The plan (`plan.md`) is the **build order**. Where they overlap, this spec wins on data shapes, prop contracts, content, and routes.

---

## 1. Summary

A single-page-app creative portfolio for **Basma Gado**, a Cinema & Media Arts graduate (BFA, York University) working across Toronto, Cairo, and Jeddah. Specialties: 3D animation, virtual production, video/audio editing, motion capture, and interactive media.

The site is built with **React + Vite + TypeScript**, organized under a strict **Atomic Design System**, routed with **React Router v6**, animated with **Framer Motion**, and styled with **Tailwind CSS v3** (no third-party UI component library — all components are custom atoms/molecules/organisms).

Aesthetic: modern, editorial, feminine-coded. Dark moody palette, soft dusty-rose/cream accents, Playfair Display for display type and DM Sans for body.

---

## 2. Tech Stack (fixed)

| Concern         | Choice                                   |
| --------------- | ---------------------------------------- |
| Build tool      | Vite (React + TypeScript template)       |
| Language        | TypeScript (strict)                      |
| UI library      | React 18                                 |
| Routing         | React Router v6 (`createBrowserRouter`)  |
| Animation       | Framer Motion                            |
| Styling         | Tailwind CSS v3 + CSS custom properties  |
| Component model | Atomic Design (atoms → … → pages)        |
| Fonts           | Google Fonts (Playfair Display, DM Sans) |
| UI kit          | NONE — custom components only            |

---

## 3. Directory Structure (authoritative)

```
src/
  components/
    atoms/
      Button/
      Text/
      Icon/
      Tag/
      VideoEmbed/
      Image/
      Link/
      Divider/
    molecules/
      NavItem/
      VideoCard/
      ImageCard/
      ProjectCard/
      SocialLink/
      SectionHeader/
      SkillBadge/
    organisms/
      Navbar/
      Hero/
      VideoGrid/
      ImageGallery/
      InteractiveProject/
      ReelPlayer/
      AboutSection/
      ContactSection/
      Footer/
    templates/
      PageTemplate/
      WorkTemplate/
      FullscreenTemplate/
    pages/
      HomePage/
      ReelPage/
      VideosPage/
      ImagesPage/
      InteractivePage/
      AboutPage/
      ContactPage/
      CVPage/
  data/
    videos.ts
    images.ts
    interactive.ts
    about.ts
    navigation.ts
  hooks/
  styles/
  types/
  router/
  App.tsx
  main.tsx
```

**Component folder convention:** every component folder contains:

- `ComponentName.tsx` — the component
- `index.ts` — re-export (`export { ComponentName } from './ComponentName'`)

Optional per-component `ComponentName.types.ts` only when the prop interface is large enough to be reused; otherwise declare props inline in the `.tsx`. Shared/cross-component interfaces live in `src/types/`.

---

## 4. Routes

Router type: `createBrowserRouter` with a single root layout route (`PageTemplate` providing Navbar + Footer + `<Outlet/>`). Fullscreen pages (Reel, Interactive) may opt out of the standard chrome via `FullscreenTemplate`.

| Path           | Page              | Template            | Renders                                                                              |
| -------------- | ----------------- | ------------------- | ------------------------------------------------------------------------------------ |
| `/`            | `HomePage`        | `PageTemplate`      | Hero (reel CTA / muted bg), short About teaser, featured work strip, contact CTA      |
| `/reel`        | `ReelPage`        | `FullscreenTemplate`| `ReelPlayer` (Adobe CCV embed) + music credit                                        |
| `/work/videos` | `VideosPage`      | `WorkTemplate`      | `VideoGrid` of all 10 videos                                                          |
| `/work/images` | `ImagesPage`      | `WorkTemplate`      | `ImageGallery` of 5 image pieces (placeholder-aware)                                  |
| `/work/interactive` | `InteractivePage` | `WorkTemplate` | `InteractiveProject` — "Writing Home" Stornaway embed                                 |
| `/about`       | `AboutPage`       | `PageTemplate`      | `AboutSection` (bio, skills, socials, avatar)                                         |
| `/contact`     | `ContactPage`     | `PageTemplate`      | `ContactSection` (email + socials, optional non-functional form)                     |
| `/resume`      | `CVPage`          | `PageTemplate`      | Resume image viewer + download-PDF button (placeholder-aware)                        |
| `*`            | `NotFound` (inline in router or a minimal page) | `PageTemplate` | 404 with link home                                          |

Navigation order in the navbar (from `navigation.ts`): **Resume, Reel, Work (dropdown: Videos / Images / Interactive), About Me, Contact**. The Home route (`/`) is reachable via the logo/wordmark.

Each route's page component must be wrapped in a Framer Motion page-transition (fade + subtle vertical slide). Use `AnimatePresence` keyed on `location.pathname` at the layout level.

---

## 5. Design Tokens

### 5.1 Color (CSS custom properties — define in `src/styles/globals.css` under `:root`)

```css
--color-bg:            #0D0D0D; /* page background, near-black */
--color-surface:       #1A1A1A; /* cards, raised surfaces */
--color-surface-alt:   #222222; /* hover surface / secondary panels */
--color-accent:        #C9A0A0; /* dusty rose / muted mauve — primary accent */
--color-accent-strong: #D8B4B4; /* lighter rose for hover/active */
--color-cream:         #F0EAD6; /* warm cream — secondary accent */
--color-text:          #F5F5F0; /* primary text, off-white */
--color-text-muted:    #8A8A85; /* warm gray, secondary text */
--color-border:        #2C2C2C; /* hairline borders / dividers */
--color-overlay:       rgba(13, 13, 13, 0.72); /* media hover overlay */
```

### 5.2 Typography tokens

```css
--font-display: 'Playfair Display', Georgia, serif;
--font-body:    'DM Sans', system-ui, sans-serif;
```

Type scale (use Tailwind utilities mapped to these — see config below):
display-xl 4.5rem · display-lg 3.5rem · display-md 2.5rem · heading 1.75rem · subheading 1.25rem · body 1rem · small 0.875rem · caption 0.75rem. Line heights: display tight (1.05–1.15), body relaxed (1.6).

### 5.3 Spacing / radius / motion tokens

```css
--radius-sm: 4px;  --radius-md: 10px;  --radius-lg: 18px;
--shadow-soft: 0 10px 40px rgba(0,0,0,0.45);
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--dur-fast: 0.25s; --dur-med: 0.5s; --dur-slow: 0.8s;
```

### 5.4 Tailwind config extensions (`tailwind.config.js` → `theme.extend`)

Map every token above into Tailwind so components use utility classes, not inline styles:

- `colors`: `bg`, `surface`, `surfaceAlt`, `accent`, `accentStrong`, `cream`, `text`, `textMuted`, `border`, each pointing at the corresponding CSS var via `var(--color-…)`.
- `fontFamily`: `display: ['var(--font-display)']`, `body: ['var(--font-body)']`.
- `fontSize`: `display-xl`, `display-lg`, `display-md`, `heading`, `subheading`, `body`, `small`, `caption` with the rem values + line heights above.
- `borderRadius`: `sm/md/lg` → the radius vars.
- `boxShadow`: `soft` → `--shadow-soft`.
- `transitionTimingFunction`: `out-soft` → `--ease-out`.
- `maxWidth`: `content: '1200px'`, `prose: '70ch'`.

Tailwind `content` glob: `./index.html`, `./src/**/*.{ts,tsx}`. `darkMode` is irrelevant (site is dark by default) — do not toggle.

---

## 6. TypeScript Interfaces (`src/types/index.ts`)

These are the authoritative data contracts. Implementer must not deviate from field names.

```ts
export type MediaSource = 'youtube' | 'adobe-ccv' | 'stornaway' | 'image';

export interface VideoItem {
  id: string;                 // stable slug, e.g. 'community-documentary'
  title: string;              // short display title
  description: string;        // one-line caption shown under the card
  embedUrl: string;           // iframe src
  source: MediaSource;        // 'youtube' | 'adobe-ccv'
  youtubeId?: string;         // present when source === 'youtube' — for thumbnail + fallback link
  thumbnailUrl?: string;      // explicit override; if absent and youtubeId present, derive from youtubeId
  fallbackUrl?: string;       // external watch link used when embed is blocked (esp. adobe-ccv)
  aspectRatio?: '16:9' | '9:16' | '1:1'; // defaults to '16:9'
}

export interface ImageItem {
  id: string;
  title: string;              // short title; may be derived from description
  description: string;        // full caption
  src: string;                // path under /public/images/... OR remote CDN URL
  placeholder: boolean;       // true while no real asset is available — render placeholder treatment
  alt: string;                // accessibility text
  width?: number;             // intrinsic px (for aspect-ratio box), optional
  height?: number;
}

export interface InteractiveProject {
  id: string;
  title: string;
  description: string;
  embedUrl: string;           // Stornaway player URL
  source: MediaSource;        // 'stornaway'
  aspectRatio?: '16:9' | '9:16' | '1:1';
}

export interface SocialLink {
  id: string;
  label: string;              // 'LinkedIn' | 'Instagram' | 'YouTube'
  href: string;
  icon: IconName;             // see Icon atom
}

export interface NavItem {
  id: string;
  label: string;
  to?: string;                // route path; absent when children present
  children?: NavItem[];       // dropdown items (Work)
  external?: boolean;         // true for off-site links (none currently)
}

export interface Skill {
  id: string;
  label: string;              // 'Blender', 'Unreal Engine', etc.
}

export interface AboutContent {
  name: string;
  title: string;              // 'Cinema & Media Arts'
  locations: string[];        // ['Toronto', 'Cairo', 'Jeddah']
  bio: string;                // full paragraph
  skills: Skill[];
  socials: SocialLink[];
  avatarPrimary: string;      // URL
  avatarSecondary: string;    // URL
}

export interface ReelContent {
  embedUrl: string;
  fallbackUrl?: string;
  musicCredit: string;        // 'Ike\'s Mood I — Visioneers'
}
```

`IconName` is a string union owned by the Icon atom (Section 7.3).

---

## 7. Atom Prop Contracts

All atoms accept `className?: string` (merged last so callers can extend) and forward refs where it aids composition. Use a `cn()` class-merge helper in `src/hooks` or `src/styles` (a tiny clsx-style join — implement locally, do not add a dependency unless the plan's shell commands include `clsx`).

### 7.1 Button (`atoms/Button`)

```
props:
  variant?: 'primary' | 'secondary' | 'ghost' | 'link'   // default 'primary'
  size?: 'sm' | 'md' | 'lg'                               // default 'md'
  as?: 'button' | 'a'                                     // default 'button'
  href?: string                                           // required when as==='a'
  type?: 'button' | 'submit'                              // default 'button'
  disabled?: boolean
  onClick?: (e) => void
  iconLeft?: IconName
  iconRight?: IconName
  children: ReactNode
```

primary = accent fill on bg with text-bg; secondary = surface fill + border; ghost = transparent + hover surface; link = inline underline-on-hover accent. Rounded `md`, transition on `--ease-out`. Framer Motion `whileHover`/`whileTap` micro-scale (1.03 / 0.97).

### 7.2 Text (`atoms/Text`)

```
props:
  as?: keyof JSX.IntrinsicElements                        // default 'p'
  variant?: 'display-xl'|'display-lg'|'display-md'|'heading'|'subheading'|'body'|'small'|'caption'  // default 'body'
  font?: 'display' | 'body'                               // default inferred: display* variants -> display, else body
  color?: 'text' | 'muted' | 'accent' | 'cream'          // default 'text'
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right'
  children: ReactNode
```

Maps variant → Tailwind fontSize token; maps color → token color class.

### 7.3 Icon (`atoms/Icon`)

```
props:
  name: IconName
  size?: number          // px, default 20
  className?: string
```

`IconName = 'linkedin' | 'instagram' | 'youtube' | 'arrow-right' | 'arrow-up-right' | 'play' | 'menu' | 'close' | 'chevron-down' | 'download' | 'external'`.
Implement as inline SVG paths in a single map (no icon library). `currentColor` for fill/stroke so color is controlled by parent text color.

### 7.4 Tag (`atoms/Tag`)

```
props:
  children: ReactNode
  tone?: 'accent' | 'neutral'   // default 'neutral'
```

Small pill: surface bg, border, caption text, rounded-full. Used for media-type labels ("360 camera", "Unreal Engine").

### 7.5 VideoEmbed (`atoms/VideoEmbed`)

The core lazy-iframe atom.

```
props:
  src: string
  title: string
  source: MediaSource           // controls fallback behavior
  aspectRatio?: '16:9' | '9:16' | '1:1'   // default '16:9'
  fallbackUrl?: string
  poster?: string               // thumbnail shown before activation
  eager?: boolean               // skip lazy gate (used on Reel/Interactive single embeds)
```

Behavior:

- Renders an aspect-ratio box (use Tailwind `aspect-video` for 16:9, or padding-top trick / `aspect-[9/16]` etc).
- **Lazy:** until the box is within ~200px of viewport (IntersectionObserver via `useLazyLoad` hook) AND/OR the user clicks the poster, the iframe is NOT mounted — show `poster` (or a generated YouTube thumbnail) with a play button overlay. Only mount the `<iframe>` after activation. This keeps 10 iframes off the initial DOM.
- `iframe` attrs: `loading="lazy"`, `allow="autoplay; fullscreen; picture-in-picture; encrypted-media"`, `allowFullScreen`, `referrerPolicy="strict-origin-when-cross-origin"`.
- **Adobe-CCV fallback:** `source === 'adobe-ccv'` may be blocked cross-origin. Attempt the iframe, but always render a visible "Open in new tab ↗" link to `fallbackUrl` beneath it. If `fallbackUrl` is absent for an adobe-ccv item, render the poster + external link only (do not attempt the iframe).

### 7.6 Image (`atoms/Image`)

```
props:
  src: string
  alt: string
  placeholder?: boolean        // render placeholder skeleton/treatment instead of <img>
  aspectRatio?: string         // e.g. '4/3', '1/1', '16/9'
  className?: string
  loading?: 'lazy' | 'eager'   // default 'lazy'
```

Native `loading="lazy"` + `decoding="async"`. While loading, show a shimmering surface block. On error, fall back to placeholder treatment. When `placeholder` is true, render a labeled placeholder card (accent border, "Image coming soon" caption) — never a broken `<img>`.

### 7.7 Link (`atoms/Link`)

```
props:
  to?: string          // internal route -> renders react-router <Link>
  href?: string        // external -> renders <a target=_blank rel=noreferrer>
  external?: boolean
  underline?: 'always' | 'hover' | 'none'   // default 'hover'
  children: ReactNode
```

Internal links use `react-router-dom` `Link`; external use anchor with `rel="noreferrer noopener"`.

### 7.8 Divider (`atoms/Divider`)

```
props:
  orientation?: 'horizontal' | 'vertical'   // default 'horizontal'
  spacing?: 'sm' | 'md' | 'lg'
```

1px `--color-border` rule; optional accent variant later.

---

## 8. Molecule Prop Contracts

### 8.1 NavItem (`molecules/NavItem`)

```
props:
  item: NavItem            // from types
  onNavigate?: () => void  // closes mobile menu
```

If `item.children`, render a label + chevron that opens a dropdown (Framer Motion height/opacity) listing child `NavItem`s. Active route styling via `NavLink` isActive (accent underline). Used inside Navbar.

### 8.2 VideoCard (`molecules/VideoCard`)

```
props:
  video: VideoItem
  priority?: boolean   // first row eager
```

Composes `VideoEmbed` (poster mode) + a caption block (`Text` title + description, optional `Tag`s parsed from description keywords — optional, not required). Hover: subtle scale (1.02) on the media + overlay revealing the title. Card sits on `surface`, rounded `lg`, `shadow-soft`.

### 8.3 ImageCard (`molecules/ImageCard`)

```
props:
  image: ImageItem
  onClick?: (image: ImageItem) => void   // open lightbox (optional enhancement)
```

Composes `Image` + caption. Hover overlay with title (mirrors VideoCard). Respects `image.placeholder`.

### 8.4 ProjectCard (`molecules/ProjectCard`)

```
props:
  title: string
  description: string
  to: string
  media?: ReactNode      // optional embed/image preview
```

Generic clickable card used on HomePage featured-work strip and elsewhere. Whole card is a `Link` to `to`.

### 8.5 SocialLink (`molecules/SocialLink`)

```
props:
  social: SocialLink     // from types
  showLabel?: boolean    // default true
```

Icon + label, external link, hover accent.

### 8.6 SectionHeader (`molecules/SectionHeader`)

```
props:
  eyebrow?: string       // small uppercase label, accent
  title: string          // display font
  description?: string
  align?: 'left' | 'center'   // default 'left'
```

Used at the top of every organism section. Animated reveal (stagger eyebrow → title → description) via Framer Motion when scrolled into view (`whileInView`, `viewport={{ once: true }}`).

### 8.7 SkillBadge (`molecules/SkillBadge`)

```
props:
  skill: Skill
```

Pill with skill label; subtle hover lift. Grid of these in AboutSection.

---

## 9. Organism Responsibilities

| Organism            | Renders / behavior |
| ------------------- | ------------------ |
| `Navbar`            | Sticky/pinned top bar. Left: wordmark "Basma Gado" (Playfair) linking `/`. Right: desktop nav from `navigation.ts` (NavItem list, Work dropdown). Mobile: hamburger (`Icon menu`) → full-screen overlay menu (Framer Motion). Shrinks/adds bg blur on scroll (`useScrollPosition`). |
| `Hero`              | HomePage hero. Large Playfair headline ("Basma Gado" + tagline "Cinema & Media Arts — 3D, Virtual Production, Interactive"), subtext, primary CTA "Watch the Reel" → `/reel`, secondary "View Work" → `/work/videos`. Optional muted autoplay background (Reel poster image or looping; if no asset, use an animated gradient/grain). Locations line: "Toronto · Cairo · Jeddah". |
| `VideoGrid`         | Responsive grid (1 col mobile, 2 col tablet, 2–3 col desktop) of `VideoCard`s. First 2 cards `priority`. Source: `videos.ts`. Stagger-in on scroll. |
| `ImageGallery`      | Masonry-ish/responsive grid of `ImageCard`s from `images.ts`. Placeholder-aware. Optional lightbox. |
| `InteractiveProject`| Full-width embed (Stornaway) + `SectionHeader` ("Writing Home") + description prose. |
| `ReelPlayer`        | Centered large embed (Adobe CCV) with `eager` mount, music credit caption, "Open on Behance ↗" fallback link. |
| `AboutSection`      | Two-column on desktop: avatar (`avatarPrimary`) + bio prose, locations, `SkillBadge` grid, `SocialLink` row. Content from `about.ts`. |
| `ContactSection`    | Headline + email mailto button + `SocialLink` row. Optional non-submitting form (name/email/message) marked clearly as a visual placeholder (or omit form and just show contact methods — implementer's choice, default: methods only with a friendly CTA). |
| `Footer`            | Wordmark, nav mini-links, socials, copyright "© 2026 Basma Gado", "Music: Ike's Mood I — Visioneers" credit where relevant, back-to-top. |

---

## 10. Template Responsibilities

- **PageTemplate** — renders `Navbar`, a `<main>` with the `AnimatePresence` page-transition wrapper around `<Outlet/>`, and `Footer`. Standard max-width content container (`max-w-content`, horizontal padding responsive).
- **WorkTemplate** — extends PageTemplate's shell but adds a work sub-navigation (Videos / Images / Interactive tabs) and a page `SectionHeader`. Receives `eyebrow`, `title`, `description`, and `children`. Highlights the active work tab.
- **FullscreenTemplate** — minimal chrome: a slim back link (`← Back`) to `/` or previous, no footer, content centered for immersive embeds (Reel). Still includes a minimal way to reach the Navbar/home.

Templates accept `children` and/or use `<Outlet/>` per their placement in the router tree. PageTemplate is the root layout (`<Outlet/>`); WorkTemplate/FullscreenTemplate are used by their respective pages as wrappers OR as nested layout routes — implementer should use nested layout routes for WorkTemplate so the work tabs persist across `/work/*`.

---

## 11. Data Content (hardcoded — `src/data/*.ts`)

> All URLs below are verbatim from the existing portfolio. Implementer must transcribe them exactly.

### 11.1 `navigation.ts` → `export const navigation: NavItem[]`

```
[
  { id: 'resume',  label: 'Resume',   to: '/resume' },
  { id: 'reel',    label: 'Reel',     to: '/reel' },
  { id: 'work',    label: 'Work',     children: [
      { id: 'videos',      label: 'Videos',      to: '/work/videos' },
      { id: 'images',      label: 'Images',      to: '/work/images' },
      { id: 'interactive', label: 'Interactive', to: '/work/interactive' },
  ]},
  { id: 'about',   label: 'About Me', to: '/about' },
  { id: 'contact', label: 'Contact',  to: '/contact' },
]
```

### 11.2 `about.ts` → `export const about: AboutContent` (+ `export const reel: ReelContent`)

- name: `Basma Gado`
- title: `Cinema & Media Arts`
- locations: `['Toronto', 'Cairo', 'Jeddah']`
- bio: `Basma Gado holds a Bachelor of Fine Arts in Cinema & Media Arts from York University and is based between Toronto, Cairo, and Jeddah. Her work spans storytelling, 3D animation, virtual production, video/audio editing, and media creation. Driven by a passion for visual narratives, she has hands-on experience with Blender, Unreal Engine, DaVinci Resolve, Photoshop, Procreate, and Audacity. She is eager to apply her academic knowledge in real-world settings through engaging, collaborative projects.`
- skills (id = kebab of label): `Blender`, `Unreal Engine`, `DaVinci Resolve`, `Photoshop`, `Procreate`, `Audacity`, `Motion Capture`, `Virtual Production`, `3D Animation`
- socials:
  - LinkedIn → `http://www.linkedin.com/in/basma-gado-62605a233` (icon `linkedin`)
  - Instagram → `https://www.instagram.com/basmag.png/` (icon `instagram`)
  - YouTube → `https://www.youtube.com/@basmagado1` (icon `youtube`)
- avatarPrimary: `https://cdn.myportfolio.com/874da7b8-88cb-4374-8dab-0ca24a75e28c/7b97431d-0a76-4e80-8261-7344da26f10c_rwc_0x0x500x500x4096.png?h=52a21a5e42f5f73270aabfca99ecb16e`
- avatarSecondary: `https://cdn.myportfolio.com/874da7b8-88cb-4374-8dab-0ca24a75e28c/a33853eb-34fc-40c7-8860-513a685a87fe_rwc_0x0x500x500x4096.png?h=6adb21177a51300951b1cc071eefe553`

`reel`:
- embedUrl: `https://www-ccv.adobe.io/v1/player/ccv/RyXTrCIhcN9/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View`
- musicCredit: `Ike's Mood I — Visioneers`
- fallbackUrl: leave as `undefined` with a `// TODO: Basma to supply Behance/YouTube reel link` comment (no public fallback URL was provided).

> Note: the two avatar URLs are Adobe `cdn.myportfolio.com` assets and may hotlink-restrict. Use them as the `src`, but the `Image` atom must degrade gracefully (placeholder) on error. Document in plan that Basma should drop local copies into `public/images/avatar-1.png` / `avatar-2.png` and switch the constants if hotlinking fails.

### 11.3 `videos.ts` → `export const videos: VideoItem[]`

Transcribe all 10. `source: 'youtube'` for YouTube embeds (extract `youtubeId`), `source: 'adobe-ccv'` for the Adobe one.

| # | id | title | description | embedUrl | source | youtubeId / fallback |
|---|----|-------|-------------|----------|--------|----------------------|
| 1 | `community-documentary` | Community Documentary | 360 camera exhibit | `https://www.youtube.com/embed/cfMIfu2KUjE?si=1VdmjuS1mOB5LK6u` | youtube | `cfMIfu2KUjE` |
| 2 | `copper-fish-parallax` | Copper Fish Pendant | After Effects parallax effect — copper fish pendant | `https://www-ccv.adobe.io/v1/player/ccv/MWwhRhgpJZ4/embed` | adobe-ccv | fallbackUrl `https://www.behance.net/` placeholder — add `// TODO: confirm Behance permalink` |
| 3 | `multichannel-mocap` | Multichannel Mocap | Multichannel video & audio — Mocap, Metahumans, Unreal Engine | `https://www.youtube.com/embed/L-b2Mjx2r00?si=KqwHhG0UgWVv9tyO` | youtube | `L-b2Mjx2r00` |
| 4 | `perception-neuron-mocap` | Mocap Performance | Mocap performance in Unreal Engine using Perception Neuron and Live Link Face | `https://www.youtube.com/embed/OULvHxN37FI?si=OBySmXtyEwqDrDU1` | youtube | `OULvHxN37FI` |
| 5 | `virtual-production-cinespace` | Virtual Production | Shot in Cinespace Studios, Toronto | `https://www.youtube.com/embed/QSEIJh9z2ic?si=A0wubo-Yxm7oCLkS` | youtube | `QSEIJh9z2ic` |
| 6 | `metahuman-dance` | Metahuman Dance | Metahuman dance animation — Unreal Engine | `https://www.youtube.com/embed/dR-cJ0TT9ls?si=2QZESMkekwQZGE_Z` | youtube | `dR-cJ0TT9ls` |
| 7 | `previs-metahumans` | Pre-visualization | Pre-visualization in Unreal Engine using Metahumans and Face Live Link | `https://www.youtube.com/embed/sgVprK54XYQ?si=ymMfUmMxkvRON5Ti` | youtube | `sgVprK54XYQ` |
| 8 | `music-video-photogrammetry` | Music Video | Made in Blender using Photogrammetry and Mixamo | `https://www.youtube.com/embed/_rMro_11S-U?si=ViVlRQL19Q7R7LjI` | youtube | `_rMro_11S-U` |
| 9 | `dome-presentation-360` | Dome Presentation | 360 camera view of dome presentation — MV made in Blender and Unreal | `https://www.youtube.com/embed/NJ__vWXrw4g?si=63S40IvahOLVyb8k` | youtube | `NJ__vWXrw4g` |
| 10 | `mv-rendered-view` | MV Rendered View | Rendered view of the MV made in Blender and Unreal | `https://www.youtube.com/embed/EzaQpzzWMCI?si=gMF8ZwYnp3meyhGc` | youtube | `EzaQpzzWMCI` |

YouTube thumbnail derivation when no `thumbnailUrl`: `https://img.youtube.com/vi/{youtubeId}/maxresdefault.jpg` (fall back in the Image atom to `hqdefault.jpg` on error). For the adobe-ccv item (no thumbnail), use a styled placeholder poster with the title.

### 11.4 `images.ts` → `export const images: ImageItem[]`

All five are `placeholder: true` until Basma supplies files. Set `src` to the intended local path `('/images/work-1.jpg' … '/images/work-5.jpg')` so swapping later is just dropping files into `public/images/` and flipping `placeholder` to `false`.

| id | title | description |
|----|-------|-------------|
| `inflated-3d-text` | Inflated 3D Text | Inflated 3D text created in Blender, featuring color changes and dynamic lighting to explore soft shading, materials, and surface highlights. |
| `street-photography-collage` | Street Photography Collage | Street photography collage created using Adobe Photoshop. |
| `mixed-media-equirectangular` | Mixed-Media Composition | Mixed-media composition created in Blender, combining 3D assets, a 2D image, and an HDRI environment. Rendered using an equirectangular camera setup. |
| `fireworks-clown` | Fireworks & Clown | A 3D composition combining fireworks, an animated clown character, and a custom environment built in Unreal Engine. |
| `blender-model` | Blender Model | Modelled and created in Blender. |

`alt` = the description (or a shortened version). `src` = `/images/work-{n}.jpg`, `placeholder: true`.

### 11.5 `interactive.ts` → `export const interactive: InteractiveProject[]`

```
[{
  id: 'writing-home',
  title: 'Writing Home',
  source: 'stornaway',
  embedUrl: 'https://player.stornaway.io/watch/4771b916',
  description: 'An interactive branching narrative created on Stornaway.io, exploring the layered meanings of home. Through a blend of Blender-generated visuals, text, and sound, viewers navigate a fragmented house shaped by memory, longing, displacement, and imagined futures. Each pathway invites reflection on nostalgia, belonging, and the shifting idea of what home can be.',
  aspectRatio: '16:9',
}]
```

---

## 12. Resume / CV Handling

- Resume page (`/resume`, `CVPage`) shows: a `SectionHeader`, a **download button** ("Download Résumé (PDF)") pointing to `/resume/basma-gado-resume.pdf` in `public/`, and an **image viewer** showing the two resume scan pages.
- The original resume image URLs are unknown. Use placeholder `ImageItem`s with `src: '/images/resume-1.jpg'` and `'/images/resume-2.jpg'`, `placeholder: true`.
- The PDF file does not exist yet. The download button should still render; until the file is present it links to the path (404 acceptable) OR is rendered `disabled` with a tooltip. **Default:** render enabled linking to the path, plus a small note in dev only. Document clearly that **Basma must supply** `public/resume/basma-gado-resume.pdf`, `public/images/resume-1.jpg`, `public/images/resume-2.jpg`.

---

## 13. Hooks (`src/hooks/`)

| Hook | Signature | Purpose |
|------|-----------|---------|
| `useLazyLoad` | `(options?) => { ref, isVisible }` | IntersectionObserver gate (rootMargin ~200px, once) for lazy-mounting embeds/images. |
| `useScrollPosition` | `() => { scrollY, scrolled }` | Drives Navbar shrink/blur (`scrolled` true past ~40px). |
| `useMediaQuery` | `(query: string) => boolean` | Responsive logic (e.g. desktop nav vs mobile menu). |
| `useReducedMotion` | wrap Framer Motion's `useReducedMotion` | Disable/soften animations when user prefers reduced motion. |
| `cn` | `(...classes) => string` | (in hooks or styles) class-merge helper. |

---

## 14. Accessibility & Performance Requirements

- All embeds lazy (Section 7.5). Initial route must not mount 10 iframes.
- All images `loading="lazy"` + `decoding="async"`; placeholder-aware (no broken images).
- All interactive elements keyboard-reachable; visible focus ring using `--color-accent`.
- `prefers-reduced-motion`: animations reduce to opacity-only or none (`useReducedMotion`).
- Color contrast: text/text-muted on bg/surface must meet WCAG AA for body text.
- Semantic landmarks: `<nav>`, `<main>`, `<footer>`; one `<h1>` per page (page title) via `Text as="h1"`.
- Alt text on every image; `title` on every iframe; external links `rel="noreferrer noopener"`.
- Lighthouse target: Performance ≥ 90, Accessibility ≥ 95 on desktop.

---

## 15. Known Constraints (must be designed around)

1. **Resume assets unknown** — placeholder strategy + Basma-supplies note (Section 12).
2. **Image-page assets Adobe-CDN / possibly hotlink-protected** — ship as placeholders pointing at `public/images/work-*.jpg`; Basma drops files in (Section 11.4).
3. **Adobe CCV embeds may block cross-origin** (Reel + video #2) — always render a visible external fallback link; never rely solely on the iframe (Sections 7.5, 11.3, 11.2).
4. **10 video iframes** — mandatory lazy click-to-load (Section 7.5, 13).
5. **Avatar CDN URLs may hotlink-fail** — Image atom degrades to placeholder; local-copy fallback documented (Section 11.2).

---

## 16. Out of Scope

- Backend, CMS, or functional contact form submission (mailto only).
- Auth, analytics, i18n, SSR.
- Tests beyond a typecheck + lint + build green (no unit-test suite required, though a smoke test is welcome).
