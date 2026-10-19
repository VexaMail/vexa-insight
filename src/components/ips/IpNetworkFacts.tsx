import type { IpNetworkFactsProps } from '@/types/ips'
import { describeRdnsStatus } from '@/utils/ips'
import { IpAsnFacts } from './IpAsnFacts'
import { IpInfoRow } from './IpInfoRow'

/** The answers of a network lookup, as rows of the panel. */
export function IpNetworkFacts({ context }: Readonly<IpNetworkFactsProps>) {
  const { rdns } = context
  return (
    <dl className="divide-border -my-1.5 divide-y">
      <IpInfoRow label="PTR">
        <span className="truncate font-mono">
          {rdns.ptrNames.length > 0 ? rdns.ptrNames.join(', ') : 'None'}
        </span>
      </IpInfoRow>
      <IpInfoRow label="Forward-confirmed reverse DNS">
        <span
          className={
            rdns.status === 'confirmed' ? 'text-success' : 'text-warning'
          }
        >
          {describeRdnsStatus(rdns)}
        </span>
      </IpInfoRow>
      <IpAsnFacts asn={context.asn} />
    </dl>
  )
}
