# ADR 0007: AI provider model must be explicitly configured

Date: 2026-07-24

## Status

Accepted

## Context

The AI analysis features support multiple providers (Anthropic, OpenAI,
Gemini, OpenRouter). Earlier behavior fell back to a hardcoded per-provider
default model when the operator had not selected one. Silent defaults age
badly: providers deprecate model IDs, defaults drift from what the operator
expects to be billed for, and failures surface as confusing provider errors
instead of a clear configuration problem.

## Decision

Resolve the runtime model exclusively through
`services/ai/providers/shared/resolveEffectiveModel.ts`:

- If a non-empty model is selected in settings, use it (trimmed).
- Otherwise throw an `AIServiceError` with code `NOT_CONFIGURED` and a
  message directing the operator to Settings > AI Provider. No provider ever
  supplies an implicit default model.

## Consequences

- Operators always know exactly which model runs and is billed; a missing
  model is a clear, actionable configuration error instead of a silent
  fallback.
- Fresh installs must pick a model before AI features work — a deliberate
  one-time setup cost.
- Provider adapters stay free of hardcoded model IDs that would rot as
  providers deprecate models.

## Alternatives considered

- Per-provider default models: rejected; this is the behavior being removed.
- Defaulting to the provider's "latest" alias: rejected; costs and behavior
  change under the operator without consent.
