import type { IpSenderNameProps } from '@/types/ips'
import { formatSenderCategory } from '@/utils/format'

/** The service the senders catalog names for a source, and its kind. */
export function IpSenderName({ sender }: Readonly<IpSenderNameProps>) {
  if (!sender) {
    return <span className="text-muted-foreground text-xs">Not identified</span>
  }
  return (
    <span
      className="flex max-w-[11.5rem] min-w-0 flex-col"
      title={`Matched on ${sender.matchedOn === 'hostname' ? 'reverse DNS' : 'DKIM domain'}`}
    >
      <span className="text-foreground truncate text-sm">{sender.name}</span>
      <span className="text-muted-foreground truncate text-xs">
        {formatSenderCategory(sender.category)}
        {sender.matchedOn === 'dkim' ? ' · by DKIM signer' : ''}
      </span>
    </span>
  )
}
