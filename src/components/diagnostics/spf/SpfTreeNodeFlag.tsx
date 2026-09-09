import type { SpfTreeNodeFlagProps } from './SpfTreeNodeFlagProps'

/** A red pill marking a problem on one node of the SPF lookup tree. */
export function SpfTreeNodeFlag({ label }: Readonly<SpfTreeNodeFlagProps>) {
  return (
    <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-500">
      {label}
    </span>
  )
}
