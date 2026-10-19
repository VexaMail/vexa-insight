import type { IpUtcStampProps } from '@/types/ips'

/** A UTC date and time on one line, the time in the monospace face. */
export function IpUtcStamp({ value }: Readonly<IpUtcStampProps>) {
  return (
    <span className="whitespace-nowrap">
      {value.date}{' '}
      <span className="text-muted-foreground font-mono text-xs">
        {value.time}
      </span>
    </span>
  )
}
