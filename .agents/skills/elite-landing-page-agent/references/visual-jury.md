# Visual Jury

Inspect rendered evidence after automated checks. Use current screenshots at desktop, laptop, 390px mobile, 360px mobile, and each configured direction. Do not score from source code alone.

## Hard failures

Return `FAIL` before scoring when the page contains fabricated proof, unclear primary action, broken layout, horizontal overflow, unreadable content, major runtime errors, or materially weaker required RTL/mobile states.

## Run a mechanical defect scan

Check these before subjective scoring:

- the primary CTA is visible and its label does not wrap at intended widths;
- navigation stays usable without accidental wrapping or collisions;
- hero content fits the intended first-view composition instead of hiding the action;
- no repeated layout family creates a copy-paste rhythm across consecutive sections;
- labels, numbering, dividers, and eyebrows encode real structure rather than decoration;
- images have stable aspect ratios, appropriate crops, and meaningful alternatives;
- every interactive control has hover, focus, active, disabled, loading, success, and error behavior when those states apply;
- motion has reduced-motion behavior and does not block reading or interaction;
- visible copy contains no placeholder language, unsupported claim, malformed sentence, or contradictory CTA label.

## Score the page

Score each category from 1 to 5 and cite visible evidence:

- five-second comprehension;
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
