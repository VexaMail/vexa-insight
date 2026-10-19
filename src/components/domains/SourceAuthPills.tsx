import { AuthPill } from './AuthPill'
import type { SourceAuthPillsProps } from './SourceAuthPillsProps'

/** SPF auth and alignment, DKIM auth and alignment, and DMARC of a source. */
export function SourceAuthPills({ auth }: Readonly<SourceAuthPillsProps>) {
  if (!auth) {
    return <span className="text-muted-foreground text-xs">No auth data</span>
  }
  const total = auth.messages
  return (
    <span className="flex flex-wrap gap-1">
      <AuthPill label="SPF" pass={auth.spfAuthPass} total={total} />
      <AuthPill label="SPF align" pass={auth.spfAligned} total={total} />
      <AuthPill label="DKIM" pass={auth.dkimAuthPass} total={total} />
      <AuthPill label="DKIM align" pass={auth.dkimAligned} total={total} />
      <AuthPill label="DMARC" pass={auth.dmarcPass} total={total} />
    </span>
  )
}
