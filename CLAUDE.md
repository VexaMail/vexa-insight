# CLAUDE.md

Conventions for AI coding assistants working in this repository. Human
contributors should read [CONTRIBUTING.md](CONTRIBUTING.md), which these notes
supplement rather than replace.

## Before you finish

Run the quality gate and report its real output:

```bash
pnpm run check        # type-check + format + lint:fix
pnpm run check:ci     # CI parity, adds tests and the migration check
```

Never claim work is complete without having run it. If something fails or was
skipped, say so.

## Code placement

- Route handlers stay thin: validate, call one service, return.
- Business logic and anything touching the network, the database, or auth lives
  in `src/services/<area>/`.
- Pure helpers live in `src/utils/<area>/`, types in `src/types/<area>/`.
- One exported symbol per file, named after the file.
- Schema changes go through Drizzle migrations; commit the generated SQL.

## Backlog and work log

`TODO.md` holds scoped work that is not done yet. `TODO_LOG.md` is the dated
record of work that closed, kept so a decision can be found later without
digging through git history.

- Read `TODO.md` before and after related work, and search `TODO_LOG.md` before
  reopening an old task or re-solving a problem.
- Record actionable bugs, risks, blockers, deferred work, missing tests, and
  documentation gaps as they are discovered. Update an existing entry rather
  than adding a duplicate.
- States: `[ ]` pending, `[~]` partial or unverified, `[!]` blocked, `[x]`
  verified complete, `[-]` obsolete or superseded.
- Keep blockers in `TODO.md` and name the smallest action that would unblock
  them.
- When an item reaches `[x]` or `[-]`, append a dated entry to `TODO_LOG.md`
  with the result and the evidence for it, then remove it from `TODO.md`. One
  log file, grouped by year and month.
- Do not interrupt the current task to implement unrelated backlog items.
  Critical security, destructive, or data-loss findings are the exception:
  report those immediately.

## Data hygiene

This is a public repository that processes real DMARC reports. Never commit
anything generated from a local database — `evals/results/` artifacts in
particular embed report contents and domain names, and are gitignored for that
reason. Keep real domains, IP addresses, and email addresses out of code, tests,
docs, and commit messages; use `example.com` and documentation ranges.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may
all differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` (resolved from this file's directory; in
monorepos the `next` package may not be visible from the repo root) before
writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at
`node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a
diff only re-creates the uncommitted change; committing it with your work keeps
the tree clean.

<!-- END:nextjs-agent-rules -->
