import { alignmentModeLabel } from '@/utils/domains'
import type { PolicyTagsProps } from './PolicyTagsProps'

/** The other published tags: sp, pct and the alignment modes. */
export function PolicyTags({ policy }: Readonly<PolicyTagsProps>) {
  const tags = [
    ['sp', policy.subdomainPolicy ?? 'same as p'],
    ['pct', policy.pct === null ? '100' : String(policy.pct)],
    ['adkim', alignmentModeLabel(policy.adkim)],
    ['aspf', alignmentModeLabel(policy.aspf)],
  ]
  return (
    <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
      {tags.map(([tag, value]) => (
        <div key={tag} className="flex min-w-0 justify-between gap-2">
          <dt className="text-muted-foreground font-mono">{tag}</dt>
          <dd className="text-foreground truncate font-mono">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
