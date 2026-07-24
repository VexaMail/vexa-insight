import { Network } from 'lucide-react'
import { SectionHeader } from '../shared'
import { SpfLookupTreeNodeItem } from './SpfLookupTreeNodeItem'
import type { SpfLookupTreeSectionProps } from './SpfLookupTreeSectionProps'

export function SpfLookupTreeSection({
  dns,
}: Readonly<SpfLookupTreeSectionProps>) {
  const tree = dns.spfTree

  return (
    <section className="bg-card flex flex-col gap-5 rounded-xl border p-5 shadow-sm">
      <SectionHeader
        title="SPF Lookup Tree"
        found={tree !== null && !tree.missingRecord}
        icon={<Network className="text-primary h-6 w-6" />}
        helpText="Receivers follow include and redirect references recursively. RFC 7208 allows at most 10 DNS lookups per SPF check; each include, redirect, a, mx, and exists mechanism consumes one."
      />

      {tree ? (
        <>
          {tree.exceedsLookupLimit && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
              <h4 className="mb-1 text-sm font-semibold text-red-500">
                Lookup limit exceeded
              </h4>
              <p className="text-sm text-red-500/90">
                This SPF record consumes {tree.lookupCount} DNS lookups, above
                the 10-lookup limit. Receivers may return a permerror and ignore
                SPF entirely.
              </p>
            </div>
          )}
          <ul className="flex flex-col gap-1">
            <SpfLookupTreeNodeItem node={tree} />
          </ul>
        </>
      ) : (
        <p className="text-muted-foreground text-sm italic">
          No SPF lookup data available.
        </p>
      )}
    </section>
  )
}
