import fs from 'node:fs'
import path from 'node:path'

/**
 * Returns true when `cwd` (or process.cwd()) is the root of a git checkout.
 * `.git` may be a directory or, for worktrees / submodules, a regular file.
 */
export function isGitCheckout(cwd: string = process.cwd()): boolean {
  try {
    // Without the ignore comment Turbopack traces the build checkout's .git
    // into the standalone output, and this check then answers true there.
    const target = path.join(/*turbopackIgnore: true*/ cwd, '.git')
    return fs.existsSync(target)
  } catch {
    return false
  }
}
