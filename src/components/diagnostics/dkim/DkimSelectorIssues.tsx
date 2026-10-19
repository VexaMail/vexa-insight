/** Deduplicated parse errors of one DKIM selector record. */
export function DkimSelectorIssues({ errors }: Readonly<{ errors: string[] }>) {
  return (
    <div className="border-danger/30 bg-danger/10 rounded-lg border p-3">
      <h5 className="text-danger mb-1 text-xs font-semibold">Issues Found</h5>
      <ul className="text-danger list-inside list-disc text-xs">
        {[...new Set(errors)].map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  )
}
