import { Network } from 'lucide-react'
import { CollapsibleSection } from '../shared'
import { SpfLookupTreeNodeItem } from './SpfLookupTreeNodeItem'
import type { SpfLookupTreeSectionProps } from './SpfLookupTreeSectionProps'

export function SpfLookupTreeSection({
  dns,
  open,
  onToggle,
}: Readonly<SpfLookupTreeSectionProps>) {
  const tree = dns.spfTree

  return (
    <CollapsibleSection
      id="spf-tree"
      open={open}
      onToggle={onToggle}
      title="SPF Lookup Tree"
      found={tree !== null && !tree.missingRecord}
      icon={<Network className="text-primary h-6 w-6" />}
      helpText="Receivers follow include and redirect references recursively. RFC 7208 allows at most 10 DNS lookups per SPF check; each include, redirect, a, mx, and exists mechanism consumes one."
    >
      {tree ? (
        <>
          {tree.exceedsLookupLimit ? (
            <div className="border-danger/30 bg-danger/10 rounded-lg border p-4">
              <h4 className="text-danger mb-1 text-sm font-semibold">
                Lookup limit exceeded
              </h4>
              <p className="text-danger text-sm">
                This SPF record consumes {tree.lookupCount} DNS lookups, above
                the 10-lookup limit. Receivers may return a permerror and ignore
                SPF entirely.
              </p>
            </div>
          ) : null}
          <ul className="flex flex-col gap-1">
            <SpfLookupTreeNodeItem node={tree} />
          </ul>
        </>
      ) : (
        <p className="text-muted-foreground text-sm italic">
          No SPF lookup data available.
        </p>
      )}
    </CollapsibleSection>
  )
}
