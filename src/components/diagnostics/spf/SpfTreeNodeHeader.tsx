import type { SpfLookupTreeNodeItemProps } from './SpfLookupTreeNodeItemProps'
import { SpfTreeNodeFlag } from './SpfTreeNodeFlag'

/** Domain, lookup count and problem flags of one SPF tree node. */
export function SpfTreeNodeHeader({
  node,
}: Readonly<SpfLookupTreeNodeItemProps>) {
  return (
    <div className="bg-muted/20 flex flex-wrap items-center gap-2 rounded-md border px-3 py-2">
      <span className="text-foreground font-mono text-xs font-semibold">
        {node.domain}
      </span>
      <span className="text-muted-foreground text-xs">
        {node.lookupCount} lookup{node.lookupCount === 1 ? '' : 's'}
      </span>
      {node.missingRecord ? <SpfTreeNodeFlag label="No SPF record" /> : null}
      {node.cycleDetected ? <SpfTreeNodeFlag label="Cycle detected" /> : null}
      {node.exceedsLookupLimit ? (
        <SpfTreeNodeFlag label="Exceeds 10-lookup limit" />
      ) : null}
    </div>
  )
}
