import type { IpDetailStatProps } from './IpDetailStatProps'
import { ipDetailStatValueClassNames } from './ipDetailStatValueClassNames'

export function IpDetailStat({ label, value, kind, title }: IpDetailStatProps) {
  return (
    <div>
      <p className="text-muted-foreground text-xs font-medium">{label}</p>
      <p className={ipDetailStatValueClassNames[kind]} title={title}>
        {value}
      </p>
    </div>
  )
}
