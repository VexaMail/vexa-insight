import { formatSenderCategory } from '@/utils/format'
import type { SenderLineProps } from './SenderLineProps'

/** The recognised sending service under a hostname, and what it matched on. */
export function SenderLine({ sender }: Readonly<SenderLineProps>) {
  return (
    <span
      className="text-muted-foreground truncate text-xs"
      title={`${sender.name}, ${formatSenderCategory(sender.category)}; matched on ${sender.matchedOn === 'hostname' ? 'reverse DNS' : 'DKIM domain'}`}
    >
      {sender.name}
    </span>
  )
}
