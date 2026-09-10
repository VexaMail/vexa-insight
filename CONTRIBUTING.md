# Contributing to Vexa Mail Insight

Thanks for your interest in contributing! This document covers everything you
need to get a development environment running and submit a high-quality PR.

## Where to start

Issues labelled
[good first issue](https://github.com/VexaMail/vexa-insight/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
are scoped small and name the files to touch. Comment on one to claim it.
Everything open is at
[all issues](https://github.com/VexaMail/vexa-insight/issues); if what you want
to build is not there, open an issue first so the design is settled before you
write code.

## Development setup

**Requirements:** Node.js 22+, [pnpm](https://pnpm.io/) 10+.

1. Fork and clone the repo, then install dependencies:

   ```bash
   pnpm install
   ```

2. Run database migrations (creates `data/vexa.db` if missing):

   ```bash
   pnpm run db:migrate
   ```

3. Start the dev server:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000). On first run you will be
   redirected to `/install` to create the superadmin user.

No `.env` is required for a quick start. Optionally copy `.env.example` to
`.env` to override `DATABASE_URL` or pre-seed IMAP credentials.

## Project layout

```
app/             Next.js App Router pages, layouts, and route handlers
src/
  components/    Reusable React UI (organized by domain area)
  hooks/         One hook per file (useXxx.ts)
  services/      External boundaries (IMAP, DB, parsing)
  utils/         Pure helpers (no IO)
  types/         One type per file, organized by area
drizzle/         Drizzle migrations (SQL + journal)
scripts/         CLI tools (recovery.ts, etc.)
docs/            Architecture, data model, API docs
```

## Code style

- **One export per file.** Components, hooks, types, and utility functions each
  live in their own file.
- **No inline types** in components/hooks; place them under `src/types/<area>/`.
- **Thin route handlers**: validate input → call a service → return a response.
  No business logic in `app/**/route.ts`.
- **TypeScript strict** mode is enabled. Prefer `unknown` + narrowing over
  `any`.
- **Tailwind v4** for styling; use semantic tokens (`bg-background`,
  `text-foreground`) over hardcoded colors.

## Database changes

Schema lives in `src/lib/db/schema/` (one file per table, re-exported from
`index.ts`). To add or modify a table:

```bash
# After editing the schema:
pnpm run db:generate   # generate a new migration SQL file
pnpm run db:migrate    # apply pending migrations to local data/vexa.db
```

Always commit the generated `drizzle/<timestamp>_<name>.sql` file alongside the
schema change.

## Working on the AI prompts

The prompts under `src/services/ai/prompts/` are iterated by running them, not
by reading them. `pnpm run eval:ai` runs a production prompt N times against
real rows in your local database and writes one comparable artifact per
invocation:

```bash
pnpm run eval:ai report <reportId>
pnpm run eval:ai diagnostics <domainId> <domainName>
```

The harness deliberately spends no API credit, so it does not read your provider
settings at all: it calls Anthropic with a Claude subscription OAuth token from
the macOS Keychain, which means it currently requires macOS with Claude Code
signed in. See [docs/ai-max-oauth-backend.md](docs/ai-max-oauth-backend.md) for
the setup, the safety gate, and how to read an artifact. Without that setup,
prompt changes still need review through the normal app path with a provider key
configured.

Artifacts land in `evals/results/` and are gitignored — they embed real report
contents and domain names from your database. Never commit one.

## Quality gate

Before opening a PR, run:

```bash
pnpm run check        # type-check + format + lint:fix
```

For CI parity (no auto-fix):

```bash
pnpm run check:ci     # type-check + lint + format:check + test
```

## Tests

```bash
pnpm test             # unit + integration tests
pnpm test:watch       # watch mode
pnpm test:a11y        # accessibility tests (vitest-axe)
```

Tests live under `test/` (vitest only picks up `test/**/*.test.ts*`), named
after the unit they cover. Prefer behavior-focused tests over implementation
details.

## Pull requests

- Keep PRs focused. One concern per PR.
- Reference any related issue (`Closes #123`).
- Add a `CHANGELOG.md` entry under `[Unreleased]` for user-visible changes.
- Run `pnpm run check:ci` and make sure CI passes.
- A reviewer will respond within a few days.

## Reporting issues

Open a GitHub issue with: a clear description, steps to reproduce, expected vs
actual behavior, and your environment (Node version, OS, `pnpm --version`).

For security issues, **do not open a public issue** — see
[SECURITY.md](SECURITY.md).

## License

By contributing, you agree that your contributions will be licensed under the
[Apache License 2.0](LICENSE).
