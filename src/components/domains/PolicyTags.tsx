import { alignmentModeLabel } from '@/utils/domains'
import type { PolicyTagsProps } from './PolicyTagsProps'

/** The other published tags, in record notation: sp, pct, adkim, aspf. */
export function PolicyTags({ policy }: Readonly<PolicyTagsProps>) {
  const tags = [
    ['sp', policy.subdomainPolicy ?? policy.policy ?? '?', 'Subdomain policy'],
    ['pct', policy.pct === null ? '100' : String(policy.pct), 'Share applied'],
    ['adkim', policy.adkim ?? 'r', alignmentModeLabel(policy.adkim)],
    ['aspf', policy.aspf ?? 'r', alignmentModeLabel(policy.aspf)],
  ] as const
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Other published tags">
      {tags.map(([tag, value, title]) => (
        <li
          key={tag}
          title={`${tag}: ${title}`}
          className="border-border bg-secondary/60 text-muted-foreground rounded border px-1.5 py-0.5 font-mono text-[11px]"
        >
          {tag}=<span className="text-foreground">{value}</span>
        </li>
      ))}
    </ul>
  )
}
