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

<!-- tadu:rule v5 -->

## Continuous TODO, Work Log, and History Coverage

Keep the active backlog and the searchable record of closed work with tadu. This
repository keeps one JSON file per task under `todo/` (format 2,
`todo/tadu.json`). Use `TODO_HISTORY_INDEX.jsonl`, when present, to avoid
parsing unchanged conversations more than once.

- Never edit task files by hand. Use `tadu add` (with category, type and
  priority), `tadu set ID key=value`, `tadu claim ID --as agent:<name>` before
  working on a task, and `tadu close --id ID --evidence "<proof>"`
  (`--resolution`, or `--duplicate-of ID`). Close reports the tasks that no
  longer wait on it; decide for each whether it moves to pending. Every command
  is a dry run until `--write`.
- Do not read the backlog files whole: query them. `tadu list` filters with
  `--category`, `--type`, `--text`, `--due-within N`, `--overdue`,
  `--min-priority`, `--open` (pending work only) and `--history`; `tadu ready`
  lists what can start now; `tadu show KEY` prints one item. When more items
  follow, a list says so on stderr: page with `--offset` or narrow the filter.
- Before recording work or reopening an old task, run `tadu similar "<title>"`
  and update the existing item instead of creating a duplicate.
- Record actionable bugs, risks, blockers, deferred work, missing tests,
  validation, documentation, and product improvements as they are discovered. A
  task is pending, in_progress, blocked, done or cancelled. Keep blockers open
  and name the smallest action required to unblock them.
- Give a task a kind when it is clear what it is: `task` for work you can do,
  `decision` for a choice a person must make, `waiting` for something someone
  else owes, `later` for something not to do now. Leave it out when unclear.
  `due` is the deadline, `check_on` the day to look at the task again and
  `defer_until` the day before which it cannot start.
- Take work with `tadu next`; `tadu inbox` lists what waits on a person and
  `tadu urgent` what is urgent. When only a person can answer a question while
  you work alone, record it (`tadu add --kind decision`), add the decision to
  the `blocked_by` of the task it holds up with `tadu set`, and go on with the
  next task.
- In anything a person reads, such as a summary, a report or a question, name a
  task by its title, never by its ID; IDs stay in commands and tool calls.
- Before reviewing past conversations, consult the history index and skip
  unchanged records already marked `complete` or `irrelevant`. Update a record
  only after its findings are reconciled; interrupted work stays `partial`.
- Do not interrupt the active task for unrelated non-critical work, and do not
  implement unrelated TODO items unless requested. Immediately report critical
  security, destructive, or data-loss findings. Never put secrets in the
  backlog.

Run `tadu doctor .` after changing the backlog and before committing. If `tadu`
is not on PATH, install it as https://github.com/syntopica/tadu#install
describes, or report that it is missing. Format: tadu spec v2,
https://github.com/syntopica/tadu/blob/main/spec/todo-format-v2.md. A connected
`tadu mcp` server offers the same tools. The tadu-create and tadu-work skills
automate these workflows and are optional.
<!-- /tadu:rule -->
