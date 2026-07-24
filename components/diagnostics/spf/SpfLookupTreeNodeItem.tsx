import type { SpfLookupTreeNodeItemProps } from './SpfLookupTreeNodeItemProps'

export function SpfLookupTreeNodeItem({
  node,
}: Readonly<SpfLookupTreeNodeItemProps>) {
  return (
    <li className="flex flex-col gap-1">
      <div className="bg-muted/20 flex flex-wrap items-center gap-2 rounded-md border px-3 py-2">
        <span className="text-foreground font-mono text-xs font-semibold">
          {node.domain}
        </span>
        <span className="text-muted-foreground text-xs">
          {node.lookupCount} lookup{node.lookupCount === 1 ? '' : 's'}
        </span>
        {node.missingRecord && (
          <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-500">
            No SPF record
          </span>
        )}
        {node.cycleDetected && (
          <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-500">
            Cycle detected
          </span>
        )}
        {node.exceedsLookupLimit && (
          <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-500">
            Exceeds 10-lookup limit
          </span>
        )}
      </div>
      {node.mechanisms.length > 0 && (
        <p className="text-muted-foreground pl-3 font-mono text-xs">
          {node.mechanisms.join(' ')}
        </p>
      )}
      {node.children.length > 0 && (
        <ul className="border-border/60 ml-4 flex flex-col gap-1 border-l pl-3">
          {node.children.map((child, index) => (
            <SpfLookupTreeNodeItem
              key={`${child.domain}-${index}`}
              node={child}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
