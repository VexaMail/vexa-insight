/**
 * If the log file has not been touched in this many milliseconds, the
 * update process is considered finished (or stuck) — used to clear the
 * "running" indicator in the UI.
 */
export const SELF_UPDATE_RUNNING_STALE_MS = 5 * 60 * 1000
