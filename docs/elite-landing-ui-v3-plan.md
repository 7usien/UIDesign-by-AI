# Elite Landing UI v3 — AI Design Quality Harness

## Summary

Rebuild `elite-landing-ui` as an **agent-first + deterministic CLI harness** for React/Vite projects. The coding agent handles product reasoning, art direction, implementation, and visual criticism; the CLI handles structured inputs, browser captures, measurable audits, artifacts, and release gates.

The implementation sequence is defined here. Detailed roles, task dependencies, isolation rules, artifacts, state transitions, and failure handling are defined in [elite-landing-ui-v3-orchestration.md](./elite-landing-ui-v3-orchestration.md).

Success means:

- No more than one user question before the first implementation.
- One complete design direction instead of thumbnails.
- First functional render targeted within 10 minutes, excluding dependency installation.
- Maximum two AI revision passes.
- No fabricated claims, proof, metrics, testimonials, or logos.
- Desktop, mobile, LTR, and configured RTL states inspected.
- Automated testing completes before any human review, so the reviewer is not asked to find technical defects.
- Every benchmark completes one focused human design check at a time, recorded as `PASS`, `FAIL`, or `BLOCKED`.
- Five benchmark briefs pass automated gates, AI critique, and all required human design checks before v3 stable.

## Phase 1 — Remove v2 Conflicts

- Delete the entire legacy five-phase workflow from the packaged and workspace skills; do not retain it as reference text.
- Remove the embedded fallback skill from the CLI so the packaged `SKILL.md` is the single source of truth.
- Retire the generic UI vault as an installed skill. Move useful selection principles into conditional references within the main skill.
- Remove plasma, glassmorphism, dark-theme, font, and motion defaults, including `src/index.css`.
- Remove unused runtime dependencies such as GSAP and Lenis.
- Add a package `files` allowlist so npm ships only the CLI, skill, schemas, references, scripts, and package documentation.
- Preserve `elite-landing-ui` and `elite-ui` command names.
- Remove `--with-tokens` in v3 and return a clear migration message explaining that visual tokens now come from the generated design contract.
- Exit criteria: `npm pack --dry-run` contains no duplicate `.agents` folder, legacy prompt, predefined aesthetic, or unused visual dependency.

## Phase 2 — Introduce Structured Design Contracts

- Add `elite.config.json` with project commands, server URL, page/locale matrix, viewport overrides, artifact directory, and audit budgets.
- Add `.elite/brief.json` with:
  - product, audience, desired outcome, differentiator, CTA, language, brand voice;
  - approved assets and references;
  - disliked patterns and explicit exclusions;
  - claims carrying `approved`, `observed`, `inferred`, `placeholder`, or `missing` status.
- Add `.elite/design-contract.json` with:
  - conversion narrative and section purpose;
  - hero proposition and proof mechanism;
  - typography roles, palette logic, grid, spacing, and density;
  - media and icon strategy;
  - responsive and RTL behavior;
  - motion justification and reduced-motion behavior;
  - project-specific anti-patterns.
- Add `.elite/human-review.json` with benchmark and revision identifiers, screenshot/run identifiers, reviewer, timestamp, per-gate status and comments, and overall `APPROVED`, `REVISE`, `REJECTED`, or `BLOCKED` decision.
- Keep `SKILL.md` below 150 lines. It must direct the agent to inspect the project, create the two contracts, implement one direction, and invoke the CLI gates.
- Ask one question only if product, audience, or primary conversion cannot be responsibly inferred.
- Validate all contracts with versioned JSON schemas and reject unknown fields.
- Exit criteria: valid contracts pass, malformed or incomplete contracts produce actionable field-level errors, and unsupported schema versions fail safely.

## Phase 3 — Multi-Agent Orchestration Foundation

- Make the host coding agent the Main Orchestrator and the only agent that communicates with the user, approves task transitions, resolves conflicts, and controls revision count.
- Define four initial roles: Main Orchestrator, UX/Content Strategist, Art Director, and Design Engineer. Only the Design Engineer may modify application source.
- Run UX/Content and Art Direction concurrently from the same approved brief; synthesize their validated outputs into one design contract before implementation.
- After implementation and automated gates, run Visual, Conversion/Credibility, and conditional RTL/Accessibility critics concurrently using isolated context that excludes the builder’s rationale.
- Exchange work through versioned `run.json`, `agent-output.json`, `revision-brief.json`, and `human-review.json` schemas rather than conversational summaries.
- Enforce task dependencies, read-only/source-writer modes, one source writer at a time, maximum two revision cycles, and deterministic conflict priority.
- Support hosts without subagents by executing the same roles sequentially in isolated passes with identical inputs and output schemas.
- Add `elite orchestrate plan`, `elite orchestrate status`, and `elite validate-agent-output <file>` interfaces.
- Follow [elite-landing-ui-v3-orchestration.md](./elite-landing-ui-v3-orchestration.md) as the implementation source of truth; do not duplicate its detailed prompt and state rules in `SKILL.md`.
- Exit criteria: a run can validate dependencies, dispatch safe parallel work, prevent concurrent source edits, resume from artifacts, and produce one non-contradictory revision brief.

