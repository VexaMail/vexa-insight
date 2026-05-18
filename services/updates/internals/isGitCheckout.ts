import fs from 'node:fs'
import path from 'node:path'

/**
 * Returns true when `cwd` (or process.cwd()) is the root of a git checkout.
 * `.git` may be a directory or, for worktrees / submodules, a regular file.
 */
export function isGitCheckout(cwd: string = process.cwd()): boolean {
  try {
    const target = path.join(cwd, '.git')
    return fs.existsSync(target)
  } catch {
    return false
  }
}
