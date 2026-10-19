import type { SpfTreeBuildState } from './SpfTreeBuildState'
import type { SpfTreeNode } from './SpfTreeNode'

/** Resolves one included or redirected domain into its tree node. */
export type SpfChildBuilder = (
  domain: string,
  depth: number,
  state: SpfTreeBuildState,
) => Promise<SpfTreeNode | null>
