import type { IpAsnFactsProps } from '@/types/ips'
import { formatAsn } from '@/utils/ips'
import { IpInfoRow } from './IpInfoRow'

/** The announcing network of the address: ASN, name, prefix, registry. */
export function IpAsnFacts({ asn }: Readonly<IpAsnFactsProps>) {
  return (
    <>
      <IpInfoRow label="ASN">
        <span className="font-mono">{formatAsn(asn)}</span>
      </IpInfoRow>
      <IpInfoRow label="Network name">
        <span className="truncate">{asn?.name ?? 'Unknown'}</span>
      </IpInfoRow>
      <IpInfoRow label="Prefix">
        <span className="font-mono">{asn?.prefix ?? 'Unknown'}</span>
      </IpInfoRow>
      <IpInfoRow label="Registry">
        <span className="uppercase">{asn?.registry ?? 'Unknown'}</span>
      </IpInfoRow>
    </>
  )
}
