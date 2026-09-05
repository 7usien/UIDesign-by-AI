# Elite Landing UI v3 — Multi-Agent Orchestration Specification

## Purpose

Define how an AI host coordinates specialist agents while building and reviewing a landing page. This specification governs roles, permissions, artifacts, dependencies, conflict resolution, revision limits, recovery, and human handoff. The phased implementation order remains in [elite-landing-ui-v3-plan.md](./elite-landing-ui-v3-plan.md).

The npm package is agent-first. It does not call a model provider or require an AI API key. The host environment creates agents; the CLI prepares and validates their task artifacts.

## Operating Rules

- The Main Orchestrator is the only agent that communicates with the user.
- Ask no more than one material question before the first implementation.
- Produce one design direction; do not generate thumbnails or competing concepts.
- Only the Design Engineer may edit application source files.
- Analysts and critics are read-only and may write only inside the active `.elite/runs/<run-id>/` directory.
- Do not begin implementation until the brief and design contract validate.
- Do not begin AI criticism until implementation passes the required automated hard gates.
- Do not begin human review while a known automated hard gate is failing.
- Allow no more than two AI revision cycles.
- Treat human design judgment as final; an AI score cannot override a human failure.

## Agent Topology

```text
Main Orchestrator
    │
    ├── UX/Content Strategist ─────┐
    │                              ├── Design contract
    └── Art Director ──────────────┘
                                      │
                               Design Engineer
                                      │
                               Automated CLI gates
                                      │
    ┌─────────────────────────────────┼─────────────────────────────────┐
    │                                 │                                 │
Visual Critic             Conversion/Credibility Critic      RTL/Accessibility Critic
    └─────────────────────────────────┼─────────────────────────────────┘
                                      │
                           Prioritized revision brief
                                      │
                               Design Engineer
                                      │
                               Automated retest
                                      │
                               Human review gate
```

## Role Contracts

### Main Orchestrator

Mode: coordinator; do not perform parallel source edits.

Inputs:

- User request and approved answers
- Project inspection results
- All validated run artifacts
- Automated command and browser results
- Human-review decisions

Responsibilities:

- Create the run, approve the brief, and freeze its truth constraints.
- Select applicable roles and construct their bounded task packets.
- Dispatch only tasks whose dependencies have passed.
- Validate every agent output before using it.
- Synthesize analysis into one design contract and criticism into one revision brief.
- Resolve conflicts using the fixed priority order.
- Track revision count and stop after two AI revision cycles.
- Present one manual design check at a time and preserve the reviewer’s exact response.
- Set the final run decision without weakening `FAIL`, `BLOCKED`, `REJECTED`, or `REVISE` results.

Outputs:

- `run.json`
- `brief.json`
- `design-contract.json`
- `revision-brief.json`
- Final report and run decision

### UX/Content Strategist

Mode: read-only.

Inputs:

- Approved `brief.json`
- Current page content when redesigning
- Approved claims and asset inventory

Responsibilities:

- Define the audience problem, offer, desired outcome, and conversion narrative.
- Recommend one hero message, CTA hierarchy, proof sequence, objection strategy, and section order.
- Identify missing, unsupported, generic, or excessive content.
- Preserve the epistemic status of every claim.
- Avoid visual styling and source-code changes.

Output: `agents/ux-content.json`.

### Art Director

Mode: read-only.

Inputs:

- Approved `brief.json`
- Existing brand assets and screenshots
- User-supplied references and exclusions

Responsibilities:

- Define one brand-specific visual premise.
- Specify composition, grid, typography roles, palette logic, density, media, motion, mobile behavior, and RTL considerations.
- State explicit anti-patterns for the project.
- Explain how visual decisions connect to the product and audience.
- Avoid thumbnails, alternative directions, generic archetypes, and source-code changes.

Output: `agents/art-direction.json`.

### Design Engineer

Mode: exclusive source writer.

Inputs:

- Approved brief and design contract
- Existing project source and conventions
- Approved assets
- Current `revision-brief.json` when revising

Responsibilities:

- Implement the complete first pass in the existing React/Vite project.
- Preserve unrelated behavior and user changes.
- Use approved content and assets without inventing proof.
- Implement responsive, accessible, reduced-motion, and configured RTL behavior.
- Add dependencies only when justified by the design contract and project need.
- Apply only prioritized revision tasks; do not independently redesign approved areas.

Output: application source changes plus `agents/implementation.json` containing changed paths, commands run, assumptions, and unresolved blockers.

### Visual Critic

Mode: read-only and context-isolated.

Inputs:

- Approved brief and design contract
- Desktop, laptop, mobile, and configured RTL screenshots
- DOM summary and automated audit results

