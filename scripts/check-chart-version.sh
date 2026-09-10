#!/usr/bin/env bash
# Keep the Helm chart's appVersion in step with the application version.
#
# templates/deployment.yaml resolves the image as
#   {{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}
# so a stale appVersion makes a default `helm install` pull a tag that was
# never published. This check fails the build when Chart.yaml drifts from
# package.json, which is what happened between 0.1.0 and 0.2.2.
#
# Run as part of `pnpm run check:ci`.

set -euo pipefail

CHART="${CHART:-deploy/helm/vexa-insight/Chart.yaml}"
PKG="${PKG:-package.json}"

if [[ ! -f "$CHART" ]]; then
  echo "check-chart-version: $CHART not found" >&2
  exit 1
fi

app_version=$(node -p "require('./$PKG').version")
chart_app_version=$(grep -E '^appVersion:' "$CHART" | head -n 1 | sed -E "s/^appVersion:[[:space:]]*['\"]?([^'\"[:space:]]+)['\"]?.*/\1/")
chart_version=$(grep -E '^version:' "$CHART" | head -n 1 | sed -E "s/^version:[[:space:]]*['\"]?([^'\"[:space:]]+)['\"]?.*/\1/")

status=0

if [[ "$chart_app_version" != "$app_version" ]]; then
  printf 'check-chart-version: %s appVersion is %s, package.json is %s\n' \
    "$CHART" "$chart_app_version" "$app_version" >&2
  status=1
fi

if [[ "$chart_version" != "$app_version" ]]; then
  printf 'check-chart-version: %s version is %s, package.json is %s\n' \
    "$CHART" "$chart_version" "$app_version" >&2
  status=1
fi

if (( status != 0 )); then
  printf '  bump both fields with the release commit that bumps package.json\n' >&2
  exit 1
fi

echo "check-chart-version: OK ($app_version)"
