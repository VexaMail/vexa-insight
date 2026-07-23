# CLAUDE.md

Project instructions for Vexa Insight Dashboard. Global rules in
`~/.claude/CLAUDE.md` and `~/p/CLAUDE.md` still apply.

## Continuous TODO, Work Log, and History Coverage

Maintain `TODO.md` as the active backlog and `TODO_LOG.md` as the searchable
record of closed work. Use `TODO_HISTORY_INDEX.jsonl` to avoid parsing unchanged
conversations more than once.

- Read `TODO.md` at the beginning and end of related work. Search `TODO_LOG.md`
  before reopening an old task or repeating a previous solution.
- Record actionable bugs, risks, blockers, deferred work, missing tests,
  validation, documentation, and product improvements as they are discovered.
- Update an existing entry instead of creating a duplicate. Keep entries concise
  and place them under the most relevant category.
- Use `[ ]` pending, `[~]` partial or unverified, `[!]` blocked, `[x]` verified
  complete, and `[-]` obsolete or superseded.
- Keep blockers in `TODO.md` and name the smallest action required to unblock
  them.
- When work becomes `[x]` or `[-]`, append a dated entry with concise result and
  evidence to `TODO_LOG.md`, then remove it from the active backlog.
- Keep one log file grouped by year and month; do not create daily or
  per-session log files.
- Before reviewing conversations, consult `TODO_HISTORY_INDEX.jsonl` and skip
  unchanged records already marked `complete` or `irrelevant`.
- Update an index record only after its findings are reconciled. Interrupted
  work remains `partial`.
- Do not interrupt the active task for unrelated non-critical work or implement
  unrelated TODO items unless requested.
- Immediately report critical security, destructive, or data-loss findings.