Responsibilities:

- Evaluate hierarchy, composition, typography, spacing, density, brand specificity, visual restraint, and mobile composition.
- Cite visible evidence for every finding.
- Avoid reading the builder’s rationale or proposing an unrelated new direction.

Output: `agents/visual-review.json`.

### Conversion/Credibility Critic

Mode: read-only and context-isolated.

Inputs: the same neutral review bundle supplied to the Visual Critic.

Responsibilities:

- Evaluate offer clarity, audience fit, CTA logic, narrative, objection handling, proof, trust, and truthfulness.
- Flag fabricated, unsupported, placeholder, vague, or exaggerated content.
- Cite the relevant page region and approved claim status.

Output: `agents/conversion-review.json`.

### RTL/Accessibility Critic

Mode: read-only and context-isolated. Required for bilingual/RTL runs or when the automated audit identifies accessibility risk; otherwise record it as `not-applicable`.

Inputs: neutral review bundle plus configured locale/direction expectations.

Responsibilities:

- Evaluate Arabic visual parity, reading order, mixed-script content, icon direction, typography, alignment, focus order, interaction clarity, and reduced motion.
- Distinguish measurable failures already reported by the CLI from human-perception concerns.

Output: `agents/rtl-accessibility-review.json`.

## Parallel and Sequential Execution

Safe parallel groups:

- UX/Content Strategist and Art Director after `brief.json` passes.
- Visual, Conversion/Credibility, and applicable RTL/Accessibility critics after capture and automated hard gates pass.
- Independent benchmark evaluation in separate clean projects when each benchmark has isolated source and artifacts.

Required sequential boundaries:

1. Project inspection before brief approval.
2. Brief approval before analysis agents.
3. Validated analysis outputs before design-contract synthesis.
4. Design contract before implementation.
5. Implementation before capture and automated audit.
6. Automated hard gates before AI critics.
7. Validated critic outputs before revision synthesis.
8. Revision before automated retest.
9. Passing automated retest before human review.

Never run two source-writing agents against the same project checkout.

## Run Artifacts

```text
.elite/runs/<run-id>/
├── run.json
├── brief.json
├── design-contract.json
├── task-packets/
│   ├── ux-content.json
│   ├── art-direction.json
│   ├── implementation.json
│   └── review.json
├── agents/
│   ├── ux-content.json
│   ├── art-direction.json
│   ├── implementation.json
│   ├── visual-review.json
│   ├── conversion-review.json
│   └── rtl-accessibility-review.json
├── audits/
│   ├── commands.json
│   ├── browser.json
│   ├── accessibility.json
│   └── performance.json
├── screenshots/
├── revision-brief.json
├── human-review.json
└── report.json
```

Every artifact must include `schemaVersion`, `runId`, `taskId`, `createdAt`, `status`, and the hashes or identifiers of its declared inputs. Reject an output when its run, task, revision, or input identifiers do not match the active run.

## Run State Machine

Allowed states:

```text
created
→ brief-draft
→ brief-approved
→ analysis-running
→ contract-ready
→ implementation-running
→ automated-audit
→ ai-review
→ revision-required | awaiting-human-review
→ implementation-running | human-review
→ approved | rejected | blocked
```

Rules:

- Only the Main Orchestrator may transition run state.
- A failed schema or missing dependency leaves the current state unchanged and records the error.
- `revision-required` may return to `implementation-running` only while `revision < maxRevisions`.
- Exhausting two AI revisions with remaining high-severity findings transitions to `blocked`.
- A human `REVISE` returns to implementation with a targeted brief; it does not erase prior evidence.
- A human `REJECTED` returns to design-contract work while preserving the approved brief and claim constraints.
- `approved` requires passing automated gates, passing AI thresholds, and all applicable human checks marked `PASS`.

## Agent Output Contract

All specialist outputs use a shared envelope:

```json
{
  "schemaVersion": "1.0",
  "runId": "2026-09-04-001",
  "taskId": "visual-review-r1",
  "agentRole": "visual-critic",
  "mode": "read-only",
  "status": "completed",
  "inputIds": ["brief-v1", "contract-v1", "capture-r1", "audit-r1"],
  "findings": [],
  "blockers": []
}
```

Review findings additionally require:

- Stable finding ID
- Severity: `critical`, `high`, `medium`, or `low`
- Viewport and page region
- Visible or audit evidence
- User impact
- Concrete recommended correction
- Related brief or contract rule

Reject vague findings such as “make it modern,” “improve spacing,” or “make it more premium.”

## Revision Synthesis

The Main Orchestrator combines valid findings using this priority:

