# Divya Reactive Character System (MVP)

## Recommended stack
**React Native + Reanimated (MVP now), Rive (Phase 2).**

Reasoning:
- Fastest to implement with minimal tooling friction
- Excellent runtime performance on low/mid devices
- Easy to evolve into state-machine driven animation later

---

## MVP scope (ship first)
- 5 expressions: `idle`, `focus`, `calm`, `happy`, `celebrate`
- Trigger logic in a single pure function
- Integrated on:
  - Home screen (small widget)
  - Ritual screen (medium widget)
  - Completion screen (celebration)
- Motion: fade + scale + subtle breathing loop

---

## File plan
- `src/mascot/divyaState.ts` — expression resolver
- `src/mascot/divyaMessages.ts` — contextual copy
- `src/mascot/DivyaAvatar.tsx` — animated display component
- `docs/divya-reactive-character-mvp.md` — this implementation guide

---

## Expression assets
Place transparent PNGs in `assets/divya/` using identical canvas size/alignment:

- `divya_idle.png`
- `divya_focus.png`
- `divya_calm.png`
- `divya_happy.png`
- `divya_celebrate.png`

---

## Trigger matrix
| Context | Expression |
|---|---|
| App opened | `idle` |
| Ritual started | `focus` |
| Ritual completed | `celebrate` |
| Low mood / stressed | `calm` |
| Streak milestone (>= 7) | `happy` |
| Default fallback | `idle` |

---

## Performance rules
- Keep each PNG ideally below ~300KB
- Avoid autoplaying expensive effects in lists
- Use native driver/Reanimated for transforms + opacity
- Keep celebratory effects event-based only (completion screen)

---

## Phase 2 (upgrade path)
- Swap PNG animator for Rive state machine
- Add `concerned` and `thinking` states
- Add delayed nudges and notification triggers
- Add adaptive state from mood trend

