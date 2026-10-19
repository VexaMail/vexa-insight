import { IpFlag } from '@/components/ips'
import type { SourceIpLinkProps } from '@/types/reports'
import Link from 'next/link'

/** Source IP in mono with its flag, linking to the sending-source page. */
export function SourceIpLink({ ip, countryCode }: Readonly<SourceIpLinkProps>) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <IpFlag countryCode={countryCode} />
      <Link
        href={`/ips/${encodeURIComponent(ip)}`}
        className="text-primary focus-visible:ring-ring rounded-sm font-mono text-sm whitespace-nowrap hover:underline focus-visible:ring-2 focus-visible:outline-none"
      >
        {ip}
      </Link>
    </span>
  )
}
