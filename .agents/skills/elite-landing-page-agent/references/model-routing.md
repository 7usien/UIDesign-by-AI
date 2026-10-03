# Model routing

`elite.config.json` may declare model profiles without declaring a credential. Map strategy and art direction to strong reasoning/vision profiles, reviewers to independent read-only profiles, and routine structured work to a faster profile. The builder must never review its own rationale.

Use `command` profiles when a host agent owns execution. Use `openai-responses` only with an environment-variable credential and strict JSON output. Run normal governed tasks through `elite-ui models run <taskId> --run <id>`; run critics only through `elite-ui ai-review run` so their input remains isolated. The stored execution artifact records profile, model, duration, inputs, fallback and prompt version; it must never record a key, prompt secret, or provider response containing credentials.

Failure, refusal, timeout, missing image evidence, or schema-invalid output is `BLOCKED` or `FAIL`, not a silently substituted approval. A fallback must be another named profile and is recorded explicitly.
