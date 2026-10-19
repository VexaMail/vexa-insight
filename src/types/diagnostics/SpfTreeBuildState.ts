export type SpfTreeBuildState = {
  visited: Set<string>
  nodeCount: number
  /**
   * When set, a target it rejects is not resolved and shows as a missing
   * record. The planner uses it so a record typed by a user, or any record it
   * includes, cannot make the server resolve names on its own network.
   */
  readonly isAllowedTarget?: (domain: string) => boolean
}
