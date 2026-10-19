import type { IpRawRecordRowProps } from '@/types/ip-detail'
import { IpRawResult } from './IpRawResult'

/** Every DKIM signature and SPF check of a raw record, as written. */
export function IpRawAuthCells({ record }: Readonly<IpRawRecordRowProps>) {
  return (
    <>
      <td>
        {record.dkim.length === 0 ? (
          <span className="text-muted-foreground">none</span>
        ) : null}
        {record.dkim.map((sig) => (
          <IpRawResult
            key={`${sig.domain}-${sig.selector}`}
            label={`${sig.domain} / ${sig.selector || '-'}`}
            result={sig.result}
          />
        ))}
      </td>
      <td>
        {record.spf.map((check) => (
          <IpRawResult
            key={`${check.domain}-${check.scope}`}
            label={
              check.scope ? `${check.domain} (${check.scope})` : check.domain
            }
            result={check.result}
          />
        ))}
      </td>
    </>
  )
}