## Phase 4 — Build the CLI Harness

Expose these commands:

```text
elite init
elite doctor
elite inspect
elite orchestrate plan
elite orchestrate status
elite validate-agent-output <file>
elite capture
elite audit
elite verify
elite report
```

Tasks:

- `init`: install the concise skill and empty configuration safely without overwriting existing files unless `--force` is supplied.
- `doctor`: detect React/Vite, package manager, scripts, browser availability, build prerequisites, and configuration problems without modifying the project.
- `inspect`: collect repository facts and create a draft brief containing explicit `missing` values; do not invent business information.
- `capture`: start or connect to the configured server and capture each page at `1440×1000`, `1280×800`, `390×844`, and `360×800`; repeat configured Arabic/RTL states.
- `audit`: run build/typecheck commands plus browser, accessibility, responsive, truthfulness, and performance checks.
- `verify`: combine schema validation, command results, captures, deterministic gates, the agent’s visual-review file, and any required human-review file. AI scores must never override a human failure.
- `report`: produce concise Markdown and JSON handoff reports that clearly separate automated, AI, and human results.
- Store every run under `.elite/runs/<run-id>/` with config snapshot, command logs, screenshots, audit results, visual review, and final decision.
- Use exit code `0` for pass, `1` for quality-gate failure, and `2` for invalid configuration or unavailable tooling.
- Use an explicit browser-install command or documented setup rather than downloading a large browser silently during package installation.
- Exit criteria: a new Vite fixture can be initialized, inspected, captured, audited, and reported through the CLI.

## Phase 5 — Deterministic Quality Gates

Implement hard gates for:

- Configured lint, typecheck, test, and production-build commands.
- Zero uncaught page errors, console errors, failed local assets, or broken internal links.
- Zero horizontal overflow at every configured viewport.
- Zero serious or critical axe violations.
- Valid landmark and heading structure, accessible names, keyboard reachability, visible focus, and reduced-motion support.
- Correct `dir`, reading order, alignment, and mixed Arabic/Latin/numeral handling for RTL pages.
- No unapproved claim rendered as verified proof.
- No placeholder testimonial, customer logo, compliance badge, or metric presented as real.
- No unnecessary animation dependency or heavyweight media asset without justification in the design contract.
- Lighthouse benchmark thresholds measured as the median of three runs: Performance `≥85`, Accessibility `≥95`, Best Practices `≥90`, and SEO `≥90`.
- Exit criteria: each gate has a fixture proving both passing and failing behavior, with element-level evidence in the JSON report.

## Phase 6 — AI Visual Critic and Revision Loop

- After the first capture, run a distinct critic pass using only:
  - approved brief;
  - design contract;
  - screenshots;
  - DOM summary;
  - deterministic audit results.
- Do not expose the builder’s rationale or implementation conversation to the critic.
- Score Brand specificity, Hierarchy, Composition, Typography, Conversion story, Product proof, Credibility, Restraint, Responsive craft, and Accessibility from `1–5`.
- Require every visual finding to include severity, viewport, page region, visible evidence, user impact, and a concrete correction.
- Limit each critique to three high-impact visual issues, three implementation defects, and one optional polish suggestion.
- Require a mean visual score of `≥4.2`, with no category below `4`.
- Allow at most two revision cycles. After the limit, return `BLOCKED` with remaining issues rather than continuing indefinitely.
- Require the agent to write `.elite/visual-review.json`; validate it before `verify` can pass.
- Treat AI review as advisory when it conflicts with the human reviewer; a human `FAIL` keeps the benchmark in `REVISE` even if the AI score passes.
- Exit criteria: the same input produces bounded, localized revision instructions rather than a wholesale redesign or repeated style exploration.

## Phase 7 — Automated and Integration Testing

- Enforce the test order: deterministic automated gates → AI visual critique → human design review. Do not show a benchmark to the human reviewer while a known automated hard gate is failing.
- Unit-test JSON schemas, config resolution, command detection, exit codes, claims validation, report generation, and overwrite protection.
- Unit-test human-review schema validation, allowed status transitions, incomplete reviews, screenshot/run mismatches, and the rule that human failure overrides AI approval.
- Integration-test browser startup, capture dimensions, server timeout, missing browser, failed build, runtime errors, missing assets, overflow, accessibility violations, and malformed review output.
- Test `init` against an existing project to confirm unrelated CSS, fonts, dependencies, skills, and documentation remain untouched.
- Pack the npm tarball and install it into a fresh temporary React/Vite project for end-to-end CLI testing.
- Test Windows PowerShell paths, spaces in paths, process shutdown, occupied ports, and interrupted runs.
- Confirm each run cleans up child server/browser processes while retaining audit artifacts.
- Exit criteria: unit, integration, package-install, and CLI end-to-end suites pass from a clean checkout.

