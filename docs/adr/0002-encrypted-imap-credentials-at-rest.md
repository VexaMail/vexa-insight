# ADR 0002: Encrypt IMAP credentials at rest with AES-256-GCM derived from SECRET_KEY

Date: 2026-05-18

## Status

Accepted, amended by [ADR 0009](0009-secret-key-out-of-the-database.md) and
[ADR 0010](0010-secret-key-is-environment-only.md).

**Correction (2026-09-11):** the first Consequence below was wrong as shipped.
`SECRET_KEY` was read from `app_settings.secret_key`, so up to and including
0.2.2 the key lived in the same database file as the ciphertext and a leaked
file did expose the credentials. ADR 0009 records the fix and the resolution
order that replaces it.

## Context

The dashboard polls IMAP mailboxes for DMARC reports, so it must store mailbox
passwords in the SQLite database. Self-hosted instances back up or copy that
database file freely; plaintext passwords in `imap_accounts` would leak on any
database exposure. The app already requires a `SECRET_KEY`, and adding a second
key-management mechanism (KMS, keyfile) was out of scope for a self-hosted
single-binary deployment.

## Decision

- Encrypt IMAP passwords with AES-256-GCM
  (`src/services/crypto/encryptSecret.ts`) before persisting. Each blob is
  versioned: `v1:<iv-b64>|<tag-b64>|<ciphertext-b64>`, with a fresh random
  12-byte IV per call and the GCM tag authenticating the ciphertext.
- Derive the 32-byte key from the configured `SECRET_KEY` via HKDF-SHA256 with
  fixed salt/info constants (`src/services/crypto/deriveEncryptionKey.ts`), so
  the same `SECRET_KEY` deterministically yields the same key across boots.
  `SECRET_KEY` must be at least 16 characters.
- Stay migration-compatible: `isEncrypted` detects the `v1:` prefix, reads fall
  back to legacy plaintext, and
  `src/services/settings/encryptLegacyImapPasswords.ts` upgrades pre-existing
  plaintext rows in place.

## Consequences

- A leaked database file no longer exposes mailbox credentials unless
  `SECRET_KEY` leaks with it. **Superseded — see the correction above and
  ADR 0009.** As shipped, the key was stored alongside the ciphertext.
- `SECRET_KEY` becomes the root secret for both auth (ADR 0001) and encryption;
  rotating it invalidates stored ciphertexts, and there is no built-in
  key-rotation flow yet.
- The `v1:` version prefix leaves room for future algorithm or KDF changes
  without another data migration.

## Alternatives considered

- External KMS or keyfile: rejected as operational overhead for self-hosters.
- Hashing: not applicable, IMAP requires the recoverable password.
- Using `SECRET_KEY` directly as the AES key: rejected; HKDF gives a proper
  32-byte key from arbitrary-length input and domain-separates this use from the
  auth-token use of the same secret.
