import fs from 'node:fs'

/**
 * Heuristic: Docker mounts `/.dockerenv` in every container.
 * Buildkit also writes `/run/.containerenv` for Podman/buildah.
 */
export function isRunningInDocker(): boolean {
  try {
    if (fs.existsSync('/.dockerenv')) return true
    if (fs.existsSync('/run/.containerenv')) return true
    return false
  } catch {
    return false
  }
}
