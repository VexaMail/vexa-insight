# Development LLM backend and prompt harness

Working on the AI prompts means running the same request dozens of times, and
every one of those runs costs money on a metered Anthropic API key. This
document describes an **optional** development mode that removes that cost, plus
the offline harness built on top of it for iterating on a prompt.

Neither is required to develop or run Vexa. The default and only supported
production path is the configured provider API key; everything here is off
unless explicitly enabled, and cannot be enabled outside development.

## What it does

Anthropic's Messages API accepts an OAuth bearer token from a Claude
subscription on the same `/v1/messages` endpoint the API key uses — same request
body, same response shape, same `usage` numbers. Claude Code stores such a token
in the macOS Keychain and keeps it refreshed. When the development flag is set,
this repo authenticates with that token instead of the API key, so local prompt
work draws on a flat subscription rather than per-token billing.

Use only credentials you own. This is a convenience for a developer who already
runs Claude Code on the machine they are developing on; it is not a way to share
or pool access.

## Requirements

- macOS, since the token is read from the Keychain via `security(1)`.
- Claude Code installed and signed in on a subscription that includes API
  inference.
- The Keychain entry `Claude Code-credentials`. Claude Code creates and
  refreshes it; nothing in this repo writes to it.

Without these, both entry points below fail with a clear error and nothing else
in the project is affected. Note that this makes the harness macOS-only today:
it has no metered-API-key mode, because spending no credit is the reason it
exists. Contributors on other platforms review prompt changes through the app
with a provider key configured.

## 1. The running app

```bash
pnpm run dev:max     # = LLM_BACKEND=max-oauth next dev
```

Anthropic calls made by the running app now use the subscription token. Settings
must still have **Anthropic** selected with a model, because the provider and
model are read from the settings row — but the stored API key is never sent, so
any non-empty placeholder satisfies the settings validation.

Use this to exercise the real UI: the Analyze actions on a report and on domain
diagnostics.

## 2. The offline prompt harness

```bash
pnpm run eval:ai report <reportId> [flags]
pnpm run eval:ai diagnostics <domainId> <domainName> [flags]
```

Runs a production prompt N times against real rows in the local database and
writes one artifact to `evals/results/`. No dev server, no session, no settings
row, no API key.

| Flag             | Default                           |
| ---------------- | --------------------------------- |
| `--runs <n>`     | `3`                               |
| `--model <id>`   | `claude-sonnet-5`                 |
| `--max-tokens`   | `2048` report, `3072` diagnostics |
| `--timeout <ms>` | `120000`                          |

The loop it exists for:

1. Run the harness, read the artifact.
2. Edit the prompt — `src/services/ai/prompts/reportAnalysisSystem.ts` or
   `src/services/ai/prompts/diagnosticsAnalysisSystem.ts`.
3. Run it again and diff the two artifacts.

Each artifact stores both prompts verbatim alongside every sample, so an old
result stays readable after the prompt source has moved on. Samples run
sequentially: the subscription lane rate-limits bursts, and a parallel sweep
would measure the rate limit instead of the prompt.

Runs never throw. A 400, a timeout or an unparseable answer is recorded as a
failed run with its message — "this prompt returns prose 2 times out of 5" is
exactly the signal the harness exists to surface.

Artifacts are gitignored. They are generated from whatever the local database
holds, which means real report contents and domain names; do not commit them.

## Request shape

The subscription lane only serves requests that identify as Claude Code. Each of
these is load-bearing, and dropping any one of them returns a `rate_limit_error`
that has nothing to do with quota:

- `anthropic-beta: oauth-2025-04-20,claude-code-20250219`
- `x-app: cli` and the `claude-cli/...` user agent
- the Claude Code identity as the **first** `system` block — a separate block,
  not a string prefix

Two further adjustments are forced by the Claude 5 models the lane serves:
`thinking` is disabled explicitly (they think by default, and this codebase
parses a single text block), and `temperature` is dropped (they answer
`` `temperature` is deprecated for this model ``, HTTP 400).

## Safety

`isMaxOAuthBackendEnabled()` requires `LLM_BACKEND=max-oauth` **and**
`NODE_ENV === 'development'`. It fails closed: staging, test, or an unset
`NODE_ENV` all fall back to the API key, so a deployed runtime can never
authenticate with a developer's subscription token. This is pinned by
`test/isMaxOAuthBackendEnabled.test.ts`.

The token is read fresh from the Keychain on each call, and refreshed through
the OAuth grant only when it is within a minute of expiry. Nothing is cached to
disk and no token is logged.

## Where the code lives

| Path                        | Role                                                               |
| --------------------------- | ------------------------------------------------------------------ |
| `src/services/ai/maxOAuth/` | Keychain read, token refresh, headers, request shape, the dev gate |
| `src/services/ai/evals/`    | The offline harness: lane call, runners, artifacts                 |
| `scripts/run-ai-eval.ts`    | CLI entrypoint (`pnpm run eval:ai`)                                |
| `evals/results/`            | Artifacts, one JSON per invocation (gitignored)                    |

`src/services/ai/evals` is deliberately not re-exported from
`src/services/ai/index.ts`: it writes files and is only ever driven by
`scripts/run-ai-eval.ts`, which imports it by path.

## Known limitation

`createAnthropicAdapter` still sends `temperature` on the metered path, so
selecting a Claude 5 model with a real API key fails with HTTP 400. Only the
subscription path strips it today. Tracked in `TODO.md`.
