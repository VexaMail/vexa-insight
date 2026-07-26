import { execFileSync } from 'node:child_process'

/**
 * Reads a generic-password secret out of the macOS Keychain.
 *
 * Dev/macOS only — `security` does not exist on the Linux container the app
 * ships in, which is one more reason the Max backend is gated to development.
 * Throws when the entry is absent.
 */
export function readKeychainSecret(service: string): string {
  // Absolute path, not a PATH lookup: a writable directory earlier on PATH
  // must not be able to substitute the binary that reads our credentials.
  return execFileSync('/usr/bin/security', [
    'find-generic-password',
    '-s',
    service,
    '-w',
  ])
    .toString()
    .trim()
}
