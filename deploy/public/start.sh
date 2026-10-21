#!/bin/sh
set -eu
cd app
export NODE_ENV=production
export PUBLIC_SITE_ONLY=true
export PUBLIC_ANALYTICS_ID=G-RDQN39NVX8
export HOSTNAME=0.0.0.0
export PORT=3003
export NEXT_TELEMETRY_DISABLED=1
export VEXA_TRUSTED_PROXY_HOPS=2
exec node server.js
