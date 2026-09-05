# Elite Landing UI v3 — Execution Plan

## Purpose and Sources

Implement `elite-landing-ui` v3 as an agent-first design-quality harness for React/Vite projects. Use these documents as normative inputs:

- [Product and quality plan](./elite-landing-ui-v3-plan.md)
- [Multi-agent orchestration specification](./elite-landing-ui-v3-orchestration.md)

This document defines the implementation order, concrete tasks, public interfaces, dependencies, verification, and phase exit gates. When documents conflict, preserve the product constraints in the v3 plan and use the orchestration specification for agent roles, state, and permissions.

## Implementation Status — 2026-09-05

- Phase 0–3: complete — cleanup, contracts, orchestration, capture, audit, critic isolation, bounded revision, sequential human review, verification, and reporting are implemented.
- Phase 4: complete — unit/integration gates, CI, protected release workflow, tarball inspection, and clean-install smoke testing are implemented and passing.
- Phase 5: implementation complete — five diverse benchmark kits and their human oracle criteria are included. Their visual decisions intentionally remain `PENDING_HUMAN_REVIEW` until real pages are rendered and reviewed.
- Package commit `fc5421f` is pushed to `elite-landing-ui` on `main`. Stable npm publication remains gated by five current human approvals and an explicitly authorized release.

## Fixed Technical Decisions

- Treat `packages/elite-landing-ui` as the primary package repository and implementation source of truth.
- Keep the outer `.agents/skills/elite-landing-page-agent` copy synchronized only for immediate workspace use.
- Implement the v3 CLI in TypeScript and bundle it to a Node-compatible executable with `tsup`.
- Require Node.js 22.19 or newer for v3; the current development environment is Node.js 24.
- Keep both public binary names: `elite-landing-ui` and `elite-ui`.
- Use `commander` for command parsing, JSON Schema files as contract sources, `ajv` plus `ajv-formats` for runtime validation, and `json-schema-to-ts` for compile-time types.
- Use Playwright with an explicitly discovered or installed Chromium browser; never download a browser silently during package installation.
- Inject `axe-core` into captured pages for accessibility checks.
- Use Lighthouse with an explicitly launched Chromium instance for benchmark performance, accessibility, best-practices, and SEO scores.
- Use Vitest for unit and integration tests, `oxlint` for linting, and TypeScript strict mode for typechecking.
- Do not call an AI provider from the npm package. The host coding agent creates subagents; the CLI creates task packets, validates artifacts, enforces state, and runs deterministic checks.
- Keep at most one source-writing task active for a run. Analysts, critics, and QA tasks are read-only.
- Store generated run evidence under `.elite/runs/<run-id>/` in the consumer project and ignore it by default except for explicitly approved reports.
- Publish `3.0.0-beta.1` only after automated package gates pass. Publish `3.0.0` stable only after all five benchmarks and human design gates pass.

## Phase 0 — Reconcile the Current Partial Work (Completed)

Historical baseline:

- The packaged `SKILL.md` has already been reduced from the conflicting v2 workflow to a concise 26-line workflow.
- The original monolithic `design-principles.md` was replaced by focused strategy, direction, conversion, responsive/RTL, reference-intelligence, and visual-jury references.
- The obsolete package `src/index.css` has been deleted locally.
- The CLI, package metadata, package lock, duplicated `.agents` content, UI vault, legacy knowledge base, and outer workspace skill were still on the v2 structure.
- The two planning documents and this execution plan were initially untracked in the outer repository.

Tasks:

- Review the package diff and preserve the concise skill and focused references if they match the approved plans.
- Confirm there are no unrelated changes inside the nested package or outer repository before each phase.
- Record the baseline commands and tarball contents before further cleanup.
- Work in the current checkout; do not create a worktree unless separately approved.
- Do not commit or push until the phase-specific verification passes.

Exit gate:

- The current partial changes are either incorporated into Phase 1 or explicitly restored with a documented reason.
- No unrelated outer-repository or application changes are included.

## Phase 1 — Complete the v2 Cleanup and Establish One Skill Source

### Package cleanup

