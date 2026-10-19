/** Planned-record checks per caller per minute; each can fan out to many lookups. */
export const SPF_PLAN_RATE_LIMIT = { limit: 30, windowMs: 60_000 } as const
