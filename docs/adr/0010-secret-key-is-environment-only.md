# ADR 0010: The encryption root comes from the environment only

Date: 2026-09-11

## Status

Accepted. Supersedes the resolution order decided in
[ADR 0009](0009-secret-key-out-of-the-database.md).

## Context

ADR 0009 moved `SECRET_KEY` out of the database, but kept a fallback: a usable
value in `app_settings.secret_key` won over the environment, so an instance that
had rotated its key through the settings page could still read its own
ciphertext. On boot, a column holding the same value as the environment was
reset to its placeholder.

An adversarial review took a raw copy of `vexa.db` after that boot cleanup and
decrypted a mailbox password out of it. SQLite runs here with `secure_delete`
off, so an `UPDATE` frees the old cell without overwriting the bytes in it. A
second reproduction on the real schema did not retain them, which is worse than
a consistent failure: whether the key survives depends on page layout, and a
security guarantee that holds sometimes is not one.

The fallback also kept three defects alive. Saving settings wrote the
environment's key back into the column. The resolved key doubles as the admin
API token and so rendered into the browser. A concurrent rotation could be
erased by the cleanup pass.

The project has no users yet, so nothing depends on the compatible answer.

## Decision

- `resolveSecretKey()` returns `getEnvSecretKey()` and nothing else. There is no
  database fallback, and no code path writes the column.
- `purgeStoredSecretKey()` runs on the first configuration load. When the stored
  value equals the environment's, it resets the column and then runs `VACUUM`,
  which rewrites the file and is what actually drops the freed bytes. When the
  two differ, it reports the mismatch and changes nothing: that column is the
  only key the stored ciphertext will open, and destroying it would destroy the
  credentials with it.
- The installer no longer collects a key. `SECRET_KEY` must be in the
  environment before an instance can be installed; `/install` and
  `POST /api/install` both refuse without it and say why.
- The settings page no longer offers key rotation, because a running instance
  cannot change its own environment. Rotation is
  `recovery.ts rotate-key <new-key>`, run with the instance stopped, followed by
  the environment change.
- An installed instance that boots without `SECRET_KEY` logs an error naming the
  consequence, rather than failing later inside ingestion.
- The admin API token is derived from `SECRET_KEY` with HKDF-SHA256 under its
  own info label rather than being the key itself. The settings page and every
  automation client hold the token; neither holds the encryption root, and HKDF
  does not run backwards.

## Consequences

- A leaked `vexa.db` no longer contains the key, for real and for every install
  path, because the key has nowhere in the file to be.
- Losing `SECRET_KEY` means losing the stored mailbox passwords and the AI
  provider key. They have to be entered again. This is the cost of the
  guarantee, and the installer says so.
- An instance upgraded from 0.2.2 or earlier that had rotated its key in the
  settings page will not start ingesting until `SECRET_KEY` is set to that
  rotated value. The boot log names the file and the fix.
- Every existing admin API token changes on upgrade, because it is now a
  derivation rather than the key. Cron jobs and scripts have to be updated from
  the settings page.
- A key purge is not retroactive. Any backup taken before the upgrade still
  contains the key, so the honest advice after upgrading is to rotate.
