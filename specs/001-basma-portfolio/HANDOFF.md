# Handoff — Basma Gado Creative Portfolio

The creative portfolio for Basma Gado is now structurally complete and fully functional. All components are built according to the Atomic Design system, and the routing is wired correctly.

## 🚀 Status
- **Build:** Green (tsc + vite)
- **Routes:** 8 routes + 404 fully functional
- **Components:** All atoms, molecules, organisms, and templates implemented
- **Animation:** Framer Motion stagger-reveals and page transitions in place
- **Responsiveness:** Mobile-first design verified

## 📁 Assets Needed (Action Required)
Basma needs to provide the following assets to replace the current placeholders:

### 1. Images (`public/images/`)
Drop these files into the `public/images/` folder:
- `work-1.jpg` ... `work-5.jpg` (Image project pieces)
- `resume-1.jpg`, `resume-2.jpg` (Resume scan pages)
- `avatar-1.png`, `avatar-2.png` (Optional: local copies of Adobe CDN avatars)

### 2. Resume (`public/resume/`)
- `basma-gado-resume.pdf` (The downloadable PDF)

### 3. Data Updates (`src/data/*.ts`)
Once assets are in place, update the following files:
- `src/data/images.ts`: Flip `placeholder: true` to `false` for each item.
- `src/data/about.ts`: Update `reel.fallbackUrl` with a real Behance or YouTube link.
- `src/data/videos.ts`: Confirm the Behance permalink for the "Copper Fish Pendant" video (currently using a placeholder).

## 🛠 Tech Stack
- React 18 + Vite + TypeScript
- Tailwind CSS v3
- Framer Motion (Animations)
- React Router v6

## 📝 Maintenance
- **Adding new videos:** Add a new entry to `src/data/videos.ts`. YouTube thumbnails are derived automatically.
- **Updating bio/skills:** Modify `src/data/about.ts`.
- **Modifying colors:** Edit the CSS variables in `src/styles/globals.css`.

Build Command: `npm run build`
Preview Command: `npm run preview`
