# Architecture Decision Records

Load-bearing decisions already made in this codebase, recorded in the classic
Status/Context/Decision/Consequences format. New ADRs take the next number;
superseded ADRs are marked in their Status section, never deleted.

| ADR                                                | Title                                              | Date       | Status   |
| -------------------------------------------------- | -------------------------------------------------- | ---------- | -------- |
| [0001](0001-default-deny-api-surface.md)           | Default-deny API surface for `/api/v1/**`          | 2026-05-18 | Accepted |
| [0002](0002-encrypted-imap-credentials-at-rest.md) | Encrypt IMAP credentials at rest (AES-256-GCM)     | 2026-05-18 | Accepted |
| [0003](0003-sqlite-single-replica-deployment.md)   | SQLite with a single-replica deployment topology   | 2026-05-19 | Accepted |
| [0004](0004-reversible-migrations-policy.md)       | Reversible-migrations policy enforced in CI        | 2026-05-19 | Accepted |
| [0005](0005-typescript-7-dual-alias-interop.md)    | TypeScript 7 dual-alias interop                    | 2026-07-24 | Accepted |
| [0006](0006-nonce-based-production-csp.md)         | Nonce-based production CSP in the proxy middleware | 2026-07-24 | Accepted |
| [0007](0007-explicit-ai-model-configuration.md)    | AI provider model must be explicitly configured    | 2026-07-24 | Accepted |
