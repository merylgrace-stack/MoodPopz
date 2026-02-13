# One Small Breath

A gentle micro-therapy web app. Feeling off? Spin for one small thing. Designed to feel like a warm hug—calming, human, and emotionally supportive.

## Features

- **Mood selection** — Tired, Bored, Overthinking, Stressed, Unmotivated, Other
- **Spin wheel** — Randomly picks one tiny task (400px wheel, 4s spin)
- **Overthinking dump** — Fullscreen textarea, nothing saved, breathing dot animation
- **Feedback** — Emoji ratings, optional reflection
- **Streak ring** — Consecutive days, gentle progress visualization
- **Settings** — Ambient music (Howler.js, off by default), Reduced Motion note, Fresh Start
- **Accessibility** — WCAG 2.2 AA, skip link, ARIA, `prefers-reduced-motion`

## Design

- Lavender-to-sage gradient, pastel accents
- Whispering waves (subtle CSS sine-wave background)
- Glassmorphism, 32px rounded corners, soft shadows
- Poppins + Inter typography

See `DESIGN_RATIONALE.md` for emotional and UX rationale.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
