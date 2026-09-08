import { IpDisplay } from '@/components/ips'

/** Source IP cell of the sending-sources table, with its country flag. */
export function SourceIpCell({
  ip,
  countryCode,
}: Readonly<{ ip: string; countryCode: string | null }>) {
  return (
    <td className="px-3 py-2 font-mono text-sm text-zinc-900 dark:text-zinc-50">
      <IpDisplay
        ip={ip}
        countryCode={countryCode}
        layout="inline"
        showHostname={false}
      />
    </td>
  )
}
