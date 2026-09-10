#!/usr/bin/env bash
# Vexa Mail Insight – self-update script.
#
# Pulls the requested git ref, installs deps, builds, backs up the SQLite
# database, and exits so the supervisor (systemd, PM2, etc.) restarts the
# Node process against the new build.
#
# Run by the dashboard's `POST /api/v1/admin/apply-update` endpoint.
# Can also be invoked manually:
#   ./scripts/self-update.sh                   # fast-forward current branch
#   ./scripts/self-update.sh v0.2.0            # check out a specific tag
#
# Environment:
#   VEXA_APP_DIR        — repository root (default: $PWD)
#   VEXA_UPDATE_LOG     — log file (default: ./data/self-update.log)
#   VEXA_PARENT_PID     — Node PID to terminate at the end (set by API)
#   VEXA_PNPM           — pnpm executable (default: pnpm in PATH)

set -euo pipefail

APP_DIR="${VEXA_APP_DIR:-$(pwd)}"
LOG_FILE="${VEXA_UPDATE_LOG:-${APP_DIR}/data/self-update.log}"
PNPM="${VEXA_PNPM:-pnpm}"
TARGET_REF="${1:-}"

# Whitelist tag refs (vX.Y.Z[-prerelease]) — refuses anything else.
ref_is_valid() {
  [[ "$1" =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-[A-Za-z0-9.-]+)?$ ]]
}

# Set up the log dir before redirecting.
mkdir -p "$(dirname "$LOG_FILE")"

{
  echo
  echo "=== self-update started: $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
  echo "app_dir: $APP_DIR"
  echo "target:  ${TARGET_REF:-<fast-forward current branch>}"

  cd "$APP_DIR"

  if [ ! -d ".git" ] && [ ! -f ".git" ]; then
    echo "ERROR: $APP_DIR is not a git checkout — aborting" >&2
    exit 2
  fi

  if [ -n "$TARGET_REF" ] && ! ref_is_valid "$TARGET_REF"; then
    echo "ERROR: refusing target ref '$TARGET_REF' (must match vX.Y.Z)" >&2
    exit 3
  fi

  if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "ERROR: working tree is dirty — refusing to overwrite local changes" >&2
    exit 4
  fi

  if ! command -v "$PNPM" >/dev/null 2>&1; then
    echo "ERROR: pnpm not found in PATH — set VEXA_PNPM or install pnpm" >&2
    exit 5
  fi

  # Snapshot the database through SQLite itself. A `cp` of the main file is
  # not a backup while the app is running: in WAL mode committed rows can live
  # only in the -wal file, so the copy silently restores without them. This
  # also honours a DATABASE_URL that points somewhere other than data/vexa.db.
  # A failed backup fails the update; continuing would remove the reason the
  # backup exists.
  backup_path="$("$PNPM" exec tsx "${APP_DIR}/scripts/backup-db.ts" | tail -n 1)"
  if [ -z "$backup_path" ] || [ ! -f "$backup_path" ]; then
    echo "ERROR: database backup failed — refusing to update" >&2
    exit 9
  fi
  echo "Backed up DB to $backup_path"

  # Capture the rollback target BEFORE anything mutates the repo / build.
  previous_sha="$(git rev-parse HEAD)"
  echo "previous HEAD: $previous_sha"

  next_backup="${APP_DIR}/.next.pre-update"
  if [ -d "${APP_DIR}/.next" ]; then
    echo "Snapshotting .next -> ${next_backup}"
    rm -rf "$next_backup"
    cp -a "${APP_DIR}/.next" "$next_backup"
  fi

  rollback() {
    echo "ROLLBACK: restoring previous git HEAD and .next snapshot"
    git reset --hard "$previous_sha" || true
    if [ -d "$next_backup" ]; then
      rm -rf "${APP_DIR}/.next"
      mv "$next_backup" "${APP_DIR}/.next"
    fi
  }

  echo "Fetching tags…"
  git fetch --tags --prune

  if [ -n "$TARGET_REF" ]; then
    echo "Checking out $TARGET_REF"
    if ! git checkout --detach "$TARGET_REF"; then
      echo "ERROR: git checkout failed" >&2
      rollback
      exit 6
    fi
  else
    echo "Fast-forwarding current branch"
    if ! git pull --ff-only; then
      echo "ERROR: git pull failed" >&2
      rollback
      exit 6
    fi
  fi
  current_sha="$(git rev-parse HEAD)"
  echo "HEAD is now $current_sha"

  echo "Installing dependencies…"
  if ! "$PNPM" install --frozen-lockfile; then
    echo "ERROR: pnpm install failed" >&2
    rollback
    exit 7
  fi

  echo "Building…"
  if ! "$PNPM" run build; then
    echo "ERROR: build failed; rolling back" >&2
    rollback
    exit 8
  fi

  # Build succeeded; drop the safety snapshot.
  if [ -d "$next_backup" ]; then
    rm -rf "$next_backup"
  fi

  echo "=== self-update succeeded: $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="

  # Trigger restart by sending SIGTERM to the parent Node process.
  # The supervisor (systemd Restart=always, PM2 autorestart) will start
  # the new build automatically.
  if [ -n "${VEXA_PARENT_PID:-}" ]; then
    echo "Sending SIGTERM to parent PID $VEXA_PARENT_PID"
    if kill -0 "$VEXA_PARENT_PID" 2>/dev/null; then
      kill -TERM "$VEXA_PARENT_PID"
    else
      echo "Parent PID $VEXA_PARENT_PID no longer running"
    fi
  else
    echo "No VEXA_PARENT_PID set — restart the service manually to pick up the new build"
  fi
} >> "$LOG_FILE" 2>&1
