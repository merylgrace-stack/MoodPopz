# One Small Thing — Vanilla Version

Standalone HTML/CSS/JavaScript implementation. No build step required.

## Run

Open `index.html` in a browser. For local development with correct MIME types:

```bash
# From project root
npx serve vanilla
# or
python -m http.server 8080 --directory vanilla
```

Then visit `http://localhost:3000` (or 8080).

## Features

1. **Spin wheel** — Inside each mood; spins and picks one task
2. **Tiny tasks** — Displayed after wheel stops
3. **Overthinking dump box** — For Overthinking and Other moods; nothing saved
4. **Random supportive quote** — After each task
5. **Task streaks** — localStorage; shown in header
6. **Feedback** — Emoji ratings, saved locally
7. **Frequency wave background** — Subtle animation
8. **Pop-up transitions** — Fade-in, scale-up, bounce
9. **Hover effects** — Buttons and wheel
10. **Responsive** — Mobile-first, 320px+
