# Brief lavoro autonomo — auto-20260616-fcd6fe

_Direttiva iniziale: Sviluppa il progetto web statico 'footprint 36': homepage curata sul carbon footprint individuale, calcolatore snello 10-15 domande, una feature carina aggiuntiva, responsive, test locale, critic design e checkpoint commit per feature._

# footprint 36

## Goal
Build a refined static web app about individual carbon footprint with two main surfaces: a clear editorial homepage and a slim calculator.

## Stack
Vite static site, Tailwind via CDN, vanilla JS client-side only. Mobile-first, accessible, local-run friendly.

## Information design
- Homepage explains carbon footprint clearly, avoids doom tone, and introduces renewables with practical framing.
- Calculator compresses the highest-impact lifestyle drivers into 10-15 essential questions.
- Results must show annual estimate in tCO2e, transparent assumptions, comparison vs target 2.5 t, Italy/UE/world references, planet-equivalent metaphor, score band, and personalized advice.

## Questions to prioritize
Transport, home energy, diet, and consumption. Use simplified emission factors with transparent notes and bounded assumptions.

## Extra feature
Implement at least one delightful feature. Preferred: live what-if sliders and a reactive planet visual.

## Quality bar
Responsive, elegant, nature palette, subtle motion, good contrast, smoke-tested locally, code gate green, design critic above threshold.

## Working notes
Project name must appear as footprint 36. Commit and checkpoint feature milestones as work advances.

## Follow-up scope 2026-06-16
- Open the calculator from the homepage inside a centered modal overlay with blurred/dimmed backdrop.
- Modal must support Esc, click-outside close, focus trap, keyboard navigation, and aria attributes.
- Add a country/location question and use transparent grid-intensity defaults per country to refine electricity estimates.
- Cite the source of the country grid-intensity table and state clearly that the output remains an estimate.
- Upgrade yearly car km and public-transport km inputs into accessible wheel/scroll selectors, mobile-friendly and keyboard-friendly.
- Add heating option "Non lo so" with a country/UE average fallback and a visible lower-confidence note.
- Polish design until critic passes threshold, especially hero rhythm, mobile pacing, originality, micro-animations, and visual coherence.
