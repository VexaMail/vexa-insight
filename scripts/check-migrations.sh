#!/usr/bin/env bash
# Enforce the reversible-migration policy documented in docs/MIGRATIONS.md.
#
# Scans every drizzle/*.sql file for destructive statements. A file is
# considered acknowledged if it contains a line matching
#   -- ACK-DESTRUCTIVE: <reason>
# within its first 5 lines. Files without that comment fail the build when
# any destructive pattern is matched.
#
# Exits non-zero on the first violation. Designed to be run as part of
# `pnpm run check:ci`.

set -euo pipefail

MIGRATIONS_DIR="${MIGRATIONS_DIR:-drizzle}"

if [[ ! -d "$MIGRATIONS_DIR" ]]; then
  echo "check-migrations: $MIGRATIONS_DIR/ not found; nothing to check" >&2
  exit 0
fi

violations=0

# Migrations that landed before this policy existed. Drizzle hashes file
# content in __drizzle_migrations, so we cannot retroactively add the
# ACK-DESTRUCTIVE comment without breaking upgrades for live instances.
# Treat them as historical; no new entries here.
grandfathered=(
  "$MIGRATIONS_DIR/0008_drop_app_settings_imap.sql"
  "$MIGRATIONS_DIR/0014_clean_warlock.sql"
  "$MIGRATIONS_DIR/0018_powerful_supernaut.sql"
)

is_grandfathered() {
  local target="$1"
  for entry in "${grandfathered[@]}"; do
    [[ "$entry" == "$target" ]] && return 0
  done
  return 1
}

# Patterns that cannot land in the same release as the column/table being
# changed. See docs/MIGRATIONS.md for the rationale.
patterns=(
  'DROP\s+TABLE'
  'DROP\s+COLUMN'
  'DROP\s+INDEX'
  'RENAME\s+TO'
  'RENAME\s+COLUMN'
  'ALTER\s+COLUMN[^;]*NOT\s+NULL'
  'TRUNCATE'
)

shopt -s nullglob
for file in "$MIGRATIONS_DIR"/*.sql; do
  if is_grandfathered "$file"; then
    continue
  fi

  # An acknowledgement comment in the first 5 lines lets the file opt out
  # of the check entirely. Reviewers still need to sign off.
  if head -n 5 "$file" | grep -qE '^-- ACK-DESTRUCTIVE: .+'; then
    continue
  fi

  for pattern in "${patterns[@]}"; do
    # -i: case-insensitive (SQL keywords); -E: extended regex.
    # -v -E '^--': ignore commented-out lines so an inline rationale does
    #              not trip the check.
    if grep -iE -v '^[[:space:]]*--' "$file" | grep -qiE "$pattern"; then
      printf 'check-migrations: %s\n  banned pattern: %s\n' "$file" "$pattern" >&2
      printf '  add "-- ACK-DESTRUCTIVE: <reason>" in the first 5 lines if intentional\n' >&2
      printf '  see docs/MIGRATIONS.md\n' >&2
      violations=$((violations + 1))
    fi
  done
done

if (( violations > 0 )); then
  printf '\ncheck-migrations: %d violation(s) found\n' "$violations" >&2
  exit 1
fi

echo "check-migrations: OK"
