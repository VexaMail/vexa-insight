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

Keep the active backlog and the searchable record of closed work with tadu. A
repository uses `TODO.md` and `TODO_LOG.md` (format 1), or one JSON file per
task under `todo/` (format 2, when `todo/tadu.json` exists). Use
`TODO_HISTORY_INDEX.jsonl`, when present, to avoid parsing unchanged
conversations more than once.

- Do not read the backlog files whole: query them. `tadu list` filters with
  `--category`, `--type`, `--text`, `--due-within N`, `--overdue`,
  `--min-priority`, `--open` (pending work only) and `--history`; `tadu ready`
  lists what can start now; `tadu show KEY` prints one item. When more items
  follow, a list says so on stderr: page with `--offset` or narrow the filter.
- Before recording work or reopening an old task, run `tadu similar "<title>"`
  and update the existing item instead of creating a duplicate.
- Record actionable bugs, risks, blockers, deferred work, missing tests,
  validation, documentation, and product improvements as they are discovered.
- Use `[ ]` pending, `[~]` partial or unverified, `[!]` blocked, `[x]` verified
  complete, `[-]` obsolete or superseded (in format 2: pending, in_progress,
  blocked, done, cancelled). Keep blockers open and name the smallest action
  required to unblock them.
- Format 1: when work becomes `[x]` or `[-]`, remove it from `TODO.md` and add a
  dated entry to `TODO_LOG.md` under `## YYYY` and `### YYYY-MM` headings, in
  the shape below. An `[x]` entry needs an `Evidence:` line and a `[-]` entry a
  `Resolution:` line, each with content.
- Format 1: give an item a `Kind:` field when it is clear what it is: `task` for
  work you can do, `decision` for a choice a person must make, `waiting` for
  something someone else owes, `later` for something not to do now. Leave it out
  when unclear. `Due:` is the deadline, `Check on:` the day to look at the item
  again and `Not before:` the day before which it cannot start.
- Take work with `tadu next`; `tadu inbox` lists what waits on a person and
  `tadu urgent` what is urgent. When only a person can answer a question while
  you work alone, record it (format 1: `tadu add --kind decision`; format 2: a
  task of type `decision`), block the task it holds up (format 1:
  `tadu mark --state blocked --note "<blocker>"`; format 2: add the decision to
  its `blocked_by` with `tadu set`), and go on with the next task.
- Format 2: never edit task files by hand. Use `tadu add` (with category, type
  and priority), `tadu set ID key=value`, `tadu claim ID --as agent:<name>`
  before working on a task, and `tadu close --id ID --evidence "<proof>"`
  (`--resolution`, or `--duplicate-of ID`). Close reports the tasks that no
  longer wait on it; decide for each whether it moves to pending. Every command
  is a dry run until `--write`.
- In anything a person reads, such as a summary, a report or a question, name a
  task by its title, never by its ID; IDs stay in commands and tool calls.
- Before reviewing past conversations, consult the history index and skip
  unchanged records already marked `complete` or `irrelevant`. Update a record
  only after its findings are reconciled; interrupted work stays `partial`.
- Do not interrupt the active task for unrelated non-critical work, and do not
  implement unrelated TODO items unless requested. Immediately report critical
  security, destructive, or data-loss findings. Never put secrets in the
  backlog.

```md
- [x] YYYY-MM-DD — **Category:** What was done.
  - Result: What changed.
  - Evidence: The test, command result, commit or PR that proves it.

- [-] YYYY-MM-DD — **Category:** What was dropped.
  - Resolution: Why it no longer applies, or what replaced it.
```

In format 1, close an item with
`tadu close --match "<text>" --evidence "<proof>" --write` (`--resolution` for
`[-]`, `--result` for the Result line); it moves the item and writes the entry
in this shape. `add`, `mark` and `close` print a diff and write only with
`--write`; a connected `tadu mcp` server offers the same tools. Run
`tadu doctor .` after changing the backlog and before committing. If `tadu` is
not on PATH, install it as https://github.com/syntopica/tadu#install describes,
or report that it is missing. Formats: tadu spec v1,
https://github.com/syntopica/tadu/blob/main/spec/todo-format-v1.md, and v2,
https://github.com/syntopica/tadu/blob/main/spec/todo-format-v2.md. The
tadu-create and tadu-work skills automate these workflows and are optional.
<!-- /tadu:rule -->
