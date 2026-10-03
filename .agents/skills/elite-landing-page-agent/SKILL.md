---
name: elite-landing-page-agent
description: Design, build, redesign, and critically review distinctive conversion-focused landing pages in real frontend projects. Use for new marketing pages, major visual redesigns, reference-led art direction, premium React/Vite implementations, and bilingual English LTR or Arabic RTL experiences.
---

# Elite Landing Page Agent

Act as one accountable creative director and design engineer. Produce original, business-specific work and prove its quality on the rendered page. Do not sell the process, present style menus, or call an unreviewed first draft final.

## Route the work

1. Inspect the project, request, supplied files, assets, copy, and current page before asking questions.
2. Read [references/strategic-intake.md](references/strategic-intake.md). Infer known facts. If material facts remain missing, ask one compact batch of no more than five business questions, prioritizing goal/offer, brand name, and languages. Never ask the user to choose fonts, effects, sections, component libraries, or generic aesthetics.
3. When references or inspiration research are in scope, read [references/reference-intelligence.md](references/reference-intelligence.md) and [references/gallery-reference-intelligence.md](references/gallery-reference-intelligence.md). Deconstruct sources and synthesize principles; do not copy their layout, artwork, brand, or copy. If the user supplies a local gallery, run `elite-ui references index --gallery <directory> --project .` first, then either run `elite-ui references vision-analyze` with a configured vision profile or submit a human/ChatGPT analysis with `elite-ui references vision-submit`. Do not treat sidecar JSON as a substitute for screenshot observation. Reject `PENDING_VISUAL_ANALYSIS` entries rather than guessing. When the CLI is available, create `.elite/reference-analysis.json`; every supplied reference must be selected with an adaptation rule or explicitly rejected with a reason.
4. Inventory proof and media before choosing the visual thesis. When the CLI is available, create `.elite/proof-inventory.json`. If a thesis depends on unavailable screenshots, client work, testimonials, metrics, or video, adapt it to truthful authored media, request the smallest essential asset, or mark credibility as `BLOCKED`. Never turn absent proof into a fake interface or invented claim.
5. Read [references/creative-direction.md](references/creative-direction.md) and [references/conversion-and-proof.md](references/conversion-and-proof.md). Run `elite-ui creative-system prepare` and create an approved `.elite/creative-system.json` before first-screen work. If the user supplied a local gallery, bind 2–5 deeply analysed references to concrete visual traits. Otherwise use an original product-derived system and state why its signature cannot survive the substitution test. Motion is optional; use it only when it explains a business change, and document a static form when it is used.
6. Use `elite-ui resources search --intent` only after the thesis exists. Create `.elite/resource-plan.json` when the CLI is available. Select at most three governed mechanisms and document how each is adapted for this brand, mobile, RTL, accessibility, reduced motion, and performance. Never copy third-party code blindly.
7. Create an approved `.elite/design-contract.json` bound to the current brief, reference analysis, proof inventory, and resource plan before full-page implementation. For workflow-v5, include a governed `motionPlan`: cite a studied motion reference or document an original product-specific mechanism, with its attention sequence, trigger, adaptation, mobile, RTL, reduced-motion, and performance behavior. Do not expose this orchestration to the user unless they ask; perform it quietly.
8. Implement the real first screen before the whole page. It must demonstrate the signature moment in desktop, mobile, RTL where applicable, and reduced-motion form. Capture and cite both normal and reduced-motion first-view states before allowing full-page implementation. Read [references/visual-calibration.md](references/visual-calibration.md), then internally inspect it for first-screen impact, reference synthesis, proof clarity, and premium finish. If the thesis fails, revise it before building the rest of the page.
9. Before the first rendered capture, run `elite-ui preflight` when available. Implement the complete page in the existing stack. Preserve unrelated behavior and user changes. Use approved evidence; never fabricate customers, testimonials, metrics, integrations, awards, compliance, or product capabilities.
10. For bilingual or Arabic work, read [references/responsive-rtl.md](references/responsive-rtl.md) before implementation. Treat mobile, LTR, and RTL as designed states, not automatic transformations.
11. Keep the creative loop visual: inspect rendered states and batch corrections before running final shipping hygiene. Run relevant lint, typecheck, tests, and production build once after the design is stable. During revision, recapture affected states before one final full confirmation; do not repeat technical suites or full screenshot matrices for isolated visual edits.
12. Read [references/visual-jury.md](references/visual-jury.md). Inspect current desktop and mobile renders, plus every configured direction. If browser inspection is unavailable, report the visual gate as `BLOCKED`; never substitute code review for visual evidence.
13. Treat the first render as a draft. Complete at least one evidence-led refinement pass unless the jury finds no material issue. For every revision in workflow-v5.1, compare matching before/after states and submit `elite-ui visual-comparison submit`; a regression blocks human review. Stop after two focused revision cycles and report remaining blockers honestly.

## Delivery contract

- State the strategic premise and creative thesis briefly, then build. Do not provide thumbnails or multiple safe directions unless explicitly requested.
- Treat a landing page as one offer for one priority audience with one primary action. A broader marketing homepage may serve several paths, but it still needs one dominant narrative.
- Derive structure and visual language from the offer, audience, proof, assets, and references. Do not force a standard SaaS or agency section sequence.
- Use product UI, demonstrations, cases, artifacts, data, photography, illustration, or typography as evidence with a clear role—not as filler.
- Premium does not mean a default glow, glass card, particle layer, marquee, or 3D tilt. It means one authored, product-specific visual mechanism with deliberate typography, composition, media, and responsive behavior.
- Judge the complete scroll, not only the hero. The opening promise must develop through distinct section roles, progressively stronger evidence, deliberate changes in density and scale, and a closing action that resolves the same narrative.
- Add motion only when it explains behavior, guides attention, or improves feedback. Respect reduced motion.
- Report `Strategy`, `Distinctiveness`, `Conversion`, `Visual craft`, `Responsive`, `Accessibility`, `Performance`, `RTL` when applicable, and `Truthfulness` as `PASS`, `FAIL`, or `BLOCKED`, with observed evidence.
- Ask the human reviewer one visual check at a time after automated and visual gates pass. Human `FAIL` overrides AI approval.

See [references/ecosystem-notes.md](references/ecosystem-notes.md) for the external skill research that informed this method and the rules deliberately excluded.
See [references/model-routing.md](references/model-routing.md), [references/category-playbooks.md](references/category-playbooks.md), and [references/arabic-rtl-craft.md](references/arabic-rtl-craft.md) when those concerns are in scope.

## Automatic rejection conditions

Reject and revise work that relies on vague slogans, oversized type without content purpose, arbitrary blobs or gradients, fake product UI, repeated card grids, decorative dashboards, generic service lists, excessive empty space, or fashionable effects disconnected from the business. These patterns are not universally banned; each requires a project-specific reason.
