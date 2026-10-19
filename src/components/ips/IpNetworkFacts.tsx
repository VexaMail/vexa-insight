import { RDNS_STATUS_LABELS } from '@/constants/ips'
import type { IpNetworkFactsProps } from '@/types/ips'
import { IpInfoRow } from './IpInfoRow'

/** The answers of a network lookup, as rows of the panel. */
export function IpNetworkFacts({ context }: Readonly<IpNetworkFactsProps>) {
  const { rdns, asn } = context
  return (
    <dl className="divide-border -my-1.5 divide-y">
      <IpInfoRow label="Forward-confirmed PTR">
        <span
          className={
            rdns.status === 'confirmed' ? 'text-success' : 'text-warning'
          }
        >
          {rdns.status === 'confirmed' && rdns.confirmedName
            ? `Yes, ${rdns.confirmedName}`
            : RDNS_STATUS_LABELS[rdns.status]}
        </span>
      </IpInfoRow>
      <IpInfoRow label="ASN">
        <span className="font-mono">
          {asn ? `AS${String(asn.asn)}` : 'Unknown'}
        </span>
      </IpInfoRow>
      <IpInfoRow label="Network">
        <span className="truncate">{asn?.name ?? 'Unknown'}</span>
      </IpInfoRow>
      <IpInfoRow label="Prefix">
        <span className="font-mono">{asn?.prefix ?? 'Unknown'}</span>
      </IpInfoRow>
    </dl>
  )
}
