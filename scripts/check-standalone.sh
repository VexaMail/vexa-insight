#!/usr/bin/env bash
# Check what `next build` put in .next/standalone, the directory every
# deployment ships.
#
# 1. The output must not carry the repository. File tracing follows any
#    path the server code builds from process.cwd(), and once copied the
#    whole of data/ (live database included) into the output, so a traced
#    source tree, test suite, docs, git metadata or work log fails here.
# 2. geoip-lite's updatedb.js, which services/geoip/updateDb.ts forks from
#    the working directory, must be there with every module it requires.
#    It is run with a missing data directory, so it loads its dependencies
#    and exits before touching the network.
#
# Run after `pnpm run build`; CI does so in the build job.

set -euo pipefail

STANDALONE="${STANDALONE:-.next/standalone}"
FORBIDDEN=(src test docs data .git TODO.md TODO_LOG.md)
UPDATER=node_modules/geoip-lite/scripts/updatedb.js

if [[ ! -d "$STANDALONE" ]]; then
  echo "check-standalone: $STANDALONE not found; run pnpm run build first" >&2
  exit 1
fi

status=0

for entry in "${FORBIDDEN[@]}"; do
  if [[ -e "$STANDALONE/$entry" || -L "$STANDALONE/$entry" ]]; then
    echo "check-standalone: $STANDALONE/$entry must not be in the build output" >&2
    status=1
  fi
done

if [[ ! -f "$STANDALONE/$UPDATER" ]]; then
  echo "check-standalone: $STANDALONE/$UPDATER is missing; the in-app GeoIP update cannot run" >&2
  status=1
else
  missing_dir="$(mktemp -u)"
  output="$(cd "$STANDALONE" && env -u LICENSE_KEY -u GEODATADIR node "$UPDATER" "geodatadir=$missing_dir" 2>&1 || true)"
  if [[ "$output" != *"Directory does"* ]]; then
    echo "check-standalone: $STANDALONE/$UPDATER does not load from the build output:" >&2
    printf '%s\n' "$output" | head -n 20 >&2
    status=1
  fi
fi

if (( status != 0 )); then
  exit 1
fi

echo "check-standalone: OK ($STANDALONE)"