- Keep one canonical runtime skill at `skills/elite-landing-page-agent/SKILL.md`.
- Keep only the focused v3 references selected by the runtime skill.
- Delete the package-local `.agents` duplicate, `skills/ui-design-vault`, legacy knowledge-base document, and obsolete aesthetic CSS.
- Remove embedded `ELITE_AGENT_SKILL`, `DESIGN_VAULT_SKILL`, and `CSS_TOKENS` constants from the CLI.
- Make `init` fail with exit code `2` and an actionable package-integrity message if the canonical bundled skill is missing.
- Make `init` recursively install the canonical skill and references without installing a second skill or design knowledge base.
- Preserve existing consumer files unless `--force` is supplied.
- Remove `--with-tokens`. If supplied, exit `2` with a migration message explaining that v3 derives tokens from the design contract.
- Remove unused UI runtime dependencies: `clsx`, `gsap`, `lenis`, `lucide-react`, and `tailwind-merge`.
- Add a package `files` allowlist containing only built CLI output, skills, schemas, references required by the package, README, license, and package metadata.
- Set the development version to `3.0.0-beta.1` and regenerate the lockfile consistently.

### Workspace synchronization

- Replace the outer workspace skill with the complete canonical packaged skill.
- Remove the outer `ui-design-vault` skill and obsolete portable/knowledge-base documents after confirming they are not referenced by unrelated application code.
- Keep the v3 plan, orchestration specification, and execution plan in `docs/`.

### Tests

- Test clean installation into an empty temporary directory.
- Test preservation of an existing skill without `--force`.
- Test replacement with `--force`.
- Test missing bundled source and removed `--with-tokens` behavior.
- Run `node --check` against the transitional CLI.
- Run `npm pack --dry-run` and inspect every packaged path.
- Search the tarball source for legacy phrases including `5-Phase`, `Obsidian Plasma`, `Liquid Glass`, `ui-design-vault`, and `$100k`.

Exit gate:

- The package contains one concise skill and one conditional design reference.
- No legacy workflow, generic aesthetic, automatic font/CSS injection, duplicate `.agents` folder, or unused UI dependency is shipped.
- Existing consumer files remain unchanged without explicit `--force`.

## Phase 2 — Build the Typed CLI Foundation and Versioned Contracts

### TypeScript package foundation

- Add `src/cli.ts` as the executable entrypoint and organize implementation under `src/commands`, `src/config`, `src/contracts`, `src/fs`, and `src/reporting`.
- Configure TypeScript strict mode, Node types, source maps, declaration output for exported library contracts, and `tsup` executable bundling.
- Point both package binaries to the generated `dist/cli.js` and preserve the executable shebang.
- Add scripts for `build`, `typecheck`, `lint`, `test`, `test:integration`, and `pack:check`.
- Keep filesystem mutations behind small injectable adapters so tests can use temporary directories.
- Return structured command results internally and map them to exit codes only at the CLI boundary.

### Contract schemas

Create versioned JSON Schema sources for:

- `elite.config.json`
- `brief.json`
- `design-contract.json`
- `run.json`
- `task-packet.json`
- `agent-output.json`
- `revision-brief.json`
- `visual-review.json`
- `human-review.json`
- `audit-report.json`
- `final-report.json`

Required conventions:

- Set `schemaVersion` to `1.0` for initial v3 contracts.
- Reject unknown fields with `additionalProperties: false` except inside explicitly declared extension metadata.
- Require `runId`, `taskId`, `createdAt`, `status`, and input identifiers on agent artifacts.
- Use claim statuses `approved`, `observed`, `inferred`, `placeholder`, and `missing`.
- Use finding severities `critical`, `high`, `medium`, and `low`.
- Use human check statuses `PASS`, `FAIL`, `BLOCKED`, and `not-applicable`.
- Use overall human decisions `APPROVED`, `REVISE`, `REJECTED`, and `BLOCKED`.
- Generate or infer TypeScript types from the JSON Schema sources; do not maintain separate hand-written wire types.
- Format validation errors with file, JSON pointer, violated rule, expected value, and received value.

### Tests

- Add valid fixture coverage for every schema.
- Add invalid fixtures for missing required fields, unknown fields, unsupported versions, invalid enums, wrong run/task IDs, and stale input identifiers.
- Verify JSON output is stable and machine-readable.
- Verify human-readable errors do not include secrets or full environment values.

Exit gate:

- The TypeScript CLI builds and both binary aliases execute.
- Every public artifact validates through one shared contract registry.
- Invalid inputs fail with exit code `2` and actionable field-level errors.

## Phase 3 — Implement Project Initialization, Inspection, and Doctoring

### `elite init`

