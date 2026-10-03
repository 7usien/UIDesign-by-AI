# Local gallery reference intelligence

Treat a supplied screenshot gallery as evidence, not a style picker. Index it before art direction:

```bash
elite-ui references index --gallery docs/gallery --project .
```

The generated `.elite/gallery-reference-library.json` has two states:

- `analyzed`: a screenshot has a local, evidence-labelled JSON analysis. It can contribute a bounded observation to `reference-analysis.json`.
- `PENDING_VISUAL_ANALYSIS`: no matching analysis was supplied. Do not infer its layout, effect, brand meaning, or UX quality. Reject it from the active reference selection until a screenshot analysis is completed.

Use filename stems when the image was converted from JPG/PNG to AVIF/WebP; an extension difference is not a missing reference. Select two to five analyzed entries. For each selected reference, identify one job (for example: product proof, chapter rhythm, technical flow, or identity hierarchy), one transformation for the current product, and one reason not to copy the original composition. The workflow blocks when an indexed gallery lacks this explicit selection.

The library does not prove that an interaction works, that a source has mobile or RTL behavior, or that unseen page sections are good. Those remain explicit test and capture obligations in the active project.