## Phase 8 — Human Design Review Gate

Run manual review only after automated gates pass and the AI critic has produced its evidence-based findings. Present one focused check at a time and wait for the reviewer to answer `PASS`, `FAIL — reason`, or `BLOCKED — reason` before continuing.

Required checks, in order:

1. **Five-second understanding:** After viewing the desktop hero for five seconds, can the reviewer explain what the product offers, who it serves, and what action to take?
2. **Professional first impression:** Does the page feel like polished custom work rather than an ordinary AI-generated template?
3. **Brand distinctiveness:** Would the design still make sense if only the logo and company name were changed? If yes, fail the check as too generic.
4. **Visual hierarchy and composition:** Does attention move through the page in the intended order, with deliberate scale, whitespace, alignment, density, and CTA prominence?
5. **Trust and credibility:** Are the claims believable and supported, with no suspicious proof, exaggerated language, or fabricated content?
6. **Conversion experience:** Can the reviewer complete the primary journey, and does each step feel obvious, convincing, and appropriately low-friction?
7. **Mobile design:** Does the mobile page feel intentionally composed rather than merely collapsed from desktop?
8. **Arabic and English parity:** For bilingual benchmarks, does Arabic receive equally strong typography, hierarchy, layout, translation, and interaction behavior?

Failure and retest rules:

- Record the reviewer’s exact reason without having AI reinterpret or soften it.
- Convert one failed check into one targeted correction brief tied to visible evidence; do not trigger a complete redesign unless the reviewer chooses `REJECTED`.
- After the correction, rerun all automated gates affected by the change and repeat only the failed manual check plus any later checks invalidated by that change.
- A `BLOCKED` result must identify the missing asset, content, configuration, browser state, or other prerequisite; it is not a pass.
- A direction marked `REJECTED` returns to the design-contract stage while preserving the approved brief and truth constraints.
- Require all applicable checks to be `PASS` before setting the overall decision to `APPROVED`.
- Exit criteria: the CLI validates the completed human-review record, the report links every decision to the reviewed run/screenshots, and no benchmark can pass with a human `FAIL`, `BLOCKED`, `REVISE`, or `REJECTED` result.

## Phase 9 — Five-Brief Design Benchmark

Run the harness in clean, isolated React/Vite projects for:

1. English AI SaaS with a real product screenshot and trial CTA.
2. Bilingual Arabic/English professional service with equal RTL/LTR treatment.
3. Light-theme fintech product with strict restrictions against invented financial claims.
4. Editorial creative product using supplied photography without generic SaaS patterns.
5. Existing branded Vite page requiring improvement without replacing its identity.

For each benchmark:

- Use a fresh agent context with only the skill, brief, assets, and project.
- Record number of questions, time to first render, revision count, commands, audit results, screenshots, and final score.
- Run automated gates and AI critique before presenting the result to the user.
- Present the desktop and mobile result one benchmark at a time, then conduct the eight Phase 8 checks sequentially.
- Do not batch the questions or continue to the next check until the current result is recorded.
- For non-bilingual benchmarks, mark Arabic/English parity as `not-applicable`; it must not be counted as a pass or failure.
- Treat a failure as evaluation evidence: update the smallest responsible skill, schema, reference, or script and rerun the affected benchmark from a clean state.
- Do not begin the next benchmark until the current benchmark is `APPROVED` or explicitly abandoned by the user.
- Exit criteria: all five benchmarks pass deterministic gates, achieve the AI visual threshold, stay within two AI revision cycles, pass all applicable human checks, and receive overall human `APPROVED`.

## Phase 10 — Release and Documentation

- Release the first implementation as `3.0.0-beta.1`.
- Document the v2-to-v3 migration, removed token injection, browser setup, CLI commands, artifact format, and troubleshooting.
- Keep user-facing package documentation in the package README; keep operational design knowledge inside skill references.
- Do not publish `3.0.0` stable until Phases 8 and 9 pass completely.
- After approval, update to `3.0.0`, run the full test suite, validate the packed tarball, publish to npm, push GitHub tags, and verify installation from the public registry.
- Preserve the v2 Git tag and document that v3 intentionally removes generic aesthetics and mandatory motion.

## Assumptions and Defaults

- Architecture: coding-agent orchestration plus deterministic npm CLI; no AI provider API key is required.
- Initial framework scope: React with Vite only.
- Browser engine: Chromium; locally installed Chrome may be used for development, while benchmark and CI runs use a pinned browser.
- Default locale matrix: `/` as LTR; RTL pages must be explicitly declared in `elite.config.json`.
- Generated images, live component scraping, and third-party design-library code are out of the default workflow.
- Human visual approval is mandatory for all five benchmarks before stable release.
- Manual testing is performed one focused check at a time; the human reviewer is the final authority on design quality.
- Superpowers skills are not part of the implementation or evaluation workflow.