- Install the skill, references, `elite.config.json`, and consumer `.gitignore` entry for `.elite/runs/`.
- Preserve every existing file unless `--force` targets that exact generated file.
- Never modify application CSS, HTML, dependencies, fonts, or source code.
- Print created, preserved, replaced, and blocked paths separately.

### `elite doctor`

- Detect package manager from lockfiles with precedence: explicit config, npm, pnpm, yarn, then bun.
- Detect React and Vite from package metadata and configuration files.
- Resolve configured lint, typecheck, test, build, dev, and preview commands without executing them.
- Detect Chrome/Chromium candidates and report whether capture and Lighthouse are available.
- Validate configuration, target paths, writable artifact directory, configured pages/locales, and port availability.
- Support `--json` with the same result as terminal output.
- Do not change the project.

### `elite inspect`

- Collect framework, scripts, routes discoverable from the Vite app, styling approach, existing assets, locale/direction signals, dependencies, and current metadata.
- Create a draft `.elite/brief.json` with unknown business values marked `missing`; never infer unverifiable claims.
- Record evidence paths for observed repository facts.
- Refuse to overwrite an approved brief without `--force`.

### Tests

- Cover empty, minimal Vite, existing Vite, unsupported framework, multiple lockfiles, missing scripts, occupied port, no browser, and read-only destination fixtures.
- Verify inspection does not execute application code or expose `.env` values.

Exit gate:

- A React/Vite project can be safely initialized, diagnosed, and converted into a truthful draft brief without source modification.

## Phase 4 — Implement the Multi-Agent Orchestration Engine

### State and task graph

- Implement the exact state machine from the orchestration specification.
- Store run state atomically using write-to-temporary-file plus rename in the same run directory.
- Build the dependency graph for brief approval, parallel analysis, contract synthesis, implementation, automated audit, parallel criticism, revision, retest, and human review.
- Reject illegal transitions and report the current state plus allowed next actions.
- Hash canonicalized task inputs and persist their identifiers so downstream evidence can be invalidated after source or contract changes.

### Public commands

Implement:

```text
elite orchestrate plan --run <run-id>
elite orchestrate status --run <run-id> [--json]
elite orchestrate task start <task-id> --run <run-id>
elite orchestrate task complete <task-id> --run <run-id> --output <file>
elite orchestrate task fail <task-id> --run <run-id> --reason <text>
elite validate-agent-output <file> --run <run-id>
```

Behavior:

- `plan` validates the brief and creates role-specific task packets without calling a model.
- `start` verifies dependencies and acquires read-only or exclusive source-writer mode.
- `complete` validates the output envelope, input identifiers, permissions, and required evidence before advancing state.
- `fail` records a bounded failure without discarding completed evidence.
- `status` reports ready, running, completed, blocked, invalidated, and skipped tasks plus revision count and legal next transitions.

### Concurrency and permissions

- Allow UX/Content and Art Direction tasks to run concurrently.
- Allow Visual, Conversion/Credibility, and applicable RTL/Accessibility tasks to run concurrently only after automated hard gates pass.
- Use an atomic `source-writer.lock` containing run, task, process, and acquisition metadata.
- Reject a second source writer while the lock is active.
- Treat stale locks as recoverable only after verifying that the recorded process is no longer running; record the recovery event.
- Restrict read-only tasks to the active run artifact directory through task instructions and output validation.

### Context packets and fallback

- Generate minimal task packets containing only each role’s declared inputs, permissions, required output schema, and acceptance criteria.
- Exclude builder rationale and implementation conversation from critic packets.
- Support `parallel` and `sequential` orchestration modes in config.
- In sequential mode, create the same packets and artifacts in the same dependency order; only dispatch behavior changes.

### Tests

- Cover every valid and invalid state transition.
- Cover dependency blocking, parallel read-only tasks, exclusive writer contention, stale lock recovery, wrong run IDs, stale input hashes, retry-once behavior, optional RTL critic, and interrupted-run resumption.
- Verify source changes invalidate captures, audits, critic outputs, and human reviews from the prior revision.
- Verify parallel and sequential modes produce the same required artifact set.

Exit gate:

- The CLI can plan, validate, pause, resume, and finish an orchestration run without invoking AI itself.
- Concurrent source writers are impossible through the supported command path.
- A host coding agent can determine the next legal task entirely from generated packets and `orchestrate status`.

## Phase 5 — Implement Capture and Deterministic Audits

### Browser lifecycle and capture

