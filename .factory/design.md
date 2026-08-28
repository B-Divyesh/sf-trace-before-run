# Trace Before Run — visual thesis

## Direction

**Surreal editorial scenery: the logic observatory.** Each puzzle is a small night landscape where code becomes a route through impossible architecture. A paper moon, a stair that forks, and glass vessels holding variables turn invisible program state into a place learners can inspect. The scenery is restrained around the real task, so the commit-and-reveal mechanic remains the clearest object on screen.

The visual metaphor fits this product because tracing means holding a changing world in your head. The interface gives that world a desk, a route, and a horizon without pretending to execute arbitrary Python.

## Palette

- `ink #19231E` — primary text; near-black with a botanical cast.
- `paper #F3E9D3` — warm editorial background.
- `paper-high #FFF9EC` — raised writing surfaces.
- `moss #335C4A` — quiet structure and secondary actions.
- `persimmon #C54E32` — the commit action and current-step marker.
- `night #18263D` — code panels and dark-mode canvas.
- `moon #F6C85F` — selected paths and trace emphasis.
- `sage #C9D5B5` — positive feedback.
- `rose #F0B4A5` — errors and correction notes.
- `muted #5E685F` — supporting copy (tested against paper).

Light mode resembles an annotated field journal. Dark mode resembles the same observatory after sunset, using `#101923`, `#18263D`, `#F8EFD9`, and `#F6C85F`. Neither theme depends on color alone: labels, symbols, and borders repeat every state.

## Type

- Display: Georgia, Cambria, `Times New Roman`, serif. Its editorial cadence makes each puzzle feel like a compact story and requires no font download.
- Body and UI: Inter-like system stack (`ui-sans-serif`, `system-ui`, sans-serif). It is plain at small sizes and keeps controls familiar.
- Code: `SFMono-Regular`, Consolas, `Liberation Mono`, monospace. Tabular numerals keep trace values aligned.

No fonts leave the device. Body text starts at 16 px with 1.55 leading; input text is 16 px to prevent mobile zoom.

## Spacing and shape

An 8 px base scale drives gaps: 8, 16, 24, 32, 48, 64, 96. Content is capped at 1180 px and reading text at 68 characters. Panels use clipped, asymmetric corners like paper cutouts; buttons use a shallow arch rather than a generic capsule. One-pixel ink lines and small offset shadows make the workspace feel printed and tactile.

On 390 px screens, the observatory art becomes a short horizon, code precedes predictions, and the branch map turns into a vertical route. Desktop uses a two-column workbench so source and predictions remain visible together.

## Interaction grammar

- The current line carries a numbered moon marker.
- Variable fields read as a ledger, with one row per name.
- Branch choices are a route map. Arrow keys move among choices; Space or Enter selects one.
- `Commit my trace` locks the prediction before any result appears.
- Reveal compares each answer, explains the first divergence, and then offers the next puzzle.
- Editing the restricted snippet resets an uncommitted trace and validates only supported syntax. The product never evaluates arbitrary code.

## Motion policy

The signature motion is a 220 ms “moon crossing”: on reveal, the current-line disc translates along the chosen branch and settles beside the result. Panel changes use opacity and an 8 px vertical translation. Nothing loops. With `prefers-reduced-motion: reduce`, transforms and smooth scrolling are disabled; state changes remain visible through labels, borders, and contrast.

## Asset plan and prompt sheet

The landing hero uses one original raster illustration. It carries atmosphere only; all essential words remain HTML. Product route diagrams and icons are hand-authored SVG/CSS because they need crisp, deterministic states.

### Hero prompt

- Use case: `stylized-concept`
- Asset type: wide landing-page hero illustration and social crop source
- Scene/backdrop: a surreal nighttime observatory made from folded paper on a cream editorial page
- Subject: a tiny empty writing desk facing a branching staircase; three glass vessels hold glowing geometric tokens; a large paper moon hangs low
- Style/medium: sophisticated cut-paper editorial illustration, tactile fibers, subtle screenprint grain, clean silhouettes
- Composition/framing: landscape 3:2, scene weighted toward the right, generous calm negative space, layered foreground and horizon
- Lighting/mood: moonlit, contemplative, curious rather than magical or childish
- Color palette: warm cream, ink green, deep navy, persimmon, muted gold, pale sage
- Materials/textures: deckled paper, matte ink, translucent glass, sparse pencil registration marks
- Constraints: no people, no code, no interface mockup, no readable text, no logos, no watermark
- Avoid: neon gradients, generic tech imagery, photorealism, fantasy characters, busy stars, illegible lettering, hands, brand symbols

### Provenance

The final asset was generated for this product with the factory image model (`factory-image`) on 2026-08-28 using the prompt above. Source candidates and prompt metadata live in `assets/src/`. Production WebP/AVIF derivatives were created locally. Generated imagery is original for this product and contains no third-party marks.

## Accessibility and performance intent

All text pairs target WCAG AA contrast of at least 4.5:1. Focus uses a 3 px moon-colored ring plus ink outline. Targets are at least 44 px. The hero reserves its aspect ratio, ships below 300 KB in responsive WebP/AVIF variants, and is the only high-priority image. First-load code stays framework-free and below 200 KB.
