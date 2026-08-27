/**
 * Raised when GitHub answers 404 for a repository's latest release.
 *
 * A repository that has simply not tagged a release yet is a normal state, not
 * a failed check: it must not be persisted as `lastError` (the UI renders that
 * as a warning) nor logged by the scheduler on every run.
 */
export class NoPublishedReleaseError extends Error {
  constructor() {
    super('No published releases for this repository')
    this.name = 'NoPublishedReleaseError'
  }
}