- Add explicit browser discovery and `elite browser install` as an opt-in installation path.
- Support connecting to a configured running URL or starting configured dev/preview commands.
- Track the child process and terminate only the process started by the current run.
- Wait for an HTTP-ready condition with configurable timeout and actionable diagnostics.
- Capture configured pages at default viewports `1440×1000`, `1280×800`, `390×844`, and `360×800`.
- Repeat captures for declared locale/direction variants.
- Save screenshots, DOM summaries, console output, network failures, page errors, loaded assets, and source revision identity.

### `elite audit`

- Run configured lint, typecheck, test, and production-build commands with independent timeouts and captured output.
- Detect uncaught page errors, console errors, failed local assets, broken internal links, and horizontal overflow.
- Inject axe-core and fail on serious or critical violations.
- Audit landmarks, heading hierarchy, accessible names, visible focus, keyboard reachability, touch-target sizing, reduced motion, and `dir` correctness.
- Compare rendered claims and proof markers to the brief statuses; flag unapproved claims as truthfulness failures.
- Detect animation and heavyweight media dependencies not justified by the design contract.
- Run Lighthouse three times in benchmark mode and use the median scores.

### Public commands

```text
elite capture --run <run-id>
elite audit --run <run-id> [--benchmark]
```

### Tests

- Use passing and deliberately failing Vite fixtures for every hard gate.
- Cover server timeout, occupied port, missing browser, process interruption, console error, broken asset, overflow, axe violation, bad heading order, missing focus, reduced-motion failure, incorrect RTL, and unapproved proof.
- Verify child-process cleanup on success, failure, timeout, and Ctrl+C.

Exit gate:

- A run produces reproducible screenshots and structured audit evidence.
- Every hard gate has a positive and negative fixture.
- Known automated failures block AI and human review.

## Phase 6 — Implement AI Review Contracts and Revision Synthesis

### Critic task generation

- Generate separate task packets for Visual, Conversion/Credibility, and conditional RTL/Accessibility critics.
- Provide only the approved brief, design contract, screenshots, DOM summary, and deterministic audit results.
- Require category scores from `1` to `5`, with evidence-linked findings.
- Reject vague findings without viewport, region, evidence, impact, and concrete correction.
- Require a mean score of at least `4.2` and no category below `4` for AI review pass.

### Revision synthesis

- Merge duplicate findings and apply the fixed priority: truthfulness, function, accessibility/RTL, conversion, brand specificity, hierarchy/composition, performance, then polish.
- Produce no more than three design corrections, three technical corrections, and one optional polish task.
- Attach observable acceptance criteria and affected region/path hints to every task.
- Reject contradictory corrections or a wholesale redesign unless the human decision is `REJECTED` or the contract is incompatible with the brief.
- Enforce two AI revision cycles. Remaining high-severity findings after the second revision transition the run to `blocked`.

### Tests

- Validate good, vague, contradictory, duplicated, stale, wrong-run, and over-limit critic outputs.
- Verify critics cannot approve a failing automated gate or override human status.
- Verify revision ordering and limits are deterministic.

Exit gate:

- Independent critics can return validated evidence, and the orchestrator produces one bounded, non-contradictory revision brief.

## Phase 7 — Implement Human Design Review

### Public commands

```text
elite human-review start --run <run-id> --reviewer <name>
elite human-review next --run <run-id>
elite human-review record --run <run-id> --status <PASS|FAIL|BLOCKED> [--comment <text>]
elite human-review status --run <run-id> [--json]
```

### Review behavior

- Permit `start` only after automated gates pass and AI review artifacts validate.
- Present one check at a time in this order: five-second understanding, professional impression, brand distinctiveness, hierarchy/composition, trust, conversion journey, mobile design, and bilingual parity.
- Mark bilingual parity `not-applicable` only for a declared LTR-only project.
- Preserve the reviewer’s comment exactly and bind every answer to the reviewed run, revision, screenshots, and source identity.
- A `FAIL` sets the overall decision to `REVISE`; a `BLOCKED` records the missing prerequisite; neither may be converted to pass by AI.
- After a targeted correction, rerun affected automated gates and repeat the failed check plus any later checks invalidated by the change.
- A `REJECTED` direction returns to design-contract work while preserving the approved brief and claim constraints.
- Require all applicable checks to pass before `APPROVED`.

### Tests

- Cover starting too early, sequential question enforcement, exact comment preservation, not-applicable rules, stale screenshot binding, partial reviews, failed review override, targeted retest, rejection, and final approval.

Exit gate:

