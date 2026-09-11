# ADR 0003: Keep SECRET_KEY out of the database it protects

Date: 2026-09-11

## Status

Accepted. Amends ADR 0002.

## Context

ADR 0002 encrypts IMAP passwords, and later the AI provider key, with a key
derived from `SECRET_KEY`, and records the consequence that "a leaked database
file no longer exposes mailbox credentials unless `SECRET_KEY` leaks with it".

That consequence did not hold. `SECRET_KEY` was read from
`app_settings.secret_key`, a column in the same SQLite file as the ciphertext it
protects. The environment variable only seeded that column once, on first boot,
while it still held the `CHANGE_ME` placeholder. Every release up to and
including 0.2.2 therefore shipped the decryption key inside the encrypted
database: copying `vexa.db` — a backup, a support attachment, a stolen volume —
was enough to recover every stored mailbox password.

The column could not simply be emptied, because `isInstalled()` used
`secret_key !== 'CHANGE_ME'` as its "this instance is installed" flag. The key's
storage location and the install state were the same fact.

## Decision

- Separate the two facts. `app_settings.installed_at` (migration 0032) is the
  install marker, stamped when the wizard completes. Existing instances are
  backfilled from the old rule so none falls back into the wizard.
- Resolve the root secret through `resolveSecretKey()`. A usable value in
  `app_settings.secret_key` wins, because an instance whose key was rotated
  through the settings page re-encrypted its secrets against that value and
  preferring the environment would make them unreadable. Otherwise the value
  comes from the `SECRET_KEY` environment variable.
- Stop seeding `SECRET_KEY` into the database. A fresh install that supplies the
  key through the environment leaves the column at `CHANGE_ME` forever, and the
  key never touches disk inside the database.
- On boot, `clearDuplicatedSecretKey()` resets the column to its placeholder
  when it holds exactly the value the environment already supplies. That is the
  upgrade path for instances installed before this release: they lose the stored
  copy and keep working, because the environment still carries the key.
- Treat an encrypted password with no resolvable key as a hard error rather than
  passing the ciphertext through as if it were the password.
- Judge a candidate key by `isDerivableSecret` (16 characters, ADR 0002's
  minimum) rather than `isUsableSecret` (32). The two answer different
  questions: whether a key can decrypt what it encrypted, and whether it is
  strong enough to authenticate an admin API call. Using the stricter one here
  would lock an instance holding a 16-to-31-character key out of its own stored
  credentials.

## Consequences

- With the key supplied through the environment, a leaked database file does not
  expose mailbox credentials. This is the configuration the README documents and
  the Docker and Compose examples use.
- With the key set through the settings page instead, the key is stored in the
  database and a leaked file does expose the credentials. That path stays
  supported for instances that cannot set an environment variable, and it is
  documented as the weaker option rather than advertised as equivalent.
- Rotating the key through the settings page moves it into the database and
  makes it authoritative from then on. Rotating the environment variable alone
  does not re-encrypt anything, so it orphans every stored secret; that is
  unchanged from ADR 0002 and still has no built-in flow.
- Losing the environment variable on an instance that has no stored copy means
  losing the stored credentials. The failure is now loud at boot rather than an
  IMAP login that silently sends ciphertext as a password.
- `SECRET_KEY` remains the root secret for authentication as well as encryption,
  as in ADR 0002.

## Alternatives considered

- **Rewrite ADR 0002's consequence and change nothing else.** Honest, and
  cheaper, but it leaves the product's central privacy claim weaker than it
  needs to be for a tool whose whole premise is keeping DMARC data local.
- **Refuse to boot without an environment key.** Breaks every instance installed
  through the wizard and offers nothing the resolution order above does not.
- **External KMS or keyfile.** Rejected in ADR 0002 as operational overhead for
  self-hosters; that reasoning is unchanged.
