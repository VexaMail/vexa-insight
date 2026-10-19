import { FindingsPanel } from './FindingsPanel'
import type { FindingsTabProps } from './FindingsTabProps'
import { NextBestActions } from './NextBestActions'
import { WhyThisMatters } from './WhyThisMatters'

export function FindingsTab({
  findings,
  guides,
  base,
}: Readonly<FindingsTabProps>) {
  return (
    <div className="space-y-4">
      <FindingsPanel findings={findings} base={base} />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <NextBestActions guides={guides} base={base} />
        <WhyThisMatters />
      </div>
    </div>
  )
}
