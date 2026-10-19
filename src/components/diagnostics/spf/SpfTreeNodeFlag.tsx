import type { SpfTreeNodeFlagProps } from './SpfTreeNodeFlagProps'

/** A red pill marking a problem on one node of the SPF lookup tree. */
export function SpfTreeNodeFlag({ label }: Readonly<SpfTreeNodeFlagProps>) {
  return (
    <span className="border-danger/30 bg-danger/10 text-danger rounded-full border px-2 py-0.5 text-xs font-semibold">
      {label}
    </span>
  )
}
