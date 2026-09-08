// Browser-safe public exports only.
// Server-only helpers (filesystem and process introspection) live in
// `services/updates/internals/` so they never reach client bundles.
export { buildLatestReleaseUrl } from './buildLatestReleaseUrl'
export { buildUserAgent } from './buildUserAgent'
export { clampReleaseNotes } from './clampReleaseNotes'
export { getRepoSlugFromEnv } from './getRepoSlugFromEnv'
export { isoDateToEpochSeconds } from './isoDateToEpochSeconds'
export { isUpdateAvailable } from './isUpdateAvailable'
export { isUpdateCheckEnabledFromEnv } from './isUpdateCheckEnabledFromEnv'
export { isValidUpdateRef } from './isValidUpdateRef'
export { normalizeVersion } from './normalizeVersion'
export { parseGithubRelease } from './parseGithubRelease'
