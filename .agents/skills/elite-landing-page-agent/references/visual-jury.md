# Visual Jury

Inspect rendered evidence after automated checks. Use current screenshots at desktop, laptop, 390px mobile, 360px mobile, and each configured direction. Do not score from source code alone.

## Hard failures

Return `FAIL` before scoring when the page contains fabricated proof, unclear primary action, broken layout, horizontal overflow, unreadable content, major runtime errors, or materially weaker required RTL/mobile states.

## Run a mechanical defect scan

Check these before subjective scoring:

- the primary CTA is visible and its label does not wrap at intended widths;
- navigation stays usable without accidental wrapping or collisions, and indicates the active section or has an explicit reason to remain non-stateful;
- within five seconds, the hero makes the business activity, priority audience, concrete offer, and next action understandable without relying on a later section;
- every major section has a visitor-relevant job that its heading and visible content make explicit; reject poetic headlines that need hidden context to mean anything;
- media explains a product state, service deliverable, evidence, place, or outcome. A visually impressive image with no visitor meaning is a failure, even if it is labelled as concept media;
- icons clarify a nearby label, status, action, or familiar control. Reject unlabeled decorative icons and arrow repetition that adds no directional meaning;
- any logo-sized letter, monogram, footer mark, or closing motif has a stated brand or conversion role visible in the page; reject unexplained oversized initials;
- hero content fits the intended first-view composition instead of hiding the action;
- no repeated layout family creates a copy-paste rhythm across consecutive sections;
- the hero's visual promise develops across the complete scroll; reject a strong first screen followed by ordinary template sections;
- section density, scale, and contrast create deliberate pacing rather than a uniform stack of similarly weighted blocks;
- proof becomes more concrete as the visitor advances, and the closing action resolves the opening promise;
- labels, numbering, dividers, and eyebrows encode real structure rather than decoration;
- images have stable aspect ratios, appropriate crops, and meaningful alternatives;
- every stated service output names the artifact or operating change the visitor receives; reject headings that only promise a vague “design file”, “solution”, or “experience”;
- the closing CTA says what happens next and does not imply a live form, booking, email, or delivery destination that has not been configured;
- every interactive control has hover, focus, active, disabled, loading, success, and error behavior when those states apply;
- motion has reduced-motion behavior and does not block reading or interaction;
- visible copy contains no placeholder language, unsupported claim, malformed sentence, or contradictory CTA label.

## Score the page

Score each category from 1 to 5 and cite visible evidence:

- five-second comprehension;
- wayfinding and navigation meaning;
- section purpose and semantic continuity;
- media relevance, icon semantics, and footer/closing meaning;
- audience and offer specificity;
- creative thesis and brand distinction;
- composition and attention control;
- typography and spacing craft;
- proof and credibility;
- conversion narrative;
- responsive composition;
- accessibility and interaction clarity;
- RTL parity when applicable;
- restraint and absence of generic AI-template signals.

Passing requires a mean of at least 4.2, no category below 4, and no unresolved critical or high finding.

## Produce bounded criticism

Every finding must include severity, viewport, page region, visible evidence, user impact, and a concrete correction. Reject comments such as “make it pop,” “improve spacing,” or “make it premium.”

Create one revision brief containing at most:

- three high-impact design corrections;
- three functional/accessibility corrections;
- one optional polish item.

After revision, recapture affected states and rescore them. The total cycle is bounded: one batched desktop/mobile inspection, one batched correction, and at most one confirmation inspection. If high-severity issues remain, return `BLOCKED` rather than lowering the bar.
