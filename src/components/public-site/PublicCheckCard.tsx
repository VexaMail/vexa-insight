import type { PublicCheckCardProps } from '../../types/public-check/PublicCheckCardProps'
import { PublicCheckBadge } from './PublicCheckBadge'

export function PublicCheckCard({ check }: Readonly<PublicCheckCardProps>) {
  return (
    <article className="bg-card rounded-xl border p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-mono text-lg font-semibold">{check.name}</h3>
        <PublicCheckBadge status={check.status} />
      </div>
      <p className="font-medium">{check.summary}</p>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        {check.recommendation}
      </p>
      {check.records.length > 0 && (
        <details className="mt-4 text-sm">
          <summary className="text-primary cursor-pointer font-medium">
            View DNS records ({check.records.length})
          </summary>
          <ul className="mt-3 space-y-2">
            {check.records.map((record) => (
              <li
                key={record}
                className="bg-muted rounded-md p-3 font-mono text-xs break-all"
              >
                {record}
              </li>
            ))}
          </ul>
        </details>
      )}
    </article>
  )
}