- The user can complete manual review one focused check at a time, and the machine-readable record is required for benchmark approval.

## Phase 8 — Implement Verification, Reporting, and CI

### `elite verify`

- Validate contracts, orchestration state, source identity, command results, captures, audits, AI reviews, revision count, and required human review.
- Return exit `0` only when all gates required for the selected mode pass.
- Return exit `1` for completed quality failures and exit `2` for invalid configuration, missing tools, corrupt state, or incompatible artifacts.

### `elite report`

- Produce JSON and Markdown reports with separate Automated, AI Review, Human Review, Remaining Risks, and Artifact Index sections.
- Link every claim to its underlying run artifact.
- Use `BLOCKED` for unperformed visual or browser checks rather than implying success.
- Redact environment values, credentials, and sensitive request data.

### CI and packaging

- Add GitHub Actions for Node 20 and 22 on Windows and Linux.
- Run lint, typecheck, unit tests, integration tests, build, and tarball inspection.
- Run browser integration tests with an explicitly installed pinned Chromium in CI.
- Install the packed tarball into a fresh temporary React/Vite fixture and exercise both binary aliases.
- Verify npm contents against the `files` allowlist.

Exit gate:

- A clean clone produces the same build and test results.
- Reports distinguish verified facts, AI opinion, human opinion, and blocked checks.
- The packed beta installs and runs without repository-relative dependencies.

## Phase 9 — Run Five Isolated Benchmarks

Use clean projects and fresh agent contexts for:

1. English AI SaaS with real product proof and trial CTA.
2. Bilingual Arabic/English professional service with equal RTL/LTR treatment.
3. Light-theme fintech with strict claim restrictions.
4. Editorial creative product using supplied photography.
5. Existing branded Vite page improved without replacing its identity.

For each benchmark:

- Prepare an approved brief and asset set without revealing expected design answers.
- Run orchestration in the configured mode and record task timing, agent count, questions asked, first-render time, revision count, tool failures, and artifact hashes.
- Require all automated gates and AI thresholds before human review.
- Conduct the eight manual checks one at a time and record `PASS`, `FAIL`, or `BLOCKED`.
- On failure, update the smallest responsible skill instruction, reference, schema, prompt contract, or deterministic script.
- Rerun the affected benchmark from clean input when changes could leak the previous answer.
- Do not begin the next benchmark until the current one is `APPROVED` or the user explicitly abandons it.

Exit gate:

- All five benchmarks pass automated gates, meet AI thresholds, stay within two AI revision cycles, and receive human `APPROVED`.

## Phase 10 — Beta and Stable Release

### Beta release

- Complete all automated package and CLI gates.
- Review the v2-to-v3 migration, removed token injection, browser setup, orchestration commands, artifact format, and troubleshooting documentation.
- Commit the nested package first, push it, then update and commit the outer repository submodule pointer and planning/runtime files.
- Tag and publish `3.0.0-beta.1` only after explicit release approval.
- Install the beta from the public npm registry into a clean Vite project and rerun the smoke workflow.

### Stable release

- Require completion of all five benchmarks and human approval records.
- Change the version to `3.0.0`, regenerate the lockfile, rebuild, run all tests, and inspect the tarball again.
- Tag GitHub and publish npm only after explicit approval.
- Verify both GitHub repositories, the submodule reference, npm version, package contents, and fresh installation.
- Preserve the v2 Git tag and document intentional breaking changes.

Exit gate:

- GitHub, npm, package metadata, lockfile, tags, and outer submodule all identify the same approved stable release.

## Phase Delivery Protocol

For every phase:

1. Inspect outer and nested Git status and preserve unrelated changes.
2. Implement only the current phase’s tasks.
3. Run the phase tests and capture exact output.
4. Report each exit criterion as `PASS`, `FAIL`, or `BLOCKED`.
5. Do not claim browser, AI, or human evidence that was not produced.
6. Stop for the user’s manual decision only at an explicit human gate or before publishing/pushing externally.
7. Commit the nested package before updating the outer submodule pointer.

## First Build Task

Begin with **Phase 1 — Complete the v2 Cleanup and Establish One Skill Source**.

The first code change should replace `bin/index.js` with a minimal v3 transitional initializer that copies only the canonical skill directory, preserves existing consumer files by default, rejects the removed `--with-tokens` option, and contains no embedded fallback prompt or aesthetic tokens. Then synchronize package metadata/lockfile and verify the npm tarball before starting schemas or orchestration.
