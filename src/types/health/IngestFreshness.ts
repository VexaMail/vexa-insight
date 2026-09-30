/**
 * `idle` when nothing is scheduled (no mailbox, or not installed), `stale`
 * when scheduled runs have stopped arriving.
 */
export type IngestFreshness = 'ok' | 'stale' | 'idle'
