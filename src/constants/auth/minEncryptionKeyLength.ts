/**
 * Shortest `SECRET_KEY` that HKDF can derive an AES-256 key from, per ADR 0002.
 *
 * Deliberately lower than `MIN_SECRET_LENGTH`, which governs whether the same
 * secret is strong enough to act as an admin API token. A key of 16 to 31
 * characters still decrypts everything it encrypted, so refusing to use it for
 * decryption would lock an instance out of its own stored credentials.
 */
export const MIN_ENCRYPTION_KEY_LENGTH = 16
