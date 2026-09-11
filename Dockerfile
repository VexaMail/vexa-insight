# Build stage
FROM node:26-alpine@sha256:ef24c5053d50fdc3e4e56eb4e7ddb7861874ab0fdc797046ba897581deb8e868 AS builder

# better-sqlite3 ships no musl/arm64 prebuilt binary, so pnpm install falls
# back to node-gyp, which needs a Python and a C++ toolchain.
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
# pnpm 11 refuses to remove an existing node_modules without TTY unless CI=true;
# without this, install fails with ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY.
ENV CI=true
# Node 26 no longer bundles corepack, so install it from npm before enabling
# it; the pnpm version still comes from package.json's packageManager field.
RUN npm install -g corepack@latest && corepack enable pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build
# The runner has no pnpm and no tsx, so the one-off maintenance entrypoint is
# bundled here into plain CJS that `node` can execute inside the container.
RUN pnpm run build:backfill
# Same reason: the demo seeder is the only way to see the dashboard populated
# without connecting a real mailbox, and it must be runnable inside the image.
RUN pnpm run build:seed
# And the recovery CLI: it is the supported way out of a lost admin password or
# a locked install, so it has to exist where the failure happens.
RUN pnpm run build:recovery

# Run stage
FROM node:26-alpine@sha256:ef24c5053d50fdc3e4e56eb4e7ddb7861874ab0fdc797046ba897581deb8e868 AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/dist ./dist
# Next's standalone output leaves better-sqlite3 inside the pnpm store layout,
# which only resolves for the traced server files. The bundled maintenance
# entrypoint keeps the native module external, so give it a resolvable path.
RUN ln -s "$(ls -d /app/node_modules/.pnpm/better-sqlite3@*/node_modules/better-sqlite3)" /app/node_modules/better-sqlite3
COPY --from=builder /app/package.json ./
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:3000/api/v1/health || exit 1

CMD ["node", "server.js"]