1. Truthfulness and safety
2. Functional correctness
3. Accessibility and RTL correctness
4. Conversion clarity
5. Brand specificity
6. Visual hierarchy and composition
7. Performance
8. Decorative polish

The resulting `revision-brief.json` must contain no more than three high-impact design corrections, three technical corrections, and one optional polish task. Merge duplicates, resolve contradictions, identify affected paths or regions, and define observable acceptance criteria for every task.

Do not issue a full redesign unless the human decision is `REJECTED` or the design contract is proven incompatible with the approved brief.

## Context Isolation

- Give each specialist only the files required by its input contract.
- Do not give critics the builder’s conversation, rationale, or intended fixes.
- Do not give benchmark agents previous benchmark outputs or expected scores.
- Provide raw screenshots, DOM summaries, audit results, and approved contracts rather than another agent’s interpretation.
- Keep agent outputs in the run directory and validate them before making them visible to downstream agents.

## Host Capability Fallback

When the host supports subagents, dispatch only the safe parallel groups defined above. When it does not, the Main Orchestrator performs the same roles sequentially:

1. Start a role-specific isolated pass.
2. Load only that role’s task packet.
3. Produce the same schema-validated output.
4. Clear role-specific reasoning before the next pass where the host permits it.
5. Preserve the same dependency, permission, and revision rules.

The final artifacts and quality gates must be identical in parallel and sequential modes.

## Failure and Recovery

- Invalid agent output: mark the task `failed-validation`, report exact schema errors, and rerun that task once with the same inputs.
- Timed-out agent: mark `timed-out`; retry once or continue only if the role is explicitly optional.
- Conflicting outputs: resolve through the fixed priority order and record the discarded recommendation and reason.
- Unauthorized source edit: stop the run, restore only the unauthorized agent’s known edits through a reviewed recovery action, and rerun in read-only mode.
- Changed source during review: invalidate captures, audits, critic outputs, and human review tied to the prior source revision.
- Missing required asset or claim: mark the dependent task and run `blocked`; do not fabricate a substitute.
- Interrupted run: resume from the last validated state and do not repeat completed tasks whose input hashes are unchanged.

## Human Handoff

After automated retest passes, the Main Orchestrator presents the tested desktop and mobile page and asks the eight manual design checks from the implementation plan one at a time. Preserve the reviewer’s wording exactly.

A human `FAIL` overrides an AI pass. Repeat only the failed check and any later checks invalidated by the correction. No run becomes `approved` while a required human check is `FAIL`, `BLOCKED`, `REVISE`, `REJECTED`, or unanswered.

## CLI Responsibilities

- `elite orchestrate plan`: validate the active brief, create `run.json`, calculate task dependencies, and generate task packets without invoking a model.
- `elite orchestrate status`: show run state, active tasks, completed artifacts, revision count, blockers, and next legal transitions.
- `elite validate-agent-output <file>`: validate schema, run/task identity, mode, input identifiers, required evidence, and allowed fields.
- `elite verify`: combine automated, AI, and human results according to the state and priority rules.
- `elite report`: preserve separate Automated, AI Review, and Human Review sections.

The CLI must not silently spawn models, request credentials, install browsers, edit application source, or convert advisory AI output into verified fact.

## Orchestration Test Matrix

- Dispatch UX/Content and Art Direction in parallel after brief approval.
- Block implementation when either required analysis output is missing or invalid.
- Prevent two Design Engineer tasks from holding source-writer mode simultaneously.
- Block critics until required automated hard gates pass.
- Run three critics concurrently with isolated task packets.
- Mark RTL critic `not-applicable` for a declared LTR-only benchmark.
- Reject critic output that references the wrong run, revision, capture, or audit.
- Merge duplicate findings and resolve conflicting recommendations by priority.
- Enforce revision limits and transition to `blocked` after exhaustion.
- Resume an interrupted run without repeating tasks whose inputs are unchanged.
- Invalidate downstream evidence after source changes.
- Produce identical required artifacts in sequential fallback mode.
- Prevent AI approval from overriding a human failure.
- Require all applicable human checks before final approval.

## Runtime Skill Packaging

During v3 implementation, translate this specification into concise runtime resources:

```text
skills/elite-landing-page-agent/
├── SKILL.md
├── references/
│   ├── orchestration.md
│   ├── agent-prompts.md
│   ├── design-rubric.md
│   └── human-review.md
└── schemas/
    ├── run.schema.json
    ├── agent-output.schema.json
    └── revision-brief.schema.json
```

Keep `SKILL.md` focused on routing and mandatory workflow. Put role prompts, detailed rubrics, and manual review instructions in the referenced files. Do not copy this planning document into the published skill.
