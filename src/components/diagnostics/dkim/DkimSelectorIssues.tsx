/** Deduplicated parse errors of one DKIM selector record. */
export function DkimSelectorIssues({ errors }: Readonly<{ errors: string[] }>) {
  return (
    <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
      <h5 className="mb-1 text-xs font-semibold text-red-500">Issues Found</h5>
      <ul className="list-inside list-disc text-xs text-red-500/90">
        {[...new Set(errors)].map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  )
}
