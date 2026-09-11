/**
 * Shown when an instance is asked to install without an encryption root.
 *
 * Since ADR 0010 `SECRET_KEY` is read from the environment only, so there is
 * nothing the wizard can do about its absence: the operator has to supply it
 * and restart.
 */
export const SECRET_KEY_REQUIRED_MESSAGE =
  'SECRET_KEY is not set. Vexa encrypts stored mailbox credentials with it and ' +
  'reads it from the environment only, so it has to be in place before the ' +
  'instance can be installed. Generate one with `openssl rand -hex 32`, put it ' +
  'in your .env or compose file, restart, and reload this page. Keep it: losing ' +
  'it makes the stored credentials unreadable.'
