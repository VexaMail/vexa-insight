/**
 * Model the harness uses when none is given. Sonnet rather than Opus because a
 * prompt sweep takes many samples and the subscription lane rate-limits the
 * larger model far sooner.
 */
export const DEFAULT_EVAL_MODEL = 'claude-sonnet-5' as const
