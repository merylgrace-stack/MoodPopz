# One Small Breath — Design Rationale

## Emotional & UX Goals

The design aims to feel **instantly safe, calming, and human**—like a warm hug or a gentle deep breath. Every choice supports emotional regulation without feeling clinical or overwhelming.

---

## Color Palette

| Color | Hex | Role |
|-------|-----|------|
| Lavender Blue | `#E8F0FE` | Primary background, evokes calm openness |
| Sage | `#D4E4D3` | Grounding, nature, growth; used for CTAs and accents |
| Beige | `#FFF8E7` | Warmth, softness; drawer/settings |
| Tired Blue | `#A7C7E7` | Mood accent for tired |
| Bored Green | `#B2D8B2` | Mood accent for bored |

**Why:** Pastels reduce visual stress. Lavender–sage gradients feel organic and nurturing. No harsh contrasts—supports a relaxed nervous system.

---

## Typography

- **Poppins (headings):** Rounded, friendly, approachable. Feels human, not corporate.
- **Inter (body):** Clean, highly legible. Supports clarity without distraction.

**Why:** Max 5 lines of text per screen keeps cognitive load low. Large headings (48px) feel affirming rather than demanding.

---

## Effects

- **32px rounded corners:** Soft, non-threatening.
- **Glassmorphism (blur 20px, rgba 0.1):** Light, airy cards; feels like looking through frosted glass—calming, not solid blocks.
- **Soft shadows (0 8px 32px rgba 0.1):** Depth without heaviness.
- **0.4s cubic-bezier transitions:** Smooth, predictable motion.

---

## Frequency Wave Background

Slow sine-wave animations (12s cycles) at 0.1–0.3 opacity evoke breathing or gentle ocean waves.

**Why:** Rhythmic motion at low intensity can support parasympathetic activation. Respects `prefers-reduced-motion` for accessibility.

---

## Spin Wheel

400px, 4s ease-out spin. Pastel segments, one random task selected.

**Why:** Playful, low-stakes. Removes decision fatigue—“the wheel decided.” Feels like a game, not a prescription.

---

## Overthinking Dump Box

Fullscreen, blur backdrop, “Dump thoughts here — nothing saved 💨”. Breathing dot (4s expand/contract) beside textarea.

**Why:** Fullscreen reduces distractions. Explicit “nothing saved” builds trust. Breathing dot offers a subtle cue to breathe. No judgment, no persistence.

---

## Feedback & Hearts

5 emoji reactions (😌👍🙂😐😔) plus “Thanks — you’re doing great.” Hearts fade in.

**Why:** Optional reflection; no pressure. Affirmation supports self-compassion. Saving feedback locally is optional for personal insight.

---

## Streak Ring

Soft circular progress (e.g., 80% fill in sage). “3 gentle days ✨”.

**Why:** Gentle gamification—growth metaphor (plant/tree) without pressure. “Gentle” reframes streaks as self-care, not performance.

---

## Accessibility (WCAG 2.2 AA)

- **4.5:1 contrast** for text on backgrounds
- **`prefers-reduced-motion`** disables animations
- **ARIA labels** on interactive elements
- **Skip link** to main content
- **Keyboard focus** with visible outline
- **Screen-reader friendly** structure

---

## Production Notes

- Music (Howler.js) is **off by default**—user opts in.
- Settings: Music toggle, Reduced Motion note, Fresh Start (clears localStorage).
- Mobile-first (320px+), viewport units for responsiveness.
