import type { SpfTreeNode } from './SpfTreeNode'

/** The lookup budget of a candidate SPF record against the published one. */
export type SpfPlan = {
  readonly limit: number
  /** Null when the domain publishes no SPF record. */
  readonly publishedLookups: number | null
  readonly plannedLookups: number
  readonly withinLimit: boolean
  /** The candidate's resolved tree, with the cost of each include. */
  readonly tree: SpfTreeNode
}
