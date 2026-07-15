# FORMA — Workout-First Build

A clean Next.js App Router project focused on the complete workout experience.

## Included

- Australian Winter / Water theme
- Your current five-session routine
- Editable workout days, titles, duration, focus and exercises
- Add/remove workouts and exercises
- Start today's scheduled workout or any workout manually
- Set-by-set weight, repetitions and RPE logging
- Previous-weight display and carry-forward
- Add/remove working sets during a session
- 60, 90, 120 and 180-second rest timers
- Live workout completion percentage
- Session notes
- Workout duration and history
- Safe localStorage migration so old/incomplete browser data does not cause a blank screen
- Mobile responsive layout

## Upload to GitHub

This package is intended to replace the current static repository.

1. Download and unzip the package.
2. In GitHub, remove the old root files or create a new repository/branch.
3. Upload **all files and folders inside this package** to the repository root:
   - `app/`
   - `components/`
   - `lib/`
   - `public/`
   - `package.json`
   - `tsconfig.json`
   - `next.config.ts`
   - `next-env.d.ts`
   - `.gitignore`
4. Commit the changes.
5. In Vercel, the Framework Preset should detect **Next.js** automatically.
6. Redeploy.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Data

This alpha stores workout data in the browser on each device. Cloud sync will be added later.
