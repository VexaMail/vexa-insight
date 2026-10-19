import type { IpDetailContextProps } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'
import { formatCountryName } from '@/utils/ips'
import { Clock, Server } from 'lucide-react'
import { IpFlag } from './IpFlag'
import { IpHeaderChip } from './IpHeaderChip'
import { IpNetworkChips } from './IpNetworkChips'
import { SourceCausePill } from './SourceCausePill'

/** Kind, country, network once looked up, last activity and the cause. */
export function IpHeaderChips({ ctx }: Readonly<IpDetailContextProps>) {
  const { data } = ctx
  const country = formatCountryName(data.countryCode)
  return (
    <>
      <IpHeaderChip icon={<Server />}>Sending source</IpHeaderChip>
      <IpHeaderChip
        icon={<IpFlag countryCode={data.countryCode} countryName={country} />}
      >
        {country ?? 'Unknown country'}
      </IpHeaderChip>
      <IpNetworkChips ip={ctx.ip} />
      <IpHeaderChip icon={<Clock />}>
        {data.lastSeen
          ? `Last seen ${formatRelativeDate(data.lastSeen).relative}`
          : 'Not seen in the window'}
      </IpHeaderChip>
      <SourceCausePill cause={ctx.cause} />
    </>
  )
}
