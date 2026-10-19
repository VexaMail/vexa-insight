import { CopyIconButton } from '@/components/ui'
import type { IpNetworkRowsProps } from '@/types/ips'
import { formatAsn } from '@/utils/ips'
import { IpInfoRow } from './IpInfoRow'

/** ASN and organisation rows, or why they are not known yet. */
export function IpAsnInfoRows({
  context,
  error,
}: Readonly<IpNetworkRowsProps>) {
  const asn = context?.asn ?? null
  const missing = context ? 'Unknown' : (error ?? 'Not looked up')
  return (
    <>
      <IpInfoRow label="ASN">
        {asn ? (
          <>
            <span className="font-mono">{formatAsn(asn)}</span>
            <CopyIconButton value={formatAsn(asn)} label="ASN" />
          </>
        ) : (
          <span className="text-muted-foreground">{missing}</span>
        )}
      </IpInfoRow>
      <IpInfoRow label="Organization">
        <span className={asn?.name ? 'truncate' : 'text-muted-foreground'}>
          {asn?.name ?? missing}
        </span>
      </IpInfoRow>
    </>
  )
}
