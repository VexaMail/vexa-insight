# ADR 0005: TypeScript 7 dual-alias interop

Date: 2026-07-24

## Status

Accepted (temporary; superseded when typescript-eslint supports TS >= 7.1)

## Context

TypeScript 7 (the native compiler) is significantly faster for type-checking,
but the toolchain is split: eslint (via typescript-eslint), Next.js, and
prettier plugins consume the TypeScript **JS API**, which the TS7 package does
not provide in a form those tools support yet. typescript-eslint's TS >= 7.1
support is tracked upstream in their issue #10940. Additionally,
`eslint-config-next` pins `typescript-eslint` 8.59.x, which breaks under a
TS7 install.

## Decision

- Install both compilers under pnpm aliases in `package.json`:
  - `"typescript": "npm:@typescript/typescript6@^6.0.2"` — the package name
    `typescript` resolves to the TS6 JS API, so eslint, Next.js, and prettier
    plugins keep working unmodified (its binary is exposed as `tsc6`).
  - `"typescript-7": "npm:typescript@^7.0.2"` — provides the native `tsc`
    binary, which `pnpm run type-check` (`tsc -p tsconfig.json --noEmit`)
    uses.
- Force a TS7-compatible typescript-eslint line across the tree with
  `pnpm-workspace.yaml` overrides (`typescript-eslint`,
  `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser` at
  `^8.65.0`), because `eslint-config-next` pins 8.59.x.
- Do not revert to a plain `typescript` spec until typescript-eslint ships
  TS >= 7.1 support; the backlog tracks the re-upgrade.

## Consequences

- Type-checking runs on the fast native TS7 compiler while the lint/build
  toolchain stays on the stable TS6 JS API.
- Two TypeScript versions can disagree; `type-check` (TS7) is the source of
  truth for type errors, and editor tooling may resolve the TS6 alias.
- Dependency updates must preserve both aliases and the workspace overrides;
  a naive `typescript` bump silently reintroduces the breakage.

## Alternatives considered

- Stay entirely on TS6: rejected; forfeits the native compiler's type-check
  speed for no compatibility gain.
- Move entirely to TS7: rejected; typescript-eslint (and therefore
  `eslint-config-next`) does not support it yet.
- Drop `eslint-config-next`: rejected; not worth losing the Next.js lint
  rules to remove one override.
