import type { DkimSelectorWarningsProps } from './DkimSelectorWarningsProps'

/** Strength recommendations do not make a published key invalid. */
export function DkimSelectorWarnings({
  warnings,
}: Readonly<DkimSelectorWarningsProps>) {
  return (
    <div className="border-warning/30 bg-warning/10 rounded-lg border p-3">
      <h5 className="text-warning mb-1 text-xs font-semibold">
        Recommendations
      </h5>
      <ul className="text-warning list-inside list-disc text-xs">
        {warnings.map((warning) => (
          <li key={warning}>{warning}</li>
        ))}
      </ul>
    </div>
  )
}
