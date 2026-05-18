import path from 'node:path'

/**
 * Resolves a database URL to an absolute filesystem path.
 *
 * Handles the `file:` URL scheme correctly:
 * - `file:./data/vexa.db`  -> resolved relative to cwd
 * - `file:data/vexa.db`    -> resolved relative to cwd
 * - `file:/var/lib/db`     -> absolute path preserved
 * - `file:///var/lib/db`   -> URI form, absolute path preserved
 * - `file://host/path`     -> authority stripped, absolute path preserved
 *
 * Non-`file:` URLs (e.g. `libsql://...`) are returned unchanged.
 */
function resolveDbFilePath(databaseUrl: string): string {
  if (!databaseUrl.startsWith('file:')) return databaseUrl
  const stripped = databaseUrl.slice('file:'.length)
  const withoutAuthority = stripped.startsWith('//')
    ? stripped.slice(2).replace(/^[^/]*/, '')
    : stripped
  if (withoutAuthority.startsWith('/')) {
    return withoutAuthority
  }
  return path.resolve(process.cwd(), withoutAuthority)
}

export { resolveDbFilePath }
